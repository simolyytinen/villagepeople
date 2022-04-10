import { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function AlueDropBox({ alueid, setAlueId, data }) {

  const handleChange = (event) => {
    setAlueId(event.target.value);
  };

  return (
    <Box /* style={{ marginTop: 32 }} */ sx={{ mt: 1 /* minWidth: 120 */ }}>
      <FormControl fullWidth onChange={handleChange}>
        <InputLabel id="sijainti">Sijainti</InputLabel>
        <Select
          labelId="sijaintiSelect"
          id="sijainti"
          value={alueid}
          // name=""
          label="Sijainti"
          onChange={(event) => { setAlueId(event.target.value) }}
        >
         {data.map(alueet => {
              return (
                <MenuItem key={alueet.value} value={alueet.alue_id}>
                  {/* {alueet.alue_id} -  */}{alueet.nimi}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}

// {options?.map(option => {
//   return (
//     <MenuItem key={option.value} value={option.nimi}>
//       {/* {option.id ?? option.nimi} */}
//       {option.id} - {option.nimi}
//     </MenuItem>
//   );
// })}

