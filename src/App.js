import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Load users from localStorage on initial render
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save users to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      alert('Please fill all fields');
      return;
    }

    if (editingId) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingId ? { ...user, name, email, phone } : user
      ));
      setEditingId(null);
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        name,
        email,
        phone
      };
      setUsers([...users, newUser]);
    }

    // Clear form
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setEditingId(user.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setPhone('');
    setEditingId(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management System</h1>
      </header>
      
      <main className="container">
        {/* Add/Edit User Form */}
        <div className="form-section">
          <h2>{editingId ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update User' : 'Add User'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* User List */}
        <div className="list-section">
          <h2>User List ({users.length} users)</h2>
          
          {users.length === 0 ? (
            <p className="no-users">No users found. Add some users!</p>
          ) : (
            <div className="user-list">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td className="actions">
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Clear All Button */}
        {users.length > 0 && (
          <div className="clear-section">
            <button 
              onClick={() => {
                if (window.confirm('Clear all users?')) {
                  setUsers([]);
                }
              }}
              className="btn btn-clear"
            >
              Clear All Users
            </button>
            <p className="info">Users are stored in localStorage. Data persists across page reloads.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
