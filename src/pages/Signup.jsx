import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import handleSignup from "../helper/handleSingup";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "../css/form.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleForm = async (event) => {
    event.preventDefault();
    const result = await handleSignup(
      { name, email, password },
      setNameError,
      setEmailError,
      setPasswordError
    );

    if (result && result.success) {
      alert("Account crated successfully");
      navigate("/login");
    }
  };

  return (
    <main className="login-main ">
      <div className="form-wrapper">
        <div className="title-wraper">
          <h1>Welcome </h1>
          <p>Create your account in simple steps</p>
        </div>
        <form onSubmit={handleForm} className="login-form">
          <div className="input-wrapper">
            <label htmlFor="username">Name</label>
            <input
              className={nameError ? "error-input" : ""}
              type="text"
              id="username"
              onChange={(e) => {
                setNameError(false);
                setName(e.target.value);
              }}
              placeholder="Enter your full name"
            />
            {nameError && <p className="error">{nameError}</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              className={emailError ? "error-input" : ""}
              type="email"
              id="email"
              onChange={(e) => {
                setEmailError(false);
                setEmail(e.target.value);
              }}
              placeholder="Enter your e-mail address"
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                className={passwordError ? "error-input" : ""}
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => {
                  setPasswordError(false);
                  setPassword(e.target.value);
                }}
                placeholder="Enter new password"
              />
              <span
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                className="eye-icon-span"
                style={{ display: !password ? "none" : "" }}
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
          </div>
          <button type="submit">Sign up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
