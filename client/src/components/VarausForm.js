import { Box, Button, TextField, Grid } from "@mui/material";
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import DatePickers from './DatePicker';

export default function VarausForm({ muokataanko, setMuokataanko, muokattavaVaraus, tallennaClick, lisaaClick }) {

  const [alkuPvm, setAlkuPvm] = useState("");
  const [loppuPvm, setLoppuPvm] = useState("");

  return (
    <Box component="form" noValidate /* onSubmit={handleSubmit} */ sx={{ mt: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
              <DatePickers />
        </Grid>
      </Grid>
      {muokataanko ? 
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Tallenna
      </Button>
      : null }
      {/* <Button fullWidth onClick={()=>{peruuta()}} variant="outlined" sx={{ mb: 2 }}>
        {muokataanko ? "Peruuta" : "Tyhjennä"}
      </Button> */}
    </Box>
  );
 

}