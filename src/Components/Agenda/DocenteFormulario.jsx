import "../App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FormControl, Container, Table, Tabs, Tab, Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from "react-bootstrap";
import { Input } from "reactstrap";
import plantilla from '../plantilla.xlsx'; // Importar la plantilla desde src
import axios from 'axios';



const AgendaForm = () => {
  
  const [activeTab, setActiveTab] = useState("1");


  const [dataDocente, setDataDocente] = useState([
    {
      profesor: '' || localStorage.getItem('name'),
      facultad:'',
      programa: '',
      fecha: '',
      periodo: '',
    },
  ]);

  const [dataAcademicas, setDataAcademicas] = useState([
    {
      actividadAca: "Preparación de clases",
      dedicacionSemanalAca: 0,
      dedicacionSemestreAca: 0,
      descripcionAca: "Actividad preparar clase",
      productoAca: "✓ MATERIAL EDUCATIVO, ✓ SYLLABUS DE LA ASIGNATURA...",
    },
    {
      actividadAca: "Evaluación de aprendizajes a estudiantes",
      dedicacionSemanalAca: 0,
      dedicacionSemestreAca: 0,
      descripcionAca: "Actividad evaluación",
      productoAca:
        "✓ EVIDENCIAS DE AUTOEVALUACIÓN, ✓ PLANILLA DE CALIFICACIONES..",
    },
    {
      actividadAca: "Gestión de eventos académicos",
      dedicacionSemanalAca: 0,
      dedicacionSemestreAca: 0,
      descripcionAca: "Actividad gestión de eventos",
      productoAca:
      `✓ FO-GD-83 PLANEACIÓN ACTIVIDADES ACADÉMICAS
      ✓ FO-GD-84 AGENDA PARA ACTIVIDADES ACADÉMICAS
      ✓ FO-GD-85 PRESUPUESTO PARA ACTIVIDADES ACADÉMICAS
      ✓ INFORME EJECUTIVO DEL DESARROLLO DE LA ACTIVIDAD
      ✓ LISTADO DE ASISTENCIA
      ✓ REGISTRO FOTOGRÁFICO 
      ✓ MATERIAL DE APOYO`,
    },
  ]);

  const [dataFormativas, setDataFormativas] = useState([
    {
      actividadFor: "Acompañamiento académico a estudiantes",
      dedicacionSemanalFor: 0,
      dedicacionSemestreFor: 0,
      descripcionFor: "Acompañamiento académico",
      productoFor: 
      `✓ TRES REPORTES SOBRE EL DESARROLLO, AVANCES Y RESULTADOS DEL ACOMPAÑAMIENTO REALIZADO A ESTUDIANTES, ENTREGADOS EN LAS FECHAS ESTABLECIDAS POR EL COMITÉ DE CURRÍCULO Y ASEGURAMIENTO DE LA CALIDAD
      ✓ SOPORTE DE LAS REMISIONES DE ESTUDIANTES`
    },
    {
      actividadFor: "Cursos de fortalecimiento dirigido a estudiantes",
      dedicacionSemanalFor: 0,
      dedicacionSemestreFor: 0,
      descripcionFor: "Actividad evaluación",
      productoFor:
        `✓ INFORME EJECUTIVO DEL DESARROLLO DE LA ACTIVIDAD
        ✓ LISTADO DE ASISTENCIA
        ✓ RECURSOS EDUCATIVOS
        ✓ EVALUACIÓN DEL CURSO`,
    },
    {
      actividadFor: "Asesoría en emprendimiento",
      dedicacionSemanalFor: 0,
      dedicacionSemestreFor: 0,
      descripcionFor: "Actividad gestión de eventos",
      productoFor:
      `✓ INFORME EJECUTIVO DEL DESARROLLO DE LA ACTIVIDAD
      ✓ MATERIAL DE APOYO
      ✓ EVALUACIÓN DE LA ASESORÍA`    
    },
  ]);

  const [dataCientificas, setDataCientificas] = useState([
    {
      actividadCien: "Gestión de semilleros de investigación",
      dedicacionSemanalCien: 0,
      dedicacionSemestreCien: 0,
      descripcionCien: "Actividad evaluación",
      productoCien:
        `✓ INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO
      ✓ AGENDAS Y/O ACTAS
      ✓ LISTADOS DE ASISTENCIA
      ✓ MATERIAL EDUCATIVO UTILIZADO
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO`,
    },
    {
      actividadCien: "Elaboración de propuestas para convocatorias de CTeI",
      dedicacionSemanalCien: 0,
      dedicacionSemestreCien: 0,
      descripcionCien: "Actividad gestión de eventos",
      productoCien:
      `✓ PROPUESTA PARA CONVOCATORIA INTERNA`    
    },
    {
      actividadCien: "Gestión de proyectos de investigación en CTeI",
      dedicacionSemanalCien: 0,
      dedicacionSemestreCien: 0,
      descripcionCien: "Actividad gestión de eventos",
      productoCien:
      `✓ PROYECTOS EN EJECUCIÓN : INFORMES PARCIALES
      ✓ PROYECTOS FINALIZADOS: INFORME FINAL TÉCNICO Y FINANCIERO
      ✓ CONSULTORÍA REALIZADA: INFORME FINAL
      ✓ REGISTRO DE SOFTWARE REALIZADO
      ✓ REGISTRO DE PATENTE: AVANCE EN PROCESO O CONVALIDADA
      ✓ PRODUCTO TECNOLÓGICO: CERTIFICADO O VALIDADO
      ✓ CONCEPTOS TÉCNICOS O INFORMES TÉCNICOS: CONVALIDADOS`    
    },
    {
      actividadCien: "Dirección de grupos de investigación",
      dedicacionSemanalCien: 0,
      dedicacionSemestreCien: 0,
      descripcionCien: "Actividad gestión de eventos",
      productoCien:
      `✓ INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO
      ✓ AGENDAS Y/O ACTAS
      ✓ LISTADOS DE ASISTENCIA
      ✓ MATERIAL EDUCATIVO UTILIZADO
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO`    
    },
    {
      actividadCien: "Elaboración de artículos científicos y textos académicos",
      dedicacionSemanalCien: 0,
      dedicacionSemestreCien: 0,
      descripcionCien: "Actividad gestión de eventos",
      productoCien:
      `✓ INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO
      ✓ AGENDAS Y/O ACTAS
      ✓ LISTADOS DE ASISTENCIA
      ✓ MATERIAL EDUCATIVO UTILIZADO
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO`    
    },
  ]);

  const [dataExtension, setDataExtension] = useState([
    {
      actividadExt: "Gestión de proyectos de consultoría",
      dedicacionSemanalExt: 0,
      dedicacionSemestreExt: 0,
      descripcionExt: "Actividad preparar clase",
      productoExt: 
      `✓ PROYECTOS EN EJECUCIÓN : INFORMES PARCIALES
      ✓ PROYECTOS FINALIZADOS: INFORME FINAL  
      ✓ AGENDAS Y/O ACTAS
      ✓ LISTADOS DE ASISTENCIA
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO
      ✓ MATERIAL EDUCATIVO UTILIZADO`,
    },
    {
      actividadExt: "Acompañamiento al sector empresarial",
      dedicacionSemanalExt: 0,
      dedicacionSemestreExt: 0,
      descripcionExt: "Actividad evaluación",
      productoExt:
        `✓INFORME DE GESTIÓN DEL ACOMPAÑAMIENTO REALIZADO AL SECTOR EMPRESARIAL DURANTE EL PERIODO ACADÉMICO
      ✓ ACTAS DE REUNIÓN
      ✓ LISTADOS DE ASISTENCIA
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO
      ✓ MATERIAL EDUCATIVO UTILIZADO`
    },
    {
      actividadExt: "Participación en proyectos de intervención comunitaria",
      dedicacionSemanalExt: 0,
      dedicacionSemestreExt: 0,
      descripcionExt: "Actividad gestión de eventos",
      productoExt:
      `✓ PROYECTOS EN EJECUCIÓN : INFORMES PARCIALES
      ✓ PROYECTOS FINALIZADOS: INFORME FINAL  
      ✓ AGENDAS Y/O ACTAS
      ✓ LISTADOS DE ASISTENCIA
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO
      ✓ MATERIAL EDUCATIVO UTILIZADO`,
    },
  ]);

  const [dataCulturales, setDataCulturales] = useState([
    {
      actividadCult: "Gestión de proyectos culturales",
      dedicacionSemanalCult: 0,
      dedicacionSemestreCult: 0,
      descripcionCult: "Actividad preparar clase",
      productoCult: 
      `✓INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO
      ✓ AGENDAS Y/O ACTAS
      ✓ LISTADOS DE ASISTENCIA
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO
      ✓ MATERIAL EDUCATIVO UTILIZADO`,
    },
    {
      actividadCult: "Promoción de la educación artística",
      dedicacionSemanalCult: 0,
      dedicacionSemestreCult: 0,
      descripcionCult: "Actividad evaluación",
      productoCult:
        `✓INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO
      ✓ AGENDAS Y/O ACTAS
      ✓ LISTADOS DE ASISTENCIA
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO
      ✓ MATERIAL EDUCATIVO UTILIZADO`
    },
    {
      actividadCult: "Divulgación de los valores culturales",
      dedicacionSemanalCult: 0,
      dedicacionSemestreCult: 0,
      descripcionCult: "Actividad evaluación",
      productoCult:
        ``
    },
  ]);

  const [dataGestion, setDataGestion] = useState([
    {
      actividadGest: "Participación como jurado y/o asesor académico en trabajos de grado",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad preparar clase",
      productoGest: 
      `✓OFICIO DE RETROALIMENTACIÓN DE OPCIONES DE GRADO PARA PREGRADO Y POSGRADO - F0-GD-51 (POR TRABAJO DE GRADO ASIGNADO)`,
    },
    {
      actividadGest: "Participación en procesos de registros calificados ",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓ DOCUMENTOS ASIGNADOS PARA EL REGISTRO CALIFICADO`
    },
    {
      actividadGest: "Participación en procesos de acreditación",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓ DOCUMENTOS ASIGNADOS PARA LA ACREDITACIÓN DEL PROGRAMA ACADÉMICO`
    },
    {
      actividadGest: "Participación en Consejos y Comités",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓ REPORTE DE LA ASISTENCIA A CONSEJOS Y COMITES SEGÚN CORRESPONDA`
    },
    {
      actividadGest: "Participación en procesos de autoevaluación",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓ DOCUMENTOS ASIGNADOS EN EL PROCESO DE AUTOEVALUACIÓN `
    },
    {
      actividadGest: "Participación en Investigaciones de mercado",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓ DOCUMENTO ESTUDIO DE MERCADO`
    },
    {
      actividadGest: "Participación en procesos de formación de profesores",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓ REPORTE DE LA ASISTENCIA A LOS PROCESOS DE FORMACIÓN EN LOS QUE HA SIDO CONVOCADO`
    },
    {
      actividadGest: "Programación y gestión de prácticas extramuros",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓ FORMATO PLANEACIÓN DE PRÁCTICA EXTRAMURO - FO-GD-25
      ✓INFORME DE LA PRACTICA EXTRAMURO - FO-GD-24
      ✓ LISTADOS DE ASISTENCIA 
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO`
    },
    {
      actividadGest: "Elaboración de exámenes para validaciones",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓ ACTA DE VALIDACIÓN - FO-GD-46`
    },
    {
      actividadGest: "Líder de CTeI, extensión y proyección social",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO
      ✓ AGENDAS Y/O ACTAS
      ✓ LISTADOS DE ASISTENCIA
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO
      ✓ MATERIAL EDUCATIVO UTILIZADO
      ✓ RECOPILACIÓN DE LOS PRODUCTOS DE PROYECTOS DE CTEI, EXTENSIÓN Y PROYECCIÓN SOCIAL DEL PROGRAMA ACADÉMICO`
    },
    {
      actividadGest: "Líder de resultados de aprendizaje ",
      dedicacionSemanalGest: 0,
      dedicacionSemestreGest: 0,
      descripcionGest: "Actividad evaluación",
      productoGest:
        `✓INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO
      ✓ AGENDAS Y/O ACTAS
      ✓ LISTADOS DE ASISTENCIA
      ✓ REGISTRO FOTOGRÁFICO Y/O VIDEO
      ✓ MATERIAL EDUCATIVO UTILIZADO
      ✓ MATRIZ DE RESULTADOS DE APRENDIZAJE DEL PROGRAMA - RAP 
      ✓INFORME DE LA EVALUACIÓN DE LOS RESULTADOS DE APRENDIZAJE DEL PROGRAMA - RAP
      ✓ INSTRUMENTOS  PARA LA EVALUACIÓN DE LOS RESULTADOS DE APRENDIZAJE DEL PROGRAMA - RAP `
    },
  ]);

  
  // Función para manejar cambios en los inputs de la tabla

  const handleInputChangeDocente = (index, name, value) => {
    const updatedData = [...dataDocente];
    updatedData[index][name] = value;
    setDataDocente(updatedData);
  };

  const handleInputChangeAcademicas = (index, name, value) => {
    const updatedData = [...dataAcademicas];
    
    // Validar si el valor es negativo
    if (value < 0) {
      value = 0; // Forzar el valor a cero si es negativo
    }
    
    updatedData[index][name] = value;
  
    if (name === 'dedicacionSemanalAca') {
      updatedData[index].dedicacionSemestreAca = value * 16;
    }
  
    setDataAcademicas(updatedData);
  };



  const handleInputChangeFormativas = (index, name, value) => {
    const updatedData = [...dataFormativas];

    // Validar si el valor es negativo
    if (value < 0) {
      value = 0; // Forzar el valor a cero si es negativo
    }
    
    updatedData[index][name] = value;

    if (name === 'dedicacionSemanalFor') {
      updatedData[index].dedicacionSemestreFor = value * 16;
    }

    setDataFormativas(updatedData);
  };

  const handleInputChangeCientificas = (index, name, value) => {
    const updatedData = [...dataCientificas];
    // Validar si el valor es negativo
    if (value < 0) {
      value = 0; // Forzar el valor a cero si es negativo
    }
    
    updatedData[index][name] = value;

    if (name === 'dedicacionSemanalCien') {
      updatedData[index].dedicacionSemestreCien = value * 16;
    }

    setDataCientificas(updatedData);
  };

  const handleInputChangeExtension = (index, name, value) => {
    const updatedData = [...dataExtension];
    // Validar si el valor es negativo
    if (value < 0) {
      value = 0; // Forzar el valor a cero si es negativo
    }
    
    updatedData[index][name] = value;

    if (name === 'dedicacionSemanalExt') {
      updatedData[index].dedicacionSemestreExt = value * 16;
    }
    setDataExtension(updatedData);
  };

  const handleInputChangeCulturales = (index, name, value) => {
    const updatedData = [...dataCulturales];
    // Validar si el valor es negativo
    if (value < 0) {
      value = 0; // Forzar el valor a cero si es negativo
    }
    
    updatedData[index][name] = value;

    if (name === 'dedicacionSemanalCult') {
      updatedData[index].dedicacionSemestreCult = value * 16;
    }
    setDataCulturales(updatedData);
  };

  const handleInputChangeGestion = (index, name, value) => {
    const updatedData = [...dataGestion];
    // Validar si el valor es negativo
    if (value < 0) {
      value = 0; // Forzar el valor a cero si es negativo
    }
    
    updatedData[index][name] = value;

    if (name === 'dedicacionSemanalGest') {
      updatedData[index].dedicacionSemestreGest = value * 16;
    }

    setDataGestion(updatedData);
  };



  const totalHorasSemanalesAcademicas = dataAcademicas.reduce(
    (total, item) => total + parseInt(item.dedicacionSemanalAca || 0),
    0
  );

  const totalHorasSemestralesAcademicas = dataAcademicas.reduce(
    (total, item) => total + parseInt(item.dedicacionSemestreAca || 0),
    0
  );

  const totalHorasSemanalesFormativas = dataFormativas.reduce(
    (total, item) => total + parseInt(item.dedicacionSemanalFor || 0),
    0
  );

  const totalHorasSemestralesFormativas = dataFormativas.reduce(
    (total, item) => total + parseInt(item.dedicacionSemestreFor || 0),
    0
  );

  const totalHorasSemanalesCientificas = dataCientificas.reduce(
    (total, item) => total + parseInt(item.dedicacionSemanalCien || 0),
    0
  );

  const totalHorasSemestralesCientificas = dataCientificas.reduce(
    (total, item) => total + parseInt(item.dedicacionSemestreCien || 0),
    0
  );

  const totalHorasSemanalesExtension = dataExtension.reduce(
    (total, item) => total + parseInt(item.dedicacionSemanalExt || 0),
    0
  );

  const totalHorasSemestralesExtension = dataExtension.reduce(
    (total, item) => total + parseInt(item.dedicacionSemestreExt || 0),
    0
  );

  const totalHorasSemanalesCulturales = dataCulturales.reduce(
    (total, item) => total + parseInt(item.dedicacionSemanalCult || 0),
    0
  );

  const totalHorasSemestralesCulturales = dataCulturales.reduce(
    (total, item) => total + parseInt(item.dedicacionSemestreCult || 0),
    0
  );

  const totalHorasSemanalesGestion = dataGestion.reduce(
    (total, item) => total + parseInt(item.dedicacionSemanalGest || 0),
    0
  );

  const totalHorasSemestralesGestion = dataGestion.reduce(
    (total, item) => total + parseInt(item.dedicacionSemestreGest || 0),
    0
  );


//Funciones para información Docente
const programasPorFacultad = {
  "Facultad de Ingeniería": [
    "Ingeniería de Sistemas",
    "Ingeniería Mecatrónica",
    "Ingeniería Industrial",
    "Ingeniería de Energías Renovables",
    "Ingeniería Ambiental"
  ],
  "Facultad de Ciencias Económicas y Administrativas": [
    "Administración de Empresas Turísticas - VIRTUAL",
    "Administración Comercial",
    "Administración Financiera y Bursátil",
    "Negocios Internacionales",
    "Mercadeo y Publicidad"
  ],
  "Facultad de Medicina y Ciencias Afines": [
    "Medicina Veterinaria y Zootecnia"
  ]
};

const handleFacultadChange = (index, value) => {
  handleInputChangeDocente(index, 'facultad', value);
  setProgramas(programasPorFacultad[value] || []);  // Actualizar los programas
};


const handleLimpiarTablaAsig = () => {
  setData(data.map(item => ({
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    periodo: '',
    dedicacionHorasSemanales: 0,
    dedicacionHorasSemestrales: 0
  })));
};


  const handleDownload = async () => {
    try {
      const response = await fetch(plantilla);
      const buffer = await response.arrayBuffer();

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      // Obtener la hoja de trabajo
      const worksheet = workbook.getWorksheet(1);

      //datos docente 
      worksheet.getCell('C6').value = dataDocente[0].profesor;
      worksheet.getCell('B7').value = daNOtaDocente[0].facultad;
      worksheet.getCell('F7').value = dataDocente[0].programa;    
      worksheet.getCell('B8').value = dataDocente[0].fecha;
      worksheet.getCell('F8').value = dataDocente[0].periodo;
      // mapeo Orientación de Clases  					
      worksheet.getCell('A14').value = parseFloat(data[0].asignatura);  
      worksheet.getCell('C14').value = parseFloat(data[0].programa);  
      worksheet.getCell('D14').value = parseFloat(data[0].grupo);
      worksheet.getCell('E14').value = parseFloat(data[0].sede);  		
      worksheet.getCell('F14').value = parseFloat(data[0].dedicacionHorasSemanales);  
     
      worksheet.getCell('A15').value = parseFloat(data[1].asignatura);  
      worksheet.getCell('C15').value = parseFloat(data[1].programa);  
      worksheet.getCell('D15').value = parseFloat(data[1].grupo);
      worksheet.getCell('E15').value = parseFloat(data[1].sede);  
      worksheet.getCell('F15').value = parseFloat(data[1].dedicacionHorasSemanales);

      worksheet.getCell('A16').value = parseFloat(data[2].asignatura);  
      worksheet.getCell('C16').value = parseFloat(data[2].programa);  
      worksheet.getCell('D16').value = parseFloat(data[2].grupo);
      worksheet.getCell('E16').value = parseFloat(data[2].sede);  
      worksheet.getCell('F16').value = parseFloat(data[2].dedicacionHorasSemanales);

      worksheet.getCell('A17').value = parseFloat(data[3].asignatura);  
      worksheet.getCell('C17').value = parseFloat(data[3].programa);  
      worksheet.getCell('D17').value = parseFloat(data[3].grupo);
      worksheet.getCell('E17').value = parseFloat(data[3].sede);  
      worksheet.getCell('F17').value = parseFloat(data[3].dedicacionHorasSemanales);

      worksheet.getCell('A18').value = parseFloat(data[4].asignatura);  
      worksheet.getCell('C18').value = parseFloat(data[4].programa);  
      worksheet.getCell('D18').value = parseFloat(data[4].grupo);
      worksheet.getCell('E18').value = parseFloat(data[4].sede);  
      worksheet.getCell('F18').value = parseFloat(data[4].dedicacionHorasSemanales);    

      worksheet.getCell('A19').value = parseFloat(data[5].asignatura);  
      worksheet.getCell('C19').value = parseFloat(data[5].programa);  
      worksheet.getCell('D19').value = parseFloat(data[5].grupo);
      worksheet.getCell('E19').value = parseFloat(data[5].sede);  
      worksheet.getCell('F19').value = parseFloat(data[5].dedicacionHorasSemanales);   

      //academicas sin formulas 
      worksheet.getCell('D26').value = parseFloat(dataAcademicas[2].dedicacionSemanalAca);   
      //formativas sin formulas
      worksheet.getCell('D29').value = parseFloat(dataFormativas[1].dedicacionSemanalFor);   
      worksheet.getCell('D30').value = parseFloat(dataFormativas[2].dedicacionSemanalFor);   

      //cientificas sin formulas
      worksheet.getCell('D35').value = parseFloat(dataCientificas[0].dedicacionSemanalCien);   
      worksheet.getCell('D36').value = parseFloat(dataCientificas[1].dedicacionSemanalCien);
      worksheet.getCell('D37').value = parseFloat(dataCientificas[2].dedicacionSemanalCien);
      worksheet.getCell('D38').value = parseFloat(dataCientificas[3].dedicacionSemanalCien);
      worksheet.getCell('D39').value = parseFloat(dataCientificas[4].dedicacionSemanalCien);

      //extension sin formulas
      worksheet.getCell('D45').value = parseFloat(dataExtension[0].dedicacionSemanalExt);
      worksheet.getCell('D46').value = parseFloat(dataExtension[1].dedicacionSemanalExt);
      worksheet.getCell('D47').value = parseFloat(dataExtension[2].dedicacionSemanalExt);
      
      //culutural sin formulas
      worksheet.getCell('D49').value = parseFloat(dataCulturales[0].dedicacionSemanalCult);
      worksheet.getCell('D50').value = parseFloat(dataCulturales[1].dedicacionSemanalCult);
      worksheet.getCell('D51').value = parseFloat(dataCulturales[2].dedicacionSemanalCult);
      //administriva sin formulas 
      worksheet.getCell('D57').value = parseFloat(dataGestion[0].dedicacionSemanalGest);
      worksheet.getCell('D58').value = parseFloat(dataGestion[1].dedicacionSemanalGest);
      worksheet.getCell('D59').value = parseFloat(dataGestion[2].dedicacionSemanalGest);
      worksheet.getCell('D60').value = parseFloat(dataGestion[3].dedicacionSemanalGest);
      worksheet.getCell('D61').value = parseFloat(dataGestion[4].dedicacionSemanalGest);
      worksheet.getCell('D62').value = parseFloat(dataGestion[5].dedicacionSemanalGest);
      worksheet.getCell('D63').value = parseFloat(dataGestion[6].dedicacionSemanalGest);
      worksheet.getCell('D64').value = parseFloat(dataGestion[7].dedicacionSemanalGest);
      worksheet.getCell('D65').value = parseFloat(dataGestion[8].dedicacionSemanalGest);
      worksheet.getCell('D66').value = parseFloat(dataGestion[9].dedicacionSemanalGest);
      worksheet.getCell('D67').value = parseFloat(dataGestion[10].dedicacionSemanalGest);
      

      
      const modifiedBuffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([modifiedBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "Agenda"+localStorage.getItem('name')+".xlsx");

      const userid = localStorage.getItem('idUser');


      const formData = new FormData();
      formData.append("file", new File([modifiedBuffer], "Agenda"+localStorage.getItem('name')+".xlsx", { type: blob.type }));
      formData.append("userId", userid);
      formData.append('facultad' ,dataDocente[0].facultad);
      formData.append('programa', dataDocente[0].programa)


      // Enviar la solicitud al backend
      const responseUpload = await axios.post("http://localhost:8080/api/agendas/upload", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      console.log("Archivo subido:", responseUpload.data);

    } catch (error) {
      console.error("Error al cargar o editar el archivo Excel:", error);
    }
  };




const handleLimpiar = () => {
  setDataDocente(dataDocente.map(item => ({
    profesor: "",
    facultad: "",
    programa: "",
    fecha: "",
    periodo: ""
  })));
};
const handleLimpiarAsig = (index) => {
  const updatedData = [...data];
  updatedData[index] = {
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    periodo: '',
    dedicacionHorasSemanales: 0,
    dedicacionHorasSemestrales: 0,
  };
  setData(updatedData);
};

//Funciones para nueva asignatura

const [data, setData] = useState([
  {
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    dedicacionHorasSemanales: 0,
    dedicacionHorasSemestrales: 0,
  },
  {
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    dedicacionHorasSemanales: 0,
    dedicacionHorasSemestrales: 0,
  },
  {
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    dedicacionHorasSemanales: 0,
    dedicacionHorasSemestrales: 0,
  },
  {
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    dedicacionHorasSemanales: 0,
    dedicacionHorasSemestrales: 0,
  },
  {
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    dedicacionHorasSemanales: 0,
    dedicacionHorasSemestrales: 0,
  },
  {
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    dedicacionHorasSemanales: 0,
    dedicacionHorasSemestrales: 0,
  },
]);


const handleChange = (index, name, value) => {
  const updatedData = [...data];
  // Validar si el valor es negativo
  if (value < 0) {
    value = 0; // Forzar el valor a cero si es negativo
  }
  
  updatedData[index][name] = value;

  setData(updatedData);

  if (name === 'dedicacionHorasSemanales') {
    updatedData[index].dedicacionHorasSemestrales = value * 16;
  }
  setData(updatedData);
};



  const totalHorasSemanalesAsignatura = data.reduce(
    (total, item) => total + parseInt(item.dedicacionHorasSemanales || 0),
    0
  );

  const totalHorasSemestralesAsignatura = data.reduce(
    (total, item) => total + parseInt(item.dedicacionHorasSemestrales || 0),
    0
  );

  



  const [programas, setProgramas] = useState([]);
  const combinedData = [
    ...dataDocente,
    ...data,
    ...dataAcademicas,
    ...dataFormativas,
    ...dataCientificas,
    ...dataExtension,
    ...dataCulturales,
    ...dataGestion,
  ];

 return (
    <>
    <br></br>
      <Container className="text-success text-center">
        <h1>Agenda Semestral Profesoral</h1>
      </Container>
      <br></br>
      <Container>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="1" title={<span className="text-success">Lab. Docencia</span>}>
          <Button variant="success"  style={{ marginBottom: "20px" }}>Exportar a Excel</Button>
          <Table striped bordered hover>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Nombre del Profesor
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Facultad
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Programa
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Fecha
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Periodo
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataDocente.map((elemento, index) => (
                    <tr key={index}>
                      <td>
                      <FormGroup>
    <Input
      className="form-control"
      type="text"
      value={elemento.profesor}
      onChange={(e) => {
        const value = e.target.value;
        // Expresión regular para permitir solo letras y espacios
        const regex = /^[A-Za-z\s]*$/;

        // Verifica si el valor coincide con la expresión regular
        if (regex.test(value) || value === '') { // Permite vacío para facilitar la eliminación
          handleInputChangeDocente(index, 'profesor', value);
        }
      }}
    />
  </FormGroup>
                      </td>
                      <td>
                      <FormGroup>
  <Input
    className="form-control"
    type="select"
    value={elemento.facultad}
    onChange={(e) => handleFacultadChange(index, e.target.value)}
  >
    <option value="">Seleccionar</option>
    <option value="Facultad de Ingeniería">Facultad de Ingeniería</option>
    <option value="Facultad de Ciencias Económicas y Administrativas">Facultad de Ciencias Económicas y Administrativas</option>
    <option value="Facultad de Medicina y Ciencias Afines">Facultad de Medicina y Ciencias Afines</option>
  </Input>
</FormGroup>
                      </td>
                      <td>
                      <FormGroup>
  <Input
    className="form-control"
    type="select"
    value={elemento.programa}
    onChange={(e) =>
      handleInputChangeDocente(index, 'programa', e.target.value)
    }
  >
    <option value="">Seleccionar</option>
    {programas.map((programa, i) => (
      <option key={i} value={programa}>{programa}</option>
    ))}
  </Input>
</FormGroup>
                      </td>
                      <td>
                      <FormGroup>
                  <Input
                    className="form-control"
                    type="date"
                    value={elemento.fecha}
                    onChange={(e) =>
                      handleInputChangeDocente(index, 'fecha', e.target.value)
                    }
                  >
                  </Input>
                </FormGroup>
                      </td>
                      <td>
                      <FormGroup>
  <Input
    className="form-control"
    type="text"
    value={elemento.periodo}
    onChange={(e) => {
      const value = e.target.value;
      // Expresión regular para permitir solo letras y espacios
      const regex = /^[A-Za-z0-9\s]*$/;

      // Verifica si el valor coincide con la expresión regular
      if (regex.test(value) || value === '') { // Permite vacío para facilitar la eliminación
        handleInputChangeDocente(index, 'periodo', value);
      }
    }}
  />
</FormGroup>
                      </td>
                      <td>
                      <Button variant="secondary" onClick={handleLimpiar}>Limpiar</Button>
                      </td>
            </tr>
          ))}
        </tbody>
      </Table>
          
          <Container className="d-flex justify-content-between align-items-center">
      <Button variant="success">Agregar Asignatura</Button>
      <div className="d-flex align-items-center">
      <Button className="mb-0 me-2" variant="secondary" onClick={handleLimpiarTablaAsig}>Limpiar Tabla</Button>
      </div>
      </Container>
      <br></br>
            <Container>            
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Nombre Asignatura
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Programa
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Grupo
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Sede
                    </th>
                    <th
                      style={{
                        width: "190x",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semanales)
                    </th>
                    <th
                      style={{
                        width: "180px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semestre)
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Acciones
                    </th>
                  </tr>
                  
                </thead>
                <tbody>
                  {data.map((elemento, index) => (
                    <tr key={index}>
                      <td>
                <FormGroup>
                  <Input
                    className="form-control"
                    type="select"
                    value={elemento.asignatura}
                    onChange={(e) =>
                      handleChange(index, 'asignatura', e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="Sistemas Distribuidos">Sistemas Distribuidos</option>
                    <option value="Arquitectura de Computadores">Arquitectura de Computadores</option>
                  </Input>
                </FormGroup>
                      </td>
                      <td>
                      <FormGroup>
                  <Input
                    className="form-control"
                    type="select"
                    value={elemento.programa}
                    onChange={(e) =>
                      handleChange(index, 'programa', e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                    <option value="Ingeniería Industrial">Ingeniería Industrial</option>

                  </Input>
                </FormGroup>
                      </td>
                      <td>
                      <FormGroup>
                  <Input
                    className="form-control"
                    type="select"
                    value={elemento.grupo}
                    onChange={(e) =>
                      handleChange(index, 'grupo', e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="90A">90A</option>
                    <option value="90B">90B</option>
                  </Input>
                </FormGroup>
                      </td>
                      <td>
                      <FormGroup>
                  <Input
                    className="form-control"
                    type="select"
                    value={elemento.sede}
                    onChange={(e) =>
                      handleChange(index, 'sede', e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="Sede Principal">Sede Principal Quirinal</option>
                    <option value="Campus Norte">Campus Norte Prado Alto</option>
                  </Input>
                </FormGroup>
                      </td>
                      <td>
                <FormControl
                  type="number"
                  value={elemento.dedicacionHorasSemanales}
                  onChange={(e) =>
                    handleChange(
                      index,
                      'dedicacionHorasSemanales',
                      e.target.value
                    )
                  }
                  style={{ width: '100px' }}
                />
              </td>
              <td>
                <FormControl
                  type="number"
                  readOnly
                  value={elemento.dedicacionHorasSemestrales}
                  onChange={(e) =>
                    handleChange(
                      index,
                      'dedicacionHorasSemestrales',
                      e.target.value
                    )
                  }
                  style={{ width: '100px' }}
                />
              </td>
              <td>
              <Button variant="secondary" onClick={() => handleLimpiarAsig(index)}>Limpiar</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th>TOTAL</th>
            <th></th>
            <th></th>
            <th></th>
            <th>{totalHorasSemanalesAsignatura}</th>
            <th>{totalHorasSemestralesAsignatura}</th>
          </tr>
        </thead>
              </Table>
            </Container>
            <br></br>
          </Tab>
          <Tab
            eventKey="2"
            title={
              <span className="text-success">Lab. Académicas y Formativas</span>
            }
          >
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Actividad
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semanales)
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semestre)
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Descripción de la Actividad
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Producto
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      Académicas
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {dataAcademicas.map((item, index) => (
                    <tr key={index}>
                      <td>{item.actividadAca}</td>
                      <td>
                        <FormControl
                          type="number"
                          value={item.dedicacionSemanalAca}
                          onChange={(e) =>
                            handleInputChangeAcademicas(
                              index,
                              "dedicacionSemanalAca",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          readOnly
                          value={item.dedicacionSemestreAca}
                          onChange={(e) =>
                            handleInputChangeAcademicas(
                              index,
                              "dedicacionSemestreAca",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          as="textarea"
                          value={item.descripcionAca}
                          onChange={(e) =>
                            handleInputChangeAcademicas(
                              index,
                              "descripcionAca",
                              e.target.value
                            )
                          }
                          style={{ width: "100%" }}
                        />
                      </td>
                      <td>{item.productoAca}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      TOTAL
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemanalesAcademicas}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemestralesAcademicas}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                  </tr>
                </thead>
                
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      Formativas
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {dataFormativas.map((item, index) => (
                    <tr key={index}>
                      <td>{item.actividadFor}</td>
                      <td>
                        <FormControl
                          type="number"
                          value={item.dedicacionSemanalFor}
                          onChange={(e) =>
                            handleInputChangeFormativas(
                              index,
                              "dedicacionSemanalFor",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          readOnly
                          value={item.dedicacionSemestreFor}
                          onChange={(e) =>
                            handleInputChangeFormativas(
                              index,
                              "dedicacionSemestreFor",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          as="textarea"
                          value={item.descripcionFor}
                          onChange={(e) =>
                            handleInputChangeFormativas(
                              index,
                              "descripcionFor",
                              e.target.value
                            )
                          }
                          style={{ width: "100%" }}
                        />
                      </td>
                      <td>{item.productoFor}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      TOTAL
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemanalesFormativas}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemestralesFormativas}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                  </tr>
                </thead>
              </Table>
            </div>
          </Tab>
          <Tab
            eventKey="3"
            title={<span className="text-success">Lab. Científicas</span>}
          >
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Actividad
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semanales)
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semestre)
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Descripción de la Actividad
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Producto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataCientificas.map((item, index) => (
                    <tr key={index}>
                      <td>{item.actividadCien}</td>
                      <td>
                        <FormControl
                          type="number"
                          value={item.dedicacionSemanalCien}
                          onChange={(e) =>
                            handleInputChangeCientificas(
                              index,
                              "dedicacionSemanalCien",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          readOnly
                          value={item.dedicacionSemestreCien}
                          onChange={(e) =>
                            handleInputChangeCientificas(
                              index,
                              "dedicacionSemestreCien",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          as="textarea"
                          value={item.descripcionCien}
                          onChange={(e) =>
                            handleInputChangeCientificas(
                              index,
                              "descripcionCien",
                              e.target.value
                            )
                          }
                          style={{ width: "100%" }}
                        />
                      </td>
                      <td>{item.productoCien}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      TOTAL
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemanalesCientificas}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemestralesCientificas}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                  </tr>
                </thead>
              </Table>
            </div>
          </Tab>
          <Tab
            eventKey="4"
            title={
              <span className="text-success">
                Lab. de Extensión y Culturales
              </span>
            }
          >
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Actividad
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semanales)
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semestre)
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Descripción de la Actividad
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Producto
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      Extensión
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {dataExtension.map((item, index) => (
                    <tr key={index}>
                      <td>{item.actividadExt}</td>
                      <td>
                        <FormControl
                          type="number"
                          value={item.dedicacionSemanalExt}
                          onChange={(e) =>
                            handleInputChangeExtension(
                              index,
                              "dedicacionSemanalExt",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          readOnly
                          value={item.dedicacionSemestreExt}
                          onChange={(e) =>
                            handleInputChangeExtension(
                              index,
                              "dedicacionSemestreExt",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          as="textarea"
                          value={item.descripcionExt}
                          onChange={(e) =>
                            handleInputChangeExtension(
                              index,
                              "descripcionExt",
                              e.target.value
                            )
                          }
                          style={{ width: "100%" }}
                        />
                      </td>
                      <td>{item.productoExt}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      TOTAL
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemanalesExtension}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemestralesExtension}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                  </tr>
                </thead>
                
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      Culturales
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {dataCulturales.map((item, index) => (
                    <tr key={index}>
                      <td>{item.actividadCult}</td>
                      <td>
                        <FormControl
                          type="number"
                          value={item.dedicacionSemanalCult}
                          onChange={(e) =>
                            handleInputChangeCulturales(
                              index,
                              "dedicacionSemanalCult",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          readOnly
                          value={item.dedicacionSemestreCult}
                          onChange={(e) =>
                            handleInputChangeCulturales(
                              index,
                              "dedicacionSemestreCult",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          as="textarea"
                          value={item.descripcionCult}
                          onChange={(e) =>
                            handleInputChangeCulturales(
                              index,
                              "descripcionCult",
                              e.target.value
                            )
                          }
                          style={{ width: "100%" }}
                        />
                      </td>
                      <td>{item.productoCult}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      TOTAL
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemanalesCulturales}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemestralesCulturales}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                  </tr>
                </thead>
              </Table>
            </div>
          </Tab>
          <Tab
            eventKey="5"
            title={
              <span className="text-success">
                Act. de Gestión Académica y Administrativas
              </span>
            }
          >
            <div>                
               
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Actividad
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semanales)
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Dedicación (Horas Semestre)
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Descripción de la Actividad
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Producto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataGestion.map((item, index) => (
                    <tr key={index}>
                      <td>{item.actividadGest}</td>
                      <td>
                        <FormControl
                          type="number"
                          value={item.dedicacionSemanalGest}
                          onChange={(e) =>
                            handleInputChangeGestion(
                              index,
                              "dedicacionSemanalGest",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          readOnly
                          value={item.dedicacionSemestreGest}
                          onChange={(e) =>
                            handleInputChangeGestion(
                              index,
                              "dedicacionSemestreGest",
                              e.target.value
                            )
                          }
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <FormControl
                          as="textarea"
                          value={item.descripcionGest}
                          onChange={(e) =>
                            handleInputChangeGestion(
                              index,
                              "descripcionGest",
                              e.target.value
                            )
                          }
                          style={{ width: "100%" }}
                        />
                      </td>
                      <td>{item.productoGest}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                  
                      }}
                    >
                      TOTAL
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemanalesGestion}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                      {totalHorasSemestralesGestion}
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                    <th
                      style={{
                        width: "100px",
                  
                      }}
                    >
                    </th>
                  </tr>
                </thead>
              </Table>
              <Container className="d-flex justify-content-between align-items-center">
                <Button variant="success"  style={{ marginBottom: "20px" } }onClick={handleDownload}> Guardar informacion</Button>
                </Container>
              
            </div>
          </Tab>
        </Tabs>
      </Container>

      
    </>
  );
};
export default AgendaForm;
