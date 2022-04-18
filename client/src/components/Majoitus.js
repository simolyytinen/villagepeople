import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControlLabel, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Kortti from './Kortti';
import DatePickers from './DatePicker';
import { DataContext } from "../App";

const theme = createTheme();

export default function Majoitus() {

  const { server } = useContext(DataContext);
  const [mokit, setMokit] = useState([]);
  const [toimipaikat, setToimipaikat] = useState([]);

  const [hakuehto, setHakuehto] = useState("");
  const [alkuPvm, setAlkuPvm] = useState("");
  const [loppuPvm, setLoppuPvm] = useState("");

  const [isChecked, setIsChecked] = useState([]);

  // Toimipisteiden hakeminen tietokannasta checkboxeja varten
  useEffect(()=>{
    fetch(server + "/api/toimipisteet")
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        setToimipaikat(data)
        setIsChecked(() => toimipaikat.map((i) => false))
      }
      ) 
    .catch(err => console.log(err));
}, [server])

  useEffect(()=>{
    console.log(hakuehto);
    const funktio = () => {
        let api = server + "/api/mokit/";
        fetch(api)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setMokit(data)})
        .catch(err => console.log(err));
    }
    if (hakuehto !== "")  funktio();
}, [hakuehto, server])

const haeClicked = () => {
  let alueet = [];
  for (let i=0; i<isChecked.length; i++) {
    if (isChecked[i]) alueet.push(i+1);
  }
  
  setHakuehto({
    alueet: alueet,
    alkupvm: alkuPvm,
    loppupvm: loppuPvm
  });  
}


const Tyhjenna = () =>{
  setHakuehto("");
  setIsChecked(() => {
    return isChecked.map((c) => {
      return false;
    });
  });
}

// checkboxien apufunktiot
const isCheckboxChecked = (index, value) => {
  setIsChecked(() => {
    return isChecked.map((c, i) => {
      if (i === index) return value;
      return c;
    });
  });
};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Majoitus
            </Typography>
            {/* Alueen valinnan checkbox */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
              {toimipaikat.map((a, index)=>{
                return (
                  <FormControlLabel
                  key={a.alue_id}
                  label={a.nimi}
                  control={<Checkbox checked={isChecked[index] ? isChecked[index] : false} onChange={(e) => isCheckboxChecked(index, e.target.checked)} />}
                  /> 
                )
            })}
    
            </Box>
            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
            </Typography> */}
            <Stack
              sx={{ pt: 1 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* propsit datepickerille varauksen ajoista. TÄMÄKIN KESKEN!!!!*/}
              <DatePickers alkuPvm={alkuPvm} loppuPvm={loppuPvm} setAlkuPvm={setAlkuPvm} setLoppuPvm={setLoppuPvm}/>
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={()=>{haeClicked()}}>Hae majoituskohteet</Button>
              <Button variant="outlined" onClick={()=>{Tyhjenna()}}>Tyhjennä</Button>
            </Stack>
          </Container>
        </Box>
        <Kortti data={mokit} />
      </main>
    </ThemeProvider>
  );
}