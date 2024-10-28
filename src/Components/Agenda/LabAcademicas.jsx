import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const actividadesData = [
  // Actividades Académicas
  {
    categoria: "Académicas",
    nombre: "Preparación de clases",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Actividad preparar clase",
    productos: [
      "MATERIAL EDUCATIVO",
      "SYLLABUS DE LA ASIGNATURA"
    ],
    seleccionados: [] // Nuevo campo para los productos seleccionados
  },
  {
    categoria: "Académicas",
    nombre: "Evaluación de aprendizajes a estudiantes",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Actividad evaluación",
    productos: [
      "EVIDENCIAS DE AUTOEVALUACIÓN",
      "PLANILLA DE CALIFICACIONES"
    ],
    seleccionados: [] // Nuevo campo para los productos seleccionados
  },
  {
    categoria: "Académicas",
    nombre: "Planificación académica",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Planificación y revisión curricular",
    productos: [
      "PLAN DE CURSO",
      "INFORMES DE AVANCE"
    ],
    seleccionados: [] // Nuevo campo para los productos seleccionados
  },
  // Actividades Formativas
  {
    categoria: "Formativas",
    nombre: "Acompañamiento académico a estudiantes",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Acompañamiento académico",
    productos: [
      "TRES REPORTES SOBRE EL DESARROLLO",
      "SOPORTE DE LAS REMISIONES DE ESTUDIANTES"
    ],
    seleccionados: [] // Nuevo campo para los productos seleccionados
  },
  {
    categoria: "Formativas",
    nombre: "Cursos de fortalecimiento dirigido a estudiantes",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Fortalecimiento académico",
    productos: [
      "INFORME EJECUTIVO DEL DESARROLLO DE LA ACTIVIDAD",
      "LISTADO DE ASISTENCIA"
    ],
    seleccionados: [] // Nuevo campo para los productos seleccionados
  },
  {
    categoria: "Formativas",
    nombre: "Asesoría en emprendimiento",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Asesoría para proyectos",
    productos: [
      "INFORME EJECUTIVO DEL DESARROLLO",
      "EVALUACIÓN DE LA ASESORÍA"
    ],
    seleccionados: [] // Nuevo campo para los productos seleccionados
  }
];

const TablaActividades = () => {
  const [actividades, setActividades] = useState(actividadesData);

  const handleHoursChange = (index, field, value) => {
    const updatedActividades = [...actividades];
    const newValue = Math.max(0, Number(value));
    updatedActividades[index][field] = newValue;

    if (field === 'dedicacionSemanal') {
      updatedActividades[index].dedicacionSemestral = newValue * 16; // Cálculo automático de horas semestrales
    }

    setActividades(updatedActividades);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedActividades = [...actividades];
    updatedActividades[index].descripcion = value;
    setActividades(updatedActividades);
  };

  const handleProductChange = (index, product) => {
    const updatedActividades = [...actividades];
    const seleccionados = updatedActividades[index].seleccionados;

    if (seleccionados.includes(product)) {
      updatedActividades[index].seleccionados = seleccionados.filter(prod => prod !== product); // Desmarcar
    } else {
      updatedActividades[index].seleccionados.push(product); // Marcar
    }

    setActividades(updatedActividades);
  };

  const getActividadesPorCategoria = (categoria) => {
    return actividades.filter(actividad => actividad.categoria === categoria);
  };

  const calcularTotales = (categoria) => {
    const actividadesFiltradas = getActividadesPorCategoria(categoria);
    const totalSemanal = actividadesFiltradas.reduce((total, actividad) => total + Number(actividad.dedicacionSemanal), 0);
    const totalSemestral = actividadesFiltradas.reduce((total, actividad) => total + Number(actividad.dedicacionSemestral), 0);
    return { totalSemanal, totalSemestral };
  };

  const totalSemanalesGeneral = calcularTotales("Académicas").totalSemanal + calcularTotales("Formativas").totalSemanal;
  const totalSemestralesGeneral = calcularTotales("Académicas").totalSemestral + calcularTotales("Formativas").totalSemestral;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Agenda Académica: Detalles de Actividades y Dedicación</h2>

      {/* Tabla de Actividades Académicas */}
      <h4 className="text-center mb-3">Actividades Académicas</h4>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Actividad</th>
            <th>Dedicación (Horas Semanales)</th>
            <th>Dedicación (Horas Semestrales)</th>
            <th>Descripción de la Actividad</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {getActividadesPorCategoria("Académicas").map((actividad, index) => (
            <tr key={index}>
              <td>{actividad.nombre}</td>
              <td>
                <input
                  type="number"
                  value={actividad.dedicacionSemanal}
                  onChange={(e) => handleHoursChange(index, 'dedicacionSemanal', e.target.value)}
                  className="form-control"
                  min="0"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={actividad.dedicacionSemestral}
                  className="form-control"
                  readOnly // Campo solo lectura para evitar ediciones
                />
              </td>
              <td>
                <textarea
                  value={actividad.descripcion}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className="form-control"
                  rows="2"
                />
              </td>
              <td>
                <ul className="list-unstyled">
                  {actividad.productos.map((producto, prodIndex) => (
                    <li key={prodIndex} className="form-check">
                      <input
                        type="checkbox"
                        id={`producto-academica-${index}-${prodIndex}`}
                        checked={actividad.seleccionados.includes(producto)} // Comprobar si está seleccionado
                        onChange={() => handleProductChange(index, producto)} // Manejar cambio
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor={`producto-academica-${index}-${prodIndex}`}>
                        {producto}
                      </label>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
          <tr>
            <td><strong>Total Académicas</strong></td>
            <td><strong>{calcularTotales("Académicas").totalSemanal}</strong></td>
            <td><strong>{calcularTotales("Académicas").totalSemestral}</strong></td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>

      {/* Tabla de Actividades Formativas */}
      <h4 className="text-center mb-3">Actividades Formativas</h4>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Actividad</th>
            <th>Dedicación (Horas Semanales)</th>
            <th>Dedicación (Horas Semestrales)</th>
            <th>Descripción de la Actividad</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {getActividadesPorCategoria("Formativas").map((actividad, index) => (
            <tr key={index}>
              <td>{actividad.nombre}</td>
              <td>
                <input
                  type="number"
                  value={actividad.dedicacionSemanal}
                  onChange={(e) => handleHoursChange(index + 3, 'dedicacionSemanal', e.target.value)} // Offset para la tabla formativa
                  className="form-control"
                  min="0"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={actividad.dedicacionSemestral}
                  className="form-control"
                  readOnly // Campo solo lectura para evitar ediciones
                />
              </td>
              <td>
                <textarea
                  value={actividad.descripcion}
                  onChange={(e) => handleDescriptionChange(index + 3, e.target.value)} // Offset para la tabla formativa
                  className="form-control"
                  rows="2"
                />
              </td>
              <td>
                <ul className="list-unstyled">
                  {actividad.productos.map((producto, prodIndex) => (
                    <li key={prodIndex} className="form-check">
                      <input
                        type="checkbox"
                        id={`producto-formativa-${index}-${prodIndex}`}
                        checked={actividad.seleccionados.includes(producto)} // Comprobar si está seleccionado
                        onChange={() => handleProductChange(index + 3, producto)} // Manejar cambio
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor={`producto-formativa-${index}-${prodIndex}`}>
                        {producto}
                      </label>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
          <tr>
            <td><strong>Total Formativas</strong></td>
            <td><strong>{calcularTotales("Formativas").totalSemanal}</strong></td>
            <td><strong>{calcularTotales("Formativas").totalSemestral}</strong></td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>

      {/* Suma Total General */}
      <div className="text-center mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-info">
              <span>Total general de horas semanales: {totalSemanalesGeneral}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-info">
              <span>Total general de horas semestrales: {totalSemestralesGeneral}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaActividades;
