import "../App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Modal, FormGroup } from "react-bootstrap";
import { Input } from "reactstrap";

const GestionAdministrador = () => {
  const [formDataUser, setFormDataUser] = useState([
    {
      firstName: "Jesus Ariel",
      firstLastName: "Gonzales",
      documentNumber: "123456789",
      password: "jesus1234",
      email: "jesus@gmail.com",
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (user, index) => {
    setCurrentUser(index);
    setEditedData(user); // Cargamos los datos en el modal
    setShowEditModal(true); // Mostramos el modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const updatedUsers = [...formDataUser];
    updatedUsers[currentUser] = editedData;
    setFormDataUser(updatedUsers);
    setShowEditModal(false);
  };

  // Estilos en línea
  const styles = {
    container: {
      marginTop: "80px", // Separación de la navbar
    },
    tableHeader: {
      backgroundColor: "#153949", // Azul para los encabezados
      color: "#FFFFFF",
      textAlign: "center", // Centrar el texto de los encabezados
    },
    title: {
      color: "#153949",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    actionButtons: {
      margin: "5px",
    },
  };

  return (
    <>
      <Container style={styles.container}>
        <h2 style={styles.title}>Gestión de Usuarios</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ ...styles.tableHeader, width: "200px" }}>Nombres</th>
              <th style={{ ...styles.tableHeader, width: "200px" }}>Apellidos</th>
              <th style={{ ...styles.tableHeader, width: "200px" }}>Número de Documento</th>
              <th style={{ ...styles.tableHeader, width: "130px" }}>Contraseña</th>
              <th style={{ ...styles.tableHeader, width: "200px" }}>Email</th>
              <th style={{ ...styles.tableHeader, width: "100px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {formDataUser.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.firstLastName}</td>
                <td>{item.documentNumber}</td>
                <td>{item.password}</td>
                <td>{item.email}</td>
                <td>
                  <Button
                    variant="primary"
                    style={{
                      ...styles.actionButtons,
                      backgroundColor: "#153949",
                      borderColor: "#153949",
                    }}
                    onClick={() => handleEditClick(item, index)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal para editar usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <label>Nombres</label>
            <Input
              type="text"
              name="firstName"
              value={editedData.firstName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Apellidos</label>
            <Input
              type="text"
              name="firstLastName"
              value={editedData.firstLastName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Número de Documento</label>
            <Input
              type="text"
              name="documentNumber"
              value={editedData.documentNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Contraseña</label>
            <Input
              name="password"
              value={editedData.password}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Email</label>
            <Input
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleChange}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{
              backgroundColor: "#153949",
              borderColor: "#153949",
            }}
            onClick={handleSaveChanges}
          >
            Actualizar
          </Button>
          <Button
            variant="danger"
            style={styles.actionButtons}
            onClick={() => setShowEditModal(false)}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GestionAdministrador;
