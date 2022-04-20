import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Box, Grid, TextField } from "@mui/material";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";
import Dialogi from './Dialogi';

const UusiAsiakas = () => {
    // tuodaan contextista serverin osoite
    const { server,  } = useContext(DataContext);

    const [asiakas, setAsiakas] = useState("");
    const [etunimi, setEtunimi] = useState("");
    const [sukunimi, setSukunimi] = useState("");
    const [email, setEmail] = useState("");
    const [puhelinnro, setPuhelinnro] = useState("");
    const [lahiosoite, setLahiosoite] = useState("");
    const [postinumero, setPostinumero] = useState("");
    const [toimipaikka, setToimipaikka] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate();


     useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/asiakas";
            fetch(api, {
                method: "POST",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(asiakas)
            })
            .then((res) => {
                setOpenDialog(()=>true)
            })
            .catch(err => console.log(err))
        }
        
        if (asiakas !== "") funktio();
    }, [asiakas, server])

    const handleSubmit = (event) => {
        event.preventDefault();
        setAsiakas({
            etunimi : etunimi,
            sukunimi : sukunimi,
            email : email,
            puhelinnro : puhelinnro,
            lahiosoite : lahiosoite,
            postinro : postinumero,
            toimipaikka : toimipaikka
        })
        setEtunimi("");
        setSukunimi("");
        setEmail("");
        setPuhelinnro("");
        setLahiosoite("");
        setPostinumero("");
        setToimipaikka("");
        /*
        Kirjaudutaanko automaattisesti sisään kun tehdään uusi käyttäjä?
        Asiakkaan lisääminen toimii, pitäisikö tehdä joku dialogi sille että ilmoitetaan onnistumisesta?
        */

    }

    

    const peruuta = () => {
        setEtunimi("");
        setSukunimi("");
        setEmail("");
        setPuhelinnro("");
        setLahiosoite("");
        setPostinumero("");
        setToimipaikka("");
      }

    return (
        <Container maxWidth="md">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Uusi asiakas
            </Typography>
            <Dialogi open={openDialog} setOpen={setOpenDialog} otsikko={"Rekisteröinti onnistui!"} viesti={"Kiitos, kun rekisteröidyit asiakkaaksemme. Mukavia lomahetkiä!"} reitti={"/kirjaudu"} />
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="etunimi"
                    label="Etunimi"
                    name="etunimi"
                    value={etunimi}
                    onChange={(event)=>{setEtunimi(event.target.value)}}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="sukunimi"
                    label="Sukunimi"
                    id="sukunimi"
                    value={sukunimi}
                    onChange={(event)=>{setSukunimi(event.target.value)}}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    type="email"
                    name="email"
                    label="Sähköposti"
                    id="email"
                    value={email}
                    onChange={(event)=>{setEmail(event.target.value)}}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    error={(puhelinnro.length > 10) || isNaN(puhelinnro)}
                    helperText={((puhelinnro.length > 10) || isNaN(puhelinnro)) ? "Puhelinnumero ei keplaa" : ""}
                    name="puhelinnro"
                    label="Puhelinnumero"
                    id="puhelinnro"
                    value={puhelinnro}
                    onChange={(event)=>{setPuhelinnro(event.target.value)}}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="lahiosoite"
                    label="Lähiosoite"
                    id="lahiosoite"
                    value={lahiosoite}
                    onChange={(event)=>{setLahiosoite(event.target.value)}}
                    />
                    <TextField
                    margin="normal"
                    fullWidth
                    required
                    error={(postinumero.length > 5) || isNaN(postinumero)}
                    helperText={((postinumero.length > 5) || isNaN(postinumero)) ? "Postinumero ei keplaa" : ""}
                    name="postinumero"
                    label="Postinumero"
                    id="postinumero"
                    value={postinumero}
                    onChange={(event)=>{setPostinumero(event.target.value)}}
                    />
                    <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="toimipaikka"
                    label="Kaupunki"
                    id="toimipaikka"
                    value={toimipaikka}
                    onChange={(event)=>{setToimipaikka(event.target.value)}}
                    />
                </Grid>
            </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Rekisteröidy
                </Button>
                <Button
                fullWidth
                variant="text"
                sx={{ mb: 2 }}
                onClick={()=>{peruuta()}}
                >
                Peruuta
                </Button>
            </Box>
               
            <Grid container>
                <Grid item>
                    <Button variant="text" onClick={()=>{navigate("/kirjaudu")}} sx={{ mt: 1, mb: 2}}>Oletko jo asiakas? Kirjaudu tästä</Button>
                </Grid>
            </Grid>

        </Container>
    )
}

export default UusiAsiakas;