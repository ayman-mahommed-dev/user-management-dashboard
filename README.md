# 🏢 HR Pro - Employee Management System

A professional, full-stack HR management application for managing employees, departments, and payroll. Built with React and Node.js.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### Dashboard
- Real-time statistics (Total Employees, Active, On Leave, Payroll)
- Department distribution overview
- Quick access to all functions

### Employee Management
- Complete CRUD operations
- Employee profiles with detailed information
- Status tracking (Active, On Leave, Inactive)
- Department and position assignment

### Advanced Features
- 🔍 **Real-time Search** - Search by name, email, or position
- 🏢 **Department Filter** - Filter employees by department
- 📊 **Status Filter** - Filter by employment status
- 📄 **Pagination** - Navigate through large datasets
- 📥 **Export Data** - Export employee data as JSON
- 🔔 **Toast Notifications** - Visual feedback for all actions
- ⚠️ **Confirmation Modals** - Prevent accidental deletions
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- React 18 with Hooks
- CSS3 with CSS Variables
- Font Awesome Icons
- Component-based architecture

### Backend
- Node.js
- Express.js
- RESTful API
- CORS enabled

## 📁 Project Structure

```
hr-pro/
├── backend/
│   ├── server.js              # Express server & API
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── employeeApi.js # API service layer
│   │   ├── components/
│   │   │   ├── StatsCards.js  # Dashboard statistics
│   │   │   ├── Filters.js     # Search & filters
│   │   │   ├── EmployeeTable.js
│   │   │   ├── EmployeeForm.js
│   │   │   ├── Pagination.js
│   │   │   ├── Modal.js
│   │   │   └── Toast.js
│   │   ├── App.js
│   │   └── App.css
│   └── public/
│
├── README.md
└── LICENSE
```

## 🚀 Getting Started

### Prerequisites
- Node.js v14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hr-pro.git
   cd hr-pro
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Server: `http://localhost:5000`

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   App: `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get dashboard statistics |
| GET | `/api/options` | Get departments & positions |
| GET | `/api/employees` | Get all employees (with filters) |
| GET | `/api/employees/:id` | Get single employee |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/export` | Export data as JSON |

### Query Parameters
- `search` - Search by name/email/position
- `department` - Filter by department
- `status` - Filter by status (active/on-leave/inactive)

## 📊 Employee Data Structure

```json
{
  "id": 1,
  "name": "Ahmed Hassan",
  "email": "ahmed@company.com",
  "phone": "+966501234567",
  "position": "Senior Developer",
  "department": "Engineering",
  "salary": 15000,
  "status": "active",
  "joinDate": "2023-01-15"
}
```

## 🎨 UI Components

| Component | Description |
|-----------|-------------|
| StatsCards | Dashboard statistics with icons |
| Filters | Search, department & status filters |
| EmployeeTable | Data table with actions |
| EmployeeForm | Modal form for add/edit |
| Pagination | Page navigation |
| Toast | Notification system |
| Modal | Confirmation dialogs |

## 📱 Responsive Design

- Desktop: Full layout with sidebar stats
- Tablet: Adjusted grid layout
- Mobile: Stacked components, touch-friendly

## 🔒 Validation

- Name: Required, 2-50 characters
- Email: Required, valid format
- Department: Required
- Position: Required
- Salary: Optional, numeric
- Phone: Optional

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 👨‍💻 Author

Professional HR Management System for modern businesses.

---

⭐ Star this repo if you find it useful!
