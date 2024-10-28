import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const actividadesData = [
  {
    categoria: "Extensión",
    nombre: "Gestión de proyectos de consultoría",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Actividad preparar clase",
    productos: [
      { nombre: "PROYECTOS EN EJECUCIÓN: INFORMES PARCIALES", checked: false },
      { nombre: "PROYECTOS FINALIZADOS: INFORME FINAL", checked: false },
      { nombre: "AGENDAS Y/O ACTAS", checked: false },
      { nombre: "LISTADOS DE ASISTENCIA", checked: false },
      { nombre: "REGISTRO FOTOGRÁFICO Y/O VIDEO", checked: false },
      { nombre: "MATERIAL EDUCATIVO UTILIZADO", checked: false }
    ]
  },
  {
    categoria: "Extensión",
    nombre: "Acompañamiento al sector empresarial",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Actividad evaluación",
    productos: [
      { nombre: "INFORME DE GESTIÓN DEL ACOMPAÑAMIENTO REALIZADO AL SECTOR EMPRESARIAL DURANTE EL PERIODO ACADÉMICO", checked: false },
      { nombre: "ACTAS DE REUNIÓN", checked: false },
      { nombre: "LISTADOS DE ASISTENCIA", checked: false },
      { nombre: "REGISTRO FOTOGRÁFICO Y/O VIDEO", checked: false },
      { nombre: "MATERIAL EDUCATIVO UTILIZADO", checked: false }
    ]
  },
  {
    categoria: "Extensión",
    nombre: "Participación en proyectos de intervención comunitaria",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Actividad gestión de eventos",
    productos: [
      { nombre: "PROYECTOS EN EJECUCIÓN: INFORMES PARCIALES", checked: false },
      { nombre: "PROYECTOS FINALIZADOS: INFORME FINAL", checked: false },
      { nombre: "AGENDAS Y/O ACTAS", checked: false },
      { nombre: "LISTADOS DE ASISTENCIA", checked: false },
      { nombre: "REGISTRO FOTOGRÁFICO Y/O VIDEO", checked: false },
      { nombre: "MATERIAL EDUCATIVO UTILIZADO", checked: false }
    ]
  },
  {
    categoria: "Culturales",
    nombre: "Gestión de proyectos culturales",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Actividad preparar clase",
    productos: [
      { nombre: "INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO", checked: false },
      { nombre: "AGENDAS Y/O ACTAS", checked: false },
      { nombre: "LISTADOS DE ASISTENCIA", checked: false },
      { nombre: "REGISTRO FOTOGRÁFICO Y/O VIDEO", checked: false },
      { nombre: "MATERIAL EDUCATIVO UTILIZADO", checked: false }
    ]
  },
  {
    categoria: "Culturales",
    nombre: "Promoción de la educación artística",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Actividad evaluación",
    productos: [
      { nombre: "INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO", checked: false },
      { nombre: "AGENDAS Y/O ACTAS", checked: false },
      { nombre: "LISTADOS DE ASISTENCIA", checked: false },
      { nombre: "REGISTRO FOTOGRÁFICO Y/O VIDEO", checked: false },
      { nombre: "MATERIAL EDUCATIVO UTILIZADO", checked: false }
    ]
  },
  {
    categoria: "Culturales",
    nombre: "Divulgación de los valores culturales",
    dedicacionSemanal: 0,
    dedicacionSemestral: 0,
    descripcion: "Actividad evaluación",
    productos: [] // Puedes dejarlo vacío si no hay productos.
  }
];

const TablaExtensionCulturales = () => {
  const [actividades, setActividades] = useState(actividadesData);

  const handleHoursChange = (index, field, value) => {
    const updatedActividades = [...actividades];
    updatedActividades[index][field] = value;

    // Actualizar dedicación semestral basada en la dedicación semanal
    if (field === 'dedicacionSemanal') {
      updatedActividades[index].dedicacionSemestral = value * 16;
    }

    setActividades(updatedActividades);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedActividades = [...actividades];
    updatedActividades[index].descripcion = value;
    setActividades(updatedActividades);
  };

  const handleCheckboxChange = (actividadIndex, productoIndex) => {
    const updatedActividades = [...actividades];
    updatedActividades[actividadIndex].productos[productoIndex].checked = !updatedActividades[actividadIndex].productos[productoIndex].checked;
    setActividades(updatedActividades);
  };

  const totalSemanal = actividades.reduce((total, actividad) => total + Number(actividad.dedicacionSemanal), 0);
  const totalSemestral = actividades.reduce((total, actividad) => total + Number(actividad.dedicacionSemestral), 0);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Agenda Académica: Detalles de Actividades y Dedicación</h2>
      
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Categoría</th>
            <th>Actividad</th>
            <th>Dedicación (Horas Semanales)</th>
            <th>Dedicación (Horas Semestrales)</th>
            <th>Descripción de la Actividad</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((actividad, index) => (
            <tr key={index}>
              <td>{actividad.categoria}</td>
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
                  min="0"
                  readOnly // Make semestral read-only since it's calculated
                />
              </td>
              <td>
                <textarea
                  value={actividad.descripcion}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className="form-control"
                  rows="3"
                />
              </td>
              <td>
                {actividad.productos.map((producto, prodIndex) => (
                  <div key={prodIndex} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`producto-${index}-${prodIndex}`}
                      checked={producto.checked}
                      onChange={() => handleCheckboxChange(index, prodIndex)}
                    />
                    <label className="form-check-label" htmlFor={`producto-${index}-${prodIndex}`}>
                      {producto.nombre}
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

export default TablaExtensionCulturales;
