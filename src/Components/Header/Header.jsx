import React from 'react';
import './Header.css';
import logo from './logocorhuila.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Corhuila logo" className="logo" />
        <h2>CORHUILA</h2>
      </div>
      <nav>
        <ul>
          <li><a href="/inicio">Inicio</a></li> {}
          <li><a href="/corhuilaplus">CorhuilaPlus+</a></li>
          <li><a href="/moodle">Moodle</a></li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;

