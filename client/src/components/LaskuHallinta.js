import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import LaskuTaulukko from "./LaskuTaulukko";
import LaskuForm from "./LaskuForm";
import { DataContext } from "../App";
import moment from "moment";
import {FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';





const LaskuHallinta = () => {
    // tuodaan contextista serverin osoite
    const { server } = useContext(DataContext);

    const [laskut, setLaskut] = useState([]);
    const [avoimetVaraukset, setAvoimetVaraukset] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);

    const [muokkausData, setMuokkausData] = useState("");
    const [muokattavaLasku, setMuokattavaLasku] = useState("");
    const [lisaysId, setLisaysId] = useState("");
    const [varausId, setVarausId] = useState("");

    const [virhe, setVirhe] = useState(false);


    const sarakkeet = [
        "Lasku ID", "Varaus ID", "Summa", "Alv", "Laskutuspvm", "Eräpäivä", "Hallinta", "Maksettu"
    ];

    // Laskujen hakeminen tietokannasta
    useEffect(() => {
        const funktio = () => {
            let api = server + "/api/laskut/";
            fetch(api)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    setLaskut(data)
                })
                .catch(err => console.log(err));
        }
        funktio();
    }, [hae, server])

    // Käsitteleättömien varausten hakeminen
    useEffect(() => {
        const funktio = () => {
            let api = server + "/api/avoimetvaraukset";
            fetch(api)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    setAvoimetVaraukset(data)
                })
                .catch(err => console.log(err));
        }
        funktio();
    }, [hae, server])

    // Laskun poistaminen
    const poistaClick = (id) => {
        console.log("poistetaaN");
        setPoistaId(id);
    }

    useEffect(() => {
        const funktio = () => {
            const api = server + "/api/laskut/" + poistaId;
            fetch(api, {
                method: "DELETE"
            })
                .then((res) => {
                    if (res.status === 600) {
                        setVirhe(true);
                        setPoistaId(-1);
                        console.log("Ei voida poistaa, laskua ei olla maksettu.")
                        setTimeout(() => {
                            setVirhe(false);
                        }, 5000)
                    }
                    else {
                        console.log(res)
                        setPoistaId(-1);
                        setHae(hae => hae + 1); // laukaistaan asiakkaiden hakeminen useEffect
                    }
                })
                .catch(err => console.log(err))
        }
        if (poistaId > 0) funktio();

    }, [poistaId, server])

    // laskun lisääminen
    const lisaaClick = (varausId) => {
        setLisaysId(varausId);
        console.log(varausId)

    }

    useEffect(() => {
        const funktio = () => {
            const api = server + "/api/laskut";
            fetch(api, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    varaus_id : lisaysId
                })
            })
                .then((res) => {
                    setHae(hae => hae + 1); // laukaistaan laskujen ja avoimien varausten hakeminen useEffect
                    setLisaysId("");
                    setVarausId("");
                })
                .catch(err => console.log(err))
        }

        if (lisaysId !== "") funktio();
    }, [lisaysId, server])


    // Muokkaaminen
    const muokkausClick = (lasku) => {
        setMuokattavaLasku(lasku)
        setMuokkaus(true);
    }

    const tallennaClick = (data) => {
        setMuokkausData({
            lasku_id: muokattavaLasku.lasku_id,
            ...data
        });
        setMuokkaus(false);
    }

    useEffect(() => {
        const funktio = () => {
            const api = server + "/api/laskut";

            fetch(api, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
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
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{ mt: 4 }}>
                Laskujen hallinta
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    {!muokkaus ? 
                    <>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                        Käsittelemättömät varaukset
                    </Typography>
                    <FormControl fullWidth onChange={(event)=>{setVarausId(event.target.value)}}>
                        <InputLabel id="varaukset">Varaukset</InputLabel>
                        <Select
                        labelId="varaukset"
                        id="varaukset"
                        value={varausId}
                        label="Varaukset"
                        onChange={(event) => setVarausId(event.target.value) }
                        >
                        {avoimetVaraukset.map((varaukset, index) => {
                            return (
                                <MenuItem key={index} value={varaukset.varaus_id}>
                                ID: {varaukset.varaus_id} | Ajankohta: {moment(varaukset.varattu_alkupvm).format("DD.MM.YYYY")} - {moment(varaukset.varattu_loppu_pvm).format("DD.MM.YYYY")} | Mökki: {varaukset.mokkinimi} | Sijainti: {varaukset.sijainti}
                                </MenuItem>
                            );
                            })}
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{mt:2}} onClick={()=>{lisaaClick(varausId)}}>Lisää lasku</Button>
                    </> :
                    <>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                        Muokkaa laskua
                    </Typography>
                    <LaskuForm muokataanko={muokkaus} setMuokataanko={setMuokkaus} muokattavaLasku={muokattavaLasku} tallennaClick={tallennaClick}/>
                    </>}

                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" align="left" color="red" paragraph sx={{ mt: 4 }}>
                        {virhe ? "Laskua ei voida poistaa, sitä ei ole maksettu" : ""}
                    </Typography>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                        Laskut
                    </Typography>
                    <LaskuTaulukko sarakkeet={sarakkeet} data={laskut} poista={poistaClick} muokkaa={muokkausClick} />
                </Grid>


            </Grid>
           
        </Container>
    )
}


export default LaskuHallinta