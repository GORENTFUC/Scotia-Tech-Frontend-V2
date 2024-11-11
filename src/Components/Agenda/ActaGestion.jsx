import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ActaGestion.css';

const actividadesData = [
  {
    nombre: "Participación como jurado y/o asesor académico en trabajos de grado",
    dedicacionSemanal: 0,
    descripcion: "Actividad preparar clase",
    productos: [
      "OFICIO DE RETROALIMENTACIÓN DE OPCIONES DE GRADO PARA PREGRADO Y POSGRADO - F0-GD-51 (POR TRABAJO DE GRADO ASIGNADO)"
    ]
  },{
    nombre: "Participación en procesos de registros calificados",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "DOCUMENTOS ASIGNADOS PARA EL REGISTRO CALIFICADO"
    ]
  },
  {
    nombre: "Participación en procesos de acreditación",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "DOCUMENTOS ASIGNADOS PARA LA ACREDITACIÓN DEL PROGRAMA ACADÉMICO"
    ]
  },
  {
    nombre: "Participación en Consejos y Comités",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "REPORTE DE LA ASISTENCIA A CONSEJOS Y COMITES SEGÚN CORRESPONDA"
    ]
  },
  {
    nombre: "Participación en procesos de autoevaluación",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "DOCUMENTOS ASIGNADOS EN EL PROCESO DE AUTOEVALUACIÓN"
    ]
  },
  {
    nombre: "Participación en Investigaciones de mercado",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "DOCUMENTO ESTUDIO DE MERCADO"
    ]
  },
  {
    nombre: "Participación en procesos de formación de profesores",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "REPORTE DE LA ASISTENCIA A LOS PROCESOS DE FORMACIÓN EN LOS QUE HA SIDO CONVOCADO"
    ]
  },
  {
    nombre: "Programación y gestión de prácticas extramuros",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "FORMATO PLANEACIÓN DE PRÁCTICA EXTRAMURO - FO-GD-25",
      "INFORME DE LA PRACTICA EXTRAMURO - FO-GD-24",
      "LISTADOS DE ASISTENCIA",
      "REGISTRO FOTOGRÁFICO Y/O VIDEO"
    ]
  },
  {
    nombre: "Elaboración de exámenes para validaciones",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "ACTA DE VALIDACIÓN - FO-GD-46"
    ]
  },
  {
    nombre: "Líder de CTeI, extensión y proyección social",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO",
      "AGENDAS Y/O ACTAS",
      "LISTADOS DE ASISTENCIA",
      "REGISTRO FOTOGRÁFICO Y/O VIDEO",
      "MATERIAL EDUCATIVO UTILIZADO",
      "RECOPILACIÓN DE LOS PRODUCTOS DE PROYECTOS DE CTEI, EXTENSIÓN Y PROYECCIÓN SOCIAL DEL PROGRAMA ACADÉMICO"
    ]
  },
  {
    nombre: "Líder de resultados de aprendizaje",
    dedicacionSemanal: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO",
      "AGENDAS Y/O ACTAS",
      "LISTADOS DE ASISTENCIA",
      "REGISTRO FOTOGRÁFICO Y/O VIDEO",
      "MATERIAL EDUCATIVO UTILIZADO",
      "MATRIZ DE RESULTADOS DE APRENDIZAJE DEL PROGRAMA - RAP",
      "INFORME DE LA EVALUACIÓN DE LOS RESULTADOS DE APRENDIZAJE DEL PROGRAMA - RAP",
      "INSTRUMENTOS PARA LA EVALUACIÓN DE LOS RESULTADOS DE APRENDIZAJE DEL PROGRAMA - RAP"
    ]
  },
];

const ActividadRow = ({ actividad, index, checkboxStates, handleCheckboxChange, handleDescripcionChange, handleDedicacionChange }) => (
  <tr key={index}>
    <td>{actividad.nombre}</td>
    <td>
      <input 
        type="number" 
        className="form-control" 
        value={actividad.dedicacionSemanal} 
        onChange={(e) => handleDedicacionChange(index, Number(e.target.value))}
      />
    </td>
    <td>{actividad.dedicacionSemanal * 16}</td>
    <td>
      <textarea 
        className="form-control" 
        value={actividad.descripcion} 
        onChange={(e) => handleDescripcionChange(index, e.target.value)}
        style={{ minHeight: '80px', resize: 'vertical' }}
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
);

const TablaGestionAcademica = () => {
  const [actividades, setActividades] = useState(actividadesData);
  const totalSemanal = actividades.reduce((total, actividad) => total + Number(actividad.dedicacionSemanal), 0);
  const totalSemestral = actividades.reduce((total, actividad) => total + Number(actividad.dedicacionSemanal) * 16, 0);
  
  const [checkboxStates, setCheckboxStates] = useState(
    actividadesData.map(() => Array(actividadesData[0].productos.length).fill(false))
  );

  const handleCheckboxChange = (actividadIndex, productoIndex) => {
    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates[actividadIndex][productoIndex] = !updatedCheckboxStates[actividadIndex][productoIndex];
    setCheckboxStates(updatedCheckboxStates);
  };

  const handleDescripcionChange = (actividadIndex, nuevaDescripcion) => {
    const updatedActividades = [...actividades];
    updatedActividades[actividadIndex].descripcion = nuevaDescripcion;
    setActividades(updatedActividades);
  };

  const handleDedicacionChange = (actividadIndex, nuevaDedicacion) => {
    const updatedActividades = [...actividades];
    updatedActividades[actividadIndex].dedicacionSemanal = nuevaDedicacion;
    setActividades(updatedActividades);
  };

  return (
    <div className="table-container">
      <h2 className="text-center mb-4">Agenda Académica: Detalles de Actividades y Dedicación</h2>
      
      <table className="table table-striped table-bordered table-sm">
        <thead>
          <tr className="table-dark">
            <th>Actividad</th>
            <th>Dedicación (Horas Semanales)</th>
            <th>Dedicación (Horas Semestrales)</th>
            <th>Descripción de la Actividad</th>
            <th>Producto</th>
          </tr>
          <tr className="line-separadora">
            <td colSpan="5"></td>
          </tr>
        </thead>
        <tbody>
          {actividades.map((actividad, index) => (
            <ActividadRow 
              key={index} 
              actividad={actividad} 
              index={index}
              checkboxStates={checkboxStates}
              handleCheckboxChange={handleCheckboxChange}
              handleDescripcionChange={handleDescripcionChange}
              handleDedicacionChange={handleDedicacionChange}
            />
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

export default TablaGestionAcademica;
