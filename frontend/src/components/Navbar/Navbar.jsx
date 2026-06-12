import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types"
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, user, setUser, setToken } = useContext(StoreContext)

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setToken("");
  };

  return (
    <div className="navbar">
      <Link to ="/"><img src={assets.logo} alt="header image" className="logo" /></Link>
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            className={menu === "home" ? "active" : ""}
            onClick={() => setMenu("home")}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            className={menu === "menu" ? "active" : ""}
            onClick={() => setMenu("menu")}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            className={menu === "mobile-app" ? "active" : ""}
            onClick={() => setMenu("mobile-app")}
          >
            Mobile App
          </a>
        </li>
        <li>
          <a
            href="#footer"
            className={menu === "contact-us" ? "active" : ""}
            onClick={() => setMenu("contact-us")}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-serach-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!user ? (
          <button onClick={()=>{setShowLogin(true)}}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li className="user-info">{user.name} ({user.role})</li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};


Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};
export default Navbar;
