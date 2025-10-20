# 📚 BookStore Application (MERN Stack)

A complete full-stack **MERN (MongoDB, Express.js, React, Node.js)** web application for managing an online bookstore.  
It includes user authentication, book browsing, cart management, and order processing with a clean UI and secure backend.

---

## 🧰 Prerequisites

Before you begin, make sure you have the following installed on your system:

### 🔹 Node.js & npm
Check if Node.js and npm are installed:
```bash
node -v
npm -v
```

If not installed, download from [Node.js official site](https://nodejs.org/) and install the **LTS version**.

### 🔹 MongoDB
You can use:
- **MongoDB Atlas (Cloud)** → [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)  
- or **MongoDB Community Server (Local)** → [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

---

## 🚀 Features
- 🧾 User authentication (JWT-based)
- 🛒 Manage books, carts, and orders
- 📦 RESTful APIs built with Express.js
- 🎨 Responsive React frontend
- 💾 MongoDB Atlas database support
- 🔐 Environment variable management using `.env`
- ⚡ Single command to run frontend and backend together

---

## 🧭 Complete User Flow

✅ **Register** → Create account with username, email, password  
✅ **Login** → Secure login using JWT authentication  
✅ **Navbar** → Includes search bar, cart icon, and logout button  
✅ **Dashboard** → Displays 10 categories (Fiction, Sci-Fi, Romance, etc.) with icons  
✅ **Books Page** → 24 real books per category fetched from Open Library API  
✅ **Search** → Search any book or genre directly from the navbar  
✅ **Add to Cart** → Add books to cart with a single click  
✅ **Shopping Cart** → View, update quantity (+/-), or remove items  
✅ **Order Summary** → Shows subtotal, tax (5%), and total  
✅ **Checkout** → Enter delivery details (name, email, phone, address, city, state, pincode)  
✅ **Payment Method** → Cash on Delivery (COD)  
✅ **Order Confirmation** → Displays order number, expected delivery date, and order status  
✅ **Logout** → Clears session and redirects to login page  

---

## 🧩 Project Structure
```
BookStore_Application/
│
├── backend/
│   ├── models/        # MongoDB models (User, Book, Order, Cart)
│   ├── routes/        # Express routes (Auth, Books, Orders)
│   ├── controllers/   # Business logic
│   ├── server.js      # Entry point of backend
│   ├── .env           # Environment variables (not committed)
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/           # React components, hooks, and pages
│   ├── .env           # Frontend environment variables (optional)
│   └── package.json
│
└── README.md
```

---

## ⚙️ Complete Project Setup (Step-by-Step)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/sairam949/BookStore_Application.git
cd BookStore_Application
```

---

### 2️⃣ Backend Setup
Go to backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file inside the `backend/` folder:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookstore
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
npm start
# or (for development)
npm run dev
```

Backend runs at ➡️ **http://localhost:5000**

---

### 3️⃣ Frontend Setup
Open another terminal and go to the frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the React frontend:
```bash
npm start
```

Frontend runs at ➡️ **http://localhost:3000**

---

### 4️⃣ Connect Backend and Frontend
To connect both locally, add this line inside your `frontend/package.json`:
```json
"proxy": "http://localhost:5000"
```

This lets the frontend directly call backend APIs without CORS errors.

---

## 🧠 Optional: Run Both Together
To start both backend & frontend with one command from the **root folder**:

1. Install `concurrently`:
   ```bash
   npm install concurrently --save-dev
   ```

2. In your root `package.json`, add:
   ```json
   "scripts": {
     "dev": "concurrently \"npm run dev --prefix backend\" \"npm start --prefix frontend\""
   }
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

✅ Both servers will start together!

---

## 🧾 Common Commands

| Command | Description |
|----------|--------------|
| `npm install` | Install project dependencies |
| `npm start` | Start production server |
| `npm run dev` | Start development server with auto reload |
| `git pull` | Sync latest code from GitHub |
| `git push` | Push local changes to GitHub |

---

## ✅ Final Steps
After completing setup:
- Visit **http://localhost:3000**
- Register → Login → Explore books → Add to cart → Checkout → Confirm order 🚀

---

## 🧾 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author
**Sai Ram**  
📎 GitHub: [sairam949](https://github.com/sairam949)  
🎓 RVR & JC College of Engineering — B.Tech (CSE - Data Science)
