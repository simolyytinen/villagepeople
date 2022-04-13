import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import MajoitusTaulukko from "./MajoitusTaulukko";
import MajoitusForm from "./MajoitusForm";
import { DataContext } from "../App";
import AlueDropBox from "./AlueDropBox";

const VarauksetHallinta = () =>{

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Varausten hallinta
            </Typography>
            {/* <Typography variant="h4" align="left" color="text.primary" paragraph sx={{mt: 4}}>
                Valitse alue
            </Typography> */}
            {/* <AlueDropBox alueid={alueId} setAlueId={setAlueId} data={toimipaikat}/> */}
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{mt: 4}}>
                    {/* {muokkaus ? "Muokkaa mökkiä" : "Lisää uusi mökki"} */}
                    </Typography>
                    {/* <MajoitusForm muokataanko={muokkaus} setMuokataanko={setMuokkaus} muokattavaMokki={muokattavaMokki} tallennaClick={tallennaClick} lisaaClick={lisaaClick} /> */}
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" align="left" color="red" paragraph sx={{mt: 4}}>
                    {/* {virhe ? "Mökkiä ei voida poistaa, siihen liittyy varauksia" : ""} */}
                    </Typography>
                    {/* <MajoitusTaulukko sarakkeet={sarakkeet} data={mokit} poista={poistaClick} muokkaa={muokkausClick} /> */}
                </Grid>
            </Grid>
            
        </Container>
    )

}

export default VarauksetHallinta