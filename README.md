# FOOD DELIVERY WEB APP

A full-stack food delivery application with a React/Vite frontend and a Node.js/Express backend. Users can browse food items, add products to the cart, place orders, and complete checkout via Razorpay.

## Features

- User registration and login
- Browse menu items and filter by categories
- Add, update, and remove items in the cart
- Place orders and verify payments
- Responsive UI for desktop and mobile
- Razorpay payment order creation and signature verification

## Tech Stack

- Frontend: React, React Router, Vite, Axios, Context API
- Backend: Node.js, Express, MongoDB, Mongoose
- Payment: Razorpay
- Utilities: dotenv, cors

## Project Structure

- `frontend/`
  - `src/` - React application source
  - `components/` - reusable UI components
  - `pages/` - page-level views such as Home, Cart, PlaceOrder
  - `context/` - global store and state management
  - `App.jsx`, `main.jsx`
- `server/`
  - `controllers/` - request handling logic
  - `models/` - MongoDB schemas
  - `routes/` - Express route definitions
  - `config/` - database and payment configuration
  - `index.js` - Express server entrypoint
- `README.md` - project documentation

## Backend Routes

- `POST /api/signIn` - register a new user
- `POST /api/login` - authenticate a user
- `POST /api/payment/create-order` - create a Razorpay order
- `POST /api/payment/verify-payment` - verify Razorpay payment signature
- `POST /api/orders/create` - create an order record
- `POST /api/orders/update-payment` - update order payment details
- `GET /api/orders/:orderId` - fetch an order by ID

## Setup

### Backend

1. Open a terminal in `server/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend:
   ```bash
   npm start
   ```

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend dev server:
   ```bash
   npm run dev
   ```

## Environment Variables

The backend currently uses a local MongoDB connection string in `server/config/db.js`:

```js
mongodb://localhost:27017/database
```

For Razorpay payment support, create `server/.env` and add:

```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_key_secret
PORT=3000
```

> If Razorpay keys are missing, the payment routes will be disabled and the server will warn on startup.

## Notes

- The current backend connects to a local MongoDB instance by default.
- Update `server/config/db.js` if you want to use a remote MongoDB URI.
- The frontend uses React components and a context store for cart state.

## Author

Venkatesh Kota

GitHub: https://github.com/venky4648
