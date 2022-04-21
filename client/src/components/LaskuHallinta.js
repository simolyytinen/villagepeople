import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import LaskuTaulukko from "./LaskuTaulukko";
import LaskuForm from "./LaskuForm";
import { DataContext } from "../App";



const LaskuHallinta = () => {
    // tuodaan contextista serverin osoite
    const { server } = useContext(DataContext);

    const [laskut, setLaskut] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);
    
    const [muokkausData, setMuokkausData] = useState("");
    const [muokattavaLasku, setMuokattavaLasku] = useState("");
    const [lisaysData, setLisaysData] = useState("");

    const [virhe, setVirhe] = useState(false);


    const sarakkeet = [
        "Lasku ID", "Varaus ID", "Summa", "Alv", "Muuta/Poista"
    ];

    // Asiakkaiden hakeminen tietokannasta
    useEffect(()=>{
        const funktio = () => {
            let api = server + "/api/laskut/";
            fetch(api)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setLaskut(data)})
            .catch(err => console.log(err));
        }
        funktio();
    }, [hae, server])
    
    
    // Laskun poistaminen
    const poistaClick = (id) => {
        setPoistaId(id);
    }

    useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/laskut/" + poistaId;
            fetch(api, {
                method: "DELETE"
            })
            .then((res) => {
                if (res.status === 600) {
                    setVirhe(true);
                    console.log("Ei voida poistaa, laskuun liittyy varauksia.") 
                    setTimeout(()=>{
                        setVirhe(false);
                    }, 5000) 
                }
                else {
                    console.log(res)
                    setHae(hae => hae + 1); // laukaistaan asiakkaiden hakeminen useEffect
                }
            })
            .catch(err => console.log(err))
        }
        if (poistaId > 0) funktio();

    }, [poistaId, server])

    // laskun lisääminen
    const lisaaClick = (data) => {
        setLisaysData({
            ...data
        });
         
     }

     useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/laskut";
            fetch(api, {
                method: "POST",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(lisaysData)
            })
            .then((res) => {
                setHae(hae => hae + 1); // laukaistaan asiakkaiden hakeminen useEffect
                setLisaysData("");
            })
            .catch(err => console.log(err))
        }
        
        if (lisaysData !== "") funktio();
    }, [lisaysData, server])


     // Muokkaaminen
     const muokkausClick = (lasku) => {
         setMuokattavaLasku(lasku)
         setMuokkaus(true);
     }

     const tallennaClick = (data) => {
        setMuokkausData({
            lasku_id : muokattavaLasku.lasku_id,
            ...data
        });
        setMuokkaus(false);
    }

    useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/laskut";
            
            fetch(api, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(muokkausData)
            })
            .then((res) => {
                setHae(hae => hae + 1); // laukaistaan asiakkaiden hakeminen useEffect
                setMuokkausData("");
            })
            .catch(err => console.log(err))
        }
        if (muokkausData !== "") funktio()
    }, [muokkausData, server])

      
    
    return (
        <Container maxWidth="xl">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Laskujen hallinta
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{mt: 4}}>
                    {muokkaus ? "Muokkaa laskua" : "Lisää uusi lasku"}
                    </Typography>
                    <LaskuForm muokataanko={muokkaus} setMuokataanko={setMuokkaus} muokattavaLasku={muokattavaLasku} tallennaClick={tallennaClick} lisaaClick={lisaaClick}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" align="left" color="red" paragraph sx={{mt: 4}}>
                    {virhe ? "Asiakasta ei voida poistaa, siihen liittyy varauksia" : ""}
                    </Typography>
                    <LaskuTaulukko sarakkeet={sarakkeet} data={laskut} poista={poistaClick} muokkaa={muokkausClick} />
                </Grid>
                
            </Grid>
            
        </Container>
    )
}

export default LaskuHallinta;