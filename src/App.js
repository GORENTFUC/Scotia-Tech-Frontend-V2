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
import { AuthProvider } from './Utils/AuthContext';
import ProtectedRoute from './Utils/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LoginCorhuila />} />
            <Route
              path="/agenda"
              element={
                <ProtectedRoute role="agenda">
                  <FormularioAgenda />
                </ProtectedRoute>
              }
            />
            <Route
              path="/director"
              element={
                <ProtectedRoute role="director">
                  <EstadoAgenda />
                </ProtectedRoute>
              }
            />
            <Route
              path="/decano"
              element={
                <ProtectedRoute role="decano">
                  <AcademicAgenda />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminWelcome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admindashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
