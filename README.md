# 🔐 Role-Based User Management API

A RESTful API built using Node.js, Express, and MongoDB that implements authentication, role-based authorization, protected admin routes, user management, and audit logging.

---

## 🚀 Features

- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Role-based access control (Admin/User)
- Protected admin routes
- Promote users to admin
- Block users
- Audit logging
- Middleware authorization

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## 📁 Project Structure

```text
role-based-user-management-api/
│── server.js
│── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│── models/
│   ├── User.js
│   └── AuditLog.js
│── routes/
│   ├── authRoutes.js
│   └── adminRoutes.js
│── .env
│── package.json
```

---

## ⚙️ Installation

### 1. Install dependencies

```bash
npm install
```

---

### 2. Create `.env`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=mysecretkey
PORT=5000
```

---

### 3. Run server

```bash
node server.js
```

---

## 📡 API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

---

### Admin Routes

#### Get All Users

```http
GET /api/admin/users
```

#### Promote User

```http
PUT /api/admin/users/:id/promote
```

#### Block User

```http
PUT /api/admin/users/:id/block
```

#### View Audit Logs

```http
GET /api/admin/audit-logs
```

---

## 🔐 Authorization

Protected routes require:

```text
Authorization: Bearer YOUR_TOKEN
```

---

## 🧪 Testing

Use Postman or similar API testing tools.

---

## 🧠 Features Demonstrated

- JWT Authentication
- Role-Based Access Control
- Middleware Protection
- Admin Authorization
- Password Security
- Audit Logging

---

## 👨‍💻 Author

Built as part of Backend Development Internship tasks.

---

## 📜 License

For educational purposes only.
