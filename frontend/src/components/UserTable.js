import "./UserTable.css";

function UserTable({ users, onEdit, onDelete, loading }) {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-inbox empty-icon"></i>
        <h3>No Users Found</h3>
        <p>Start by adding your first user using the form above.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th><i className="fas fa-hashtag"></i> ID</th>
            <th><i className="fas fa-user"></i> Name</th>
            <th><i className="fas fa-envelope"></i> Email</th>
            <th><i className="fas fa-gear"></i> Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="id-cell">{user.id}</td>
              <td className="name-cell">
                <div className="user-info">
                  <span className="avatar">{getInitial(user.name)}</span>
                  <span className="user-name">{user.name}</span>
                </div>
              </td>
              <td className="email-cell">
                <a href={`mailto:${user.email}`}>
                  <i className="fas fa-envelope"></i>
                  {user.email}
                </a>
              </td>
              <td className="actions-cell">
                <div className="action-buttons">
                  <button
                    className="btn-action btn-edit"
                    onClick={() => onEdit(user)}
                    title="Edit user"
                  >
                    <i className="fas fa-pen"></i>
                    Edit
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => onDelete(user.id)}
                    title="Delete user"
                  >
                    <i className="fas fa-trash"></i>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
