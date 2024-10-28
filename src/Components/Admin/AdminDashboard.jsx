import React, { useState } from 'react';
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', role: 'Editor' },
    { id: 2, name: 'Ana García', role: 'Admin' },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = () => {
    setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
    setEditingUser(null);
  };

  const handleAddUser = () => {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id: newId, ...newUser }]);
    setNewUser({ name: '', role: '' });
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>
      
      <h3>Crear Usuario</h3>
      <div className="create-user">
        <input 
          type="text" 
          placeholder="Nombre" 
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Rol" 
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <button className="add-button" onClick={handleAddUser}>Agregar Usuario</button>
      </div>

      <h3>Lista de Usuarios</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{editingUser?.id === user.id ? (
                <input 
                  type="text" 
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
              ) : (
                user.name
              )}</td>
              <td>{editingUser?.id === user.id ? (
                <input 
                  type="text" 
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                />
              ) : (
                user.role
              )}</td>
              <td>
                {editingUser?.id === user.id ? (
                  <button className="save-button" onClick={handleSaveEdit}>Guardar</button>
                ) : (
                  <button className="edit-button" onClick={() => handleEdit(user)}>✏ Editar</button>
                )}
                <button className="delete-button" onClick={() => handleDelete(user.id)}>❌ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;