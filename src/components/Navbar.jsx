import { NavLink } from "react-router-dom";
import { MdOutlineCompare } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import ProfileInfo from "./ProfileInfo";

const Navbar = ({ setIsLoggedin }) => {
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
      <ProfileInfo setIsLoggedin={setIsLoggedin} />
    </nav>
  );
};

export default Navbar;
