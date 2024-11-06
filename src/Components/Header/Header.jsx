/*import React from 'react';
import './Header.css';
import logo from './logocorhuila.png';

const Header = () => {
  const handleLinkClick = (url) => {
    const userConfirmed = window.confirm('Está a punto de salir de esta página. ¿Desea continuar?');
    if (userConfirmed) {
      window.open(url, '_self');
    }
  };

  const handleLogout = () => {
    const userConfirmed = window.confirm('¿Está seguro de que desea cerrar sesión?');
    if (userConfirmed) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Corhuila logo" className="logo" />
        <h2>CORHUILA</h2>
      </div>
      <nav>
        <ul>
          <li><a href="https://corhuila.edu.co/" onClick={(e) => { e.preventDefault(); handleLinkClick('https://corhuila.edu.co/'); }}>Inicio</a></li>
          <li><a href="https://plus.corhuila.edu.co/sgacampus/" onClick={(e) => { e.preventDefault(); handleLinkClick('https://plus.corhuila.edu.co/sgacampus/'); }}>CorhuilaPlus+</a></li>
          <li><a href="https://virtual.corhuila.edu.co/" onClick={(e) => { e.preventDefault(); handleLinkClick('https://virtual.corhuila.edu.co/'); }}>Moodle</a></li>
          <li><button onClick={handleLogout} className="logout-button">Salir</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
*/


import React from 'react';
import './Header.css';
import logo from './logocorhuila.png';

const Header = () => {
  const handleLinkClick = (url) => {
    const userConfirmed = window.confirm('Está a punto de salir de esta página. ¿Desea continuar?');
    if (userConfirmed) {
      window.open(url, '_self');
    }
  };

  const handleLogout = () => {
    const userConfirmed = window.confirm('¿Está seguro de que desea cerrar sesión?');
    if (userConfirmed) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
  };

  // Verifica si el usuario está autenticado (por ejemplo, si hay un token en localStorage)
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Corhuila logo" className="logo" />
        <h2>CORHUILA</h2>
      </div>
      <nav>
        <ul>
          <li><a href="https://corhuila.edu.co/" onClick={(e) => { e.preventDefault(); handleLinkClick('https://corhuila.edu.co/'); }}>Inicio</a></li>
          <li><a href="https://plus.corhuila.edu.co/sgacampus/" onClick={(e) => { e.preventDefault(); handleLinkClick('https://plus.corhuila.edu.co/sgacampus/'); }}>CorhuilaPlus+</a></li>
          <li><a href="https://virtual.corhuila.edu.co/" onClick={(e) => { e.preventDefault(); handleLinkClick('https://virtual.corhuila.edu.co/'); }}>Moodle</a></li>
          {/* Mostrar el botón "Salir" solo si el usuario está autenticado */}
          {isAuthenticated && (
            <li><button onClick={handleLogout} className="logout-button">Salir</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
