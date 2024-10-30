import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS for Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/scale">Recipe Scaler</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
