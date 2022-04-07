import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import MajoitusTaulukko from "./MajoitusTaulukko";
import MajoitusForm from "./MajoitusForm";
import { DataContext } from "../App";


const MajoitusHallinta = () => {
    // tuodaan contextista serverin osoite
    const { server } = useContext(DataContext);

    const [mokit, setMokit] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);
    const [alueId, setAlueId] = useState("");
    const [muokkausData, setMuokkausData] = useState("");

    const sarakkeet = [
        "Mökin nimi", "Lähiosoite", "Postinumero", "Kuvaus", "Varustelu", "Henkilömäärä", "Hinta", "Muuta/Poista"
    ];

    // Mökkien hakeminen tietokannasta
    useEffect(()=>{
        fetch(server + "/api/mokit")
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setMokit(data)})
        .catch(err => console.log(err));
    }, [hae, server])


    const tallennaClick = () => {
        console.log("Tallenna");
    }
    
      const lisaaClick = () => {
       console.log("Lisää");
        
      }

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Majoituskohteiden hallinta
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{mt: 4}}>
                    {muokkaus ? "Muokkaa mökkiä" : "Lisää uusi mökki"}
                    </Typography>
                    <MajoitusForm muokataanko={muokkaus} tallennaClick={tallennaClick} lisaaClick={lisaaClick} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{mt: 4}}>
                        Valitse haettava alue
                    </Typography>
                    {/* TÄHÄN VALINTA ALUEELLE */}
                    <MajoitusTaulukko sarakkeet={sarakkeet} data={mokit} />
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default MajoitusHallinta;