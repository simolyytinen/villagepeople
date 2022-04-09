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

export default function PalveluTaulukko({ sarakkeet, data, poista, muokkaa }) {

    return (
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
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell align="center">{row.id}</TableCell> */}
                <TableCell align="center">{row.nimi}</TableCell>
                <TableCell align="center">{row.alue_id}</TableCell>
                <TableCell align="center">{row.sijainti}</TableCell>
                <TableCell align="center">{row.tyyppi}</TableCell>
                <TableCell align="center">{row.kuvaus}</TableCell>
                <TableCell align="center">{row.hinta}</TableCell>
                <TableCell align="center">{row.alv}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => { poista(row.id) }}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => { muokkaa(/* row.id, */ row.nimi, row.alue_id, row.sijainti, row.tyyppi, row.kuvaus, row.hinta, row.alv) }}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }