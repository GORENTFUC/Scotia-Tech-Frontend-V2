import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import LabAcademicas from './LabAcademicas'
import LabCienticas from './LabCientificas'
import LabExtension from './LabExtension'
import ActaGestion from './ActaGestion'


// Componente para los campos de profesores
const CamposProfesores = () => {
    const [nuevoProfesor, setNuevoProfesor] = useState({
      nombre: '',
      facultad: '',
      programa: '',
      fecha: '',
      periodo: '',
    });
  
    const handleChange = (e) => {
      setNuevoProfesor({ ...nuevoProfesor, [e.target.name]: e.target.value });
    };
  
    const limpiarCampos = () => {
      setNuevoProfesor({
        nombre: '',
        facultad: '',
        programa: '',
        fecha: '',
        periodo: '',
      });
    };
  
    return (
      <div className="container my-4">
        <h2 className="text-center mb-4">Datos del Docente</h2>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Nombre del Profesor</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoProfesor.nombre}
                onChange={handleChange}
                placeholder="Nombre del Profesor"
              />
            </Form.Group>
  
            <Form.Group as={Col} md="6">
              <Form.Label>Facultad</Form.Label>
              <Form.Select
                name="facultad"
                value={nuevoProfesor.facultad}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="Facultad de Ciencias">Facultad de Ciencias</option>
                <option value="Facultad de Ingeniería">Facultad de Ingeniería</option>
              </Form.Select>
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Programa</Form.Label>
              <Form.Control
                type="text"
                name="programa"
                value={nuevoProfesor.programa}
                onChange={handleChange}
                placeholder="Programa"
              />
            </Form.Group>
  
            <Form.Group as={Col} md="6">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={nuevoProfesor.fecha}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Periodo</Form.Label>
              <Form.Control
                type="text"
                name="periodo"
                value={nuevoProfesor.periodo}
                onChange={handleChange}
                placeholder="Periodo"
              />
            </Form.Group>
          </Row>
  
          <Button variant="success" onClick={limpiarCampos}>
            Limpiar
          </Button>
        </Form>
      </div>
    );
  };
  
  // Componente para la agenda académica
  const FormularioAgenda = () => {
    const [formData, setFormData] = useState({
      asignatura: '',
      programa: '',
      grupo: '',
      sede: '',
      dedicacionHorasSemanales: '',
      dedicacionHorasSemestrales: '',
    });
    const [datos, setDatos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'programa') {
        const nuevaSede = value.includes('Ingeniería') ? 'Sede Prado Alto' : '';
        setFormData({ ...formData, [name]: value, sede: nuevaSede });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setDatos([...datos, formData]);
      setModalVisible(false);
      setFormData({
        asignatura: '',
        programa: '',
        grupo: '',
        sede: '',
        dedicacionHorasSemanales: '',
        dedicacionHorasSemestrales: '',
      });
    };
  
    return (
      <div className="container my-5">
        <h2 className="text-center mb-4">Formulario Agenda Académica</h2>
        <Button variant="primary" onClick={() => setModalVisible(true)}>
          Crear
        </Button>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Asignatura</th>
              <th>Programa</th>
              <th>Grupo</th>
              <th>Sede</th>
              <th>Dedicación Horas Semanales</th>
              <th>Dedicación Horas Semestrales</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, index) => (
              <tr key={index}>
                <td>{item.asignatura}</td>
                <td>{item.programa}</td>
                <td>{item.grupo}</td>
                <td>{item.sede}</td>
                <td>{item.dedicacionHorasSemanales}</td>
                <td>{item.dedicacionHorasSemestrales}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Asignatura</Form.Label>
                <Form.Control
                  type="text"
                  name="asignatura"
                  value={formData.asignatura}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Programa</Form.Label>
                <Form.Select name="programa" value={formData.programa} onChange={handleChange} required>
                  <option value="">Seleccionar</option>
                  <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                  <option value="Ingeniería Mecatrónica">Ingeniería Mecatrónica</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Grupo</Form.Label>
                <Form.Control
                  type="text"
                  name="grupo"
                  value={formData.grupo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dedicación Horas Semanales</Form.Label>
                <Form.Control
                  type="number"
                  name="dedicacionHorasSemanales"
                  value={formData.dedicacionHorasSemanales}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dedicación Horas Semestrales</Form.Label>
                <Form.Control
                  type="number"
                  name="dedicacionHorasSemestrales"
                  value={formData.dedicacionHorasSemestrales}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
  
  // Componente principal que contiene la navegación entre submódulos
  const App = () => {
    const [submoduloActivo, setSubmoduloActivo] = useState('profesor'); // Submódulo por defecto
  
    const renderSubmodulo = () => {
      switch (submoduloActivo) {
        case 'profesor':
          return <CamposProfesores />;
        case 'agenda':
          return <FormularioAgenda />;
        case 'labacademicas':
          return <LabAcademicas />;
        case 'labcienticas':
          return <LabCienticas />;
        case 'labextension':
          return <LabExtension />;
        case 'actagestion':
          return <ActaGestion />;
        default:
          return <CamposProfesores />; // Retorna el por defecto
      }
    };
  
    // Función para verificar si un submódulo está activo
    const esActivo = (modulo) => {
      return submoduloActivo === modulo ? 'active' : '';
    };
  
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Navegación</span>
            <Button variant="outline-primary" onClick={() => setSubmoduloActivo('profesor')} className={`mx-2 ${esActivo('profesor')}`}>
              Docente
            </Button>
            <Button variant="outline-primary" onClick={() => setSubmoduloActivo('agenda')} className={`mx-2 ${esActivo('agenda')}`}>
              Agenda Académica
            </Button>
            <Button variant="outline-primary" onClick={() => setSubmoduloActivo('labacademicas')} className={`mx-2 ${esActivo('labacademicas')}`}>
              Lab.Academicas y Formativas
            </Button>
            <Button variant="outline-primary" onClick={() => setSubmoduloActivo('labcienticas')} className={`mx-2 ${esActivo('labcienticas')}`}>
              Lab.Científicas
            </Button>
            <Button variant="outline-primary" onClick={() => setSubmoduloActivo('labextension')} className={`mx-2 ${esActivo('labextension')}`}>
              Lab.Extensión y Culturales
            </Button>
            <Button variant="outline-primary" onClick={() => setSubmoduloActivo('actagestion')} className={`mx-2 ${esActivo('actagestion')}`}>
              Act.Gestión Academica
            </Button>
          </div>
        </nav>
  
        {renderSubmodulo()}
      </div>
    );
  };

export default App;
