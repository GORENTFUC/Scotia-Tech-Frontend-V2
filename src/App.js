import React from 'react';
import './App.css';
import LoginCorhuila from './Components/LoginCorhuila/LoginCorhuila';
import FormularioAgenda from './Components/Agenda/FormularioAgenda';
import Header from './Components/Header/Header';
import EstadoAgenda from './Components/DirectorPrograma/EstadoAgenda';
import AcademicAgenda from './Components/Decano/AcademicAgenda';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminWelcome from './Components/Admin/AdminWelcome';
import AdminDashboard from './Components/Admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Header /> {}
      <div className="main-content"> {}
        <Routes>
          <Route path="/" element={<LoginCorhuila />} />
          <Route path="/agenda" element={<FormularioAgenda />} />
          <Route path="/director" element={<EstadoAgenda />} />
          <Route path="/decano" element={<AcademicAgenda />} />
          <Route path="/admin" element={<AdminWelcome />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
