import React, { useState } from 'react';
import './LoginCorhuila.css';

const LoginCorhuila = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = { username: '', password: '' };

    if (!username) {
      formIsValid = false;
      newErrors.username = 'El nombre de usuario es requerido.';
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = 'La contraseña es requerida.';
    } else if (password.length < 6) {
      formIsValid = false;
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Usuario:', username, 'Contraseña:', password);
      // Aquí puedes añadir la lógica de autenticación, como una llamada a un servicio de login
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login-header">
          <h1>CAMPUS DIGITAL</h1>
          <hr className="separator" />
          <p>Aprendizaje innovador</p>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre de usuario o correo electrónico"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" className="login-button">Acceder</button>
        </form>
        <a href="#" className="forgot-password">¿Olvidó su contraseña?</a>
      </div>
    </div>
  );
};

export default LoginCorhuila;