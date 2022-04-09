import { Box, Button, TextField, Grid } from "@mui/material";
import AlueDropBox from "./AlueDropBox";
import MenuItem from '@mui/material/MenuItem';


export default function PalveluForm({
  alueet,
  muokataanko,
  palveluid,
  alueid,
  sijainti,
  nimi,
  tyyppi,
  kuvaus,
  hinta,
  alv,
  // setPalveluId,
  setAlueId,
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
    <Box style={{ marginTop: 32 }} component="form" noValidate onSubmit={handleSubmit} sx={{ /* '& .MuiTextField-root': { m: 1, width: '42ch' }, */  mt: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>

          {/* valikko ei vielä toimi */}
          <AlueDropBox 
          sijainti={sijainti} 
          setSijainti={setSijainti} 
          data =
            {alueet?.map(alueet => {
              return (
                <MenuItem key={alueet.value} value={alueet.alue_id}>
                  {/* {alueet.alue_id} -  */}{alueet.nimi}
                </MenuItem>
              );
            })}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="nimi"
            label="Nimi"
            id="outlined"
            value={nimi}
            onChange={(event) => { setNimi(event.target.value) }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="alueid"
            label="AlueID"
            id="outlined"
            value={alueid}
            onChange={(event) => { setAlueId(event.target.value) }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="sijainti"
            label="Sijainti"
            id="outlined"
            value={sijainti}
            onChange={(event) => { setSijainti(event.target.value) }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="tyyppi"
            label="Tyyppi: 1=saatavilla, 0=ei saatavilla"
            id="outlined"
            value={tyyppi}
            onChange={(event) => { setTyyppi(event.target.value) }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="kuvaus"
            label="Kuvaus"
            id="outlined"
            value={kuvaus}
            onChange={(event) => { setKuvaus(event.target.value) }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="hinta"
            label="Hinta (alv0)"
            id="outlined"
            value={hinta}
            onChange={(event) => { setHinta(event.target.value) }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="alv"
            label="Alv"
            id="outlined"
            value={alv}
            onChange={(event) => { setAlv(event.target.value) }}
          />
        </Grid>
      </Grid>
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        {muokataanko ? "Tallenna" : "Lisää"}
      </Button>
    </Box>
  );
}
