import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "../css/form.css";

const Login = ({ setIsLoggedin }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();
    setError(false);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

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
    <main>
      <div className="form-wrapper">
        <div className="title-wraper">
          <h1>Welcome back</h1>
          <p>Login to continue</p>
        </div>
        <form onSubmit={handleForm}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              className={error ? "error-input" : ""}
              type="email"
              ref={emailRef}
              id="email"
              onChange={() => setError(false)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              className={error ? "error-input" : ""}
              type="password"
              ref={passwordRef}
              id="password"
              onChange={() => setError(false)}
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
