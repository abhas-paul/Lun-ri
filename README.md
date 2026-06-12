<div align="center">

# 🌙 Lun-ri

### Connect. Chat. Call. Instantly.

A modern real-time social communication platform built with React, Node.js, MongoDB, and Stream.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-Server-black?style=for-the-badge&logo=express)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss)
![Stream](https://img.shields.io/badge/Stream-Chat_&_Video-7B61FF?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)

### 💬 Real-Time Messaging • 📹 Video Calling • 👥 Friend System • ⚡ Modern UI

</div>

## ✨ About

Lun-ri is a modern full-stack communication platform that allows users to connect, chat, and communicate in real time.

Users can discover new people, send friend requests, build their network, exchange messages instantly, and start video calls with a single click.

Built with scalability, performance, and developer experience in mind, Lun-ri combines a responsive React frontend with a secure Node.js backend and Stream's real-time infrastructure.

---

## 🎯 Why I Built This

I wanted to explore Stream's ecosystem and understand how modern real-time communication platforms work under the hood.

Instead of only reading documentation, I decided to learn by building.

Lun-ri was created as a hands-on project to gain practical experience with:

- Stream Chat
- Stream Video
- Real-time communication systems
- User synchronization
- Secure token generation
- Authentication workflows
- Full-stack application architecture

Building a complete application around these technologies helped me understand not only how Stream works, but also how production-ready communication platforms are structured and deployed.

What started as a learning project eventually evolved into a fully functional social communication platform.

---

## 🚀 Features

### 🔐 Authentication

- Secure JWT Authentication
- HTTP-only Cookie Sessions
- Protected Routes
- Persistent Login State
- Secure Password Hashing

### 👤 User Profiles

- User Onboarding Flow
- Profile Customization
- Bio Support
- Native Language Preferences
- Location Information
- Profile Picture Uploads

### 👥 Social Features

- Friend Request System
- Accept / Reject Requests
- Friends List Management
- User Recommendations
- Duplicate Request Prevention

### 💬 Real-Time Messaging

- Instant Messaging
- Real-Time Updates
- Modern Chat Interface
- Stream Chat Integration
- Secure Stream Tokens

### 📹 Video Calling

- One-Click Video Calls
- Responsive Call Interface
- Real-Time Communication
- Stream Video SDK Integration

### 🎨 User Experience

- Fully Responsive Design
- Mobile-First Development
- Clean Modern Interface
- Optimized Performance
- Smooth User Interactions

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Stream Chat SDK
- Stream Video SDK
- Cloudinary

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- Stream Server SDK

---

## 🏗️ Project Structure

```text
lun-ri/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── utils/
│   │
│   └── package.json
│
├── web/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   └── lib/
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend

```env
MONGO_DB_URI=

JWT_SEC_KEY=

STREAM_API_KEY=
STREAM_API_SECRET=

NODE_ENV=
PORT=
```

### Frontend

```env
MODE=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=

VITE_STREAM_API_KEY=
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/your-username/lun-ri.git

cd lun-ri
```

### Install Backend Dependencies

```bash
cd backend

npm install
```

### Install Frontend Dependencies

```bash
cd web

npm install
```

### Start Backend Server

```bash
npm run dev
```

### Start Frontend Server

```bash
npm run dev
```

---

## 🔄 Application Flow

```text
User Authentication
        ↓
     Onboarding
        ↓
 User Discovery
        ↓
 Friend Requests
        ↓
   Friend Network
        ↓
 Real-Time Chat
        ↓
  Video Calling
```

---

## 🔒 Security

- JWT Authentication
- HTTP-only Cookies
- Password Hashing using bcrypt
- Protected API Routes
- Secure Stream Token Generation
- Server-side Validation
- Secure User Synchronization

---

## 📚 What I Learned

Building Lun-ri gave me practical experience with:

- Real-time messaging architecture
- Video calling systems
- Stream Chat SDK
- Stream Video SDK
- Secure JWT authentication
- HTTP-only cookie sessions
- MongoDB data modeling
- Scalable Express APIs
- Responsive React applications
- User onboarding flows
- Friend system implementation
- Cloudinary image uploads
- Frontend and backend integration

This project helped me move beyond tutorials and gain hands-on experience building a complete production-style real-time application.

---

## 🌟 Highlights

✅ Real-Time Messaging

✅ Video Calling

✅ Friend System

✅ User Recommendations

✅ Responsive Design

✅ Modern Architecture

✅ Stream Integration

✅ Cloudinary Uploads

✅ Secure Authentication

✅ Production-Ready Structure

---

## 🔮 Future Improvements

- Online Presence Indicators
- Push Notifications
- Group Chats
- Read Receipts
- Message Reactions
- Voice Messages
- Media Sharing
- Refresh Token System
- End-to-End Encryption Research
- Enhanced User Discovery

---

## 👨‍💻 Developer

### Abhas Paul

Full-Stack Developer passionate about building scalable web applications, real-time systems, and modern user experiences.

**Core Technologies**

- Next.js
- React
- Node.js
- MongoDB
- TypeScript
- Express.js
- Real-Time Systems

---

## ⭐ Support

If you found this project helpful or interesting:

```bash
⭐ Star the repository
🍴 Fork the project
🚀 Build something awesome
```

---

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

You are free to use, modify, and distribute this project under the terms of the AGPL-3.0 license.

See the full license text here: https://www.gnu.org/licenses/agpl-3.0.html

---

<div align="center">

# 🌙 Lun-ri

### Built with code, coffee, and countless debugging sessions.

⭐ If you like the project, consider giving it a star.

</div>
