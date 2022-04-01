import { Box, Button, TextField } from "@mui/material";

export default function AlueForm({ muokataanko, alueId, nimi, setAlueId, setNimi, tallennaClick, lisaaClick }) {


  const handleSubmit = (event) => {
    event.preventDefault();
    muokataanko ? tallennaClick({
        alue_id : alueId,
        nimi : nimi
    }) : lisaaClick(nimi);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        disabled
        fullWidth
        id="alueid"
        label="Alueen id"
        name="alueid"
        value={muokataanko ? alueId : ""}
        onChange={(event)=>{setAlueId(event.target.value)}}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="nimi"
        label="Alueen nimi"
        id="outlined"
        value={nimi}
        onChange={(event)=>{setNimi(event.target.value)}}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {muokataanko ? "Tallenna" : "Lisää"}
      </Button>
    </Box>
  );
}
