import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import handleSignup from "../helper/handleSingup";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              className={passwordError ? "error-input" : ""}
              type="password"
              id="password"
              onChange={(e) => {
                setPasswordError(false);
                setPassword(e.target.value);
              }}
            />
            {passwordError && <p className="error">{passwordError}</p>}
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
