const handelLogin = async (data, setError) => {
  if (!data.email || !data.password) {
    setError("Please enter email and password");
    return null;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );

    const result = await response.json();
    if (result.errorMessage) {
      if (!result.success) {
        setError(result.errorMessage);
        return null;
      }
    }

    return result;
  } catch (error) {
    alert("An error occurred. Please try again later");
    console.error("Error signing up:", error);
    return null;
  }
};

export default handelLogin;
