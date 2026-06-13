import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState, useContext } from "react";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp.jsx";
import SignIn from "./components/SignIn/signIn.jsx";
import AddItemPopUp from "./components/AddItemPopUp/AddItemPopUp.jsx";
import { StoreContext } from "./context/StoreContext.jsx";

const App = () => {
  const { user } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  // Auth Guard: If no user is logged in, show only Login or Sign Up
  if (!user) {
    return showSignIn ? (
      <SignIn setShowLogin={setShowLogin} setShowSignIn={setShowSignIn} />
    ) : (
      <LoginPopUp setShowLogin={setShowLogin} setShowSignIn={setShowSignIn} />
    );
  }

  return (
    <>
      {showAddItem && (
        <AddItemPopUp
          setShowAddItem={setShowAddItem}
        />
      )}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home setShowAddItem={setShowAddItem} />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;