# README content

# 🍔 Food Delivery Web App

A full-stack food delivery application built using **React.js** for the frontend and **Node.js/Express** for the backend. This app allows users to browse food items, add them to the cart, and place orders. Admin functionality is also included for managing products and orders.

## 🚀 Features

### 🧑‍💻 User Features
- User registration and login
- Browse food items with categories
- Add/remove items from the cart
- Place and view orders
- Responsive design for mobile and desktop





## 🧰 Tech Stack

### Frontend
- React.js
- React Router
- Context API (for global state management)
- Tailwind CSS (for styling)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
  

---


## 📁 Project Structure

```bash
food_delivery_project/
├── client/                 # Frontend (React)
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page-level components (Home, Login, Cart, etc.)
│       ├── context/        # Global context provider
│       ├── App.js
│       └── index.js
├── server/                 # Backend (Node + Express)
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose models
│   ├── routes/             # Express route handlers
│   ├── config/             # DB config and middleware
│   └── server.js
├── .env                    # Environment variables
└── README.md





### Prerequisites
- Node.js
- MongoDB

### Clone the Repository

git clone https://github.com/venky4648/food_delivery_project.git
cd food_delivery_project

Setup Backend
cd server
npm install
npm start

# Add .env with your MongoDB URI 
npm start

Setup Frontend
cd ../client
npm install
npm run dev


🔐 Environment Variables
Create a .env file inside the server folder with the following:
env

MONGO_URI=your_mongodb_connection_string

✅ Future Improvements
Add payment gateway integration (e.g., RazorPay)

User profile page


Push notifications
🙋‍♂️ Author
Venkatesh Kota

