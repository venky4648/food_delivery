
FOOD DELIVERY WEB APP

A full-stack food delivery application built using React.js for the frontend and Node.js/Express for the backend. This app allows users to browse food items, add them to the cart, and place orders. Admin functionality is also included for managing products and orders.

FEATURES

USER FEATURES
- User registration and login
- Browse food items with categories
- Add/remove items from cart
- Place and view orders
- Responsive design for mobile and desktop



TECH STACK

Frontend:
- React.js
- React Router
- Context API
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB with Mongoose


PROJECT STRUCTURE

food_delivery_project/
- client/ (Frontend - React)
  - public/
  - src/
    - components/ (Reusable UI components)
    - pages/ (Page-level components: Home, Login, Cart, etc.)
    - context/ (Global context provider)
    - App.js
    - index.js
- server/ (Backend - Node + Express)
  - controllers/ (Route logic)
  - models/ (Mongoose models)
  - routes/ (Express route handlers)
  - config/ (DB config and middleware)
  - server.js
- .env (Environment variables)
- README.md

INSTALLATION

1. Clone the repository:
   git clone https://github.com/venky4648/food_delivery_project.git
   cd food_delivery_project

2. Setup Backend:
   cd server
   npm install
   # Add .env with your MongoDB URI and JWT secret
   npm start

3. Setup Frontend:
   cd ../client
   npm install
   npm start

ENVIRONMENT VARIABLES

Create a .env file inside the server folder with the following:
MONGO_URI=your_mongodb_connection_string


FUTURE IMPROVEMENTS
- Add payment gateway integration (e.g., RazorPay)
- User profile page


AUTHOR
Venkatesh Kota
GitHub: https://github.com/venky4648


