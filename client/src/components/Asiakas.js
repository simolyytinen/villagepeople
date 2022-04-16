import { useState, useContext } from "react";
import { DataContext } from "../App";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import moment from 'moment';

const Asiakas = () => {
    const { palvelut, setPalvelut } = useContext(DataContext);

    const sarakkeet = [
        "Varaus ID", "Asiakas", "Mökki ID/Nimi", "Sijainti", "Varattu", "Vahvistettu", "Varaus alkaa", "Varaus loppuu", "Poista/Muokkaa"
    ];

    return (
        <TableContainer style={{ marginTop: 32 }} component={Paper}>
            {/* ehdollinen renderöinti taulukolle, jos palvelut sisältää jotain*/}
            {palvelut ?
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow key={0}>
                            {sarakkeet.map((sarake) => (
                                <TableCell component="th" align="center">{sarake}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {<TableBody>
                        {/* ********EI TOIMI******** */}
                        {palvelut.map((row) => (
                            <TableRow
                                key={row.varaus_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.varaus_id}</TableCell>
                                <TableCell align="center">{row.etunimi} {row.sukunimi}</TableCell>
                                <TableCell align="center">{row.mokki_id} / {row.mokkinimi}</TableCell>
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

                    </TableBody>}

                </Table>
                :
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Ei olemassa olevia varauksia
                </Typography> }
        </TableContainer>
    )
}

export default Asiakas;