import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import MajoitusTaulukko from "./MajoitusTaulukko";
import MajoitusForm from "./MajoitusForm";
import { DataContext } from "../App";
import AlueDropBox from "./AlueDropBox";


const MajoitusHallinta = () => {
    // tuodaan contextista serverin osoite
    const { server } = useContext(DataContext);

    const [mokit, setMokit] = useState([]);
    const [toimipaikat, setToimipaikat] = useState([]);
    //const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);
    
    const [muokkausData, setMuokkausData] = useState("");

    const [alueId, setAlueId] = useState("");
    const [mokkinimi, setMokkinimi] = useState("");

    const sarakkeet = [
        "Mökin nimi", "Lähiosoite", "Postinumero", "Kuvaus", "Varustelu", "Henkilömäärä", "Hinta", "Muuta/Poista"
    ];

    // Toimipisteiden hakeminen tietokannasta droppivalikkoa varten
    useEffect(()=>{
        fetch(server + "/api/toimipisteet")
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setToimipaikat(data)})
        .catch(err => console.log(err));
    }, [server])

    // Mökkien hakeminen tietokannasta, haetaan vain jos alue on valittu
    useEffect(()=>{
        const funktio = () => {
            let api = server + "/api/mokit/" + alueId;
            fetch(api)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setMokit(data)})
            .catch(err => console.log(err));
        }
        if (alueId != "") funktio();
    }, [alueId, server])


    const tallennaClick = () => {
        console.log("Tallenna");
    }
    
    const lisaaClick = () => {
       console.log("Lisää");
        
    }
    
    // Mökin poistaminen
    const poistaClick = (id) => {
        setPoistaId(id);
    }

    useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/mokit/" + poistaId;
            fetch(api, {
                method: "DELETE"
            })
            .then((res) => {
                console.log(res)
                setAlueId(alueId => alueId); // laukaistaan toimipaikkojen hakeminen useEffect
            })
            .catch(err => console.log(err))
        }
        if (poistaId > 0) funktio();

    }, [poistaId, server])

    // Mökin lisääminen


    return (
        <Container maxWidth="xl">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Majoituskohteiden hallinta
            </Typography>
            <Typography variant="h4" align="left" color="text.primary" paragraph sx={{mt: 4}}>
                Valitse alue
            </Typography>
            <AlueDropBox alueid={alueId} setAlueId={setAlueId} data={toimipaikat}/>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{mt: 4}}>
                    {muokkaus ? "Muokkaa mökkiä" : "Lisää uusi mökki"}
                    </Typography>
                    <MajoitusForm muokataanko={muokkaus} tallennaClick={tallennaClick} lisaaClick={lisaaClick} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <MajoitusTaulukko sarakkeet={sarakkeet} data={mokit} poista={poistaClick} />
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default MajoitusHallinta;