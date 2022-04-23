import { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import { DataContext } from "../App";
import AlueDropBox from "./AlueDropBox";
import { Button, TextField } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack } from "@mui/material";


const Raportointi = () => {
    // tuodaan contextista serverin osoite
    const { server, token } = useContext(DataContext);

    const [toimipaikat, setToimipaikat] = useState([]);
    const [alueId, setAlueId] = useState("");

    const [showMajoitus, setShowMajoitus] = useState(false);
    const [showPalvelu, setShowPalvelu] = useState(false);
    const [alkuPvm, setAlkuPvm] = useState(null)
    const [loppuPvm, setLoppuPvm] = useState(null);

    const [varaukset, setVaraukset] = useState([]);
    const [majoitusHaku, setMajoitusHaku] = useState("");

    const [palvelut, setPalvelut] = useState([]);
    const [palveluHaku, setPalveluHaku] = useState("");

    const [virhe, setVirhe] = useState("");
    const [naytaVirhe, setNaytaVirhe] = useState("");


    const sarakkeet = [
        "Varauksen tunnus", "Mökin nimi", "Varauksen alku", "Varauksen loppu", "Varaajan nimi"
    ];
    const palveluSarakkeet = ["Palvelun tunnus", "Palvelun nimi", "Varauksen alku", "Varauksen loppu", "Varaajan nimi"];

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

    const majoitusClick = () => {
        setShowMajoitus(true);
        setShowPalvelu(false);
    }
    const palveluClick = () => {
        setShowMajoitus(false);
        setShowPalvelu(true);
    }

    //Varauksien haku kannasta
    useEffect(() => {
        const funktio = () => {
            let api = server + "/api/varauksetEhdoilla";
            fetch(api, {
            method: "POST",
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(majoitusHaku)
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setVaraukset(data)
            })
            .catch(err => console.log(err));
        }
        if (majoitusHaku !== "") funktio();
    }, [ majoitusHaku, server])
    
    const haeVaraukset = () => {
        if (alueId === "") setVirhe("Valitse alue ensin");
        else if (alkuPvm === null || loppuPvm === null) setVirhe("Valitse päivämäärät");
        else {
            setMajoitusHaku({
                alue_id: alueId,
                alkuPvm: moment(alkuPvm).format("YYYY-MM-DD"),
                loppuPvm: moment(loppuPvm).format("YYYY-MM-DD")
            });
        }
    }

    //Varauksien palveluiden haku kannasta
    useEffect(() => {
        const funktio = () => {
            let api = server + "/api/varauksenPalvelutEhdoilla";
            fetch(api, {
            method: "POST",
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(palveluHaku)
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setPalvelut(data)
            })
            .catch(err => console.log(err));
        }
        if (palveluHaku !== "") funktio();
    }, [ palveluHaku, server])

    const haePalveluVaraukset = () => {
        if (alueId === "") setVirhe("Valitse alue ensin");
        else if (alkuPvm === null || loppuPvm === null) setVirhe("Valitse päivämäärät");
        else {
            setPalveluHaku({
                alue_id: alueId,
                alkuPvm: moment(alkuPvm).format("YYYY-MM-DD"),
                loppuPvm: moment(loppuPvm).format("YYYY-MM-DD")
            });
        }
    }

    // virheen näyttäminen
    useEffect(() => {
        setNaytaVirhe(true);
        setTimeout(()=>{
            setNaytaVirhe(false);
        }, 5000)
    }, [virhe])
     



    return (
        <Container maxWidth="xl" sx={{mb: 6}}>
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{mt: 4}}>
              Raportointi
            </Typography>
            
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" align="center" color="text.primary" paragraph sx={{mt: 4}}>
                    Valitse alue
                    </Typography>
                    <AlueDropBox alueid={alueId} setAlueId={setAlueId} data={toimipaikat}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" align="center" color="text.primary" paragraph sx={{mt: 4}}>
                    Valitse toiminto
                    </Typography>
                    <Button variant={showMajoitus ? "contained" : "outlined"} onClick={()=>majoitusClick()} sx={{ width: '45%', height: '56px', mb: 2 }}>Majoitusraportti</Button>
                    <Button variant={showPalvelu ? "contained" : "outlined"} onClick={()=>palveluClick()} sx={{ width: '45%', height: '56px', ml: 2, mb: 2 }}>Palveluraportti</Button>
                </Grid>
            </Grid>

            <Stack
              sx={{}}
              direction="row"
              spacing={2}
              justifyContent="left"
            >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                        label="Alkupäivämäärä"
                        value={alkuPvm}
                        onChange={(newValue) => {
                            setAlkuPvm(newValue);
                        }}
                        
                        renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                        label="Loppupäivämäärä"
                        value={loppuPvm}
                        onChange={(newValue) => {
                            setLoppuPvm(newValue);
                        }}
                        
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
            </Stack>
            {/* MAJOITUSRAPORTTI */}
            {showMajoitus ?
            <>
            <Button variant="contained" onClick={()=>haeVaraukset()} sx={{ mt: 2 }} >Hae majoitusvaraus-raportti</Button>
            <Typography variant="h5" align="left" color="red" paragraph sx={{mt: 4}}>
            {naytaVirhe ? virhe : ""}
            </Typography>
            
            {varaukset.length == 0 ? 
             <Typography variant="h5" align="left" color="text.primary" paragraph sx={{mt: 4}}>
             {majoitusHaku === "" ? "" : "Ei varauksia annetuilla hakuehdoilla."}
            </Typography> :
            <TableContainer style={{marginTop: 32}} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow key={0}>
                        {sarakkeet.map((sarake)=>(
                            <TableCell component="th" align="center">{sarake}</TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {varaukset.map((row) => (
                        <TableRow
                        key={row.varaus_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center">{row.varaus_id}</TableCell>
                        <TableCell align="center">{row.mokkinimi}</TableCell>
                        <TableCell align="center">{moment(row.varattu_alkupvm).format("DD.MM.YYYY")}</TableCell>
                        <TableCell align="center">{moment(row.varattu_loppupvm).format("DD.MM.YYYY")}</TableCell>
                        <TableCell align="center">{row.etunimi} {row.sukunimi}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            </> 
            : <></>}

            {/* MAJOITUSRAPORTTI */}
            {showPalvelu ? 
            <>
            <Button variant="contained" onClick={()=>haePalveluVaraukset()} sx={{ mt: 2 }} >Hae palveluvaraus-raportti</Button>
            <Typography variant="h5" align="left" color="red" paragraph sx={{mt: 4}}>
                    {naytaVirhe ? virhe : ""}
            </Typography>
            {palvelut.length == 0 ? 
            
            <Typography variant="h5" align="left" color="text.primary" paragraph sx={{mt: 4}}>
             {palveluHaku === "" ? "" : "Ei palvelu-varauksia annetuilla hakuehdoilla."}
            </Typography> :

            <TableContainer style={{marginTop: 32}} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow key={0}>
                        {palveluSarakkeet.map((sarake)=>(
                            <TableCell component="th" align="center">{sarake}</TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {palvelut.map((row) => (
                        <TableRow
                        key={row.palvelu_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center">{row.palvelu_id}</TableCell>
                        <TableCell align="center">{row.nimi}</TableCell>
                        <TableCell align="center">{moment(row.varattu_alkupvm).format("DD.MM.YYYY")}</TableCell>
                        <TableCell align="center">{moment(row.varattu_loppupvm).format("DD.MM.YYYY")}</TableCell>
                        <TableCell align="center">{row.etunimi} {row.sukunimi}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            </> 
            
            : <></>}
            
            
        </Container>
    )
}

export default Raportointi;