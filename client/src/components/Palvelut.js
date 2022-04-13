import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PalveluKortti from './PalveluKortti';
import TextField from '@material-ui/core/TextField';
import { DataContext } from "../App";


const theme = createTheme();

export default function Palvelut() {

  const { server } = useContext(DataContext);
  const [hae, setHae] = useState(0);
  const [palvelut, setPalvelut] = useState([]);

  const [hakuehto, setHakuehto] = useState("");

  const tyhjenna = () =>{
    setHakuehto("");
  }

   // Palvelut tietokannasta hakuehdoilla
   useEffect(() => {
    fetch(server + "/api/palvelut/kortit" + "?nimi=" + hakuehto)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setPalvelut(data)
      })
      .catch(err => console.log(err));
  }, [hae, hakuehto, server])


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  // const palveluHaku = (event) =>{
  //   // setHakuehto(hakuehto);
  // }

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
              Palvelut
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="palveluNimi"
              label="Etsi palvelua"
              name="nimi"
              value={hakuehto}
              onChange={(event)=>{setHakuehto(event.target.value)}}
            />
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained" onClick={palveluHaku}>Hae palvelut</Button> */}
              <Button variant="outlined" onClick={tyhjenna}>Tyhjennä</Button>
            </Stack>
          </Container>
        </Box>
        <PalveluKortti data={palvelut} />
      </main>
    </ThemeProvider>
  );
}