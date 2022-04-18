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

const Asiakas = () => {
    const { server, kayttaja } = useContext(DataContext);
    const [hae, setHae] = useState("");
    const [varaukset, setVaraukset] = useState("");

    //Osa sarakkeista tyhjiä, koska SQL lause ei tuo ko tietoja. Täytyy muokata / tehdä uus lauseke tälle haulle. Kaikki sarakkeetkaan ei välttämättä tarpeellisia
    const sarakkeet = [
        "Varaus ID", "Asiakas", "Mökki ID", "Mökin nimi", "Sijainti", "Varattu", "Vahvistettu", "Varaus alkaa", "Varaus loppuu", "Poista/Muokkaa"
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
    }, [server])


    return (
        <Container maxWidth="lg">
            <TableContainer style={{ marginTop: 32 }} component={Paper}>

                {/* EHDOLLINEN RENDERÖINTI TAULUKOLLE, RIIPPUEN ONKO VARAUKSIA VAI EI */}

                {varaukset ?

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
                                    <TableCell align="center">{row.etunimi} {row.sukunimi}</TableCell>
                                    <TableCell align="center">{row.mokki_id}</TableCell>
                                    <TableCell align="center">{row.mokkinimi}</TableCell>
                                    <TableCell align="center">{row.sijainti}</TableCell>
                                    <TableCell align="center">{moment(row.varattu_pvm).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                                    <TableCell align="center">{moment(row.vahvistus_pvm).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                                    <TableCell align="center">{moment(row.varattu_alkupvm).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                                    <TableCell align="center">{moment(row.varattu_loppupvm).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                                    <TableCell align="center">
                                        <IconButton /* onClick={()=>{poista(row.varaus_id)}} */>
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

                    :
                    <Typography variant="h3" align="center" color="text.primary" paragraph sx={{ mt: 4 }}>
                        SINULLA EI OLE VARAUKSIA
                    </Typography>
                }

            </TableContainer>
        </Container>
    )
}

export default Asiakas;