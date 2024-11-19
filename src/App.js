import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import Formulario from './components/DocenteFormulario';
import Navbarnew from './components/Navbarnew';
import AprobarDrPrograma from './components/DrPrograma';
import AprobarDecano from './components/Decano';
import GestionAdministrador from './components/Administrador';
import AgendasDocente from './components/AgendasDocente';
import DirectorPrograma from './components/DirectorPrograma';
import DecanoFacultad from './components/DecanoFacultad';
import HistoricoDecano from './components/HistoricoDecanoFacultad';
import HistoricoDirector from './components/HistoricoDirectorPrograma';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/aprobacion-dir" element={<><Navbarnew /><AprobarDrPrograma /></>} />
        <Route path="/aprobacion-dec" element={<><Navbarnew /><AprobarDecano /></>} />
        <Route path="/admin" element={<><Navbarnew /><GestionAdministrador /></>} />
        <Route path="/formulario-docente" element={<><Navbarnew /><Formulario /></>} />
        <Route path="/agendas-docente" element={<><Navbarnew /><AgendasDocente /></>} />
        <Route path="/director" element={<><Navbarnew /><DirectorPrograma /></>} />
        <Route path="/director/historico" element={<><Navbarnew /><HistoricoDirector /></>} />
        <Route path="/decano" element={<><Navbarnew /><DecanoFacultad /></>} />
        <Route path="/decano/historico" element={<><Navbarnew /><HistoricoDecano /></>} />
      </Routes>
    </Router>
  );
}

export default App;
