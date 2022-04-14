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
    const { server, token } = useContext(DataContext);

    const [mokit, setMokit] = useState([]);
    const [toimipaikat, setToimipaikat] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);
    
    const [muokkausData, setMuokkausData] = useState("");
    const [muokattavaMokki, setMuokattavaMokki] = useState("");
    const [lisaysData, setLisaysData] = useState("");

    const [alueId, setAlueId] = useState("");
    const [virhe, setVirhe] = useState(false);


    const sarakkeet = [
        "Mökin nimi", "Lähiosoite", "Postinumero", "Kuvaus", "Varustelu", "Henkilömäärä", "Hinta", "Muuta/Poista"
    ];

    const auth = "Bearer " + token;

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
        if (alueId !== "") funktio();
    }, [hae, alueId, server])
    
    
    // Mökin poistaminen
    const poistaClick = (id) => {
        setPoistaId(id);
    }

    useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/mokit/" + poistaId;

            fetch(api, {
                method: "DELETE",

            })
            .then((res) => {
                if (res.status === 600) {
                    setVirhe(true);
                    console.log("Ei voida poistaa, mökkiin liittyy varauksia.") 
                    setTimeout(()=>{
                        setVirhe(false);
                    }, 5000) 
                }
                else if ( res.status === 401) console.log("Käyttöoikeus ei riitä");
                else {
                    console.log(res)
                    setHae(hae => hae + 1); // laukaistaan mökkien hakeminen useEffect
                }
            })
            .catch(err => console.log(err))
        }
        if (poistaId > 0) funktio();

    }, [poistaId, server])

    // Mökin lisääminen
    const lisaaClick = (data) => {
        setLisaysData({
            alue_id : alueId,
            mokkinimi : data.mokkinimi,
            katuosoite : data.katuosoite,
            postinro : data.postinro,
            hinta : data.hinta,
            henkilomaara : data.henkilomaara,
            varustelu : data.varustelu,
            kuvaus : data.kuvaus
        });
         
     }

     useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/mokit";
            console.log("hep", JSON.stringify(lisaysData));
            fetch(api, {
                method: "POST",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(lisaysData)
            })
            .then((res) => {
                setHae(hae => hae + 1); // laukaistaan mökkien hakeminen useEffect
                setLisaysData("");
            })
            .catch(err => console.log(err))
        }
        
        if (lisaysData !== "") funktio();
    }, [lisaysData, server])


     // Muokkaaminen
     const muokkausClick = (mokki) => {
         setMuokattavaMokki(mokki)
         setMuokkaus(true);
     }

     const tallennaClick = (data) => {
        setMuokkausData({
            alue_id: muokattavaMokki.alue_id,
            mokki_id : muokattavaMokki.mokki_id,
            ...data
        });
        setMuokkaus(false);
    }

    useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/mokit";
            console.log("hep", JSON.stringify(muokkausData));
            fetch(api, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(muokkausData)
            })
            .then((res) => {
                setHae(hae => hae + 1); // laukaistaan mökkien hakeminen useEffect
                setMuokkausData("");
            })
            .catch(err => console.log(err))
        }
        if (muokkausData !== "") funktio()
    }, [muokkausData, server])



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
                    <MajoitusForm muokataanko={muokkaus} setMuokataanko={setMuokkaus} muokattavaMokki={muokattavaMokki} tallennaClick={tallennaClick} lisaaClick={lisaaClick} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" align="left" color="red" paragraph sx={{mt: 4}}>
                    {virhe ? "Mökkiä ei voida poistaa, siihen liittyy varauksia" : ""}
                    </Typography>
                    <MajoitusTaulukko sarakkeet={sarakkeet} data={mokit} poista={poistaClick} muokkaa={muokkausClick} />
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default MajoitusHallinta;