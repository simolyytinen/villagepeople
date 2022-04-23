import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import generatePDF from './reportGenerator';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import moment from 'moment';



export default function LaskuTaulukko({sarakkeet, data, poista, muokkaa}) {
  

  return (
    <TableContainer style={{marginTop: 32}} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {sarakkeet.map((sarake, index)=>(
                <TableCell key={index} component="th" align="center">{sarake}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.lasku_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.lasku_id}</TableCell>
              <TableCell align="center">{row.varaus_id}</TableCell>
              <TableCell align="center">{row.summa}</TableCell>
              <TableCell align="center">{row.alv}</TableCell>
              <TableCell align="center">{moment(row.laskutus_pvm).format("DD.MM.YYYY")}</TableCell>
              <TableCell align="center">{moment(row.erapaiva).format("DD.MM.YYYY")}</TableCell>
              <TableCell align="center">
                  <IconButton onClick={()=>{poista(row.lasku_id)}}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={()=>{muokkaa(row)}}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={()=> {generatePDF(row)}}><PictureAsPdfIcon /></IconButton>
              </TableCell>
              <TableCell align="center"><Checkbox checked={row.maksettu} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
