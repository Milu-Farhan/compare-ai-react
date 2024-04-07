import Navbar from "../components/Navbar";
import HistoryItem from "../components/HistoryItem";
import fetchUserHistory from "../helper/fetchUserHistory";
import "../css/main.css";
import { useEffect, useState } from "react";

const History = ({ setIsLoggedin }) => {
  const [userHistory, setUserHistory] = useState([]);
  useEffect(() => {
    fetchUserHistory(setUserHistory, setIsLoggedin);
  }, []);

  return (
    <>
      <Navbar setIsLoggedin={setIsLoggedin} />
      <main className="history-main">
        <h2>History</h2>
        <div className="history-items-wrapper">
          {userHistory.map((item) => {
            return <HistoryItem data={item} key={item._id} />;
          })}
        </div>
      </main>
    </>
  );
};

export default History;
