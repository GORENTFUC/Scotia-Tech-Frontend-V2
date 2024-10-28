import React, { useState } from 'react';
import './AcademicAgenda.css';

const AcademicAgenda = () => {
  const [directorProgram, setDirectorProgram] = useState(true);
  const [recommendations, setRecommendations] = useState(['']); // Manejo de recomendaciones por fila

  const handleToggle = () => {
    setDirectorProgram(!directorProgram);
  };

  const handleDownload = (index) => {
    console.log(`Descargando archivo para la fila ${index + 1}...`);
  };

  const handleSend = (index) => {
    console.log(`Enviando recomendación para la fila ${index + 1}: ${recommendations[index]}`);
  };

  const handleRecommendationChange = (index, event) => {
    const newRecommendations = [...recommendations];
    newRecommendations[index] = event.target.value;
    setRecommendations(newRecommendations);
  };

  return (
    <div className="agenda-container">
      <h2>Agendas Académicas a revisar</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre profesor</th>
            <th>Recomendaciones</th>
            <th>Director de programa</th>
            <th>Decano</th>
            <th>Fecha</th>
            <th>Período</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[0].map((row, index) => (
            <tr key={index}>
              <td>AS-2024-B2</td>
              <td>Jesus Ariel Gonzalez</td>
              <td>
                {/* Caja de texto para escribir recomendaciones */}
                <textarea 
                  value={recommendations[index]} 
                  onChange={(e) => handleRecommendationChange(index, e)} 
                  placeholder="Escriba recomendaciones aquí"
                />
              </td>
              <td>Aprobado</td>
              <td>{directorProgram ? "Sí" : "No"}</td>
              <td>18-09-2024</td>
              <td>2024-A</td>
              <td>
                {/* Botones de acción */}
                <button 
                  className={directorProgram ? 'ok-button' : 'x-button'}
                  onClick={handleToggle}
                >
                  {directorProgram ? '✔' : '❌'}
                </button>
                <button 
                  className="download-button" 
                  onClick={() => handleDownload(index)}
                >
                  Descargar
                </button>
                <button 
                  className="send-button" 
                  onClick={() => handleSend(index)}
                >
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

export default AcademicAgenda;
