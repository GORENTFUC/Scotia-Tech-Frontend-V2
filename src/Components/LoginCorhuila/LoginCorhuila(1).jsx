import React from 'react';
import './LoginCorhuila.css';  // Asegúrate de que este archivo exista en la misma carpeta

const LoginCorhuila = () => {
  return (
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
  );
};

export default LoginCorhuila;
