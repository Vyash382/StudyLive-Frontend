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
