import { useState, useEffect } from "react";
import "./EmployeeForm.css";

function EmployeeForm({ isOpen, onClose, onSubmit, editingEmployee, options }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    salary: "",
    status: "active",
    joinDate: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || "",
        email: editingEmployee.email || "",
        phone: editingEmployee.phone || "",
        position: editingEmployee.position || "",
        department: editingEmployee.department || "",
        salary: editingEmployee.salary || "",
        status: editingEmployee.status || "active",
        joinDate: editingEmployee.joinDate || new Date().toISOString().split("T")[0]
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        salary: "",
        status: "active",
        joinDate: new Date().toISOString().split("T")[0]
      });
    }
  }, [editingEmployee, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "salary" ? (value === "" ? "" : Number(value)) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      salary: Number(formData.salary) || 0
    });
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay" onClick={onClose}>
      <form className="employee-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="form-header-left">
            <div className="form-header-icon">
              <i className={`fas ${editingEmployee ? "fa-user-pen" : "fa-user-plus"}`}></i>
            </div>
            <div>
              <h2>{editingEmployee ? "Edit Employee" : "Add New Employee"}</h2>
              <p>{editingEmployee ? "Update employee information" : "Fill in the employee details"}</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <i className="fas fa-xmark"></i>
          </button>
        </div>

        <div className="form-body">
          <div className="form-grid">
            <div className="form-group">
              <label><i className="fas fa-user"></i> Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><i className="fas fa-envelope"></i> Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><i className="fas fa-phone"></i> Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label><i className="fas fa-building"></i> Department</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {options.departments?.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><i className="fas fa-briefcase"></i> Position</label>
              <select name="position" value={formData.position} onChange={handleChange} required>
                <option value="">Select Position</option>
                {options.positions?.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><i className="fas fa-dollar-sign"></i> Salary</label>
              <input
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label><i className="fas fa-toggle-on"></i> Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label><i className="fas fa-calendar"></i> Join Date</label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            <i className="fas fa-xmark"></i> Cancel
          </button>
          <button type="submit" className={`btn ${editingEmployee ? "btn-success" : "btn-primary"}`}>
            <i className={`fas ${editingEmployee ? "fa-check" : "fa-plus"}`}></i>
            {editingEmployee ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
