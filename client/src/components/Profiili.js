import { Logout } from "@mui/icons-material";
import { Box, Button, TextField, Grid, Container, Typography } from "@mui/material";
import { useEffect, useState, useContext } from 'react';
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";

const Profiili = () => {
  let navigate = useNavigate();
  const { server, kayttaja, setKayttaja, setLogin, setAdmin, setToken } = useContext(DataContext);

  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");
  const [email, setEmail] = useState("");
  const [puhelinnro, setPuhelinnro] = useState("");
  const [lahiosoite, setLahiosoite] = useState("");
  const [postinumero, setPostinumero] = useState("");
  const [toimipaikka, setToimipaikka] = useState("");
  const [muokataanko, setMuokataanko] = useState(false);
  const [poistaId, setPoistaId] = useState(-1);
  const [virhe, setVirhe] = useState(false);
  const [muokkausData, setMuokkausData] = useState("");
  const [hae, setHae] = useState(0);

  
  useEffect(()=>{
  
    const funktio = () => {
      console.log("fetch", kayttaja);
      let api = server + "/api/asiakas/" + kayttaja;
      fetch(api)
      .then(response => response.json())
      .then(data=>{
        console.log(data);
        taytaAsiakas(data[0]);
      })
      .catch(err => console.log(err))
    }
    if (kayttaja != "") funktio();

  }, [hae, kayttaja, server])

  const taytaAsiakas = (kayttaja) => {
    setEtunimi(kayttaja.etunimi);
    setSukunimi(kayttaja.sukunimi);
    setEmail(kayttaja.email);
    setPuhelinnro(kayttaja.puhelinnro);
    setLahiosoite(kayttaja.lahiosoite);
    setPostinumero(kayttaja.postinro);
    setToimipaikka(kayttaja.toimipaikka);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (muokataanko) {
      setMuokkausData({
        asiakas_id: kayttaja,
        etunimi : etunimi,
        sukunimi : sukunimi,
        email : email,
        puhelinnro : puhelinnro,
        lahiosoite : lahiosoite,
        postinro : postinumero,
        toimipaikka : toimipaikka
      })
      setMuokataanko(false);
    }
    else {
      setMuokataanko(true);
    }
  };

  const peruuta = () => {
    setMuokataanko(false);
    setHae(hae => hae + 1);
  }

  // asiakkaan poistaminen
  const poista = () => {
    setPoistaId(kayttaja);
}
const logout = () => {
  setLogin(false);
  setAdmin(false);
  setToken("");
  setKayttaja("");
  navigate("/majoitus")
}

useEffect(()=>{
    const funktio = () => {
        const api = server + "/api/asiakas/" + poistaId;
        fetch(api, {
            method: "DELETE"
        })
        .then((res) => {
            if (res.status === 600) {
                setVirhe(true);
                console.log("Ei voida poistaa, asiakkaaseen liittyy varauksia.") 
                setTimeout(()=>{
                    setVirhe(false);
                }, 5000) 
            }
            else {
                console.log(res)
                logout();
            }
        })
        .catch(err => console.log(err))
    }
    if (poistaId > 0) funktio();

}, [poistaId, server])

// asiakkaan muokkaaminen

useEffect(()=>{
  const funktio = () => {
      const api = server + "/api/asiakas";
      console.log("Muokataan", muokkausData);
      fetch(api, {
          method: "PUT",
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify(muokkausData)
      })
      .then((res) => {
        console.log(res);
          setMuokkausData("");
          setHae(hae => hae + 1);
      })
      .catch(err => console.log(err))
  }
  if (muokkausData !== "") funktio()
}, [muokkausData, server])

  return (
    <Container>
      <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {"Moi " + etunimi + "!"}
            </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              required={muokataanko ? true : false}
              disabled={muokataanko ? false : true}
              id="etunimi"
              label="Etunimi"
              name="etunimi"
              value={etunimi}
              onChange={(event)=>{setEtunimi(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              required={muokataanko ? true : false}
              disabled={muokataanko ? false : true}
              name="sukunimi"
              label="Sukunimi"
              id="sukunimi"
              value={sukunimi}
              onChange={(event)=>{setSukunimi(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              required={muokataanko ? true : false}
              disabled={muokataanko ? false : true}
              type="email"
              name="email"
              label="Sähköposti"
              id="email"
              value={email}
              onChange={(event)=>{setEmail(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              required={muokataanko ? true : false}
              disabled={muokataanko ? false : true}
              name="puhelinnro"
              label="Puhelinnumero"
              id="puhelinnro"
              value={puhelinnro}
              onChange={(event)=>{setPuhelinnro(event.target.value)}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                fullWidth
                required={muokataanko ? true : false}
                disabled={muokataanko ? false : true}
                name="lahiosoite"
                label="Lähiosoite"
                id="lahiosoite"
                value={lahiosoite}
                onChange={(event)=>{setLahiosoite(event.target.value)}}
              />
              <TextField
                margin="normal"
                fullWidth
                required={muokataanko ? true : false}
                disabled={muokataanko ? false : true}
                name="postinumero"
                label="Postinumero"
                id="postinumero"
                value={postinumero}
                onChange={(event)=>{setPostinumero(event.target.value)}}
              />
              <TextField
                margin="normal"
                fullWidth
                required={muokataanko ? true : false}
                disabled={muokataanko ? false : true}
                name="toimipaikka"
                label="Kaupunki"
                id="toimipaikka"
                value={toimipaikka}
                onChange={(event)=>{setToimipaikka(event.target.value)}}
              />
          </Grid>
        </Grid>
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          {muokataanko ? "Tallenna" : "Muokkaa"}
        </Button>
        {muokataanko ? <Button fullWidth onClick={()=>{peruuta()}} variant="outlined" sx={{ mb: 2 }}>
          Peruuta
        </Button> : <></>}
        <Button fullWidth onClick={()=>{poista()}} variant="text" sx={{ mb: 2 }}>
          Poista käyttäjä
        </Button>
        <Typography variant="h6" align="left" color="red" paragraph sx={{mt: 4}}>
            {virhe ? "Käyttäjätunnusta ei voida poistaa, sinulla on varauksia!" : ""}
        </Typography>
      </Box>
    </Container>
    
  );
}

export default Profiili;
