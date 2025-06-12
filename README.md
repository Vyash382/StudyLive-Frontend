<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# 📚 StudyLive

**StudyLive** is a collaborative real-time study platform that helps users stay productive with friends. It includes real-time video conferencing, Pomodoro-style study timers, collaborative whiteboard and notepad, friend system, chat features, and smart AI-generated session summaries.

---

## 🚀 Features

- 👥 **User Authentication** – Secure signup/login.
- 🤝 **Friend System** – Send, accept, and manage friend requests.
- 📅 **Study Rooms** – Create or join virtual rooms with:
  - ⏱ Pomodoro-style timers.
  - 🧑‍💻 Collaborative whiteboard.
  - 📝 Shared notepad.
  - 📹 Video conferencing (powered by 100ms).
- 💬 **Chat System**
  - 1-to-1 personal chats.
  - Group chats in study rooms.
- 📢 **Real-Time Notifications** – Using WebSockets for room invites and friend requests.
- 🧠 **AI-Powered Summaries** – After each session, the whiteboard content is summarized using Gemini API.
- ☁️ **Media Upload** – Images and files are uploaded via Cloudinary with `multer`.
- 📈 **Recent Chats** – LRU cache for fast access to recent conversations.
- 🔐 **Protected Routes** – Unauthorized users are redirected to the About page.

---

## 🛠️ Tech Stack

### 🧑‍💻 Frontend
- React (JavaScript)
- Tailwind CSS
- Recoil (state management)
- Axios (API requests)
- WebSocket (real-time messaging)
- 100ms (video conferencing)

### 🧪 Backend
- Node.js + Express
- WebSocket Server
- PostgreSQL (without Prisma)
- Multer + Cloudinary
- Gemini API (AI summaries)

---

## 🌐 Pages

- `/` – About page (shown to unauthenticated users)
- `/login` – User login
- `/register` – User signup
- `/home` – Home dashboard
- `/friends` – Friend list, requests, and search
- `/studyroom/:roomId` – Study Room with whiteboard, timer, video, chat
- `/chat` – Personal and group chats
- `/profile` – User profile settings

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/StudyLive-Frontend.git
cd StudyLive-Frontend
>>>>>>> 905775042c8eedf843db8a3c4441408e82a27c56
