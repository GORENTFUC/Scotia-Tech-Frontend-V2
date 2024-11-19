import "../App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button } from "react-bootstrap";

const AgendasProfesores = () => {
  const [dataAgena, setDataAgenda] = useState([
    {
      profesor: "JESÚS ARIEL GONZALES",
      facultad: "Facultad Ingeniería",
      programa: "Ing. de Sistemas",
      fecha: "12-09-2024",
      periodo: "2024B",
      aprobadoDirPrograma: "En Revisión",
      aprobadoDecano: "En Revisión",
      aprobadoVecerrectoria: "En espera de aprobación",
    },
    {
      profesor: "JESÚS ARIEL GONZALES",
      facultad: "Facultad Ingeniería",
      programa: "Ing. de Sistemas",
      fecha: "12-09-2024",
      periodo: "2024B",
      aprobadoDirPrograma: "En Revisión",
      aprobadoDecano: "En Revisión",
      aprobadoVecerrectoria: "En espera de aprobación",
    },
  ]);

  const aprobarAgenda = (index) => {
    const updatedAgenda = [...dataAgena];
    updatedAgenda[index].aprobadoDecano = "Aprobado";
    setDataAgenda(updatedAgenda);
  };

  const desaprobarAgenda = (index) => {
    const updatedAgenda = [...dataAgena];
    updatedAgenda[index].aprobadoDecano = "Desaprobado";
    setDataAgenda(updatedAgenda);
  };

  // Estilos en línea
  const styles = {
    container: {
      marginTop: "80px", // Separación de la navbar
    },
    tableHeader: {
      backgroundColor: "#153949", // Color azul para los encabezados
      color: "#FFFFFF",
      textAlign: "center", // Centrar el texto en los encabezados
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
        <h2 style={styles.title}>Agendas Profesorales</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ ...styles.tableHeader, width: "300px" }}>Nombre del Profesor</th>
              <th style={{ ...styles.tableHeader, width: "300px" }}>Facultad</th>
              <th style={{ ...styles.tableHeader, width: "300px" }}>Programa</th>
              <th style={{ ...styles.tableHeader, width: "130px" }}>Fecha</th>
              <th style={{ ...styles.tableHeader, width: "70px" }}>Periodo</th>
              <th style={{ ...styles.tableHeader, width: "200px" }}>Estado Dir. Programa</th>
              <th style={{ ...styles.tableHeader, width: "160px" }}>Estado Decano</th>
              <th style={{ ...styles.tableHeader, width: "160px" }}>Estado Vicerrectoria</th>
              <th style={{ ...styles.tableHeader, width: "160px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataAgena.map((item, index) => (
              <tr key={index}>
                <td>{item.profesor}</td>
                <td>{item.facultad}</td>
                <td>{item.programa}</td>
                <td>{item.fecha}</td>
                <td>{item.periodo}</td>
                <td>{item.aprobadoDirPrograma}</td>
                <td>{item.aprobadoDecano}</td>
                <td>{item.aprobadoVecerrectoria}</td>
                <td>
                  <Button variant="secondary" style={styles.actionButtons}>
                    Descargar
                  </Button>{" "}
                  <Button
                    variant="primary"
                    style={{
                      ...styles.actionButtons,
                      backgroundColor: "#153949",
                      borderColor: "#153949",
                    }}
                    onClick={() => aprobarAgenda(index)}
                  >
                    Aprobar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    style={styles.actionButtons}
                    onClick={() => desaprobarAgenda(index)}
                  >
                    Desaprobar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AgendasProfesores;
