const logoutHandler = (setIsLoggedin) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_details");
  setIsLoggedin(false);
};

export default logoutHandler;
