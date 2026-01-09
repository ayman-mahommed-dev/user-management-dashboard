import { useEffect, useState, useCallback } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import StatsCards from "./components/StatsCards";
import Filters from "./components/Filters";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import LeaveManagement from "./components/LeaveManagement";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import { ToastContainer, useToast } from "./components/Toast";
import {
  getStats,
  getOptions,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  exportEmployees
} from "./api/employeeApi";
import "./App.css";

const ITEMS_PER_PAGE = 5;

function AppContent() {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({});
  const [options, setOptions] = useState({ departments: [], positions: [] });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    department: "all",
    status: "all"
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [activeTab, setActiveTab] = useState("employees");

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchOptions = useCallback(async () => {
    try {
      const data = await getOptions();
      setOptions(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEmployees(filters);
      setEmployees(data);
    } catch (err) {
      console.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
      fetchOptions();
    }
  }, [fetchStats, fetchOptions, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmployees();
      setCurrentPage(1);
    }
  }, [fetchEmployees, isAuthenticated]);

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = employees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAddNew = () => {
    setEditingEmployee(null);
    setFormOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, data);
        addToast(t("employeeUpdated"), "success");
      } else {
        await createEmployee(data);
        addToast(t("employeeAdded"), "success");
      }
      setFormOpen(false);
      setEditingEmployee(null);
      fetchEmployees();
      fetchStats();
    } catch (err) {
      addToast(t("error"), "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployee(deleteModal.id);
      addToast(t("employeeDeleted"), "success");
      fetchEmployees();
      fetchStats();
    } catch (err) {
      addToast(t("error"), "error");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const handleExport = () => {
    exportEmployees();
    addToast("Exporting data...", "info");
  };

  const handleLogout = () => {
    logout();
    addToast(t("logoutSuccess"), "success");
  };

  if (authLoading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onSuccess={() => addToast(t("loginSuccess"), "success")} />;
  }

  return (
    <div className={`app ${isRTL ? "rtl" : "ltr"}`}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title={t("deleteTitle")}
        message={t("deleteMessage")}
        type="danger"
      />

      <EmployeeForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingEmployee(null); }}
        onSubmit={handleFormSubmit}
        editingEmployee={editingEmployee}
        options={options}
      />

      <header className="app-header">
        <div className="header-content">
          <div className="header-top">
            <div className="logo">
              <div className="logo-icon">
                <i className="fas fa-users-gear"></i>
              </div>
              <div className="logo-text">
                <h1>{t("appName")}</h1>
                <span>{t("appSubtitle")}</span>
              </div>
            </div>

            <div className="header-actions">
              <div className="language-toggle">
                <button
                  className={`lang-btn ${language === "en" ? "active" : ""}`}
                  onClick={() => setLanguage("en")}
                >
                  EN
                </button>
                <button
                  className={`lang-btn ${language === "ar" ? "active" : ""}`}
                  onClick={() => setLanguage("ar")}
                >
                  عربي
                </button>
              </div>

              <button className="header-btn" title={t("notifications")}>
                <i className="fas fa-bell"></i>
                <span className="badge">3</span>
              </button>

              <div className="user-menu">
                <div className="user-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="user-info">
                  <span className="user-name">{user?.name}</span>
                  <span className="user-role">{user?.role}</span>
                </div>
                <button className="logout-btn" onClick={handleLogout} title={t("logout")}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            </div>
          </div>

          <nav className="header-nav">
            <button
              className={`nav-btn ${activeTab === "employees" ? "active" : ""}`}
              onClick={() => setActiveTab("employees")}
            >
              <i className="fas fa-users"></i>
              {t("totalEmployees")}
            </button>
            <button
              className={`nav-btn ${activeTab === "leaves" ? "active" : ""}`}
              onClick={() => setActiveTab("leaves")}
            >
              <i className="fas fa-calendar-alt"></i>
              {t("leaveManagement")}
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <StatsCards stats={stats} loading={statsLoading} />

        {activeTab === "employees" && (
          <section className="employees-section">
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              options={options}
              onExport={handleExport}
              onAddNew={handleAddNew}
            />

            <EmployeeTable
              employees={paginatedEmployees}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              loading={loading}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={employees.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </section>
        )}

        {activeTab === "leaves" && (
          <LeaveManagement employees={employees} onAddToast={addToast} />
        )}
      </main>

      <footer className="app-footer">
        <p>
          <i className="fas fa-code"></i>
          {t("footerText")}
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
