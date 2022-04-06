import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function createData(id, sijainti, nimi, tyyppi, kuvaus, hinta, alv) {
    return { id, sijainti, nimi, tyyppi, kuvaus, hinta, alv };
}

const rows = [
    createData(1, "Himos", "Palju", 1, "Kuuma kylpy", 300, 24),
    createData(2, "Ylläs", "Rekiajelu", 1, "Kylmä tulee", 200, 24),
    createData(3, "Levi", "Moottorikelkka", 1, "Varo puita", 500, 24),
];

export default function PalveluTaulukko() {
    return (
        <TableContainer style={{ marginTop: 32 }} component={Paper}>
            <Table md={{ minWidth: 800 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Sijainti</TableCell>
                        <TableCell align="center">Nimi</TableCell>
                        <TableCell align="center">Tyyppi</TableCell>
                        <TableCell align="center">Kuvaus</TableCell>
                        <TableCell align="center">Hinta</TableCell>
                        <TableCell align="center">Alv</TableCell>
                        <TableCell align="center">Muokkaa/Poista</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">{row.sijainti}</TableCell>
                            <TableCell align="center">{row.nimi}</TableCell>
                            <TableCell align="center">{row.tyyppi}</TableCell>
                            <TableCell align="center">{row.kuvaus}</TableCell>
                            <TableCell align="center">{row.hinta}</TableCell>
                            <TableCell align="center">{row.alv}</TableCell>
                            <TableCell align="center">
                                <IconButton /* onClick={()=>{poista(row.palvelu_id)}} */>
                                    <Delete />
                                </IconButton>
                                <IconButton /* onClick={()=>{muokkaa(
                                                                    row.palvelu_id,
                                                                    row.sijainti,
                                                                    row.nimi,
                                                                    row.tyyppi,
                                                                    row.kuvaus,
                                                                    row.hinta,
                                                                    row.alv
                      )}} */>
                                    <Edit />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
