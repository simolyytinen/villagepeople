import React, {useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import HallintaMenu from "./HallintaMenu";
import { DataContext } from "../App";

// reitit ja otsikot voisi tallentaa contextAPI niin olisi yhdessä paikassa
const sivut = [
  { otsikko: "Majoitus", reitti: "/majoitus" },
  { otsikko: "Palvelut", reitti: "/palvelut" },
];
const hallinta = [
  { otsikko: "Alueiden hallinta", reitti: "/alue/hallinta" },
  { otsikko: "Majoituskohteiden hallinta", reitti: "/majoitus/hallinta" },
  { otsikko: "Palveluiden hallinta", reitti: "/palvelut/hallinta" },
  { otsikko: "Varausten hallinta", reitti: "/varaukset"},
  { otsikko: "Asiakkaiden hallinta", reitti: "/asiakkaat/hallinta" },
  { otsikko: "Laskujen hallinta", reitti: "/laskut/hallinta" },
  { otsikko: "Raportointi", reitti: "/raportointi"}
];
const kayttaja = ["Profiili", "Varaukset", "Kirjaudu ulos"];

const Navbar = () => {
  const {login, admin} = useContext(DataContext);

  let navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (reitti) => {
    setAnchorElNav(null);
    navigate(reitti);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            VILLAGE PEOPLE OY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {sivut.map((sivu) => (
                <MenuItem
                  key={sivu.reitti}
                  onClick={() => handleCloseNavMenu(sivu.reitti)}
                >
                  <Typography textAlign="center">{sivu.otsikko}</Typography>
                </MenuItem>
              ))}
              {admin ? 
              (hallinta.map((sivu) => (
                <MenuItem
                  key={sivu.reitti}
                  onClick={() => handleCloseNavMenu(sivu.reitti)}
                >
                  <Typography textAlign="center">{sivu.otsikko}</Typography>
                </MenuItem>
              ))) : <></>
              }
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            VILLAGE PEOPLE OY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {sivut.map((sivu) => (
              <Button
                key={sivu.reitti}
                onClick={() => handleCloseNavMenu(sivu.reitti)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {sivu.otsikko}
              </Button>
            ))}
            {/*Hallintamenun kondtionaalinen renderöinti on tehty itse komponentissa */}
            <HallintaMenu hallinta={hallinta}/>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {login ? <Tooltip title="Oma tili">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Käyttäjä" />
            </IconButton>
          </Tooltip> : <Button sx={{ my: 2, color: "white", display: "block" }}>Kirjaudu</Button> 
          }
            
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {kayttaja.map((a) => (
                <MenuItem key={a} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{a}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
