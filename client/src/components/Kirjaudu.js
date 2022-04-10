import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Box, Grid, TextField } from "@mui/material";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";


const Kirjaudu = () => {
    // tuodaan contextista serverin osoite
    const { server } = useContext(DataContext);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    /*
    Tähän logiikka millä tarkistetaan kirjautuminen kannasta
    Kirjautuminen tallennetaan contextiin
    */

    return (
        <Container maxWidth="md">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Kirjaudu
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="kayttaja"
                label="Käyttäjä"
                name="kayttaja"
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Salasana"
                type="password"
                id="password"
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