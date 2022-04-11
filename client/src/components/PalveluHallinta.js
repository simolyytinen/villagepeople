import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import BasicTable from "./PalveluTaulukko";
import PalveluTaulukko from "./PalveluTaulukko";
import PalveluForm from "./PalveluForm";
import { DataContext } from "../App";

const PalveluHallinta = () => {

    const { server } = useContext(DataContext);
    const [toimipaikat, setToimipaikat] = useState([]);
    const [palvelut, setPalvelut] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);
    const [muokkausData, setMuokkausData] = useState("");

    const [palveluId, setPalveluId] = useState("");
    const [alueId, setAlueId] = useState("");
    const [nimi, setNimi] = useState("");
    const [tyyppi, setTyyppi] = useState("");
    // const [sijainti, setSijainti] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [hinta, setHinta] = useState("");
    const [alv, setAlv] = useState("");

    const [lisaaAlueId, setLisaaAlueId] = useState("");
    const [lisaaNimi, setLisaaNimi] = useState("");
    const [lisaaTyyppi, setlisaaTyyppi] = useState("");
    // const [lisaaSijainti, setlisaaSijainti] = useState("");
    const [lisaaKuvaus, setlisaaKuvaus] = useState("");
    const [lisaaHinta, setlisaaHinta] = useState("");
    const [lisaaAlv, setlisaaAlv] = useState("");

    const sarakkeet = [
        "Nimi", "Sijainti", "Tyyppi", "Kuvaus", "Hinta", "Alv", "Poista/Muokkaa"
    ];

     // Toimipisteiden hakeminen tietokannasta droppivalikkoa varten
     useEffect(()=>{
        fetch(server + "/api/toimipisteet")
        .then(response => response.json())
        .then((toimipaikat) => {
            console.log(toimipaikat);
            setToimipaikat(toimipaikat)})
        .catch(err => console.log(err));
    }, [server])


    // Palvelut tietokannasta
    useEffect(() => {
        fetch(server + "/api/palvelut")
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setPalvelut(data)
            })
            .catch(err => console.log(err));
    }, [hae, server])

    // Palvelun muokkaus
    useEffect(() => {
        const funktio = () => {
            const api = server + "/api/palvelut/" + muokkausData.palvelu_id;

            fetch(api, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        alue_id: muokkausData.alue_id,
                        nimi: muokkausData.nimi,
                        tyyppi: muokkausData.tyyppi,
                        kuvaus: muokkausData.kuvaus,
                        hinta: muokkausData.hinta,
                        alv: muokkausData.alv
                    }
                )
            })
                .then((res) => {
                    setHae(hae => hae + 1)
                    console.log(
                        "palveluid: " + muokkausData.palvelu_id +
                        " alueid: " +muokkausData.alue_id +
                        " nimi: "+muokkausData.nimi +
                        " tyyppi: "+muokkausData.tyyppi +
                        " kuvaus: "+muokkausData.kuvaus +
                        " hinta: "+muokkausData.hinta +
                        " alv: "+muokkausData.alv);
                    setMuokkausData("");
                })
                .catch(err => console.log(err))
        }
        if (muokkausData !== "") funktio();
    }, [muokkausData, server])

    const muokkaaPalvelu = (id, nimi, alueid, tyyppi, kuvaus, hinta, alv) => {
        setMuokkaus(true);
        setPalveluId(id);
        setNimi(nimi);
        setAlueId(alueid);
        setTyyppi(tyyppi);
        setKuvaus(kuvaus);
        setHinta(hinta);
        setAlv(alv);
    }

    const tallennaClick = (data) => {
        console.log("Tallenna");
        setMuokkausData(data);
        setMuokkaus(false);
        setPalveluId("");
        setNimi("");
        setAlueId("");
        setTyyppi("");
        setKuvaus("");
        setHinta("");
        setAlv("");
    }
    
    //Palvelun lisäys
    useEffect(() => {
        const funktio = () => {
            const api = server + "/api/palvelut/";

            fetch(api, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        nimi: lisaaNimi,
                        alue_id: lisaaAlueId,
                        tyyppi: lisaaTyyppi,
                        kuvaus: lisaaKuvaus,
                        hinta: lisaaHinta,
                        alv: lisaaAlv
                    })
            })
                .then((res) => {
                    setHae(hae => hae + 1)
                    setNimi("");
                    setAlueId("");
                    setTyyppi("");
                    setKuvaus("");
                    setHinta("");
                    setAlv("");
                })
                .catch(err => console.log(err))
        }

        if (lisaaNimi !== "" && lisaaAlueId !== "" && lisaaTyyppi !== "" && lisaaKuvaus !== "" && lisaaHinta !== "" && lisaaAlv !== "") funktio();
    }, [lisaaAlueId, lisaaNimi, lisaaTyyppi, lisaaKuvaus, lisaaHinta, lisaaAlv, server])

    const lisaaClick = () => {
        console.log("Lisää");
        setLisaaNimi(nimi);
        setLisaaAlueId(alueId);
        setlisaaTyyppi(tyyppi);
        setlisaaKuvaus(kuvaus);
        setlisaaHinta(hinta);
        setlisaaAlv(alv);

        setNimi("");
        setAlueId("");
        setTyyppi("");
        setKuvaus("");
        setHinta("");
        setAlv("");
    }


    //Palvelun poisto
    useEffect(() => {
        const funktio = () => {
            const api = server + "/api/palvelut/" + poistaId;
            fetch(api, {
                method: "DELETE"
            })
                .then((res) => {
                    console.log(res)
                    setHae(hae => hae + 1);
                })
                .catch(err => console.log(err))
        }
        if (poistaId > 0) funktio();
    }, [poistaId, server])

    const poistaPalvelu = (id) => {
        setPoistaId(id);
    }

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center" color="text.primary" paragraph sx={{ mt: 4 }}>
                Palveluiden hallinta
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <PalveluForm alueet={toimipaikat} muokataanko={muokkaus} palveluid={palveluId} alueid={alueId} nimi={nimi}  tyyppi={tyyppi} kuvaus={kuvaus} hinta={hinta} alv={alv} setPalveluId={setPalveluId} setAlueId={setAlueId} setNimi={setNimi} setTyyppi={setTyyppi} setKuvaus={setKuvaus} setHinta={setHinta} setAlv={setAlv} tallennaClick={tallennaClick} lisaaClick={lisaaClick} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <PalveluTaulukko sarakkeet={sarakkeet} data={palvelut} poista={poistaPalvelu} muokkaa={muokkaaPalvelu} />
                </Grid>
            </Grid>

        </Container>
    )
}

export default PalveluHallinta;