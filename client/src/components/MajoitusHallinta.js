import { useState } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";

const MajoitusHallinta = () => {

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Majoituskohteiden hallinta
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
                    Hae/Lisää/Poista/Muokkaa majoituskohteita
                    </Typography>
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default MajoitusHallinta;