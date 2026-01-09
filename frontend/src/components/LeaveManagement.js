import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import "./LeaveManagement.css";

function LeaveManagement({ employees, onAddToast }) {
  const { t } = useLanguage();
  const { user, isHR } = useAuth();
  
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employeeId: 1,
      employeeName: "Ahmed Hassan",
      type: "annual",
      startDate: "2026-01-15",
      endDate: "2026-01-20",
      reason: "Family vacation",
      status: "approved",
      requestDate: "2026-01-10"
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Sara Ali",
      type: "sick",
      startDate: "2026-01-12",
      endDate: "2026-01-13",
      reason: "Medical appointment",
      status: "approved",
      requestDate: "2026-01-11"
    },
    {
      id: 3,
      employeeId: 5,
      employeeName: "Omar Youssef",
      type: "personal",
      startDate: "2026-01-25",
      endDate: "2026-01-26",
      reason: "Personal matters",
      status: "pending",
      requestDate: "2026-01-08"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "annual",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const leaveTypes = [
    { value: "annual", label: t("annualLeave"), color: "#6366f1" },
    { value: "sick", label: t("sickLeave"), color: "#ef4444" },
    { value: "personal", label: t("personalLeave"), color: "#f59e0b" },
    { value: "unpaid", label: t("unpaidLeave"), color: "#64748b" }
  ];

  const getTypeLabel = (type) => {
    const found = leaveTypes.find(lt => lt.value === type);
    return found ? found.label : type;
  };

  const getTypeColor = (type) => {
    const found = leaveTypes.find(lt => lt.value === type);
    return found ? found.color : "#64748b";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved": return "status-approved";
      case "rejected": return "status-rejected";
      default: return "status-pending";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      id: Date.now(),
      employeeId: user.id,
      employeeName: user.name,
      ...formData,
      status: "pending",
      requestDate: new Date().toISOString().split("T")[0]
    };
    setLeaves(prev => [newLeave, ...prev]);
    setShowForm(false);
    setFormData({ type: "annual", startDate: "", endDate: "", reason: "" });
    onAddToast(t("leaveRequested"), "success");
  };

  const handleAction = (id, action) => {
    setLeaves(prev => prev.map(leave => 
      leave.id === id ? { ...leave, status: action } : leave
    ));
    onAddToast(action === "approved" ? t("leaveApproved") : t("leaveRejected"), "success");
  };

  const leaveBalance = {
    annual: 21,
    sick: 10,
    personal: 5,
    used: 8
  };

  return (
    <div className="leave-management">
      <div className="leave-header">
        <div>
          <h2><i className="fas fa-calendar-alt"></i> {t("leaveManagement")}</h2>
        </div>
        <button className="btn-request" onClick={() => setShowForm(true)}>
          <i className="fas fa-plus"></i> {t("requestLeave")}
        </button>
      </div>

      <div className="leave-stats">
        <div className="leave-stat-card">
          <div className="stat-icon annual">
            <i className="fas fa-umbrella-beach"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">{leaveBalance.annual - leaveBalance.used}</span>
            <span className="stat-label">{t("annualLeave")}</span>
            <span className="stat-sub">{t("daysRemaining")}</span>
          </div>
        </div>
        <div className="leave-stat-card">
          <div className="stat-icon sick">
            <i className="fas fa-briefcase-medical"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">{leaveBalance.sick}</span>
            <span className="stat-label">{t("sickLeave")}</span>
            <span className="stat-sub">{t("daysRemaining")}</span>
          </div>
        </div>
        <div className="leave-stat-card">
          <div className="stat-icon personal">
            <i className="fas fa-user-clock"></i>
          </div>
          <div className="stat-info">
            <span className="stat-value">{leaveBalance.personal}</span>
            <span className="stat-label">{t("personalLeave")}</span>
            <span className="stat-sub">{t("daysRemaining")}</span>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="leave-form-overlay" onClick={() => setShowForm(false)}>
          <form className="leave-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
            <div className="form-header">
              <h3><i className="fas fa-calendar-plus"></i> {t("requestLeave")}</h3>
              <button type="button" className="close-btn" onClick={() => setShowForm(false)}>
                <i className="fas fa-xmark"></i>
              </button>
            </div>
            
            <div className="form-body">
              <div className="form-group">
                <label><i className="fas fa-tag"></i> {t("leaveType")}</label>
                <select 
                  value={formData.type} 
                  onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                >
                  {leaveTypes.map(lt => (
                    <option key={lt.value} value={lt.value}>{lt.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label><i className="fas fa-calendar"></i> {t("startDate")}</label>
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label><i className="fas fa-calendar"></i> {t("endDate")}</label>
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label><i className="fas fa-comment"></i> {t("reason")}</label>
                <textarea 
                  value={formData.reason}
                  onChange={e => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Enter reason for leave..."
                  rows="3"
                />
              </div>
            </div>
            
            <div className="form-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                {t("cancel")}
              </button>
              <button type="submit" className="btn-submit">
                <i className="fas fa-paper-plane"></i> {t("requestLeave")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="leave-table-container">
        <table className="leave-table">
          <thead>
            <tr>
              <th>{t("employee")}</th>
              <th>{t("leaveType")}</th>
              <th>{t("startDate")}</th>
              <th>{t("endDate")}</th>
              <th>{t("status")}</th>
              {isHR && <th>{t("actions")}</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.map(leave => (
              <tr key={leave.id}>
                <td className="employee-cell">
                  <div className="employee-info">
                    <div className="avatar">{leave.employeeName.charAt(0)}</div>
                    <span>{leave.employeeName}</span>
                  </div>
                </td>
                <td>
                  <span 
                    className="type-badge" 
                    style={{ backgroundColor: `${getTypeColor(leave.type)}20`, color: getTypeColor(leave.type) }}
                  >
                    {getTypeLabel(leave.type)}
                  </span>
                </td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(leave.status)}`}>
                    {t(leave.status)}
                  </span>
                </td>
                {isHR && (
                  <td className="actions-cell">
                    {leave.status === "pending" && (
                      <div className="action-buttons">
                        <button 
                          className="btn-approve" 
                          onClick={() => handleAction(leave.id, "approved")}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button 
                          className="btn-reject" 
                          onClick={() => handleAction(leave.id, "rejected")}
                        >
                          <i className="fas fa-xmark"></i>
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveManagement;
