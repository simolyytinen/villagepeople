import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TyyppiDropBox({tyyppi, setTyyppi}) {

  const handleChange = (event) => {
    setTyyppi(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="palveluTyypit">Tyyppi</InputLabel>
        <Select
        //   labelId="demo-simple-select-label"
        //   id="demo-simple-select"
          value={tyyppi}
          label="Tyyppi"
          onChange={handleChange}
        >
          <MenuItem value={1}>Saatavilla</MenuItem>
          <MenuItem value={2}>Ei saatavilla</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
