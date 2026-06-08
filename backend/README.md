# 🚀 Lun-ri Backend

A modern real-time chat backend built with Node.js, Express, MongoDB, JWT authentication, and Stream Chat integration.

This backend powers authentication, onboarding, friend system, recommendations, and real-time chat for the Lun-ri application.

---

## ✨ Features

- Secure authentication (JWT + HTTP-only cookies)
- User signup, login, logout
- One-time onboarding system
- Friend request system (send / accept / reject)
- Recommended users system
- Friends list API
- Real-time chat using Stream Chat
- Protected routes middleware
- MongoDB with Mongoose schemas
- Scalable and modular backend structure

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Stream Chat SDK
- bcryptjs
- cookie-parser
- dotenv

---

## 📁 Project Structure

src/
├── controllers/        # Route logic (auth, users, friends)

├── models/             # Mongoose schemas

├── routes/             # API routes

├── middleware/         # JWT auth middleware

├── lib/                # DB + Stream setup

├── utils/              # Helpers (Stream, tokens)

└── server.js           # Entry point


---

## 🔐 Authentication Flow

### Signup
- Creates user in MongoDB
- Generates default DiceBear profile picture
- Creates Stream user

### Login
- Validates credentials
- Returns JWT in HTTP-only cookie

### Logout
- Clears JWT cookie

### Protected Routes
- JWT verification via cookies
- Attaches user to req.user

---

## 👤 Onboarding Flow

After signup, user must complete onboarding once.

Required fields:
- name
- bio
- nativeLanguage
- location

Optional:
- profilePic (defaults to DiceBear avatar)

Process:
- Updates MongoDB user profile
- Sets isOnboarded = true
- Syncs user to Stream Chat

---

## 👥 Friend System

### Features
- Send friend request
- Accept friend request
- View incoming requests
- View outgoing requests
- View friends list
- Prevent duplicate requests
- Prevent self requests

### Logic
- Friend requests stored in MongoDB
- On acceptance, both users are added to each other's friends list

---

## 💬 Stream Chat Integration

Stream Chat is used for real-time messaging.

### Backend responsibilities
- Create/upsert Stream users
- Generate Stream tokens

### Frontend responsibilities
- Chat UI rendering
- Sending/receiving messages
- Real-time updates

---

## 🔐 Environment Variables

MONGO_DB_URI=your_mongodb_connection_string
JWT_SEC_KEY=your_jwt_secret

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

NODE_ENV=development
PORT=5000

---

## ▶️ Running the Project

Install dependencies:
npm install

Run development server:
npm run dev

Run production server:
npm start

---

## 🧪 API Routes

### Auth
POST /signup
POST /login
POST /logout
GET /me

### Users
GET /recommended-users
GET /friends

### Friend System
POST /friend-request/:id
POST /friend-request/accept/:id
GET /friend-requests
GET /friend-requests/outgoing

### Stream
GET /stream/token

---

## 🧠 Architecture Notes

- MongoDB is the single source of truth
- Stream is used only for real-time chat layer
- JWT stored in HTTP-only cookies for security
- Friend system is fully relational
- Designed for scalability and clean separation of concerns

---

## 🚀 Future Improvements

- Refresh token system
- Rate limiting on auth routes
- Pagination for users and friends
- Message read receipts (Stream feature)
- Notifications system
- Online presence system

---

## 👨‍💻 Author

Built by Abhas Paul

Full-stack developer focused on:
- Next.js
- Node.js
- Scalable backend systems