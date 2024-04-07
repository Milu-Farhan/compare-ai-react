const fetchUserHistory = (setUserHistory, setIsLoggedin) => {
  setUserHistory([]);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };

  fetch(`${import.meta.env.VITE_BASE_URL}/api/history`, { headers })
    .then((res) => {
      if (res.status == 401) {
        setIsLoggedin(false);
      }
      return res.json();
    })
    .then((result) => {
      result.sort(function (a, b) {
        return b.documents[0].createdAt.localeCompare(a.documents[0].createdAt);
      });
      setUserHistory(result);
    });
};

export default fetchUserHistory;
