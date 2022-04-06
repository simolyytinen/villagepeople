import { useState } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import BasicTable from "./PalveluTaulukko";

const PalveluHallinta = () => {

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center" color="text.primary" paragraph sx={{ mt: 4 }}>
                Palveluiden hallinta
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h3" align="center" color="text.primary" paragraph sx={{ mt: 4 }}>
                        tööt
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <BasicTable />
                </Grid>
            </Grid>

        </Container>
    )
}

export default PalveluHallinta;