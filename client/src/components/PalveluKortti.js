import { useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



const PalveluKortti = ({ data }) => {

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {data.map((a, index) => (
          <Grid item key={a.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  pt: '56.25%',
                }}
                image="https://source.unsplash.com/random/?hiking"
                alt="palvelu"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {a.id}
                  </Typography>
                  <Typography>
                  {a.data}
                  </Typography>

              </CardContent>
              <CardActions>
                <Button size="small">Varaa</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

{/* <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.alue_id}</TableCell>
              <TableCell align="center">{row.nimi}</TableCell>
              <TableCell align="center">
                  <IconButton onClick={()=>{poista(row.alue_id)}}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={()=>{muokkaa(row.alue_id, row.nimi)}}>
                    <Edit />
                  </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}


        //return tallessa:
        // return (
        //   <Container sx={{ py: 8 }} maxWidth="md">
        //     {/* End hero unit */}
        //     <Grid container spacing={4}>
        //       {data.map((card) => (
        //         <Grid item key={card} xs={12} sm={6} md={4}>
        //           <Card
        //             sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        //           >
        //             <CardMedia
        //               component="img"
        //               sx={{
        //                 // 16:9
        //                 pt: '56.25%',
        //               }}
        //               image="https://source.unsplash.com/random/?hiking"
        //               alt="palvelu"
        //             />
        //             <CardContent sx={{ flexGrow: 1 }}>
      
        //               {data.map((tiedot) => (
        //                 <Typography key={tiedot.id} gutterBottom variant="h5" component="h2">
        //                   {tiedot.id}
        //                 </Typography>
        //               ))}
      
        //               {data.map((tiedot) => (
        //                 <Typography key={tiedot.id} >
        //                   {tiedot.data}
        //                 </Typography>
        //               ))}
      
        //             </CardContent>
        //             <CardActions>
        //               <Button size="small">Varaa</Button>
        //             </CardActions>
        //           </Card>
        //         </Grid>
        //       ))}
        //     </Grid>
        //   </Container>
        // )

export default PalveluKortti;