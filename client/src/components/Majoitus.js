import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Kortti from './Kortti';
import DatePickers from './DatePicker';
import { DataContext } from "../App";


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Majoitus() {

  const { server } = useContext(DataContext);
  const [hae, setHae] = useState(0);
  const [mokit, setMokit] = useState([]);

  const [hakuehto, setHakuehto] = useState("");

  // const tyhjenna = () =>{
  //   setHakuehto("");
  // }

  useEffect(()=>{
    const funktio = () => {
        let api = server + "/api/mokit/"/*  + alueId */;
        fetch(api)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setMokit(data)})
        .catch(err => console.log(err));
    }
    /* if (alueId !== "")  */funktio();
}, [hae, /* alueId, */ server])

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
            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
            </Typography> */}
            <Stack
              sx={{ pt: 1 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <DatePickers />
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Hae majoituskohteet</Button>
              <Button variant="outlined">Tyhjennä</Button>
            </Stack>
          </Container>
        </Box>
        <Kortti data={mokit} />
      </main>
    </ThemeProvider>
  );
}