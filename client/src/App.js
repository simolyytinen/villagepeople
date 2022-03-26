import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import Navbar from './components/Navbar.js'
import Majoitus from './components/Majoitus.js'
import Footer from './components/Footer.js';
import Palvelut from './components/Palvelut.js';
import Haku from './components/Haku.js';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Haku />} />
          <Route path="/majoitus" element={<Majoitus />} />
          <Route path="/palvelut" element={<Palvelut />} />
        </Routes>

        <Footer />
      </Router>
        
    </div>
  );
}

export default App;
