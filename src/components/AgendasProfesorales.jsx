import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Input, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import LaborDocencias from '../components/LaborDocencia';
import ExportarExcel from '../components/ExportarExcel';
import LaboresAcademicasForm from "../components/LaboresAcademicasForm";
import { Tabs, Tab } from 'react-bootstrap';

const initialDataAsignatura = [
  { asignatura: 'Distribuidos', programa: 'Ing. Sistemas', grupo: '90B', sede: 'Prado Alto', dedicacionHorasSemanales: '4', dedicacionHorasSemestrales: '12', totalHorasSemanales: '0' }
];

function AgendasProfesorales() {
  const [activeTab, setActiveTab] = useState('1');

  const handleNext = () => {
    if (activeTab === '1') {
      setActiveTab('2');
    } else if (activeTab === '2') {
      setActiveTab('3');
    } else if (activeTab === '3') {
      setActiveTab('4');
    } else if (activeTab === '4') {
      setActiveTab('5');
    }
  };

  const handleBack = () => {
    if (activeTab === '2') {
      setActiveTab('1');
    } else if (activeTab === '3') {
      setActiveTab('2');
    } else if (activeTab === '4') {
      setActiveTab('3');
    } else if (activeTab === '5') {
      setActiveTab('4');
    }
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
        <h1 style={styles.title}>Agendas Profesorales</h1>
      </Container>
      <br />
      <Container>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          <Tab eventKey="1" title={<span style={styles.tabTitle}>Lab. Docencia</span>}>
            <Container>
              <div>
                <LaborDocencias />
              </div>
            </Container>
            <Button style={styles.button} onClick={handleNext}>Siguiente</Button>
          </Tab>

          <Tab eventKey="2" title={<span style={styles.tabTitle}>Lab. Académicas y Formativas</span>}>
            <Container>
              <div>
                <LaboresAcademicasForm />
              </div>
            </Container>
            <Button style={styles.button} onClick={handleBack}>Atrás</Button>{" "}
            <Button style={styles.button} onClick={handleNext}>Siguiente</Button>
          </Tab>

          <Tab eventKey="3" title={<span style={styles.tabTitle}>Lab. Científicas</span>}>
            <Container>
              <Button style={styles.button} onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>

          <Tab eventKey="4" title={<span style={styles.tabTitle}>Lab. de Extensión y Culturales</span>}>
            <Container>
              <Button style={styles.button}>+ Agregar</Button>
              <Table striped bordered hover style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th>Actividad</th>
                    <th>Dedicación Horas Semanales</th>
                    <th>Dedicación Horas Semestrales</th>
                    <th>Descripción de la actividad</th>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                    <td>5</td>
                    <td>50</td>
                    <td>Descripción de ejemplo</td>
                    <td>Producto</td>
                  </tr>
                </tbody>
              </Table>
              <Button style={styles.button} onClick={handleBack}>Atrás</Button>{" "}
              <Button style={styles.button} onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>

          <Tab eventKey="5" title={<span style={styles.tabTitle}>Act. de Gestión Académica y Administrativas</span>}>
            <ExportarExcel />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default AgendasProfesorales;
