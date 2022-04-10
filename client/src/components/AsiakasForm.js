import { Box, Button, TextField, Grid } from "@mui/material";
import { useEffect, useState } from 'react';

export default function AsiakasForm({ muokataanko, setMuokataanko, muokattavaAsiakas, tallennaClick, lisaaClick }) {

  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");
  const [email, setEmail] = useState("");
  const [puhelinnro, setPuhelinnro] = useState("");
  const [lahiosoite, setLahiosoite] = useState("");
  const [postinumero, setPostinumero] = useState("");
  const [toimipaikka, setToimipaikka] = useState("");


  useEffect(()=>{
      const funktio = () => {
        setEtunimi(muokattavaAsiakas.etunimi);
        setSukunimi(muokattavaAsiakas.sukunimi);
        setEmail(muokattavaAsiakas.email);
        setPuhelinnro(muokattavaAsiakas.puhelinnro);
        setLahiosoite(muokattavaAsiakas.lahiosoite);
        setPostinumero(muokattavaAsiakas.postinro);
        setToimipaikka(muokattavaAsiakas.toimipaikka);
      }
      if (muokataanko) funktio();
  }, [muokataanko, muokattavaAsiakas])

  const handleSubmit = (event) => {
    event.preventDefault();
    muokataanko ? tallennaClick({
      etunimi : etunimi,
      sukunimi : sukunimi,
      email : email,
      puhelinnro : puhelinnro,
      lahiosoite : lahiosoite,
      postinro : postinumero,
      toimipaikka : toimipaikka
      

    }) : lisaaClick({
      etunimi : etunimi,
      sukunimi : sukunimi,
      email : email,
      puhelinnro : puhelinnro,
      lahiosoite : lahiosoite,
      postinro : postinumero,
      toimipaikka : toimipaikka
    })
    setEtunimi("");
    setSukunimi("");
    setEmail("");
    setPuhelinnro("");
    setLahiosoite("");
    setPostinumero("");
    setToimipaikka("");
  };

  const peruuta = () => {
    setEtunimi("");
    setSukunimi("");
    setEmail("");
    setPuhelinnro("");
    setLahiosoite("");
    setPostinumero("");
    setToimipaikka("");
    setMuokataanko(false);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="etunimi"
            label="Etunimi"
            name="etunimi"
            value={etunimi}
            onChange={(event)=>{setEtunimi(event.target.value)}}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="sukunimi"
            label="Sukunimi"
            id="sukunimi"
            value={sukunimi}
            onChange={(event)=>{setSukunimi(event.target.value)}}
          />
          <TextField
            margin="normal"
            fullWidth
            required
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
            required
            error={(puhelinnro.length > 10) || isNaN(puhelinnro)}
            helperText={((puhelinnro.length > 10) || isNaN(puhelinnro)) ? "Puhelinnumero ei keplaa" : ""}
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
              required
              name="lahiosoite"
              label="Lähiosoite"
              id="lahiosoite"
              value={lahiosoite}
              onChange={(event)=>{setLahiosoite(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              error={(postinumero.length > 5) || isNaN(postinumero)}
              helperText={((postinumero.length > 5) || isNaN(postinumero)) ? "Postinumero ei keplaa" : ""}
              name="postinumero"
              label="Postinumero"
              id="postinumero"
              value={postinumero}
              onChange={(event)=>{setPostinumero(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="toimipaikka"
              label="Kaupunki"
              id="toimipaikka"
              value={toimipaikka}
              onChange={(event)=>{setToimipaikka(event.target.value)}}
            />
        </Grid>
      </Grid>
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        {muokataanko ? "Tallenna" : "Lisää"}
      </Button>
      <Button fullWidth onClick={()=>{peruuta()}} variant="outlined" sx={{ mb: 2 }}>
        {muokataanko ? "Peruuta" : "Tyhjennä"}
      </Button>
    </Box>
  );
}
