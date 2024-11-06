import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    nombre: '',
    apellidos: '',
    celular: '',
    correo: '',
    cedula: '',
    rol: ''
  });
  const [error, setError] = useState('');

  const handleAddUser = () => {
    if (!newUser.nombre || !newUser.apellidos || !newUser.celular || !newUser.correo || !newUser.cedula || !newUser.rol) {
      setError('Todos los campos son obligatorios. Por favor, completa todos los campos.');
      return;
    }

    setError('');
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id: newId, ...newUser }]);
    setNewUser({
      nombre: '',
      apellidos: '',
      celular: '',
      correo: '',
      cedula: '',
      rol: ''
    });
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administración - Gestión de Usuarios</h2>

      <h3>Crear Usuario</h3>
      {error && <div className="error-message">{error}</div>}
      <div className="create-user">
        <div className="form-row">
          <div className="form-column">
            <input
              type="text"
              placeholder="Nombre"
              value={newUser.nombre}
              onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Celular"
              value={newUser.celular}
              onChange={(e) => setNewUser({ ...newUser, celular: e.target.value })}
            />
            <input
              type="text"
              placeholder="Cédula de Ciudadanía"
              value={newUser.cedula}
              onChange={(e) => setNewUser({ ...newUser, cedula: e.target.value })}
            />
          </div>
          <div className="form-column">
            <input
              type="text"
              placeholder="Apellidos"
              value={newUser.apellidos}
              onChange={(e) => setNewUser({ ...newUser, apellidos: e.target.value })}
            />
            <input
              type="email"
              placeholder="Correo"
              value={newUser.correo}
              onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
            />
            <select
              value={newUser.rol}
              onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
            >
              <option value="">Seleccione un Rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Director de Programa">Director de Programa</option>
              <option value="Decano">Decano</option>
              <option value="Profesor">Profesor</option>
              <option value="Catedrático">Catedrático</option>
            </select>
          </div>
        </div>
        <button className="add-button" onClick={handleAddUser}>Agregar Usuario</button>
      </div>

      <h3>Lista de Usuarios</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Celular</th>
            <th>Correo</th>
            <th>Cédula</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellidos}</td>
              <td>{user.celular}</td>
              <td>{user.correo}</td>
              <td>{user.cedula}</td>
              <td>{user.rol}</td>
              <td>
                <button className="delete-button" onClick={() => setUsers(users.filter(u => u.id !== user.id))}>❌ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
