# 📚 Book Management System

A simple full-stack CRUD application to manage books — add, view, edit, and delete books from a personal collection.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-----------|---------------------|
| Frontend | React + Vite |
| Backend | JSON Server |
| Deployed (Frontend) | Netlify |
| Deployed (Backend) | Render |

---

## 🌐 Live URLs

| Service | URL |
|----------|-----|
| Frontend | https://bookifylist.netlify.app |
| Backend | https://bookmanagementsystem-1-iolh.onrender.com |

---

## 📁 Project Structure

\```
book-management-system/
├── book-management-system_frontend/
│ ├── index.html
│ ├── vite.config.js
│ ├── package.json
│ ├── netlify.toml
│ └── src/
│ ├── main.jsx
│ ├── App.jsx
│ └── api.js
├── db.json ← JSON Server database
└── package.json
\```

---

## 🚀 Local Setup

### 1. Clone the repository

\```bash
git clone <your-repo-url>
cd book-management-system
\```

### 2. Start the Backend locally (Optional)

\```bash
npm install
npx json-server --watch db.json --port 3001
\```

JSON Server will run at: `http://localhost:3001`

\```json
{
  "books": []
}
\```

Then update `src/api.js`:

\```js
const BASE_URL = 'http://localhost:3001';
\```

> Switch it back to the Render URL before pushing to production.

### 3. Start the Frontend

\```bash
cd book-management-system_frontend
npm install
npm run dev
\```

Frontend will run at: `http://localhost:5173`

---

## 📦 Build for Production

\```bash
cd book-management-system_frontend
npm run build
\```

---

## 🌐 Deployment

### Frontend — Netlify

- **Build command:** `npm run build`
- **Publish directory:** `dist`

\```toml
[build]
  command = "npm run build"
  publish = "dist"
\```

### Backend — Render (JSON Server)

- Deployed at: https://bookmanagementsystem-1-iolh.onrender.com
- ⚠️ Free tier spins down after inactivity — first request may take ~30 seconds to wake up

---

## 📡 API Endpoints

Base URL: `https://bookmanagementsystem-1-iolh.onrender.com`

| Method | Endpoint | Description |
|--------|---------------|-------------------|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get single book |
| POST | `/books` | Create a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

---

## ✅ Features

- 📖 View all books
- ➕ Add a new book
- ✏️ Edit book details
- 🗑️ Delete a book

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |
| `npx json-server --watch db.json --port 3001` | Start backend locally |

---

## 📝 Notes

- JSON Server is a mock REST API — data is stored in `db.json` on Render
- Render free tier may reset `db.json` on redeploy (data loss) — consider upgrading or migrating to a real database for persistence
