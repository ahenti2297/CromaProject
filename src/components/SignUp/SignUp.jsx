import React, { useState } from "react";
import Style from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ signupOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [user_email, setuser_email] = useState("");
  const [user_password, setuser_password] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleEmailChange = (e) => {
    setuser_email(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setuser_password(e.target.value);
    setPasswordError("");
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };
  if (!signupOpen) {
    return null;
  }
  const submitForm = async () => {
    try {
      if (!validateEmail(user_email)) {
        setEmailError("Email is not valid");
        return;
      }

      if (!validatePassword(user_password)) {
        setPasswordError("Password is not valid");
        return;
      }
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectId: "7dey245ji457",
          },
          body: JSON.stringify({
            name: userName,
            email: user_email,
            password: user_password,
            appType: "ecommerce",
          }),
        }
      );
      const data = await responce.json();
      if (responce.status >= 400) {
        setError(data.message);
        return;
      }
      console.log("data", data);

      localStorage.setItem("userDetails", JSON.stringify(data));
      setUser(data);
      toast.success("SignUp successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate(-1);
    } catch {
      setError("Something went wrong");
    }
  };
  return (
    <div className={Style.modal}>
      <div className={Style.LogInContainer}>
        <div className={Style.crossButton} onClick={onClose}>X</div>

        <div className={Style.Heading}>
          <h2>Sign Up</h2>
        </div>
        <div className={Style.Form}>
          <label>User Name</label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="first name"
            autoComplete="firstname"
            required
          />
          <label>Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={user_email}
            onChange={handleEmailChange}
            placeholder="Email address"
            autoComplete="email"
            required
          />
          {emailError && <div className={Style.error}>{emailError}</div>}

          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={user_password}
            onChange={handlePasswordChange}
            placeholder="New Password"
            autoComplete="current-password"
            required
          />
          {passwordError && <div className={Style.error}>{passwordError}</div>}
          {error && <div className={Style.error}>{error}</div>}

          <button onClick={submitForm}>Sign Up</button>
          <div onClick={() => onClose()} className={Style.alreadyAccount}>Already have an account?</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
