const fetchModelsInfo = (setModels, setIsLoggedin) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };

  fetch(`${import.meta.env.VITE_BASE_URL}/api/models`, { headers })
    .then((res) => {
      if (res.status == 401) {
        setIsLoggedin(false);
      }
      return res.json();
    })
    .then((result) => {
      setModels(result.data);
    });
};

export default fetchModelsInfo;
