import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./LoginPage.css";

function LoginPage({ onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isLogin) {
      const result = login(formData.email, formData.password);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      const result = register(formData.name, formData.email, formData.password);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error);
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      <div className="language-switcher">
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

      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <div className="brand-icon">
              <i className="fas fa-users-gear"></i>
            </div>
            <h1>HR Pro</h1>
            <p>{t("appSubtitle")}</p>
          </div>
          <div className="login-features">
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Employee Management</span>
            </div>
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Leave Tracking</span>
            </div>
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Payroll Reports</span>
            </div>
          </div>
        </div>

        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>{isLogin ? t("loginTitle") : t("registerTitle")}</h2>
              <p>{isLogin ? t("loginSubtitle") : t("registerSubtitle")}</p>
            </div>

            {error && (
              <div className="error-alert">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <label>
                  <i className="fas fa-user"></i>
                  {t("fullName")}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("fullName")}
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label>
                <i className="fas fa-envelope"></i>
                {t("email")}
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-lock"></i>
                {t("password")}
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>
                  <i className="fas fa-lock"></i>
                  {t("confirmPassword")}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <i className={`fas ${isLogin ? "fa-sign-in-alt" : "fa-user-plus"}`}></i>
                  {isLogin ? t("loginBtn") : t("registerBtn")}
                </>
              )}
            </button>

            <div className="form-footer">
              <p>
                {isLogin ? t("noAccount") : t("hasAccount")}
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? t("register") : t("login")}
                </button>
              </p>
            </div>

            {isLogin && (
              <div className="demo-accounts">
                <p>Demo Accounts:</p>
                <div className="demo-list">
                  <span>admin@hrpro.com / admin123</span>
                  <span>hr@hrpro.com / hr123</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
