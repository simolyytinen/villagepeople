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

    const [palvelut, setPalvelut] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);
    const [muokkausData, setMuokkausData] = useState("");

    // const [palveluId, setPalveluId] = useState("");
    const [nimi, setNimi] = useState("");
    const [tyyppi, setTyyppi] = useState("");
    const [sijainti, setSijainti] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [hinta, setHinta] = useState("");
    const [alv, setAlv] = useState("");

    const [lisaaNimi, setLisaaNimi] = useState("");
    const [lisaaTyyppi, setlisaaTyyppi] = useState("");
    const [lisaaSijainti, setlisaaSijainti] = useState("");
    const [lisaaKuvaus, setlisaaKuvaus] = useState("");
    const [lisaaHinta, setlisaaHinta] = useState("");
    const [lisaaAlv, setlisaaAlv] = useState("");

    const sarakkeet = [
        "Nimi", "Sijainti", "Tyyppi", "Kuvaus", "Hinta", "Alv", "Poista/Muokkaa"
    ];

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
            const api = server + "/api/palvelut/" + muokkausData.id;

            fetch(api, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        sijainti: muokkausData.sijainti,
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
                    setMuokkausData("");
                })
                .catch(err => console.log(err))
        }
        if (muokkausData !== "") funktio();
    }, [muokkausData, server])


    const tallennaClick = (data) => {
        console.log("Tallenna");
        setMuokkausData(data);
        setMuokkaus(false);
        setSijainti("");
        setNimi("");
        setTyyppi("");
        setKuvaus("");
        setHinta("");
        setAlv("");

    }

    const muokkaaPalvelu = (id, nimi, sijainti, tyyppi, kuvaus, hinta, alv) => {
        setMuokkaus(true);
        // setPalveluId(id);
        setSijainti(sijainti);
        setNimi(nimi);
        setTyyppi(tyyppi);
        setKuvaus(kuvaus);
        setHinta(hinta);
        setAlv(alv);
    }

    useEffect(() => {
        const funktio = () => {
            const api = server + "/api/palvelut/";

            fetch(api, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        nimi: lisaaNimi,
                        tyyppi: lisaaTyyppi,
                        sijainti: lisaaSijainti,
                        kuvaus: lisaaKuvaus,
                        hinta: lisaaHinta,
                        alv: lisaaAlv
                    })
            })
                .then((res) => {
                    setHae(hae => hae + 1)
                    setSijainti("");
                    setNimi("");
                    setTyyppi("");
                    setKuvaus("");
                    setHinta("");
                    setAlv("");
                })
                .catch(err => console.log(err))
        }

        if (lisaaNimi !== "" && lisaaTyyppi !== "" && lisaaSijainti !== "" && lisaaKuvaus !== "" && lisaaHinta !== "" && lisaaAlv !== "") funktio();
    }, [lisaaNimi, lisaaTyyppi, lisaaSijainti, lisaaKuvaus, lisaaHinta, lisaaAlv, server])

    const lisaaClick = () => {
        console.log("Lisää");
        setLisaaNimi(nimi);
        setlisaaTyyppi(tyyppi);
        setlisaaSijainti(sijainti);
        setlisaaKuvaus(kuvaus);
        setlisaaHinta(hinta);
        setlisaaAlv(alv);

        setSijainti("");
        setNimi("");
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
                    <PalveluForm muokataanko={muokkaus} nimi={nimi} sijainti={sijainti} tyyppi={tyyppi} kuvaus={kuvaus} hinta={hinta} alv={alv} setNimi={setNimi} setSijainti={setSijainti} setTyyppi={setTyyppi} setKuvaus={setKuvaus} setHinta={setHinta} setAlv={setAlv} tallennaClick={tallennaClick} lisaaClick={lisaaClick} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <PalveluTaulukko sarakkeet={sarakkeet} data={palvelut} poista={poistaPalvelu} muokkaa={muokkaaPalvelu} />
                </Grid>
            </Grid>

        </Container>
    )
}

export default PalveluHallinta;