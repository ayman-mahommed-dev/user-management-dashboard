const API_URL = "http://localhost:5000";

// جلب جميع المستخدمين
export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

// جلب مستخدم واحد
export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error("User not found");
  return response.json();
};

// إضافة مستخدم جديد
export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
};

// تعديل مستخدم
export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to update user");
  return response.json();
};

// حذف مستخدم
export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
  return response.json();
};
