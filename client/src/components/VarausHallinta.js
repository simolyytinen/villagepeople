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


const VarausHallinta = () => {
    // tuodaan contextista serverin osoite
    const { server, token } = useContext(DataContext);

    const [varaukset, setVaraukset] = useState([]);
    const [toimipaikat, setToimipaikat] = useState([]);
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [muokkaus, setMuokkaus] = useState(false);

    const [muokkausData, setMuokkausData] = useState("");
    const [muokattavaVaraus, setMuokattavaVaraus] = useState("");
    const [lisaysData, setLisaysData] = useState("");

    const [asiakasId, setAsiakasId] = useState("");
    const [alueId, setAlueId] = useState("");
    const [virhe, setVirhe] = useState(false);


    const sarakkeet = [
        "Varaus ID", "Asiakas", "Mökki ID/Nimi", "Sijainti", "Varattu", "Vahvistettu", "Varaus alkaa", "Varaus loppuu", "Poista/Muokkaa"
    ];

    const auth = "Bearer " + token;

    // Toimipisteiden hakeminen tietokannasta droppivalikkoa varten
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
    useEffect(()=>{
        const funktio = () => {
            let api = server + "/api/varaukset/";
            fetch(api)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setVaraukset(data)})
            .catch(err => console.log(err));
        }
        /* if (alueId !== "") */ funktio();
    }, [hae, /* alueId, */ server])

    // Muokkaaminen
    const muokkausClick = (varaus) => {
        setMuokattavaVaraus(varaus)
        setMuokkaus(true);
    }

    const poistaClick = (id) => {

    }

    const tallennaClick = () => {

    }

    const lisaaClick = () => {

    }

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{ mt: 4 }}>
                Varausten hallinta
            </Typography>
            {/* <Typography variant="h4" align="left" color="text.primary" paragraph sx={{mt: 4}}>
                Valitse alue
            </Typography> */}
            {/* <AlueDropBox alueid={alueId} setAlueId={setAlueId} data={toimipaikat}/> */}
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                    </Typography>
                    <VarausForm muokataanko={muokkaus} setMuokataanko={setMuokkaus} muokattavaVaraus={muokattavaVaraus} tallennaClick={tallennaClick} lisaaClick={lisaaClick} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" align="left" color="red" paragraph sx={{ mt: 4 }}>
                        {/* {virhe ? "Mökkiä ei voida poistaa, siihen liittyy varauksia" : ""} */}
                    </Typography>
                    <VarausTaulukko sarakkeet={sarakkeet} data={varaukset} poista={poistaClick} muokkaa={muokkausClick} />
                </Grid>
            </Grid>

        </Container>
    )

}

export default VarausHallinta