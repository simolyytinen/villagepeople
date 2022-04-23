import { Box, Button, TextField, Grid, fabClasses } from "@mui/material";
import { useEffect, useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControlLabel, Checkbox } from '@mui/material';
import moment from "moment";

export default function LaskuForm({ muokataanko, setMuokataanko, muokattavaLasku, tallennaClick }) {


  const [summa, setSumma] = useState("");
  const [alv, setAlv] = useState("");
  const [erapaiva, setErapaiva] = useState("");
  const [maksettu, setMaksettu] = useState(false);
  


  useEffect(()=>{
      const funktio = () => {
        setSumma(muokattavaLasku.summa);
        setAlv(muokattavaLasku.alv);
        setErapaiva(muokattavaLasku.erapaiva);
        muokattavaLasku.maksettu == 0 ? setMaksettu(false) : setMaksettu(true);
        
      }
      if (muokataanko) funktio();
  }, [muokataanko, muokattavaLasku])

  const handleSubmit = (event) => {
    event.preventDefault();
    tallennaClick({
      summa : summa,
      alv : alv,
      erapaiva :  moment(erapaiva).format("YYYY-MM-DD"),
      maksettu : maksettu
    })
  };

  const peruuta = () => {
    setSumma("");
    setAlv("");
    setErapaiva("");
    setMaksettu(false);

    setMuokataanko(false);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            fullWidth
            disabled
            id="varaus_id"
            label="Varaus_id"
            name="varaus_id"
            value={muokattavaLasku.varaus_id}
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
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Eräpäivä"
                value={erapaiva}
                onChange={(newValue) => {
                  setErapaiva(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{mt: 2}} />}
              />
          </LocalizationProvider>
          <FormControlLabel
              key="1"
              label="Maksettu"
              sx={{display: "block", mt:2}}
              control={<Checkbox checked={maksettu} onChange={(e) => setMaksettu(e.target.checked)} />}
              />
        </Grid>
      </Grid>
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Tallenna
      </Button>
      <Button fullWidth onClick={()=>{peruuta()}} variant="outlined" sx={{ mb: 2 }}>
        Peruuta
      </Button>
    </Box>
  );
}