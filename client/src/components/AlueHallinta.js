import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import AlueTaulukko from "./AlueTaulukko";
import AlueForm from "./AlueForm";

const AlueHallinta = () => {

    const [toimipaikat, setToimipaikat] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);
    const [alueId, setAlueId] = useState("");
    const [nimi, setNimi] = useState("");
    const [muokkausData, setMuokkausData] = useState("");
    const [lisaaNimi, setLisaaNimi] = useState("");

    const sarakkeet = [
        "Alueen ID", "Nimi", "Muuta/Poista"
    ];

    // Toimipisteiden hakeminen tietokannasta
    useEffect(()=>{
        fetch("/api/toimipisteet")
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setToimipaikat(data)})
        .catch(err => console.log(err));
    }, [hae])

    // Toimipisteen poistaminen tietokannasta REST-apin kautta
    useEffect(()=>{
        const funktio = () => {
            const api = "/api/toimipisteet/" + poistaId;
            fetch(api, {
                method: "DELETE"
            })
            .then((res) => {
                console.log(res)
                setHae(hae => hae+1);
            })
            .catch(err => console.log(err))
        }
        if (poistaId > 0) funktio();
    }, [poistaId])

    const poistaToimipaikka = (id) => {
        setPoistaId(id);
    }

    // Toimipisteen muokkaaminen
    useEffect(()=>{
        const funktio = () => {
            const api = "/api/toimipisteet/" + muokkausData.alue_id;

            fetch(api, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({nimi : muokkausData.nimi})
            })
            .then((res) => {
                setHae(hae => hae+1)
                setMuokkausData("");
            })
            .catch(err => console.log(err))
        }
        if (muokkausData != "") funktio();
    }, [muokkausData])


    const muokkaaToimipaikka = (id, nimi) => {
        setMuokkaus(true);
        setAlueId(id);
        setNimi(nimi);
    }

    const tallennaClick = (data) => {
        setMuokkausData(data);
        
        setMuokkaus(false);
        setNimi("");
        setAlueId("");
    }

    // Toimipisteen lisääminen

    useEffect(()=>{
        const funktio = () => {
            const api = "/api/toimipisteet/";

            fetch(api, {
                method: "POST",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({nimi : lisaaNimi})
            })
            .then((res) => {
                setHae(hae => hae+1)
                setLisaaNimi("");
            })
            .catch(err => console.log(err))
        }
        
        if (lisaaNimi != "") funktio();
    }, [lisaaNimi])

    const lisaaClick = (nimi) => {
        setLisaaNimi(nimi);
        setNimi("");
    }

    

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Alueiden hallinta
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{mt: 4}}>
                    {muokkaus ? "Muokkaa toimipaikkaa" : "Lisää uusi toimipaikka"}
                    </Typography>
                    <AlueForm muokataanko={muokkaus} alueId={alueId} nimi={nimi} setAlueId={setAlueId} setNimi={setNimi} tallennaClick={tallennaClick} lisaaClick={lisaaClick} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AlueTaulukko sarakkeet={sarakkeet} data={toimipaikat} poista={poistaToimipaikka} muokkaa={muokkaaToimipaikka} />
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default AlueHallinta;