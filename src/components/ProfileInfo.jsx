import user from "../assets/user.png";
import { IoMdLogOut } from "react-icons/io";
import logoutHandler from "../helper/logoutHandler";

const ProfileInfo = ({ setIsLoggedin }) => {
  const user_details = localStorage.getItem("user_details");
  const name = user_details ? JSON.parse(user_details).name : "Unknown";
  const email = user_details ? JSON.parse(user_details).email : "Not set";

  return (
    <div className="profile-wrapper">
      <img className="user-icon" src={user} alt="User icon" />
      <div>
        <p className="name">{name}</p>
        <p className="email">{email}</p>
      </div>
      <button className="log-out" onClick={() => logoutHandler(setIsLoggedin)}>
        <IoMdLogOut className="log-out-icon" />
        Log out
      </button>
    </div>
  );
};

export default ProfileInfo;
