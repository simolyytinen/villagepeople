import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Box, Grid, TextField } from "@mui/material";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";


const Kirjaudu = () => {
    // tuodaan contextista serverin osoite
    const { server, setToken, setAdmin, setLogin, setKayttaja } = useContext(DataContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [tunnus, setTunnus] = useState("");
    const [virhe, setVirhe] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setTunnus({
            username: username,
            password: password
        })
        setUsername("");
        setPassword("");
        

    }

    useEffect(()=>{
        const funktio = async () => {
            const api = server + "/api/authenticate"; 
            let response = await fetch(api, {
                method: "POST",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(tunnus)
            })

            if (response.status != 200) setVirhe(true);
            else if (response.status == 200 && tunnus.username === "admin") {
                let data = await response.json();
                console.log("admin");
                setToken(data.token);
                setAdmin(true);
                setLogin(true);
                setTunnus("");
                navigate("/raportointi");
            }
            else {
                let data = await response.json();
                console.log("peruskäyttäjä");
                setToken(data.token);
                setLogin(true);
                setKayttaja(data.id);
                setTunnus("");
                navigate("/majoitus");
                
            }

        }

        if (tunnus != "") funktio();

    }, [tunnus, server])

    /*
    Tähän logiikka millä tarkistetaan kirjautuminen kannasta
    Kirjautuminen tallennetaan contextiin
    */

    return (
        <Container maxWidth="md">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Kirjaudu
            </Typography>
            <Typography variant="h5" align="left" color="red" paragraph sx={{mt: 2}}>
                {virhe ? "Tunnus tai salasana virheellinen" : ""}
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="kayttaja"
                label="Sähköposti"
                name="kayttaja"
                value={username}
                onChange={e=>{
                    setVirhe(false);
                    setUsername(e.target.value)}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Salasana"
                type="password"
                id="password"
                value={password}
                onChange={e=>{
                    setVirhe(false);
                    setPassword(e.target.value)}}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Kirjaudu
                </Button>
            </Box>
               
            <Grid container>
                <Grid item>
                    <Button variant="text" onClick={()=>{navigate("/uusiasiakas")}} sx={{ mt: 1, mb: 2}}>Oletko uusi asiakas? Rekisteröidy tästä</Button>
                </Grid>
            </Grid>

        </Container>
    )
}

export default Kirjaudu;