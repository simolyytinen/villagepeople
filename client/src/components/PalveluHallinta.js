import { useState } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import BasicTable from "./PalveluTaulukko";
import PalveluTaulukko from "./PalveluTaulukko";
import PalveluForm from "./PalveluForm";

const PalveluHallinta = () => {

    const [palvelut, setPalvelut] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);
    const [palveluId, setPalveluId] = useState("");
    const [nimi, setNimi] = useState("");
    const [tyyppi, setTyyppi] = useState("");
    const [sijainti, setSijainti] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [hinta, setHinta] = useState("");
    const [alv, setAlv] = useState("");
    const [muokkausData, setMuokkausData] = useState("");
    const [lisaaNimi, setLisaaNimi] = useState("");

    const sarakkeet = [
        "ID", "Sijainti", "Nimi", "Tyyppi", "Kuvaus", "Hinta", "Alv", "Muuta/Poista"
    ];

    //TÄHÄN KOODIT TIEDON HAULLE/PÄIVITYKSELLE/POISTOLLE

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center" color="text.primary" paragraph sx={{ mt: 4 }}>
                Palveluiden hallinta
            </Typography>
            {/* TÄTÄ VOIS KOITTAA LAITTAA VIEREKKÄIN TMS */}
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                        <PalveluForm />
                </Grid>
                <Grid item xs={12} md={12}>
                    <PalveluTaulukko />
                </Grid>
            </Grid>

        </Container>
    )
}

export default PalveluHallinta;