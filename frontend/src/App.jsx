import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState } from "react";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp.jsx";
import SignIn from "./components/SignIn/signIn.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      {showLogin && (
        <LoginPopUp
          setShowLogin={setShowLogin}
          setShowSignIn={setShowSignIn}
        />
      )}
      {showSignIn && (
        <SignIn
          setShowLogin={setShowLogin}
          setShowSignIn={setShowSignIn}
        />
      )}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;