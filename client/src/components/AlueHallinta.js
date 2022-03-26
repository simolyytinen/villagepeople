import { useState } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import AlueTaulukko from "./AlueTaulukko";

const AlueHallinta = () => {

    const [nimi, setNimi] = useState("");
    const [alueid, setAlueid] = useState("");

    const sarakkeet = [
        "Alueen ID", "Nimi", "Muuta/Poista"
    ]
    const data = [
        {id: 1, nimi: "Ruka"},
        {id: 2, nimi: "Vuokatti"},
        {id: 3, nimi: "Ylläs"},
        {id: 4, nimi: "Levi"},
        {id: 5, nimi: "Ruka"},
        {id: 6, nimi: "Vuokatti"},
        {id: 7, nimi: "Ylläs"},
        {id: 8, nimi: "Levi"},
        {id: 9, nimi: "Ylläs"},
        {id: 10, nimi: "Levi"},
        {id: 11, nimi: "Ylläs"},
        {id: 12, nimi: "Levi"},
    ]

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
                    <AlueTaulukko sarakkeet={sarakkeet} data={data} />
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default AlueHallinta;