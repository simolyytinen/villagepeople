import { useState, useContext, useEffect } from "react";
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

  const { login, setLogin, palvelut, setPalvelut, kayttaja, setkayttaja, server } = useContext(DataContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [varaus_id, setVaraus_id] = useState("");
  const [palvelu_id, setPalvelu_id] = useState("");
  const [lkm, setLkm] = useState("");
  const [varaukset, setVaraukset] = useState("");


  // ********** PALVELUVARAUKSEN VIEMINEN KANTAAN **********
  //VARAUS_ID tulee käyttäjän tekemästä mökkivarauksesta, tehdään haku kantaan käyttäjä ID:llä ja kohdennetaan palvelun varaus tietylle majoitusvaraukselle? Tähän droppivalikko, josta asiakas valitsee mille varaukselle haluaa palvelun lisätä? value={varaus_id}
  //PALVELU_ID tulee palvelukortin tiedoista
  //LKM, Tähän droppivalikko/valitsinrulla lukumäärästä. Jos sovitaan, että se tarkoittaa henkilöiden määrää ko. palvelulle? Hinta on sitten hinta*lkm
  

  // Käyttäjän varauksien haku kannasta
  useEffect(()=>{
    const funktio = () => {
        let api = server + "/api/varaukset/"+kayttaja;
        fetch(api)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setVaraukset(data)})
        .catch(err => console.log(err));
    }
    /* if (alueId !== "") */ funktio();
}, [server])


  //Varauksen lisääminen kantaan varauksen_palvelut tauluun
  useEffect(() => {
    const funktio = () => {
      console.log("useEffect palveluvaraus majoitusvaraukselle "/*  + varaus_id */)
      const api = server + "/api/varauksenPalvelut";

      fetch(api, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            varaus_id: 1/* varaus_id */,
            palvelu_id: palvelut.a.palvelu_id, 
            lkm : 1
           
          })
      })
        .then((res) => {
          // setHae(hae => hae + 1)
          console.log("");
          setPalvelut("");
          setVaraus_id("");
          setPalvelu_id("");
          setLkm("");
        })
        .catch(err => console.log(err))
    }

      if (varaus_id && palvelu_id && lkm)
     funktio();
  }, [palvelut, server])

  const varaa = (e) => {
    setPalvelut(e);
    console.log("id "+palvelut.a.palvelu_id + palvelut.a.nimi);
    // console.log(palvelut);
    setOpenDialog(() => true)
  }


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