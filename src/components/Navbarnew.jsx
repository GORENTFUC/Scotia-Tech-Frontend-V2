import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoCorhuila from '../logoCorhuilaB.jpg';
import iconUser from '../vectores/person-circle.svg';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

function Navbarnew() {
  const role = localStorage.getItem('role');
  const showForDocente = role === 'Docente';
  const showForDirector = role === 'Director De programa';
  const showForDecano = role === 'Decano';

  return (
    <>
      <Navbar className="navbar-new fixed-top">
        {/* Logo de la izquierda */}
        <Navbar.Brand as={Link} to="/Home">
          <img className="navbar-logo" alt="logo" src={logoCorhuila} />
        </Navbar.Brand>

        {/* Opciones de navegación dependiendo del rol */}
        <Nav className="navbar-links">
          {showForDocente && (
            <>
              <Nav.Link href="/AgendasDocente" className="navbar-link">Mis Agendas</Nav.Link>
              <Nav.Link href="/formulario" className="navbar-link">Formulario</Nav.Link>
            </>
          )}

          {showForDecano && (
            <>
              <Nav.Link href="/Decano/Autorizacion_Decano" className="navbar-link">Pendientes</Nav.Link>
              <Nav.Link href="/Decano/HistoricoDecano" className="navbar-link">Historico</Nav.Link>
            </>
          )}

          {showForDirector && (
            <>
              <Nav.Link href="/DirectorPrograma" className="navbar-link">Pendientes</Nav.Link>
              <Nav.Link href="/Director/HistoricoDirector" className="navbar-link">Historico</Nav.Link>
            </>
          )}
        </Nav>

        {/* Menú desplegable del usuario */}
        <NavDropdown
          align="end"
          title={<img className="navbar-user-icon" src={iconUser} alt="User Icon" />}
          id="user-menu"
          flip
        >
          <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Configuración</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/">Cerrar Sesión</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </>
  );
}

export default Navbarnew;
