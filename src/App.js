import React from 'react';
import './App.css';
import LoginCorhuila from './Components/LoginCorhuila/LoginCorhuila';
import FormularioAgenda from './Components/Agenda/FormularioAgenda';
import Header from './Components/Header/Header';
import EstadoAgenda from './Components/DirectorPrograma/EstadoAgenda'
import AcademicAgenda from './Components/Decano/AcademicAgenda';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminWelcome from './Components/Admin/AdminWelcome';
import AdminDashboard from './Components/Admin/AdminDashboard';


function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<><Header /><LoginCorhuila /></>}/>
      <Route path="/agenda" element={<><Header /><FormularioAgenda /></>} />
      <Route path="/director" element={<><Header /><EstadoAgenda /></>} />
      <Route path="/decano" element={<><Header /><AcademicAgenda /></>} />
      <Route path="/admin" element={<><Header /><AdminWelcome /></>} />
      <Route path="/admindashboard" element={<><Header /><AdminDashboard /></>} />
    </Routes>
  </Router>
  );
}

export default App;