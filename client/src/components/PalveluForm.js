import { Box, Button, TextField } from "@mui/material";

export default function PalveluForm({
  muokataanko,
  palveluid,
  sijainti,
  nimi,
  tyyppi,
  kuvaus,
  hinta,
  alv,
  setPalveluId,
  setNimi,
  setTyyppi,
  setSijainti,
  setKuvaus,
  setHinta,
  setAlv,
  tallennaClick,
  lisaaClick }) {


  const handleSubmit = (event) => {
    event.preventDefault();
    muokataanko ? tallennaClick({

    }) : lisaaClick();
  };

  return (
    <Box style={{ marginTop: 32 }} component="form" noValidate onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, /* mt: 1 */ }}>
      <div>
        <TextField
          margin="normal"
          required
          fullWidth
          name="sijainti"
          label="Sijainti"
          id="outlined"
          value={sijainti}
        onChange={(event)=>{setSijainti(event.target.value)}}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="nimi"
          label="Nimi"
          id="outlined"
          value={nimi}
        onChange={(event)=>{setNimi(event.target.value)}}
        />
      </div>
      <div>
        <TextField
          margin="normal"
          required
          fullWidth
          name="tyyppi"
          label="Tyyppi: 1=saatavilla, 0=ei saatavilla"
          id="outlined"
          value={tyyppi}
        onChange={(event)=>{setTyyppi(event.target.value)}}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="kuvaus"
          label="Kuvaus"
          id="outlined"
          value={kuvaus}
        onChange={(event)=>{setKuvaus(event.target.value)}}
        />
         </div>
         <div>
        <TextField
          margin="normal"
          required
          fullWidth
          name="hinta"
          label="Hinta (alv0)"
          id="outlined"
          value={hinta}
        onChange={(event)=>{setHinta(event.target.value)}}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="alv"
          label="Alv"
          id="outlined"
          value={alv}
        onChange={(event)=>{setAlv(event.target.value)}}
        />
      </div>
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        {muokataanko ? "Tallenna" : "Lisää"}
      </Button>
    </Box>
  );
}
