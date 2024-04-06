import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) setIsLoggedin(true);
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedin ? (
              <Dashboard
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedin ? (
              <Navigate to="/" />
            ) : (
              <Login isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
