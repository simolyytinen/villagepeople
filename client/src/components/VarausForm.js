import { Box, Button, TextField, Grid, Stack, Container } from "@mui/material";
import { useEffect, useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

export default function VarausForm({ muokataanko, setMuokataanko, muokattavaVaraus, tallennaClick }) {

  // moment.alkuPvm.format("YYYY-MM-DD 14:00:00")

  const [alkuPvm, setAlkuPvm] = useState("");
  const [loppuPvm, setLoppuPvm] = useState("");
  const [varaus_id, setVaraus_id] = useState("");

  useEffect(() => {
    const funktio = () => {
      setVaraus_id(muokattavaVaraus.varaus_id);
      setAlkuPvm(muokattavaVaraus.alkuPvm);
      setLoppuPvm(muokattavaVaraus.loppuPvm);
    }
    if (muokataanko) funktio();
  }, [muokataanko, muokattavaVaraus])

  const handleSubmit = (event) => {
    event.preventDefault();
    muokataanko ? tallennaClick({
      varattu_alkupvm: moment(alkuPvm).format("YYYY-MM-DD 14:00:00"),
      varattu_loppupvm: moment(loppuPvm).format("YYYY-MM-DD 14:00:00"),
      varaus_id: varaus_id
    }) :
      setAlkuPvm("");
    setLoppuPvm("");
    setVaraus_id("");
  };

  const peruuta = () => {
    setAlkuPvm("");
    setLoppuPvm("");
    setVaraus_id("");

    setMuokataanko(false);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} >
          <Stack
            sx={{ pt: 1 }}
            direction="column"
            spacing={1}
            justifyContent="center"
          >
            <TextField
              margin="normal"
              fullWidth
              disabled
              id="varausId"
              label="ID"
              name="id"
              value={varaus_id}
              onChange={(event) => { setVaraus_id(event.target.value) }}
            />
            <LocalizationProvider dateAdapter={AdapterMoment} >
              <DatePicker
                label="Varaus alkaa"
                value={alkuPvm}
                onChange={(newValue) => {
                  setAlkuPvm(newValue);
                }}

                // onChange={(event)=>{setAlkuPvm(event.target.value)}}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Varaus loppuu"
                value={loppuPvm}
                onChange={(newValue) => {
                  setLoppuPvm(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </Grid>
      </Grid>
      {muokataanko ?
        <div>
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Tallenna
          </Button>
          <Button fullWidth onClick={() => { peruuta() }} variant="outlined" sx={{ mb: 2 }}>
            Peruuta
          </Button>
        </div>
        : null}


    </Box>
  );


}