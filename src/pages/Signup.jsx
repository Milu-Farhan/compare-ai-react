import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();

    if (!name) setNameError("Enter your name");
    if (!email) setEmailError("Enter your email address");
    if (!password) setPasswordError("Enter a valid password");

    if (nameError || emailError || passwordError) {
      return;
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          res.errorMessage.name && setNameError(res.errorMessage.name);
          res.errorMessage.email && setEmailError(res.errorMessage.email);
          res.errorMessage.password &&
            setPasswordError(res.errorMessage.password);
        }
        if (res.success) {
          alert("Account crated successfully");
          navigate("/login");
        }
      });
  };

  return (
    <main>
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
