import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return <p className="no-users">No users found. Add some users!</p>;
  }

  return (
    <div className="user-list">
      <h2>User List ({users.length} users)</h2>
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
                  onClick={() => onEdit(user)}
                  className="btn btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
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
  );
};

export default UserList;