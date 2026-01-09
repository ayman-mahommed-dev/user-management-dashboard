const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// بيانات الموظفين
let employees = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed@company.com",
    phone: "+966501234567",
    position: "Senior Developer",
    department: "Engineering",
    salary: 15000,
    status: "active",
    joinDate: "2023-01-15",
    avatar: null
  },
  {
    id: 2,
    name: "Sara Ali",
    email: "sara@company.com",
    phone: "+966507654321",
    position: "UI/UX Designer",
    department: "Design",
    salary: 12000,
    status: "active",
    joinDate: "2023-03-20",
    avatar: null
  },
  {
    id: 3,
    name: "Mohammed Omar",
    email: "mohammed@company.com",
    phone: "+966509876543",
    position: "Project Manager",
    department: "Management",
    salary: 18000,
    status: "active",
    joinDate: "2022-06-10",
    avatar: null
  },
  {
    id: 4,
    name: "Fatima Khalid",
    email: "fatima@company.com",
    phone: "+966502345678",
    position: "HR Specialist",
    department: "Human Resources",
    salary: 10000,
    status: "active",
    joinDate: "2023-08-01",
    avatar: null
  },
  {
    id: 5,
    name: "Omar Youssef",
    email: "omar@company.com",
    phone: "+966503456789",
    position: "Backend Developer",
    department: "Engineering",
    salary: 13000,
    status: "on-leave",
    joinDate: "2023-02-28",
    avatar: null
  },
  {
    id: 6,
    name: "Layla Ibrahim",
    email: "layla@company.com",
    phone: "+966504567890",
    position: "Marketing Manager",
    department: "Marketing",
    salary: 14000,
    status: "active",
    joinDate: "2022-11-15",
    avatar: null
  }
];

// الأقسام المتاحة
const departments = [
  "Engineering",
  "Design",
  "Management",
  "Human Resources",
  "Marketing",
  "Finance",
  "Sales"
];

// الوظائف المتاحة
const positions = [
  "Senior Developer",
  "Junior Developer",
  "Backend Developer",
  "Frontend Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Project Manager",
  "Product Manager",
  "HR Specialist",
  "HR Manager",
  "Marketing Manager",
  "Marketing Specialist",
  "Sales Representative",
  "Accountant",
  "Financial Analyst"
];

// إنشاء ID جديد
const generateId = () => {
  return employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
};

// ===== API Routes =====

// الحصول على الإحصائيات
app.get("/api/stats", (req, res) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === "active").length;
  const onLeaveEmployees = employees.filter(e => e.status === "on-leave").length;
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;
  
  const departmentStats = departments.map(dept => ({
    name: dept,
    count: employees.filter(e => e.department === dept).length
  })).filter(d => d.count > 0);

  res.json({
    totalEmployees,
    activeEmployees,
    onLeaveEmployees,
    totalSalary,
    avgSalary,
    departmentStats
  });
});

// الحصول على الأقسام والوظائف
app.get("/api/options", (req, res) => {
  res.json({ departments, positions });
});

// الحصول على جميع الموظفين
app.get("/api/employees", (req, res) => {
  const { department, status, search } = req.query;
  let result = [...employees];

  if (department && department !== "all") {
    result = result.filter(e => e.department === department);
  }

  if (status && status !== "all") {
    result = result.filter(e => e.status === status);
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(e =>
      e.name.toLowerCase().includes(term) ||
      e.email.toLowerCase().includes(term) ||
      e.position.toLowerCase().includes(term)
    );
  }

  res.json(result);
});

// الحصول على موظف واحد
app.get("/api/employees/:id", (req, res) => {
  const employee = employees.find(e => e.id === parseInt(req.params.id));
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  res.json(employee);
});

// إضافة موظف جديد
app.post("/api/employees", (req, res) => {
  const { name, email, phone, position, department, salary, status, joinDate } = req.body;

  if (!name || !email || !position || !department) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newEmployee = {
    id: generateId(),
    name,
    email,
    phone: phone || "",
    position,
    department,
    salary: salary || 0,
    status: status || "active",
    joinDate: joinDate || new Date().toISOString().split("T")[0],
    avatar: null
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// تعديل موظف
app.put("/api/employees/:id", (req, res) => {
  const index = employees.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const { name, email, phone, position, department, salary, status, joinDate } = req.body;

  employees[index] = {
    ...employees[index],
    name: name || employees[index].name,
    email: email || employees[index].email,
    phone: phone !== undefined ? phone : employees[index].phone,
    position: position || employees[index].position,
    department: department || employees[index].department,
    salary: salary !== undefined ? salary : employees[index].salary,
    status: status || employees[index].status,
    joinDate: joinDate || employees[index].joinDate
  };

  res.json(employees[index]);
});

// حذف موظف
app.delete("/api/employees/:id", (req, res) => {
  const index = employees.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const deleted = employees.splice(index, 1)[0];
  res.json({ message: "Employee deleted", employee: deleted });
});

// تصدير البيانات كـ JSON
app.get("/api/export", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=employees.json");
  res.json(employees);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`HR Pro API running on port ${PORT}`);
});
