# 🤖 AI Chatbot (MERN + Google Gemini AI)

An AI-powered chatbot built using React, Node.js, Express, MongoDB, and the Google Gemini API. Users can send messages through a React frontend, which are processed by the Express backend and answered by Gemini AI.

---

## 🚀 Features

- AI-powered chat using Google Gemini
- React frontend (Vite)
- Express.js backend
- MongoDB database
- REST API
- Environment variable support
- Modular folder structure
- Error handling
- CORS enabled

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Mongoose
- dotenv
- CORS

### Database
- MongoDB Atlas

### AI
- Google Gemini API

---

# 📁 Project Structure

```
project/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── prompts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

```bash
cd project
```

---

## Backend Setup

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Run the server

```bash
npm run dev
```

Server URL

```
http://localhost:5000
```

---

## Frontend Setup

Open a new terminal

```bash
cd client
```

Install dependencies

```bash
npm install
```

Run the React application

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 🔌 API Endpoints

## Health Check

```
GET /
```

Response

```json
{
  "message": "Server is running"
}
```

---

## Chat API

```
POST /api/chat
```

Request

```json
{
  "message": "Hello"
}
```

Response

```json
{
  "reply": "Hello! How can I help you?"
}
```

---

# 🧪 Testing

## Backend

```bash
npm run dev
```

Open

```
http://localhost:5000
```

---

## Frontend

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

## Test API Using Postman

Method

```
POST
```

URL

```
http://localhost:5000/api/chat
```

Body

```json
{
  "message": "Tell me about AI."
}
```

---

# 🌍 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server Port |
| MONGODB_URI | MongoDB Connection String |
| GEMINI_API_KEY | Google Gemini API Key |

---

# 📦 Build

Frontend

```bash
npm run build
```

Backend

```bash
npm start
```

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# 👨‍💻 Author

Bholu Yadav

---

# 📄 License

MIT License
