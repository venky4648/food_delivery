/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import { assets } from "../../assets/assets";

const SignIn = ({ setShowLogin, setShowSignIn }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleFunction = () => {
        setShowSignIn(false);
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/signIn", values);
            const data = response.data;
            if (data.status) {
                alert("Sign up successful! Please log in.");
                setShowSignIn(false);
                setShowLogin(true);
            } else {
                alert(data.message || "Sign up failed");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Sign up failed");
            }
            console.log(err);
        }
    };

    return (
        <div className="login-popup">
            <form className="login-popup-cointainer" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>Sign Up</h2>
                    <img onClick={handleFunction} src={assets.cross_icon} alt="X" />
                </div>
                <div className="login-popup-inputs">
                    <input onChange={handleChange} name="name" type="text" placeholder="Your Name" required />
                    <input onChange={handleChange} name="email" type="email" placeholder="Your Email" required />
                    <input onChange={handleChange} name="password" type="password" placeholder="Password" required />
                </div>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                <button type="submit">Submit</button>
                <p>
                    Already have an account?
                    <span>
                        <a
                            onClick={() => {
                                setShowSignIn(false);
                                setShowLogin(true);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Login
                        </a>
                    </span>
                </p>
            </form>
        </div>
    );
};

SignIn.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
    setShowSignIn: PropTypes.func.isRequired,
};

export default SignIn;