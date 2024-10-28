import React from 'react';
import './App.css';
import LoginCorhuila from './Components/LoginCorhuila/LoginCorhuila';
import FormularioAgenda from './Components/Agenda/FormularioAgenda';
import Header from './Components/Header/Header';
import EstadoAgenda from './Components/DirectorPrograma/EstadoAgenda'
import AdminDashboard from './Components/Admin/AdminDashboard';
import AcademicAgenda from './Components/Decano/AcademicAgenda';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<LoginCorhuila />}/>
      <Route path="/agenda" element={<><Header /><FormularioAgenda /></>} />
      <Route path="/director" element={<><Header /><EstadoAgenda /></>} />
      <Route path="/decano" element={<><Header /><AcademicAgenda /></>} />
      <Route path="/admin" element={<><Header /><AdminDashboard /></>} />
    </Routes>
  </Router>
  );
}

export default App;
