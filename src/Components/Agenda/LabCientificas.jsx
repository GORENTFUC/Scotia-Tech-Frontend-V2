import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const actividadesData = [
  {
    nombre: "Gestión de semilleros de investigación",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: ["INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO", "AGENDAS Y/O ACTAS", "LISTADOS DE ASISTENCIA", "MATERIAL EDUCATIVO UTILIZADO", "REGISTRO FOTOGRÁFICO Y/O VIDEO"]
  },
  {
    nombre: "Elaboración de propuestas para convocatorias de CTeI",
    dedicacionSemanal: 0,
    descripcion: "Actividad gestión de eventos",
    productos: ["PROPUESTA PARA CONVOCATORIA INTERNA"]
  },
  {
    nombre: "Gestión de proyectos de investigación en CTeI",
    dedicacionSemanal: 0,
    descripcion: "Actividad gestión de eventos",
    productos: ["PROYECTOS EN EJECUCIÓN: INFORMES PARCIALES", "PROYECTOS FINALIZADOS: INFORME FINAL TÉCNICO Y FINANCIERO", "CONSULTORÍA REALIZADA: INFORME FINAL", "REGISTRO DE SOFTWARE REALIZADO", "REGISTRO DE PATENTE: AVANCE EN PROCESO O CONVALIDADA", "PRODUCTO TECNOLÓGICO: CERTIFICADO O VALIDADO", "CONCEPTOS TÉCNICOS O INFORMES TÉCNICOS: CONVALIDADOS"]
  },
  {
    nombre: "Dirección de grupos de investigación",
    dedicacionSemanal: 0,
    descripcion: "Actividad gestión de eventos",
    productos: ["INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO", "AGENDAS Y/O ACTAS", "LISTADOS DE ASISTENCIA", "MATERIAL EDUCATIVO UTILIZADO", "REGISTRO FOTOGRÁFICO Y/O VIDEO"]
  },
  {
    nombre: "Elaboración de artículos científicos y textos académicos",
    dedicacionSemanal: 0,
    descripcion: "Actividad gestión de eventos",
    productos: ["INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO", "AGENDAS Y/O ACTAS", "LISTADOS DE ASISTENCIA", "MATERIAL EDUCATIVO UTILIZADO", "REGISTRO FOTOGRÁFICO Y/O VIDEO"]
  }
];

const TablaActividadesCienti = () => {
  const [actividades, setActividades] = useState(actividadesData);
  const [checkboxStates, setCheckboxStates] = useState(
    actividadesData.map(() => Array(actividadesData[0].productos.length).fill(false))
  );

  const handleHoursChange = (index, value) => {
    const updatedActividades = [...actividades];
    updatedActividades[index].dedicacionSemanal = value;
    setActividades(updatedActividades);
  };

  const handleCheckboxChange = (actividadIndex, productoIndex) => {
    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates[actividadIndex][productoIndex] = !updatedCheckboxStates[actividadIndex][productoIndex];
    setCheckboxStates(updatedCheckboxStates);
  };

  const totalSemanal = actividades.reduce((total, actividad) => total + Number(actividad.dedicacionSemanal), 0);
  const totalSemestral = totalSemanal * 16; // Cálculo automático de horas semestrales

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Agenda Académica: Detalles de Actividades y Dedicación</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Actividad</th>
            <th>Dedicación (Horas Semanales)</th>
            <th>Dedicación (Horas Semestrales)</th>
            <th>Descripción de la Actividad</th>
            <th>Producto</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((actividad, index) => (
            <tr key={index}>
              <td>{actividad.nombre}</td>
              <td>
                <input
                  type="number"
                  value={actividad.dedicacionSemanal}
                  onChange={(e) => handleHoursChange(index, e.target.value)}
                  className="form-control"
                  min="0"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={actividad.dedicacionSemanal * 16} // Campo calculado
                  readOnly // Solo lectura
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={actividad.descripcion}
                  className="form-control"
                  onChange={(e) => {
                    const updatedActividades = [...actividades];
                    updatedActividades[index].descripcion = e.target.value;
                    setActividades(updatedActividades);
                  }}
                />
              </td>
              <td>
                {actividad.productos.map((producto, idx) => (
                  <div key={idx} className="form-check mb-1" style={{ fontSize: '0.85rem' }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`producto-${index}-${idx}`}
                      checked={checkboxStates[index][idx]}
                      onChange={() => handleCheckboxChange(index, idx)}
                    />
                    <label className="form-check-label ms-2" htmlFor={`producto-${index}-${idx}`}>
                      {producto}
                    </label>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-info">
              <strong>Total de horas semanales:</strong> {totalSemanal}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-info">
              <strong>Total de horas semestrales:</strong> {totalSemestral}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaActividadesCienti;
