import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap';

const initialDataAsignatura = [
  { asignatura: 'Distribuidos', programa: 'Ing. Sistemas', grupo: '90B', sede: 'Prado Alto', dedicacionHorasSemanales: '4', dedicacionHorasSemestrales: '12', totalHorasSemanales: '0' }
];

function CrearAgenda() {
  const [activeTab, setActiveTab] = useState('1');

  const handleNext = () => {
    if (activeTab === '1') setActiveTab('2');
    else if (activeTab === '2') setActiveTab('3');
    else if (activeTab === '3') setActiveTab('4');
    else if (activeTab === '4') setActiveTab('5');
  };

  const handleBack = () => {
    if (activeTab === '2') setActiveTab('1');
    else if (activeTab === '3') setActiveTab('2');
    else if (activeTab === '4') setActiveTab('3');
    else if (activeTab === '5') setActiveTab('4');
  };

  const styles = {
    title: {
      textAlign: 'center',
      color: '#153949',
      marginBottom: '20px',
    },
    tabTitle: {
      color: '#153949',
    },
    button: {
      backgroundColor: '#153949',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      margin: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      textAlign: 'center',
    },
    table: {
      textAlign: 'center',
    },
    tableHeader: {
      backgroundColor: '#153949',
      color: 'white',
    },
    modalHeader: {
      color: '#153949',
    },
  };

  return (
    <>
      <br />
      <Container>
        <h1 style={styles.title}>Registro de Agenda Profesoral</h1>
      </Container>
      <br />
      <Container>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          <Tab eventKey="1" title={<span style={styles.tabTitle}>Lab. Docencia</span>}>
            <Container>
              <Button style={styles.button}>+ Agregar</Button>
            </Container>
            <br />
            <Container>
              <Table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th>Nombre Asignatura</th>
                    <th>Programa</th>
                    <th>Grupo</th>
                    <th>Sede</th>
                    <th>Dedicación Horas Semanales</th>
                    <th>Dedicación Horas Semestrales</th>
                    <th>Total Horas Semanales</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {initialDataAsignatura.map((elemento, index) => (
                    <tr key={index}>
                      <td>{elemento.asignatura}</td>
                      <td>{elemento.programa}</td>
                      <td>{elemento.grupo}</td>
                      <td>{elemento.sede}</td>
                      <td>{elemento.dedicacionHorasSemanales}</td>
                      <td>{elemento.dedicacionHorasSemestrales}</td>
                      <td>{elemento.totalHorasSemanales}</td>
                      <td>
                        <Button style={styles.button}>Editar</Button>
                        <Button style={{ ...styles.button, backgroundColor: 'red' }}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button style={styles.button} onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
          <Tab eventKey="2" title={<span style={styles.tabTitle}>Lab. Académicas y Formativas</span>}>
            <Container>
              <Button style={styles.button}>+ Agregar</Button>
            </Container>
            <br />
            <Container>
              <Table striped bordered hover style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th>Actividad</th>
                    <th>Dedicación Horas Semanales</th>
                    <th>Dedicación Horas Semestrales</th>
                    <th>Descripción</th>
                    <th>Producto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                    <td>10</td>
                    <td>100</td>
                    <td>Descripción de ejemplo</td>
                    <td>Producto</td>
                    <td>
                      <Button style={styles.button}>Editar</Button>
                      <Button style={{ ...styles.button, backgroundColor: 'red' }}>Eliminar</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button style={styles.button} onClick={handleBack}>Atrás</Button>{" "}
              <Button style={styles.button} onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default CrearAgenda;
