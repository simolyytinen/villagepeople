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

export default function AsiakasTaulukko({sarakkeet, data, poista, muokkaa}) {

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
              <TableCell align="center">{row.asiakas_id}</TableCell>
              <TableCell align="center">{row.etunimi}</TableCell>
              <TableCell align="center">{row.sukunimi}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.puhelinnro}</TableCell>
              <TableCell align="center">{row.lahiosoite}</TableCell>
              <TableCell align="center">{row.postinro}</TableCell>
              <TableCell align="center">{row.toimipaikka}</TableCell>
              <TableCell align="center">
                  <IconButton onClick={()=>{poista(row.asiakas_id)}}>
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
