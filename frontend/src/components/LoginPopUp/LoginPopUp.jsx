/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopUp.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPopUp = ({ setShowLogin,setShowSignIn }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleFunction = () => {
    setShowLogin(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/logIn", values);
      const data = response.data;
      if (data.status) {
        alert("Login successful!");
        setShowLogin(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-cointainer" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>LogIn</h2>
          <img onClick={handleFunction} src={assets.cross_icon} alt="X" />
        </div>
        <div className="login-popup-inputs">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <button type="submit">Login</button>
        <p>
          create a new account
          <span>
            <a onClick={() => { setShowLogin(false); setShowSignIn(true); navigate('/signIn'); }} style={{ cursor: "pointer" }}>Sign In</a>
          </span>
        </p>
      </form>
    </div>
  );
};

LoginPopUp.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopUp;