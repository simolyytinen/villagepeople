import { Box, Button, TextField, Grid } from "@mui/material";
import { useState } from 'react';

export default function AlueForm({ muokataanko, tallennaClick, lisaaClick }) {

  const [mokkinimi, setMokkinimi] = useState("");
  const [katuosoite, setKatuosoite] = useState("");
  const [postinumero, setPostinumero] = useState("");
  const [hinta, setHinta] = useState("");
  const [kuvaus, setKuvaus] = useState("");
  const [henkilomaara, setHenkilomaara] = useState("");
  const [varustelu, setVarustelu] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    muokataanko ? tallennaClick({
      mokkinimi : mokkinimi,
      katuosoite : katuosoite,
      postinro : postinumero,
      hinta : hinta,
      henkilomaara : henkilomaara,
      varustelu : varustelu,
      kuvaus : kuvaus

    }) : lisaaClick({
      mokkinimi : mokkinimi,
      katuosoite : katuosoite,
      postinro : postinumero,
      hinta : hinta,
      henkilomaara : henkilomaara,
      varustelu : varustelu,
      kuvaus : kuvaus
    })
    setMokkinimi("");
    setKatuosoite("");
    setPostinumero("");
    setHinta("");
    setKuvaus("");
    setHenkilomaara("");
    setVarustelu("");
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="mokkinimi"
            label="Mökin nimi"
            name="mokkinimi"
            value={mokkinimi}
            onChange={(event)=>{setMokkinimi(event.target.value)}}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="katuosoite"
            label="Katuosoite"
            id="katuosoite"
            value={katuosoite}
            onChange={(event)=>{setKatuosoite(event.target.value)}}
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
            error={(hinta < 0) || (isNaN(hinta))}
            helperText={((hinta < 0) || (isNaN(hinta))) ? "Hinta ei keplaa" : ""}
            name="hinta"
            label="Hinta"
            id="hinta"
            value={hinta}
            onChange={(event)=>{setHinta(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              error={(henkilomaara < 0) || (isNaN(henkilomaara))}
              helperText={((henkilomaara < 0) || (isNaN(henkilomaara))) ? "Henkilömäärä ei keplaa" : ""}
              name="henkilomaara"
              label="Henkilömäärä"
              id="henkilomaara"
              value={henkilomaara}
              onChange={(event)=>{setHenkilomaara(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="varustelu"
              label="Varustelu"
              id="varustelu"
              value={varustelu}
              onChange={(event)=>{setVarustelu(event.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              multiline
              maxRows={4}
              name="kuvaus"
              label="Kuvaus"
              id="kuvaus"
              value={kuvaus}
              onChange={(event)=>{setKuvaus(event.target.value)}}
            />
        </Grid>
      </Grid>
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        {muokataanko ? "Tallenna" : "Lisää"}
      </Button>
    </Box>
  );
}
