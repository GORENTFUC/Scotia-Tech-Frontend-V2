import '../App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Table,
  Button,
  Tabs,
  Tab,
} from 'react-bootstrap';

function AgendaForm() {
  const styles = {
    header: {
      backgroundColor: '#153949',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#153949',
      borderColor: '#153949',
      color: '#FFFFFF',
      margin: '10px 0',
    },
    title: {
      color: '#153949',
      textAlign: 'center',
    },
    tabTitle: {
      color: '#153949',
    },
  };

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

  return (
    <>
      <Container style={styles.title}>
        <h1>Registro de Agenda Profesoral</h1>
      </Container>
      <br />
      <Container>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab
            eventKey="1"
            title={<span style={styles.tabTitle}>Lab. Docencia</span>}
          >
            <Container>
              <Button style={styles.button}>+ Agregar</Button>
            </Container>
            <br />
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ ...styles.header, width: '200px' }}>
                      Nombre Asignatura
                    </th>
                    <th style={{ ...styles.header, width: '200px' }}>Programa</th>
                    <th style={{ ...styles.header, width: '100px' }}>Grupo</th>
                    <th style={{ ...styles.header, width: '100px' }}>Sede</th>
                    <th style={{ ...styles.header, width: '150px' }}>
                      Dedicación Horas Semanales
                    </th>
                    <th style={{ ...styles.header, width: '150px' }}>
                      Dedicación Horas Semestrales
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Asignatura 1</td>
                  </tr>
                </tbody>
              </Table>
              <Button style={styles.button} onClick={handleNext}>
                Siguiente
              </Button>
            </Container>
          </Tab>
          <Tab
            eventKey="2"
            title={<span style={styles.tabTitle}>Lab. Académicas y Formativas</span>}
          >
            <Container>
              <Button style={styles.button}>+ Agregar</Button>
            </Container>
            <br />
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ ...styles.header, width: '200px' }}>
                      Actividad
                    </th>
                    <th style={{ ...styles.header, width: '150px' }}>
                      Dedicación Horas Semanales
                    </th>
                    <th style={{ ...styles.header, width: '150px' }}>
                      Dedicación Horas Semestrales
                    </th>
                    <th style={{ ...styles.header, width: '200px' }}>
                      Descripción de la actividad
                    </th>
                    <th style={{ ...styles.header, width: '150px' }}>Producto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                style={styles.button}
                variant="secondary"
                onClick={handleBack}
              >
                Atrás
              </Button>{' '}
              <Button style={styles.button} onClick={handleNext}>
                Siguiente
              </Button>
            </Container>
          </Tab>
          <Tab
            eventKey="3"
            title={<span style={styles.tabTitle}>Lab. Científicas</span>}
          >
            <Container>
              <Button style={styles.button}>+ Agregar</Button>
            </Container>
            <br />
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ ...styles.header, width: '200px' }}>
                      Actividad
                    </th>
                    <th style={{ ...styles.header, width: '150px' }}>
                      Dedicación Horas Semanales
                    </th>
                    <th style={{ ...styles.header, width: '150px' }}>
                      Dedicación Horas Semestrales
                    </th>
                    <th style={{ ...styles.header, width: '200px' }}>
                      Descripción de la actividad
                    </th>
                    <th style={{ ...styles.header, width: '150px' }}>Producto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                style={styles.button}
                variant="secondary"
                onClick={handleBack}
              >
                Atrás
              </Button>{' '}
              <Button style={styles.button} onClick={handleNext}>
                Siguiente
              </Button>
            </Container>
          </Tab>
          {/* Similar ajustes para los demás tabs */}
        </Tabs>
      </Container>
    </>
  );
}

export default AgendaForm;
