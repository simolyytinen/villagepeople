import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import AlueTaulukko from "./AlueTaulukko";

const AlueHallinta = () => {

    const [toimipaikat, setToimipaikat] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);

    const sarakkeet = [
        "Alueen ID", "Nimi", "Muuta/Poista"
    ]

    useEffect(()=>{
        fetch("/api/toimipisteet")
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setToimipaikat(data)})
        .catch(err => console.log(err));
    }, [hae])

    useEffect(()=>{
        const api = "/api/toimipisteet/" + poistaId;
        fetch(api, {
            method: "DELETE"
        })
        .then((res) => {
            console.log(res)
            setHae(hae => hae+1);
        })
        .catch(err => console.log(err))
    }, [poistaId])

    const poistaToimipaikka = (id) => {
        setPoistaId(id);
    }

    const muokkaaToimipaikka = (id) => {
        console.log("Muokkaa", id)
    }

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Alueiden hallinta
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
                    Tähän formi muokkausta ja lisäystä varten
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AlueTaulukko sarakkeet={sarakkeet} data={toimipaikat} poista={poistaToimipaikka} muokkaa={muokkaaToimipaikka} />
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default AlueHallinta;