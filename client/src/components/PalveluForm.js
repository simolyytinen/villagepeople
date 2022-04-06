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
    console.log("nabulaa painettu")
    /* muokataanko ? tallennaClick({
        alue_id : alueId,
        nimi : nimi
    }) : lisaaClick(nimi); */
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        disabled
        fullWidth
        id="palveluid"
        label="ID"
        name="palveluid"
        value= "" /* {muokataanko ? alueId : ""} */
        // onChange={(event)=>{setAlueId(event.target.value)}}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="sijainti"
        label="Sijainti"
        id="outlined"
        value= "" /* {nimi} */
        // onChange={(event)=>{setNimi(event.target.value)}}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="nimi"
        label="Nimi"
        id="outlined"
        value= "" /* {nimi} */
        // onChange={(event)=>{setNimi(event.target.value)}}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="tyyppi"
        label="1 = saatavilla, 0 = ei saatavilla"
        id="outlined"
        value= "" /* {nimi} */
        // onChange={(event)=>{setNimi(event.target.value)}}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="kuvaus"
        label="Kuvaus"
        id="outlined"
        value= "" /* {nimi} */
        // onChange={(event)=>{setNimi(event.target.value)}}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="hinta"
        label="Hinta alv0"
        id="outlined"
        value= "" /* {nimi} */
        // onChange={(event)=>{setNimi(event.target.value)}}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="alv"
        label="Alv"
        id="outlined"
        value= "" /* {nimi} */
        // onChange={(event)=>{setNimi(event.target.value)}}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {/* {muokataanko ? "Tallenna" : "Lisää"} */}
        NAPPULA
      </Button>
    </Box>
  );
}
