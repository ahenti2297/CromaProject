// @ts-nocheck
import React, { useState } from "react";
import Style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "../SignUp/SignUp";

const Login = ({ isOpen = true, onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupOpen, setSignupOpen] = useState(false);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const handleCloseModal = () => {
    setSignupOpen(false);
    onClose();
  };
  const handleLogIn = async () => {
    try {
      if (!validateEmail(userName)) {
        setEmailError("Email is not valid");
        return;
      }

      if (!validatePassword(password)) {
        setPasswordError("Password is not valid");
        return;
      }
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectId: "7dey245ji457",
          },

          body: JSON.stringify({
            email: userName,
            password: password,
            appType: "ecommerce",
          }),
        }
      );
      const data = await response.json();
      if (response.status >= 400) {
        setError(data.message);
        return;
      }
      const userData = data.data;
      data.data = {};
      data.data.user = userData;
      localStorage.setItem("userDetails", JSON.stringify(data));
      setUser(data);

      navigate("/");
      const userDetails = localStorage.getItem("userDetails");
      const parseUserDetails = JSON.parse(userDetails);
      toast.success(`${parseUserDetails.user.name}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch {
      setError("Something went wrong");
    }
  };
  const toSignUp = () => {
    setSignupOpen(true);
    // navigate("/signup", { replace: true });
  };
  const handleEmailChange = (e) => {
    setUserName(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };
  if (!isOpen && !signupOpen) {
    return null;
  }

  if (userDetails) {
    return navigate(-1);
  }
  if (signupOpen) {
    return (
      <SignUp
        signupOpen={signupOpen}
        onClose={() => {
          setSignupOpen(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className={Style.modal}>
      <div className={Style.LogInContainer}>
        <div className={Style.crossButton} onClick={onClose}>
          X
        </div>

        <div className={Style.Heading}>
          <h2>Log In</h2>
        </div>
        <div className={Style.Form}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email address and phone number"
            value={userName}
            onChange={handleEmailChange}
            autoComplete="email"
            required
          />
          {emailError && <div className={Style.error}>{emailError}</div>}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            // autoComplete="current-password"
            required
          />
          {password && <div className={Style.error}>{passwordError}</div>}
          {error && <div className={Style.error}>{error}</div>}
          <button onClick={handleLogIn}>Log in</button>
          <button onClick={toSignUp}>Create new Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
