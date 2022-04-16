import { Box, Button, TextField, Grid } from "@mui/material";
import { useEffect, useState } from 'react';
import DatePickers from './DatePicker';

export default function VarausForm({ muokataanko, setMuokataanko, muokattavaVaraus, tallennaClick, lisaaClick }) {

  const [alkuPvm, setAlkuPvm] = useState("");
  const [loppuPvm, setLoppuPvm] = useState("");

  useEffect(() => {
    const funktio = () => {
      setAlkuPvm(muokattavaVaraus.alkuPvm);
      setLoppuPvm(muokattavaVaraus.loppuPvm)
    }
    if (muokataanko) funktio();
  }, [muokataanko, muokattavaVaraus])

  const handleSubmit = (event) => {
    event.preventDefault();
    muokataanko ? tallennaClick({
      varattu_alkupvm: alkuPvm,
      varattu_loppupvm: loppuPvm,
    }) :
    setAlkuPvm("");
    setLoppuPvm("");
  };

  const peruuta = () => {
    setAlkuPvm("");
    setLoppuPvm("");

    setMuokataanko(false);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <DatePickers alkuPvm={alkuPvm} loppuPvm={loppuPvm} setAlkuPvm={setAlkuPvm} setLoppuPvm={setLoppuPvm} />
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