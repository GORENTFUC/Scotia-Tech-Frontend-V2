import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Input, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const initialDataAsignatura = [
  { asignatura: 'Distribuidos', programa: 'Ing. Sistemas', grupo: '90B', sede: 'Prado Alto', dedicacionHorasSemanales: '4', dedicacionHorasSemestrales: '12', totalHorasSemanales: '0' }
];

function LaborDocencia() {
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
    tableHeader: {
      backgroundColor: '#153949',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    tableCell: {
      textAlign: 'center',
    },
    modalHeader: {
      backgroundColor: '#153949',
      color: '#FFFFFF',
      textAlign: 'center',
      padding: '10px',
    },
    containerHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };

  return (
    <>
      <Container style={styles.containerHeader}>
        <Button color="primary" onClick={mostrarModalInsertar}>
          + Agregar
        </Button>
        <div className="d-flex align-items-center">
          <h6 className="mb-0 me-2">Cant. Horas</h6>
          <span>1</span>
        </div>
      </Container>

      <br />
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Nombre del profesor</th>
              <th style={styles.tableHeader}>Facultad</th>
              <th style={styles.tableHeader}>Programa</th>
              <th style={styles.tableHeader}>Sede</th>
              <th style={styles.tableHeader}>Fecha</th>
              <th style={styles.tableHeader}>Periodo</th>
              <th style={styles.tableHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elemento, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{elemento.asignatura}</td>
                <td style={styles.tableCell}>{elemento.programa}</td>
                <td style={styles.tableCell}>{elemento.grupo}</td>
                <td style={styles.tableCell}>{elemento.sede}</td>
                <td style={styles.tableCell}>{elemento.dedicacionHorasSemanales}</td>
                <td style={styles.tableCell}>{elemento.dedicacionHorasSemestrales}</td>
                <td style={styles.tableCell}>
                  <Button color="primary" onClick={() => mostrarModalEditar(elemento, index)}>
                    Editar
                  </Button>{' '}
                  <Button color="danger">Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Total Horas Semanales</th>
              <th style={styles.tableHeader}>Total Horas Semestrales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>1</td>
              <td style={styles.tableCell}>2</td>
            </tr>
          </tbody>
        </Table>
      </Container>

      {/* Modal Insertar */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader style={styles.modalHeader}>
          <h3>Insertar Labor Docencia</h3>
        </ModalHeader>
        <ModalBody>
          {/* Campos del formulario */}
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

      {/* Modal Editar */}
      <Modal isOpen={modalEditar}>
        <ModalHeader style={styles.modalHeader}>
          <h3>Editar Labor Docencia</h3>
        </ModalHeader>
        <ModalBody>
          {/* Campos del formulario */}
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

export default LaborDocencia;
