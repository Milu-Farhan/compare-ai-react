import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "../css/form.css";

const Login = ({ setIsLoggedin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();
    setError(false);

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          setError(res.errorMessage);
        }
        if (res.success) {
          setIsLoggedin(true);
          localStorage.setItem("access_token", res.data.access_token);
        }
      });
  };

  return (
    <main className="login-main">
      <div className="form-wrapper">
        <div className="title-wraper">
          <h1>Welcome back</h1>
          <p>Login to continue</p>
        </div>
        <form onSubmit={handleForm} className="login-form">
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              className={error ? "error-input" : ""}
              type="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              className={error ? "error-input" : ""}
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
