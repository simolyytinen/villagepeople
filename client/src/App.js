import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import Navbar from './components/Navbar.js'
import FrontPage from './components/FrontPage.js'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/koti" element={<FrontPage />} />
        </Routes>
      </Router>
        
    </div>
  );
}

export default App;
