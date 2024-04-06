const Dashboard = ({ isLoggedin, setIsLoggedin }) => {
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => setIsLoggedin((prev) => !prev)}>Toggle</button>
    </>
  );
};

export default Dashboard;
