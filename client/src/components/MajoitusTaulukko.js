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

export default function MajoitusTaulukko({sarakkeet, data, poista, muokkaa}) {

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
              <TableCell align="center">{row.mokkinimi}</TableCell>
              <TableCell align="center">{row.katuosoite}</TableCell>
              <TableCell align="center">{row.postinro}</TableCell>
              <TableCell align="center">{row.kuvaus}</TableCell>
              <TableCell align="center">{row.varustelu}</TableCell>
              <TableCell align="center">{row.henkilomaara}</TableCell>
              <TableCell align="center">{row.hinta}</TableCell>
              <TableCell align="center">
                  <IconButton onClick={()=>{poista(row.alue_id)}}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={()=>{muokkaa(row.alue_id)}}>
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
