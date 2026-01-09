# 👥 User Management Dashboard

A professional full-stack web application for managing users with modern UI/UX, built with React and Node.js.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### Core Functionality
- **Create** - Add new users with validated form inputs
- **Read** - View all users in a responsive data table
- **Update** - Edit existing user information inline
- **Delete** - Remove users with confirmation modal

### Advanced Features
- **🔍 Search & Filter** - Real-time search by name or email
- **📊 Sorting** - Sort by ID, Name, or Email (ascending/descending)
- **📄 Pagination** - Navigate through large datasets efficiently
- **🔔 Toast Notifications** - Visual feedback for all actions
- **⚠️ Confirmation Modals** - Prevent accidental deletions
- **✅ Form Validation** - Client-side validation for all inputs
- **📱 Responsive Design** - Works on all screen sizes

## 🛠️ Tech Stack

### Frontend
- React 18 with Hooks (useState, useEffect, useMemo, useCallback)
- CSS3 with CSS Variables and Flexbox/Grid
- Component-based architecture
- Custom Toast notification system

### Backend
- Node.js runtime
- Express.js framework
- RESTful API design
- CORS enabled for cross-origin requests

## 📁 Project Structure

```
user-management-dashboard/
├── backend/
│   ├── server.js              # Express server & API routes
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── userApi.js     # API service layer
│   │   ├── components/
│   │   │   ├── UserForm.js    # Add/Edit form component
│   │   │   ├── UserForm.css
│   │   │   ├── UserTable.js   # Data table component
│   │   │   ├── UserTable.css
│   │   │   ├── SearchBar.js   # Search & sort component
│   │   │   ├── SearchBar.css
│   │   │   ├── Pagination.js  # Pagination component
│   │   │   ├── Pagination.css
│   │   │   ├── Modal.js       # Confirmation modal
│   │   │   ├── Modal.css
│   │   │   ├── Toast.js       # Notification system
│   │   │   └── Toast.css
│   │   ├── App.js             # Main application
│   │   ├── App.css            # Global styles
│   │   └── index.js           # Entry point
│   ├── public/
│   └── package.json
│
├── README.md
├── LICENSE
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/user-management-dashboard.git
   cd user-management-dashboard
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Server runs on: `http://localhost:5000`

3. **Setup Frontend** (new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```
   App runs on: `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint       | Description          | Request Body           |
|--------|----------------|----------------------|------------------------|
| GET    | `/users`       | Get all users        | -                      |
| GET    | `/users/:id`   | Get user by ID       | -                      |
| POST   | `/users`       | Create new user      | `{ name, email }`      |
| PUT    | `/users/:id`   | Update user          | `{ name, email }`      |
| DELETE | `/users/:id`   | Delete user          | -                      |

### Example API Response
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

## 🎨 UI Components

### UserForm
- Controlled form with validation
- Dynamic title based on mode (Add/Edit)
- Cancel button for edit mode

### UserTable
- Zebra-striped rows for readability
- Avatar with user initials
- Action buttons with hover effects

### SearchBar
- Real-time filtering
- Multiple sort options
- Clear search button

### Pagination
- Dynamic page numbers
- Previous/Next navigation
- Items count display

### Toast Notifications
- Success, Error, Warning, Info types
- Auto-dismiss after 3 seconds
- Manual close option

### Modal
- Backdrop blur effect
- Smooth animations
- Customizable content

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## 🔒 Form Validation

- **Name**: 2-50 characters, letters only
- **Email**: Valid email format required

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Developed as a Full Stack demonstration project showcasing modern web development practices.

---

⭐ If you found this project helpful, please give it a star!
