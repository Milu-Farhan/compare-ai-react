import user from "../assets/user.png";

const Navbar = ({ setIsLoggedin }) => {
  const name = "Farhan";

  const onLogoutClickHanlder = () => {
    localStorage.removeItem("access_token");
    setIsLoggedin(false);
  };
  return (
    <nav>
      <h1>
        Compare<span className="ai">AI</span>
      </h1>
      <div className="profile-wrapper">
        <img className="user-icon" src={user} alt="User icon" />
        <p>{name}</p>
        <button className="log-out" onClick={onLogoutClickHanlder}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
