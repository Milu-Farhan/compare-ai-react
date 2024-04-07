import user from "../assets/user.png";
import { NavLink } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineCompare } from "react-icons/md";
import { MdHistory } from "react-icons/md";

const Navbar = ({ setIsLoggedin }) => {
  const user_details = localStorage.getItem("user_details");
  const name = user_details ? JSON.parse(user_details).name : "Unknown";
  const email = user_details ? JSON.parse(user_details).email : "Not set";

  const onLogoutClickHanlder = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_details");
    setIsLoggedin(false);
  };
  return (
    <nav>
      <h1>
        Compare<span className="ai">AI</span>
      </h1>
      <div className="menu-items">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-menu menu-anchor" : "menu-anchor"
          }
        >
          <MdOutlineCompare className="main-icon" />
          Compare
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "active-menu menu-anchor" : "menu-anchor"
          }
        >
          <MdHistory className="main-icon" />
          History
        </NavLink>
      </div>
      <div className="profile-wrapper">
        <img className="user-icon" src={user} alt="User icon" />
        <div>
          <p className="name">{name}</p>
          <p className="email">{email}</p>
        </div>
        <button className="log-out" onClick={onLogoutClickHanlder}>
          <IoMdLogOut className="log-out-icon" />
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
