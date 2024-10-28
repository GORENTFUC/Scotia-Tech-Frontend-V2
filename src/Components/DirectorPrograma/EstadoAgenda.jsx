import React, { useState } from 'react';
import './EstadoAgenda.css';

const EstadoAgenda = () => {
  const [data, setData] = useState([
    { id: 1, code: 'AS-2024-B2', phase: 'Director de programa', date: '18-09-2024', status: 'aprobado', recommendation: '' },
    // Añade más elementos si es necesario
  ]);

  const handleStatusChange = (event, id) => {
    const selectedValue = event.target.value;

    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: selectedValue } : item
      )
    );
  };

  const handleRecommendationChange = (event, id) => {
    const recommendationValue = event.target.value;

    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, recommendation: recommendationValue } : item
      )
    );
  };

  const handleDownload = (code) => {
    console.log(`Descargar archivo para el código: ${code}`);
  };

  const handleSend = (code) => {
    console.log(`Enviar datos para el código: ${code}`);
  };

  return (
    <div className="agenda-container">
      <h1>Agendas Acádemicas a revisar</h1>
      <table className="agenda-table">
        <thead>
          <tr>
            <th>CÓDIGO</th>
            <th>FASE</th>
            <th>ESTADO</th>
            <th>RECOMENDACIÓN</th>
            <th>FECHA DE REVISIÓN</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.code}</td>
              <td>{item.phase}</td>
              <td>
                <select
                  className="estado-selector"
                  value={item.status}
                  onChange={(event) => handleStatusChange(event, item.id)}
                >
                  <option value="aprobado">Aprobado</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </td>
              <td>
                <textarea
                  className="recomendacion-textarea"
                  value={item.recommendation}
                  onChange={(event) => handleRecommendationChange(event, item.id)}
                  placeholder="Escribe aquí la recomendación..."
                ></textarea>
              </td>
              <td>{item.date}</td>
              <td>
                <button className="descargar-btn" onClick={() => handleDownload(item.code)}>
                  Descargar archivo
                </button>
                <button className="enviar-btn" onClick={() => handleSend(item.code)}>
                  Enviar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstadoAgenda;
