import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Demo users
const DEMO_USERS = [
  {
    id: 1,
    email: "admin@hrpro.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    avatar: null
  },
  {
    id: 2,
    email: "hr@hrpro.com",
    password: "hr123",
    name: "HR Manager",
    role: "hr",
    avatar: null
  },
  {
    id: 3,
    email: "employee@hrpro.com",
    password: "emp123",
    name: "John Employee",
    role: "employee",
    avatar: null
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("hr-pro-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = DEMO_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        avatar: foundUser.avatar
      };
      setUser(userData);
      localStorage.setItem("hr-pro-user", JSON.stringify(userData));
      return { success: true, user: userData };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const register = (name, email, password) => {
    const exists = DEMO_USERS.find(u => u.email === email);
    if (exists) {
      return { success: false, error: "Email already exists" };
    }

    const newUser = {
      id: Date.now(),
      email,
      name,
      role: "employee",
      avatar: null
    };

    setUser(newUser);
    localStorage.setItem("hr-pro-user", JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hr-pro-user");
  };

  const isAdmin = user?.role === "admin";
  const isHR = user?.role === "hr" || user?.role === "admin";

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin,
    isHR
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
