import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PalveluHallinta from './PalveluHallinta';

export default function AlueDropBox(sijainti, setSijainti) {

  const handleChange = (event) => {
    setSijainti(event.target.value);
  };

  return (
    <Box /* style={{ marginTop: 32 }} */ sx={{ mt: 1 /* minWidth: 120 */ }}>
      <FormControl fullWidth>
        <InputLabel id="sijainti">Sijainti</InputLabel>
        <Select
          labelId="sijaintiSelect"
          id="sijainti"
          value={sijainti}
          label="Sijainti"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}