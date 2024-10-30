import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RecipeScaler from './pages/RecipeScaler';
import Navbar from './components/Navbar'; // Import Navbar for navigation

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navigation bar at the top */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/scale" element={<RecipeScaler />} /> {/* Recipe Scaler Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
