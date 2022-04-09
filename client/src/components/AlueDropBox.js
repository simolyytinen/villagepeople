import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AlueDropBox() {

  const options = [{ id: "AD", nimi: "Sappee" },
  { id: "AE", nimi: "Ruka" },
  { id: "AF", nimi: "Levi" },
  { id: "AG", nimi: "Ylläs" }];

  const [testi, setTesti] = useState("");
  const handleChange = (event) => {
    setTesti(event.target.value);
  };

//   return (
//     <Select name={name} value={value}>
//       {options?.map(option => {
//           return (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label ?? option.value}
//             </MenuItem>
//           );
//       })}
//     </Select>
// );

  return (
    <Box /* style={{ marginTop: 32 }} */ sx={{ mt: 1 /* minWidth: 120 */ }}>
      <FormControl fullWidth>
        <InputLabel id="sijainti">Sijainnin valinnan vois tehä näin</InputLabel>
        <Select
          labelId="sijaintiSelect"
          id="sijainti"
          // value={nimi}
          // name={nimi}
          label="Sijainti"
          onChange={handleChange}
        >
          {options?.map(option => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.id ?? option.nimi}
            </MenuItem>
          );
      })}
        </Select>
      </FormControl>
    </Box>
  );
}

const paikkaSelect = (props) => {

  const a = props.data.map((n, index) => {
    return <MenuItem key={index}>{n.id}, {n.nimi}</MenuItem>

});

  return (
    <>
          {a}
    </>
  );
};