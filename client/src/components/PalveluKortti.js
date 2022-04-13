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
          <Grid item key={a.palvelu_id} xs={12} sm={6} md={4}>
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
                  {a.nimi}
                </Typography>
                <Typography>
                  {a.kuvaus}<br/>
                  Sijainti: {a.sijainti}<br/>
                  Hinta: {a.hinta * ((a.alv/100)+1)} € {/* tämä täytyy tehdä jossain muualla? */}
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

export default PalveluKortti;