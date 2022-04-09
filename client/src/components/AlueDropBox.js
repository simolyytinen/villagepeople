import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AlueDropBox() {
  const [testi, setTesti] = React.useState('');

  let countries = [{ code: "AD", name: "Andorra" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "AF", name: "Afghanistan" },
  { code: "AG", name: "Antigua and Barbuda" }];

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
          value={simpleCountrySelect}
          label="Sijainti"
          onChange={handleChange}
        >
            <simpleCountrySelect data={countries}/>
        </Select>
      </FormControl>
    </Box>
  );
}

const simpleCountrySelect = (props) => {

  const a = props.countries.map((n, index) => {
    return <MenuItem key={index} value={n.code}>yt4y4y</MenuItem>

});

  return (
    <>
      <FormControl>
        <InputLabel id="countrySelectLabel">Country</InputLabel>
        <Select labelId="countrySelectLabel" id="countrySelect" value=''>
          {a}
        </Select>
      </FormControl>
    </>
  );
};