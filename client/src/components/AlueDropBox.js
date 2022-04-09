import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AlueDropBox() {
  const [testi, setTesti] = React.useState('');

  const handleChange = (event) => {
    setTesti(event.target.value);
  };

  return (
    <Box /* style={{ marginTop: 32 }} */ sx={{ mt: 1 /* minWidth: 120 */ }}>
      <FormControl fullWidth>
        <InputLabel id="sijainti">Sijainnin valinnan vois tehä näin</InputLabel>
        <Select
          labelId="sijaintiSelect"
          id="sijainti"
          value={testi}
          label="Sijainti"
          onChange={handleChange}
        >
          <MenuItem value={1}>Paikka1</MenuItem>
          <MenuItem value={2}>Paikka2</MenuItem>
          <MenuItem value={3}>Paikka3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}