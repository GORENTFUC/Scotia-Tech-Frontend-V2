import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Input, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap';

const initialDataAsignatura = [
  { asignatura: 'Distribuidos', programa: 'Ing. Sistemas', grupo: '90B', sede: 'Prado Alto', dedicacionHorasSemanales: '4', dedicacionHorasSemestrales: '12', totalHorasSemanales: '0' }
];

function Agendas() {
  const [activeTab, setActiveTab] = useState('1');
  const handleNext = () => {
    setActiveTab((prev) => String(Number(prev) + 1));
  };
  const handleBack = () => {
    setActiveTab((prev) => String(Number(prev) - 1));
  };

  const [data, setData] = useState(initialDataAsignatura);
  const [form, setForm] = useState({
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    dedicacionHorasSemanales: '',
    dedicacionHorasSemestrales: '',
    totalHorasSemanales: '',
  });

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const mostrarModalInsertar = () => setModalInsertar(true);
  const ocultarModalInsertar = () => setModalInsertar(false);

  const mostrarModalEditar = (elemento, index) => {
    setForm(elemento);
    setModalEditar(true);
    setSelectedId(index);
  };
  const ocultarModalEditar = () => setModalEditar(false);

  const insertar = () => {
    setData([...data, form]);
    ocultarModalInsertar();
  };

  const editar = () => {
    const updatedData = [...data];
    updatedData[selectedId] = form;
    setData(updatedData);
    ocultarModalEditar();
  };

  const styles = {
    header: {
      backgroundColor: '#153949',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    cell: {
      textAlign: 'center',
    },
    containerHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };

  return (
    <>
      <br />
      <Container className="text-center">
        <h1 style={{ color: '#153949' }}>Registro de Agenda Profesoral</h1>
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
            title={<span style={{ color: '#153949' }}>Lab. Docencia</span>}
          >
            <Container style={styles.containerHeader}>
              <Button color="primary" onClick={mostrarModalInsertar}>
                + Agregar
              </Button>
              <div>
                <h6 className="mb-0">Total Horas Semanales</h6>
                <span>0</span>
              </div>
            </Container>
            <br />
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={styles.header}>Nombre Asignatura</th>
                    <th style={styles.header}>Programa</th>
                    <th style={styles.header}>Grupo</th>
                    <th style={styles.header}>Sede</th>
                    <th style={styles.header}>Dedicación Horas Semanales</th>
                    <th style={styles.header}>Dedicación Horas Semestrales</th>
                    <th style={styles.header}>Total Horas Semanales</th>
                    <th style={styles.header}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((elemento, index) => (
                    <tr key={index}>
                      <td style={styles.cell}>{elemento.asignatura}</td>
                      <td style={styles.cell}>{elemento.programa}</td>
                      <td style={styles.cell}>{elemento.grupo}</td>
                      <td style={styles.cell}>{elemento.sede}</td>
                      <td style={styles.cell}>{elemento.dedicacionHorasSemanales}</td>
                      <td style={styles.cell}>{elemento.dedicacionHorasSemestrales}</td>
                      <td style={styles.cell}>{elemento.totalHorasSemanales}</td>
                      <td style={styles.cell}>
                        <Button
                          color="primary"
                          onClick={() => mostrarModalEditar(elemento, index)}
                        >
                          Editar
                        </Button>{' '}
                        <Button color="danger">Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button color="secondary" onClick={handleBack}>
                Atrás
              </Button>{' '}
              <Button color="primary" onClick={handleNext}>
                Siguiente
              </Button>
            </Container>
          </Tab>
        </Tabs>
      </Container>

      {/* Modales */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader style={styles.header}>
          <h3>Insertar Labor Docencia</h3>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre Asignatura:</label>
            <Input
              className="form-control"
              name="asignatura"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
          {/* Otros campos aquí */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={insertar}>
            Insertar
          </Button>
          <Button color="danger" onClick={ocultarModalInsertar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader style={styles.header}>
          <h3>Editar Labor Docencia</h3>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre Asignatura:</label>
            <Input
              className="form-control"
              name="asignatura"
              type="text"
              value={form.asignatura}
              onChange={handleChange}
            />
          </FormGroup>
          {/* Otros campos aquí */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editar}>
            Editar
          </Button>
          <Button color="danger" onClick={ocultarModalEditar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Agendas;
