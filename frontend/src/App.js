import { useEffect, useState, useMemo, useCallback } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import { ToastContainer, useToast } from "./components/Toast";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import "./App.css";

const ITEMS_PER_PAGE = 5;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null });
  const { toasts, addToast, removeToast } = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to load users. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }
    const [field, direction] = sortBy.split("-");
    result.sort((a, b) => {
      let comparison = 0;
      if (field === "id") comparison = a.id - b.id;
      else if (field === "name") comparison = a.name.localeCompare(b.name);
      else if (field === "email") comparison = a.email.localeCompare(b.email);
      return direction === "desc" ? -comparison : comparison;
    });
    return result;
  }, [users, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedUsers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const validateForm = (userData) => {
    const nameRegex = /^[a-zA-Z\s\u0600-\u06FF]{2,50}$/;
    if (!nameRegex.test(userData.name)) {
      addToast("Name must be 2-50 characters and contain only letters", "error");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      addToast("Please enter a valid email address", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (userData) => {
    if (!validateForm(userData)) return;
    try {
      if (editingUser) {
        await updateUser(editingUser.id, userData);
        addToast(`User "${userData.name}" updated successfully`, "success");
        setEditingUser(null);
      } else {
        await createUser(userData);
        addToast(`User "${userData.name}" added successfully`, "success");
      }
      fetchUsers();
    } catch (err) {
      addToast(err.message, "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, userId: id });
  };

  const handleDeleteConfirm = async () => {
    try {
      const userToDelete = users.find((u) => u.id === deleteModal.userId);
      await deleteUser(deleteModal.userId);
      addToast(`User "${userToDelete?.name}" deleted successfully`, "success");
      fetchUsers();
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setDeleteModal({ isOpen: false, userId: null });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    addToast(`Editing user "${user.name}"`, "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    addToast("Edit cancelled", "warning");
  };

  return (
    <div className="app">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, userId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        type="danger"
      />

      <header className="app-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-users-gear"></i>
            User Management
          </h1>
          <p>A modern dashboard to manage your users efficiently</p>
          <div className="header-stats">
            <div className="stat-item">
              <i className="fas fa-users stat-icon users"></i>
              <span className="stat-number">{users.length}</span>
              <span className="stat-label">Total Users</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-database stat-icon crud"></i>
              <span className="stat-number">4</span>
              <span className="stat-label">CRUD Operations</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-mobile-screen stat-icon responsive"></i>
              <span className="stat-number">100%</span>
              <span className="stat-label">Responsive</span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <i className="fas fa-triangle-exclamation"></i>
            {error}
          </div>
        )}

        <UserForm
          onSubmit={handleSubmit}
          editingUser={editingUser}
          onCancel={handleCancelEdit}
        />

        <section className="users-section">
          <div className="section-header">
            <h2>
              <i className="fas fa-table-list"></i>
              Users List
            </h2>
            <span className="user-count">{filteredAndSortedUsers.length} users</span>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredAndSortedUsers.length}
            totalUsers={users.length}
          />

          <UserTable
            users={paginatedUsers}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            loading={loading}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredAndSortedUsers.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built with <i className="fas fa-heart"></i> | Full Stack CRUD Application
        </p>
        <div className="tech-badges">
          <span className="badge"><i className="fab fa-react"></i> React</span>
          <span className="badge"><i className="fab fa-node-js"></i> Node.js</span>
          <span className="badge"><i className="fas fa-server"></i> Express</span>
          <span className="badge"><i className="fas fa-link"></i> REST API</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
