import { useState, useContext } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DataContext } from "../App";
import Dialogi from "./Dialogi";

const PalveluKortti = ({ data }) => {

  const { login, setLogin } = useContext(DataContext);
  const { palvelut, setPalvelut } = useContext(DataContext);
  const { kayttaja, setkayttaja } = useContext(DataContext);
  const [openDialog, setOpenDialog] = useState(false);



  // ********** PALVELUVARAUKSEN VIEMINEN KANTAAN **********
  //VARAUS_ID tulee käyttäjän tekemästä mökkivarauksesta, tehdään haku kantaan käyttäjä ID:llä ja kohdennetaan palvelun varaus tietylle majoitusvaraukselle?
  //PALVELU_ID tulee palvelukortin tiedoista
  //LKM, Tähän droppivalikko lukumäärästä. Jos sovitaan, että se tarkoittaa henkilöiden määrää ko. palvelulle? Hinta on sitten hinta*lkm


  //Varauksen lisääminen kantaan varauksen_palvelut tauluun
  // useEffect(() => {
  //   const funktio = () => {
  //     const api = server + "/api/XXXXXXXXXXXXXXX";

  //     fetch(api, {
  //       method: "POST",
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(
  //         {
  //           varaus_id: varaus_id, //tää tulee mökkivarauksesta
  //           palvelu_id: palvelut.a.palvelu_id,
  //           lkm : lkm, // 
  //         })
  //     })
  //       .then((res) => {
  //         // setHae(hae => hae + 1)
  //         // setNimi("");
  //         // setAlueId("");
          
  //       })
  //       .catch(err => console.log(err))
  //   }

  //   if () funktio();
  // }, [server])

  const varaa = (e) => {
    //tallennus kantaan ko. asiakkaan ID:llä
    setPalvelut(e);
    // console.log(palvelut.a.nimi);
    // console.log(palvelut);
    setOpenDialog(() => true)
  }


  //Jostain syystä ensimmäinen varaus ei toimi, kun sivulle tullaan
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
                  {a.nimi} - {a.sijainti}
                </Typography>
                <Typography>
                  {a.kuvaus}<br/>
                  Hinta: {a.hintayhteensa} €
                </Typography>
              </CardContent>
              <CardActions>
                {login ?
                  <Button size="small" onClick={(e) => { varaa({ a }) }}>Varaa</Button>
                  : null}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialogi open={openDialog} setOpen={setOpenDialog} otsikko={"Varaus onnistui!"} viesti={"Kiitos varauksesta!"} reitti={"/palvelut"} />
    </Container>

  )
}

export default PalveluKortti;