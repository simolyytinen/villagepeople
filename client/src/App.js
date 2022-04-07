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

export const DataContext = createContext({});

const App = () => {

  const [login, setLogin] = useState(true); // onko käyttäjä kirjaututunut vai ei
  const [admin, setAdmin] = useState(true); // onko käyttäjä admin, autentikoidaan serverin päässä

  const intialValue = {
    server: "http://127.0.0.1:3004",
    login: login,
    setLogin: setLogin,
    admin: admin,
    setAdmin: setAdmin
  };

  return (
    <DataContext.Provider value={intialValue}>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Haku />} />
          <Route path="/majoitus" element={<Majoitus />} />
          <Route path="/palvelut" element={<Palvelut />} />
          <Route path="/alue/hallinta" element={<AlueHallinta />} />
          <Route path="/majoitus/hallinta" element={<MajoitusHallinta />} />
          <Route path="/palvelut/hallinta" element={<PalveluHallinta />} />
        </Routes>

        <Footer />
      </Router>
    </DataContext.Provider>
  );
};

export default App;
