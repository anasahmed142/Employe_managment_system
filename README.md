
# 📄 Final README.md

````markdown
# 🚀 Employee Management System

A complete **Employee Management System** built with **Next.js 15** (frontend) and **NestJS** (backend).  
It provides **role-based authentication**, user dashboards, and admin controls with a modern responsive UI.

---

## 🛠️ Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/)
- [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)
- [Shadcn UI](https://ui.shadcn.com/) (UI components)

### Backend
- [NestJS](https://nestjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)

---

## 🔑 Authentication & Roles

- **Admin**
  - Manage all users (Add, Update, Delete)
  - Assign roles & control permissions
  - Access admin dashboard

- **Employee**
  - View personal dashboard
  - Manage own profile
  - Access employee-specific features

---

## ✨ Features

- 🔐 JWT Authentication with Access & Refresh tokens  
- 👥 Role-based Dashboards (Admin & Employee)  
- 📊 CRUD for Users (Admin only)  
- 🕒 Secure Sessions with token expiry  
- 🔔 Toast Notifications (Success/Error)  
- 🎨 Modern Responsive UI with TailwindCSS  
- 🌍 Ready for deployment on Vercel  

---

## ⚙️ Environment Variables

Create a `.env` file in both **frontend** and **backend** with the following variables:

### Backend (`.env`)
```env
MONGOOSE_URI="your_mongodb_connection_string"
ACCESS_TOKEN_SECRET="your_secret_key"
ACCESS_TOKEN_EXPIRY="60"          # in seconds
REFRESH_TOKEN_SECRET="your_refresh_secret_key"
REFRESH_TOKEN_EXPIRY="7d"         # in days
ADMIN_EMAIL="admin@gmail.com"
ADMIN_PASSWORD="adminadmin"
NODE_ENV="development"
````

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/habibullahqureshe/employee-management-system.git
cd employee-management-system
```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3️⃣ Run Locally

#### Frontend (Next.js)

```bash
npm run dev
```

#### Backend (NestJS)

```bash
npm run start:dev
```

The app will run on:

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:5000](http://localhost:5000)

---

## 🌐 Deployment



* Deploy the **Next.js** frontend and backend on [Vercel](https://vercel.com/).






## 👨‍💻 Author

Developed by **Habibullah Qureshe**
📧 Email: [habibullahqureshe@gmail.com](mailto:habibullahqureshe@gmail.com)

```

---

