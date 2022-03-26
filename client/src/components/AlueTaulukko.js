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

export default function AlueTaulukko({sarakkeet, data}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
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
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.nimi}</TableCell>
              <TableCell align="center">
                  <IconButton onClick={()=>{console.log("Delete", row.id)}}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={()=>{console.log("Edit", row.id)}}>
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
