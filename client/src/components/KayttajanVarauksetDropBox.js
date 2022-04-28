import { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment";



export default function VarauksenPalvelutDroppi({ varaus_id, setVaraus_id, data }) {

  const handleChange = (event) => {
    setVaraus_id(event);
  };

  return (
    <Box /* style={{ marginTop: 32 }} */ sx={{ mt: 1 /* minWidth: 120 */ }}>
      <FormControl fullWidth onChange={handleChange}>
        <InputLabel id="varaukset">Varaukset</InputLabel>
        <Select
          labelId="varaukset"
          id="varaukset"
          value={varaus_id}
          // name=""
          label="Varaukset"
          onChange={(event) => setVaraus_id(event.target.value) }
        >
         {data.map((varaukset, index) => {
              return (
                <MenuItem key={index} value={varaukset.varaus_id}>
                  ID: {varaukset.varaus_id} | Ajankohta: {moment(varaukset.varattu_alkupvm).format("DD.MM.YYYY")} - {moment(varaukset.varattu_loppupvm).format("DD.MM.YYYY")} | Mökki: {varaukset.mokkinimi} | Sijainti: {varaukset.sijainti}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}

