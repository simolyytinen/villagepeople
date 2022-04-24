import { useState, useContext, useEffect } from "react";
import { DataContext } from "../App";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography, Container } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import moment from 'moment';
import Dialogi from "./Dialogi";

const Asiakas = () => {
    const { server, kayttaja } = useContext(DataContext);
    const [varaukset, setVaraukset] = useState("");
    const [hae, setHae] = useState(0);
    const [poistaId, setPoistaId] = useState(-1);
    const [poistaPalveluId, setPoistaPalveluId] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogPalvelu, setOpenDialogPalvelu] = useState(false);
    const [varauksenPalvelut, setVarauksenPalvelut] = useState("");
    const [varaus_id, setVaraus_id] = useState("");



    const sarakkeet = [
        "Varaus ID", "Mökki ID", "Mökin nimi", "Sijainti", "Varattu", "Vahvistettu", "Varaus alkaa", "Varaus loppuu", "Poista/Muokkaa"
    ];

    const palveluSarakkeet = [
        "Varaus ID", "Asiakas ID", "Palvelu ID", "Nimi", "Lkm", "Poista/Muokkaa"
    ];

    //Varauksien haku kannasta kirjautuneelle käyttäjälle
    useEffect(() => {
        console.log("fetch varaukset " + kayttaja)
        fetch(server + "/api/varaukset/" + kayttaja)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setVaraukset(data)
            })
            .catch(err => console.log(err));
    }, [hae, server])

    //Varaukseen liittyvien palveluiden haku kannasta
    useEffect(() => {
        console.log("fetch varauksen palvelut " + kayttaja)
        fetch(server + "/api/varauksenPalvelut/" + kayttaja)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setVarauksenPalvelut(data)
            })
            .catch(err => console.log(err));
    }, [hae, server])

    //Majoitusvarauksen poisto
    useEffect(() => {
        const funktio = () => {
            const api = server + "/api/varaukset/" + poistaId;
            console.log("majoitusvarauksen poisto " + poistaId);

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


    const poistaMajoitusVaraus = (id) => {
        setOpenDialog(() => true);
        setPoistaId(id);
    }

    //Palveluvarauksen poisto
    useEffect(() => {
        const funktio = () => {
            const api = server + "/api/varauksenPalvelut/" + varaus_id + "/" + poistaPalveluId;
            console.log("palveluvarauksen poisto useEffect...");

            fetch(api, {
                method: "DELETE",
            })
                .then((res) => {
                    setHae(hae => hae + 1);
                    setPoistaPalveluId("");
                })
                .catch(err => console.log(err))
        }
        if (varaus_id > 0 && poistaPalveluId > 0 && openDialog == false) funktio();

    }, [openDialog, server])

    const poistaPalveluVaraus = (varaus_id, palvelu_id) => {
        setVaraus_id(varaus_id);
        setPoistaPalveluId(palvelu_id);
        console.log("varausID: " + varaus_id + "palveluID: " + palvelu_id);
        setOpenDialog(() => true);
    }


    return (
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" color="text.primary" paragraph sx={{ mt: 4 }}>
                Tervetuloa majoitus- ja palveluvaraukset sivulle!
            </Typography>
            <Typography style={{ marginTop: 40 }} variant="h4" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                Majoitusvaraukset
            </Typography>
            {/* EHDOLLINEN RENDERÖINTI TAULUKOLLE, RIIPPUEN ONKO VARAUKSIA VAI EI */}
            {varaukset.length > 0 ?

                <TableContainer style={{ marginTop: 32 }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow key={0}>
                                {sarakkeet.map((sarake) => (
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
                                    {/* <TableCell align="center">{row.etunimi} {row.sukunimi}</TableCell> */}
                                    <TableCell align="center">{row.mokki_id}</TableCell>
                                    <TableCell align="center">{row.mokkinimi}</TableCell>
                                    <TableCell align="center">{row.sijainti}</TableCell>
                                    <TableCell align="center">{moment(row.varattu_pvm).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                                    <TableCell align="center">{moment(row.vahvistus_pvm).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                                    <TableCell align="center">{moment(row.varattu_alkupvm).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                                    <TableCell align="center">{moment(row.varattu_loppupvm).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => { poistaMajoitusVaraus(row.varaus_id) }} >
                                            <Delete />
                                        </IconButton>
                                        <IconButton /* onClick={()=>{muokkaa(row.varattu_alkupvm, row.varattu_loppupvm)}} */>
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                :

                <Typography style={{ marginTop: 40 }} variant="h6" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                    Ei aktiivisia majoitusvarauksia
                </Typography>
            }

            <Dialogi open={openDialog} setOpen={setOpenDialog} otsikko={"Varauksen poisto"} viesti={poistaPalveluId ? "Poistetaanko palveluvaraus" : "Poistetaanko majoitusvaraus? Myös kyseiseen varaukseen liittyvät palveluvaraukset poistetaan."} reitti={"/varaukset/asiakas"} />


            <Typography style={{ marginTop: 40 }} variant="h4" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                Palveluvaraukset
            </Typography>
            {/* **********Varattujen palveluiden taulukko********** */}
            {varauksenPalvelut.length > 0 ?
                <TableContainer style={{ marginTop: 32 }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow key={0}>
                                {palveluSarakkeet.map((palsarake) => (
                                    <TableCell component="th" align="center">{palsarake}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {varauksenPalvelut.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.varaus_id}</TableCell>
                                    <TableCell align="center">{row.asiakas_id}</TableCell>
                                    <TableCell align="center">{row.palvelu_id}</TableCell>
                                    <TableCell align="center">{row.nimi}</TableCell>
                                    <TableCell align="center">{row.lkm}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => { poistaPalveluVaraus(row.varaus_id, row.palvelu_id) }} >
                                            <Delete />
                                        </IconButton>
                                        <IconButton /* onClick={()=>{muokkaa(row.varattu_alkupvm, row.varattu_loppupvm)}} */>
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <Typography style={{ marginTop: 40 }} variant="h6" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
                    Ei aktiivisia palveluvarauksia
                </Typography>
            }
        </Container>
    )
}

export default Asiakas;