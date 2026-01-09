import { useState, useEffect } from "react";
import "./UserForm.css";

function UserForm({ onSubmit, editingUser, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please enter name and email");
      return;
    }
    onSubmit({ name: name.trim(), email: email.trim() });
    setName("");
    setEmail("");
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div className="form-icon">
          <i className={`fas ${editingUser ? "fa-pen-to-square" : "fa-user-plus"}`}></i>
        </div>
        <div>
          <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
          <p>{editingUser ? "Update user information below" : "Fill in the details to add a new user"}</p>
        </div>
      </div>

      <div className="form-fields">
        <div className="form-group">
          <label>
            <i className="fas fa-user"></i>
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <i className="fas fa-envelope"></i>
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className={`btn ${editingUser ? "btn-success" : "btn-primary"}`}>
          <i className={`fas ${editingUser ? "fa-check" : "fa-plus"}`}></i>
          {editingUser ? "Update User" : "Add User"}
        </button>
        {editingUser && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            <i className="fas fa-xmark"></i>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
