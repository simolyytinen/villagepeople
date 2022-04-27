import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import HallintaMenu from "./HallintaMenu";
import { DataContext } from "../App";
import PersonIcon from '@mui/icons-material/Person';



const Navbar = () => {
  const { login, admin, setLogin, setAdmin, setKayttaja, setToken } = useContext(DataContext);

  let navigate = useNavigate();

  // reitit ja otsikot voisi tallentaa contextAPI niin olisi yhdessä paikassa
  const sivut = [
    { otsikko: "Majoitus", reitti: "/majoitus" },
    { otsikko: "Palvelut", reitti: "/palvelut" },
  ];
  const hallinta = [
    { otsikko: "Alueiden hallinta", reitti: "/alue/hallinta" },
    { otsikko: "Majoituskohteiden hallinta", reitti: "/majoitus/hallinta" },
    { otsikko: "Palveluiden hallinta", reitti: "/palvelut/hallinta" },
    { otsikko: "Majoitusvarausten hallinta", reitti: "/varaukset/hallinta" },
    { otsikko: "Asiakkaiden hallinta", reitti: "/asiakkaat/hallinta" },
    { otsikko: "Laskujen hallinta", reitti: "/laskut/hallinta" },
    { otsikko: "Raportointi", reitti: "/raportointi" }
  ];
  

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

  const logout = () => {
    setLogin(false);
    setAdmin(false);
    setToken("");
    setKayttaja("");
    navigate("/majoitus")
  }
  const kayttaja = [
    {id: 1, otsikko: "Profiili", onclick: ()=>{navigate("/profiili")}}, 
    {id: 2, otsikko: "Varaukset", onclick: ()=>{navigate("/varaukset/asiakas")}}, 
    {id: 3, otsikko: "Kirjaudu ulos", onclick: ()=>{logout();}}
  ];

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
                ))) : <div></div>
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
            <HallintaMenu hallinta={hallinta} />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {login ? <Tooltip title="Oma tili">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon fontSize="large" sx={{color: "white"}}/>
              </IconButton>
            </Tooltip> : 
            <>
            <Button sx={{ my: 2, color: "white", display: "inline" }} onClick={() => { navigate("/kirjaudu") }}>Kirjaudu</Button>
            <Button sx={{ my: 2, color: "white", display: "inline" }} onClick={() => { navigate("/uusiasiakas") }}>Rekisteröidy</Button>
            </>
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
              {admin ? 
              <MenuItem key={1} onClick={handleCloseUserMenu}>
                  <Button onClick={()=>{logout()}}>Kirjaudu Ulos</Button>
              </MenuItem> :
              (kayttaja.map((a) => (
                <MenuItem key={a.id} onClick={handleCloseUserMenu}>
                  <Button onClick={a.onclick}>{a.otsikko}</Button>
                </MenuItem>
              )))
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
