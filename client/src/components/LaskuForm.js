import { Box, Button, TextField, Grid } from "@mui/material";
import { useEffect, useState } from 'react';

export default function LaskuForm({ muokataanko, setMuokataanko, muokattavaLasku, tallennaClick, lisaaClick }) {

  const [varaus_id, setVaraus_id] = useState("");
  const [summa, setSumma] = useState("");
  const [alv, setAlv] = useState("");
  


  useEffect(()=>{
      const funktio = () => {
        setVaraus_id(muokattavaLasku.varaus_id);
        setSumma(muokattavaLasku.summa);
        setAlv(muokattavaLasku.alv);
        
      }
      if (muokataanko) funktio();
  }, [muokataanko, muokattavaLasku])

  const handleSubmit = (event) => {
    event.preventDefault();
    muokataanko ? tallennaClick({
      varaus_id : varaus_id,
      summa : summa,
      alv : alv
     
      

    }) : lisaaClick({
        varaus_id : varaus_id,
        summa : summa,
        alv : alv
      
    })
    setVaraus_id("");
    setSumma("");
    setAlv("");
    
  };

  const peruuta = () => {
    setVaraus_id("");
    setSumma("");
    setAlv("");
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
            id="varaus_id"
            label="Varaus_id"
            name="varaus_id"
            value={varaus_id}
            onChange={(event)=>{setVaraus_id(event.target.value)}}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="summa"
            label="Summa"
            id="summa"
            value={summa}
            onChange={(event)=>{setSumma(event.target.value)}}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="alv"
            label="Alv"
            id="alv"
            value={alv}
            onChange={(event)=>{setAlv(event.target.value)}}
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