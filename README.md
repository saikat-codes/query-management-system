<div align="center">

# QueryFlow 💬

**A full-stack query management system with real-time email and Telegram notifications.**

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

[Live Demo](https://query-management-system-one.vercel.app) · [Backend API](https://query-management-system-e8a3.onrender.com) · [Report Bug](https://github.com/saikat-codes/query-management-system/issues)

</div>

---

## 📸 Screenshots

![User Page](screenshots/user-page.png)
<br>
![Admin Login](screenshots/admin-login.png)
<br>
![Admin Panel](screenshots/admin-panel.png)
<br>
![Email Notification](screenshots/email-notification.png)

---

## ✨ Features

### 👤 User
- Submit queries with name, email and message
- Instant styled HTML email confirmation on submission
- Real-time Telegram notification on submission
- Email notification on every status change

### 🛠 Admin
- Password-protected admin panel
- View all submitted queries in real time
- Update query status — Pending → In Progress → Resolved
- Delete queries
- Search queries by name, email or message
- Filter queries by status
- Live stats dashboard — total, pending, resolved counts
- Time-aware greeting (morning, afternoon, evening, night)

### 🔔 Notifications
- Styled HTML email notifications via Brevo Transactional Email API
- Telegram notifications via [@queryflow_notify_bot](https://t.me/queryflow_notify_bot)
- Dynamic styling per status — 🟡 Pending · 🔵 In Progress · 🟢 Resolved
- Notifications fire on query submission and every status change

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Email | Brevo Transactional Email API |
| Telegram | Telegram Bot API + Axios |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🔐 Demo Access

| Panel | URL | Password |
|---|---|---|
| Admin | [/admin](https://query-management-system-one.vercel.app/admin) | `admin123` |

---

## 📡 API Reference

Base URL: `https://query-management-system-e8a3.onrender.com`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/queries` | Submit a new query |
| `GET` | `/api/queries` | Get all queries |
| `PUT` | `/api/queries/:id` | Update query status |
| `DELETE` | `/api/queries/:id` | Delete a query |

### Example Request — Submit a query
```json
POST /api/queries
{
  "name": "Saikat Das",
  "email": "saikat@gmail.com",
  "message": "I need help with my account"
}
```

### Example Response
```json
{
  "_id": "abc123",
  "name": "Saikat Das",
  "email": "saikat@gmail.com",
  "message": "I need help with my account",
  "status": "pending",
  "createdAt": "2026-05-17T10:00:00.000Z",
  "updatedAt": "2026-05-17T10:00:00.000Z"
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Brevo account (free tier — 300 emails/day)
- Telegram bot token from [@BotFather](https://t.me/BotFather)

### 1 — Clone the repo
```bash
git clone https://github.com/saikat-codes/query-management-system.git
cd query-management-system
```

### 2 — Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
MONGO_URI=your_mongodb_connection_string
BREVO_API_KEY=your_brevo_api_key
MAIL_FROM=your_verified_sender_email
TELEGRAM_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

Start the backend:
```bash
npm run dev
```

### 3 — Setup Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` folder:
```env
VITE_API_URL=http://localhost:5000/api/queries
```

Start the frontend:
```bash
npm run dev
```

### 4 — Open the app
```
Frontend → http://localhost:5173
Backend  → http://localhost:5000
```

---

## 📁 Folder Structure

```
query-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── queryController.js
│   ├── models/
│   │   └── Query.js
│   ├── routes/
│   │   └── queryRoutes.js
│   ├── utils/
│   │   └── notifications.js
│   └── app.js
│
├── frontend/
│   └── src/
│       ├── api/
│       │   └── queries.js
│       ├── components/
│       │   └── Navbar.jsx
│       ├── pages/
│       │   ├── UserPage.jsx
│       │   └── AdminPage.jsx
│       └── App.jsx
│
├── screenshots/
└── README.md
```

---

## 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | [query-management-system-one.vercel.app](https://query-management-system-one.vercel.app) |
| Backend | Render | [query-management-system-e8a3.onrender.com](https://query-management-system-e8a3.onrender.com) |
| Database | MongoDB Atlas | Cloud hosted |

### Render Environment Variables
```
MONGO_URI
BREVO_API_KEY
MAIL_FROM
TELEGRAM_TOKEN
TELEGRAM_CHAT_ID
```

### Vercel Environment Variables
```
VITE_API_URL=https://query-management-system-e8a3.onrender.com/api/queries
```

---

## 📬 Telegram Bot

Notifications are delivered via **QueryFlow Bot** on Telegram.

👉 [@queryflow_notify_bot](https://t.me/queryflow_notify_bot)

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/saikat-codes">saikat-codes</a></p>
</div>
