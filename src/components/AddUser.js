import React, { useState } from 'react';
import UserForm from './UserForm';

const AddUser = ({ onAddUser }) => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (userData) => {
    onAddUser(userData);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <div className="add-user-toggle">
        <button 
          onClick={() => setShowForm(true)} 
          className="btn btn-primary"
        >
          Add New User
        </button>
      </div>
    );
  }

  return (
    <div className="add-user-form">
      <h2>Add New User</h2>
      <UserForm 
        onSubmit={handleSubmit} 
        onCancel={() => setShowForm(false)}
      />
    </div>
  );
};

export default AddUser;