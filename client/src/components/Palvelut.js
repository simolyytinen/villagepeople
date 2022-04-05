import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PalveluKortti from './Kortti_palvelut';
import TextField from '@material-ui/core/TextField';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Palvelut() {

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
            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Tähän haku-ehdot komponentti
            </Typography> */}
            <TextField
              margin="normal"
              fullWidth
              id="palveluNimi"
              label="Etsi palvelua"
              name="nimi"
              value=""
            // onChange={(event)=>{setXXXXXX(event.target.value)}}
            />
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Hae palvelut</Button>
              <Button variant="outlined">Tyhjennä</Button>
            </Stack>
          </Container>
        </Box>
        <PalveluKortti data={cards} />
      </main>
    </ThemeProvider>
  );
}