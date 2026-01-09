const API_URL = "http://localhost:5000/api";

// الحصول على الإحصائيات
export const getStats = async () => {
  const response = await fetch(`${API_URL}/stats`);
  if (!response.ok) throw new Error("Failed to fetch stats");
  return response.json();
};

// الحصول على الأقسام والوظائف
export const getOptions = async () => {
  const response = await fetch(`${API_URL}/options`);
  if (!response.ok) throw new Error("Failed to fetch options");
  return response.json();
};

// الحصول على جميع الموظفين
export const getEmployees = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.department) params.append("department", filters.department);
  if (filters.status) params.append("status", filters.status);
  if (filters.search) params.append("search", filters.search);

  const url = `${API_URL}/employees${params.toString() ? `?${params}` : ""}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch employees");
  return response.json();
};

// الحصول على موظف واحد
export const getEmployeeById = async (id) => {
  const response = await fetch(`${API_URL}/employees/${id}`);
  if (!response.ok) throw new Error("Employee not found");
  return response.json();
};

// إضافة موظف جديد
export const createEmployee = async (data) => {
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create employee");
  return response.json();
};

// تعديل موظف
export const updateEmployee = async (id, data) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update employee");
  return response.json();
};

// حذف موظف
export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete employee");
  return response.json();
};

// تصدير البيانات
export const exportEmployees = () => {
  window.open(`${API_URL}/export`, "_blank");
};
