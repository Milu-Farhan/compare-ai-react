import { useState } from "react";
import { Link } from "react-router-dom";
import handelLogin from "../helper/handleLogin";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "../css/form.css";

const Login = ({ setIsLoggedin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleForm = async (event) => {
    event.preventDefault();
    setError(false);

    const result = await handelLogin({ email, password }, setError);

    if (result.success) {
      setIsLoggedin(true);
      localStorage.setItem("access_token", result.data.access_token);
      localStorage.setItem(
        "user_details",
        JSON.stringify(result.data.user_details)
      );
    }
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
              placeholder="Enter your e-mail address"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                className={error ? "error-input" : ""}
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter your password"
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
            </div>
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
