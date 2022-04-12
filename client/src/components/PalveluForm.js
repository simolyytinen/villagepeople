import { Box, Button, TextField, Grid } from "@mui/material";
import AlueDropBox from "./AlueDropBox";
import TyyppiDropBox from "./TyyppiDropBox";


export default function PalveluForm({
  alueet,
  muokataanko,
  palveluid,
  alueid,
  nimi,
  tyyppi,
  kuvaus,
  hinta,
  alv,
  setMuokataanko,
  setAlueId,
  setNimi,
  setTyyppi,
  setKuvaus,
  setHinta,
  setAlv,
  tallennaClick,
  lisaaClick }) {


  const handleSubmit = (event) => {
    event.preventDefault();
    muokataanko ? tallennaClick({
      palvelu_id : palveluid,
      nimi : nimi,
      alue_id : alueid,
      tyyppi : tyyppi,
      kuvaus : kuvaus,
      hinta : hinta,
      alv : alv
    }) : lisaaClick(nimi, alueid, tyyppi, kuvaus, hinta, alv);
  };

  const peruuta = () =>{
    setAlueId("");
    setNimi("");
    setTyyppi("");
    setKuvaus("");
    setHinta("");
    setAlv("");
    setMuokataanko(false);
  }
  

  return (
    <Box style={{ marginTop: 32 }} component="form" noValidate onSubmit={handleSubmit} sx={{ /* '& .MuiTextField-root': { m: 1, width: '42ch' }, */  mt: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>

          <AlueDropBox 
          alueid={alueid}
          setAlueId={setAlueId}
          data={alueet}
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

          <TyyppiDropBox tyyppi={tyyppi} setTyyppi={setTyyppi}/>
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
      <Button fullWidth onClick={()=>{peruuta()}} variant="outlined" sx={{ mb: 2 }}>
        {muokataanko ? "Peruuta" : "Tyhjennä"}
      </Button>
    </Box>
  );
}
