import React from 'react';
import './LoginCorhuila.css';  // Asegúrate de que este archivo exista en la misma carpeta
import logo from './logocorhuila.png'; // Asegúrate de que la ruta sea correcta

const LoginCorhuila = () => {
  return (
    <div>
      {/* Comienzo del Header */}
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Corhuila logo" className="logo" />
          <h2>CORHUILA</h2>
        </div>
        <nav>
          <ul>
            <li><a href="/inicio">Inicio</a></li>
            <li><a href="/corhuilaplus">CorhuilaPlus+</a></li>
            <li><a href="/moodle">Moodle</a></li>
          </ul>
        </nav>
      </header>
      {/* Fin del Header */}

      <div className="login-page">
        <div className="login-form">
          <div className="login-header">
            <h1>CAMPUS DIGITAL</h1>
            <hr className="separator" />
            <p>Aprendizaje innovador</p>
          </div>
          <form>
            <input type="text" placeholder="Nombre de usuario o correo electrónico" className="login-input" />
            <input type="password" placeholder="Contraseña" className="login-input" />
            <button type="submit" className="login-button">Acceder</button>
          </form>
          <a href="#" className="forgot-password">¿Olvidó su contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginCorhuila;
