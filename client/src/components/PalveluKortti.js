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
import KayttajanVarauksetDropBox from "./KayttajanVarauksetDropBox.js";
import { style } from "@mui/system";

const PalveluKortti = ({ data }) => {

  const { login, setLogin, palvelut, setPalvelut, kayttaja, setkayttaja, server } = useContext(DataContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [varaus_id, setVaraus_id] = useState("");
  const [palvelu_id, setPalvelu_id] = useState("");
  const [varaukset, setVaraukset] = useState("");
  const [virhe, setVirhe] = useState(false);
  // const [varauksenPalvelut, setVarauksenPalvelut] = useState("");


  // ********** PALVELUVARAUKSEN VIEMINEN KANTAAN **********
  //VARAUS_ID tulee käyttäjän tekemästä mökkivarauksesta, tehdään haku kantaan käyttäjä ID:llä ja kohdennetaan palvelun varaus tietylle majoitusvaraukselle? Tähän droppivalikko, josta asiakas valitsee mille varaukselle haluaa palvelun lisätä? value={varaus_id}
  //PALVELU_ID tulee palvelukortin tiedoista
  //Lkm on aina 1, määritetty suoraan SQL lauseessa


  // Käyttäjän majoitusvarauksien haku kannasta
  useEffect(() => {
    let api = server + "/api/varaukset/" + kayttaja;
    fetch(api)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setVaraukset(data)
      })
      .catch(err => console.log(err));
  }, [server])


  //Palveluvarauksen lisääminen kantaan varauksen_palvelut tauluun
  useEffect(() => {
    const funktio = () => {
      console.log("useEffect palveluvaraus majoitusID " + varaus_id)
      const api = server + "/api/varauksenPalvelut";

      fetch(api, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            varaus_id: varaus_id,
            palvelu_id: palvelu_id,
          })
      })
        .then((res) => {
          if (res.status === 600) {
            setVirhe(true);
            console.log("Duplikaatti palveluvaraus")
            setTimeout(() => {
              setVirhe(false);
              setVaraus_id("");
              setPalvelu_id("");
            }, 5000)
          }
          else {
            console.log(varaus_id, palvelu_id);
            setOpenDialog(() => true)
            // setPalvelut("");
            setVaraus_id("");
            setPalvelu_id("");
          }

        })
        .catch(err => console.log(err))
    }

    if (varaus_id > 0 && palvelu_id > 0 /* && openDialog == false */)
      funktio();
  }, [/* openDialog, */varaus_id, palvelu_id/* , server */])

  const varaa = (e) => {
    setPalvelu_id(e);
    // setVaraus_id(varaus_id);
    console.log("varaus_id " + varaus_id + " palveluid " + palvelu_id)

    // console.log("id "+palvelut.a.palvelu_id + palvelut.a.nimi);
    // console.log("palvelut",palvelut);

  }


  return (
    <Container sx={{ py: 1 }} maxWidth="md">

      {varaukset.length > 0 && kayttaja ?
        <div>
          <Typography variant="h5" align="left" color="text.primary" paragraph sx={{ mt: 4 }}>
            Majoitusvarauksesi
          </Typography>
          <KayttajanVarauksetDropBox data={varaukset} varaus_id={varaus_id} setVaraus_id={setVaraus_id} />
        </div>
        : null}

      {virhe ?
        <Typography variant="h4" align="center" color="red" paragraph sx={{ mt: 4 }}>
          Olet jo tehnyt kyseisen palveluvarauksen, tarkista valinnat!
        </Typography>
        : null}

      {/* End hero unit */}
      <Grid container spacing={4} style={{ marginTop: 20 }}>
        {data.map((a, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  pt: '56.25%',
                }}
                image="https://source.unsplash.com/random/?outdoor"
                alt="palvelu"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {a.nimi} - {a.sijainti}
                </Typography>
                <Typography>
                  {a.kuvaus}<br />
                  Hinta: {a.hintayhteensa} €
                </Typography>
              </CardContent>
              <CardActions>
                {varaukset.length > 0 && kayttaja && varaus_id ?
                  <Button size="small" onClick={(e) => { varaa(a.palvelu_id) }}>Varaa</Button>
                  : null}
                  {!varaus_id && kayttaja ?
                  <Typography variant="h8" color="red">Majoitusvaraus puuttuu</Typography>
                : null  
                }
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