import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, sijainti, nimi, tyyppi, kuvaus, hinta, alv) {
  return { id, sijainti, nimi, tyyppi, kuvaus, hinta, alv };
}

const rows = [
  createData(1, "Himos", "Palju", 1, "Kuuma kylpy", 300, 24),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Sijainti</TableCell>
            <TableCell align="right">Nimi</TableCell>
            <TableCell align="right">Tyyppi</TableCell>
            <TableCell align="right">Kuvaus</TableCell>
            <TableCell align="right">Hinta</TableCell>
            <TableCell align="right">Alv</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.sijainti}</TableCell>
              <TableCell align="right">{row.nimi}</TableCell>
              <TableCell align="right">{row.tyyppi}</TableCell>
              <TableCell align="right">{row.kuvaus}</TableCell>
              <TableCell align="right">{row.hinta}</TableCell>
              <TableCell align="right">{row.alv}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
