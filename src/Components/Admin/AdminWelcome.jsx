import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard';
import './AdminWelcome.css';

const AdminWelcome = () => {
  const navigate = useNavigate();

  const goToCRUD = () => {
    navigate('/admindashboard');
  };

  return (
    <div className="welcome-container">
      <h2>¡Bienvenidos!</h2>
      <p>
        A la plataforma de agendamiento de materias.Aquí podrás gestionar de manera sencilla y rápida tus materiales y horarios.
        Te invitamos a explorar las opciones disponibles y organizar tu semestre académico de la mejor manera posible.
      </p>
      <Button variant="primary" onClick={goToCRUD}>Ir a la gestión de usuarios</Button>
    </div>
  );
};

export default AdminWelcome;