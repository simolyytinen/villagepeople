import React, { createContext, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Majoitus from "./components/Majoitus.js";
import Footer from "./components/Footer.js";
import Palvelut from "./components/Palvelut.js";
import Haku from "./components/Haku.js";
import AlueHallinta from "./components/AlueHallinta.js";
import MajoitusHallinta from "./components/MajoitusHallinta.js";
import PalveluHallinta from "./components/PalveluHallinta.js";
import AsiakasHallinta from "./components/AsiakasHallinta.js";
import Kirjaudu from "./components/Kirjaudu.js";
import UusiAsiakas from "./components/UusiAsiakas.js";
import VarausHallinta from "./components/VarausHallinta.js";
import Asiakas from "./components/Asiakas.js";

export const DataContext = createContext({});

const App = () => {

  const [login, setLogin] = useState(false); // onko käyttäjä kirjaututunut vai ei
  const [kayttaja, setKayttaja] = useState(""); // Kirjautuneen käyttäjän ID tai joku muu?
  const [admin, setAdmin] = useState(false); // onko käyttäjä admin, autentikoidaan serverin päässä
  const [majoitus, setMajoitus] = useState(""); // tähän tallennetaan varattavan/varattavien kohteen/kohteiden tiedot taulukkoon
  const [palvelut, setPalvelut] = useState(""); // tähän tallennetaan taulukkoon varattavat palvelut
  const [token, setToken] = useState("");

  const intialValue = {
    server: "http://127.0.0.1:3004",
    token: token,
    setToken: setToken,
    login: login,
    setLogin: setLogin,
    kayttaja: kayttaja,
    setKayttaja: setKayttaja,
    admin: admin,
    setAdmin: setAdmin,
    majoitus: majoitus,
    setMajoitus : setMajoitus,
    palvelut: palvelut,
    setPalvelut: setPalvelut
  };

  return (
    <DataContext.Provider value={intialValue}>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Majoitus />} />
          <Route path="/majoitus" element={<Majoitus />} />
          <Route path="/palvelut" element={<Palvelut />} />
          <Route path="/alue/hallinta" element={<AlueHallinta />} />
          <Route path="/majoitus/hallinta" element={<MajoitusHallinta />} />
          <Route path="/palvelut/hallinta" element={<PalveluHallinta />} />
          <Route path="/asiakkaat/hallinta" element={<AsiakasHallinta />} />
          <Route path="/varaukset/hallinta" element={<VarausHallinta />} />
          <Route path="/kirjaudu" element={<Kirjaudu />} />
          <Route path="/uusiasiakas" element={<UusiAsiakas />} />
          <Route path="/varaukset/asiakas" element={<Asiakas />} />
        </Routes>

        <Footer />
      </Router>
    </DataContext.Provider>
  );
};

export default App;
