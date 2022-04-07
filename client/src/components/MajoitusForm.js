import { Box, Button, TextField, Grid } from "@mui/material";

export default function AlueForm({ muokataanko, tallennaClick, lisaaClick }) {


  const handleSubmit = (event) => {
    event.preventDefault();
    muokataanko ? tallennaClick({

    }) : lisaaClick();
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/*Alueen valinta ylimmäksi*/}
          <TextField
            margin="normal"
            fullWidth
            required
            id="mokkiNimi"
            label="Mökin nimi"
            name="mokkiNimi"
            onChange={(event)=>{}}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="lahiosoite"
            label="Lähiosoite"
            id="lahiosoite"
            onChange={(event)=>{}}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="postinumero"
            label="Postinumero"
            id="postinumero"
            onChange={(event)=>{}}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="kuvaus"
            label="Kuvaus"
            id="kuvaus"
            onChange={(event)=>{}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
              margin="normal"
              fullWidth
              required
              id="mokkiNimi"
              label="Mökin nimi"
              name="mokkiNimi"
              onChange={(event)=>{}}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="lahiosoite"
              label="Lähiosoite"
              id="lahiosoite"
              onChange={(event)=>{}}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="postinumero"
              label="Postinumero"
              id="postinumero"
              onChange={(event)=>{}}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="kuvaus"
              label="Kuvaus"
              id="kuvaus"
              onChange={(event)=>{}}
            />
        </Grid>
      </Grid>
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        {muokataanko ? "Tallenna" : "Lisää"}
      </Button>
    </Box>
  );
}
