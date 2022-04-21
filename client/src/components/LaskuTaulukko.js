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

// EI TOIMI

export default function LaskuTaulukko({sarakkeet, data, poista, muokkaa}) {

  return (
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
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.lasku_id}</TableCell>
              <TableCell align="center">{row.varaus_id}</TableCell>
              <TableCell align="center">{row.summa}</TableCell>
              <TableCell align="center">{row.alv}</TableCell>
              <TableCell align="center">
                  <IconButton onClick={()=>{poista(row.lasku_id)}}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={()=>{muokkaa(row)}}>
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
