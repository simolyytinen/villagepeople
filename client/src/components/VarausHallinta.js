import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import MajoitusTaulukko from "./MajoitusTaulukko";
import MajoitusForm from "./MajoitusForm";
import { DataContext } from "../App";
import AlueDropBox from "./AlueDropBox";
import VarausTaulukko from "./VarausTaulukko";
import VarausForm from "./VarausForm";
import Dialogi from "./Dialogi";


const VarausHallinta = () => {
    // tuodaan contextista serverin osoite
    const { server, token } = useContext(DataContext);

    const [varaukset, setVaraukset] = useState([]);
    const [toimipaikat, setToimipaikat] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);
    const [alkuPvm, setAlkuPvm] = useState("");
    const [loppuPvm, setLoppuPvm] = useState("");
    const [varaus_id, setVaraus_id] = useState("");

    const [muokkausData, setMuokkausData] = useState("");
    const [muokattavaVaraus, setMuokattavaVaraus] = useState("");

    const [alueId, setAlueId] = useState("");
    const [virhe, setVirhe] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);


    const sarakkeet = [
        "Varaus ID", "Asiakas", "Mökki ID/Nimi", "Sijainti", "Varattu", "Vahvistettu", "Varaus alkaa", "Varaus loppuu", "Poista/Muokkaa"
    ];

    const auth = "Bearer " + token;

    // Toimipisteiden hakeminen tietokannasta droppivalikkoa varten. 
    // *****Hakua ei vielä muokattu toimimaan tämä kanssa*****
    useEffect(() => {
        fetch(server + "/api/toimipisteet")
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setToimipaikat(data)
            })
            .catch(err => console.log(err));
    }, [server])

    //Varauksien haku kannasta
    useEffect(() => {
        const funktio = () => {
            let api = server + "/api/varaukset/";
            fetch(api)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    setVaraukset(data)
                })
                .catch(err => console.log(err));
        }
        /* if (alueId !== "") */ funktio();
    }, [hae, /* alueId, */ server])


    //Varauksen muokkaus
    useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/varaukset";
            console.log("varauksen muokkaus useEffect", JSON.stringify(muokkausData));
            fetch(api, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(muokkausData)
            })
            .then((res) => {
                setHae(hae => hae + 1);
                setMuokkausData("");
            })
            .catch(err => console.log(err))
        }
        if (muokkausData !== "") funktio()
    }, [muokkausData, server])

    //Varauksen poisto
    useEffect(()=>{
        const funktio = () => {
            const api = server + "/api/varaukset/" + poistaId;
            console.log("varauksen poisto " + poistaId);

            fetch(api, {
                method: "DELETE",

            })
            .then((res) => {
                setHae(hae => hae + 1);
            })
            .catch(err => console.log(err))
        }
        if (poistaId > 0 && openDialog == false) funktio();

    }, [/* poistaId,  */openDialog, server])


    // Muokkaaminen
    const muokkausClick = (varaus) => {
        setMuokattavaVaraus(varaus)
        setMuokkaus(true);
    }

    const tallennaClick = (data) => {
        setMuokkausData({
            // varaus_id: muokattavaVaraus.varaus_id,
            // varattu_alkupvm : muokattavaVaraus.alkuPvm,
            // varattu_loppupvm : muokattavaVaraus.loppuPvm,
            ...data
        });
        setMuokkaus(false);
    }

    const poistaClick = (id) => {
        setOpenDialog(() => true);
        setPoistaId(id);
    }


    return (
        <Container maxWidth="xl">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{ mt: 4 }}>
                Varausten hallinta
            </Typography>
            <Typography variant="h4" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                Valitse alue
            </Typography>
            <AlueDropBox alueid={alueId} setAlueId={setAlueId} data={toimipaikat} />
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                    </Typography>
                    <VarausForm muokataanko={muokkaus} setMuokataanko={setMuokkaus} muokattavaVaraus={muokattavaVaraus} tallennaClick={tallennaClick} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" align="left" color="red" paragraph sx={{ mt: 4 }}>
                        {/* {virhe ? "Mökkiä ei voida poistaa, siihen liittyy varauksia" : ""} */}
                    </Typography>
                    <VarausTaulukko sarakkeet={sarakkeet} data={varaukset} poista={poistaClick} muokkaa={muokkausClick} />
                </Grid>
            </Grid>
            <Dialogi open={openDialog} setOpen={setOpenDialog} otsikko={"Varauksen poisto"} viesti={"Poistetaanko varaus? Myös kyseiseen varaukseen liittyvät palveluvaraukset poistetaan."} reitti={"/varaukset/hallinta"} />
        </Container>
    )

}

export default VarausHallinta