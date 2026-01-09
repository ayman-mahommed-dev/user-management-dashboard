import "./EmployeeTable.css";

function EmployeeTable({ employees, onEdit, onDelete, loading }) {
  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "?";

  const getStatusClass = (status) => {
    switch (status) {
      case "active": return "status-active";
      case "on-leave": return "status-leave";
      case "inactive": return "status-inactive";
      default: return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active": return "Active";
      case "on-leave": return "On Leave";
      case "inactive": return "Inactive";
      default: return status;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading employees...</p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-users-slash empty-icon"></i>
        <h3>No Employees Found</h3>
        <p>Add your first employee or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th><i className="fas fa-user"></i> Employee</th>
            <th><i className="fas fa-briefcase"></i> Position</th>
            <th><i className="fas fa-building"></i> Department</th>
            <th><i className="fas fa-dollar-sign"></i> Salary</th>
            <th><i className="fas fa-circle-check"></i> Status</th>
            <th><i className="fas fa-calendar"></i> Join Date</th>
            <th><i className="fas fa-gear"></i> Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="employee-cell">
                <div className="employee-info">
                  <div className="avatar">{getInitial(emp.name)}</div>
                  <div className="employee-details">
                    <span className="employee-name">{emp.name}</span>
                    <span className="employee-email">{emp.email}</span>
                  </div>
                </div>
              </td>
              <td className="position-cell">{emp.position}</td>
              <td className="department-cell">
                <span className="department-badge">{emp.department}</span>
              </td>
              <td className="salary-cell">${emp.salary?.toLocaleString()}</td>
              <td className="status-cell">
                <span className={`status-badge ${getStatusClass(emp.status)}`}>
                  {getStatusText(emp.status)}
                </span>
              </td>
              <td className="date-cell">{formatDate(emp.joinDate)}</td>
              <td className="actions-cell">
                <div className="action-buttons">
                  <button className="btn-action btn-edit" onClick={() => onEdit(emp)} title="Edit">
                    <i className="fas fa-pen"></i>
                  </button>
                  <button className="btn-action btn-delete" onClick={() => onDelete(emp.id)} title="Delete">
                    <i className="fas fa-trash"></i>
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

export default EmployeeTable;
