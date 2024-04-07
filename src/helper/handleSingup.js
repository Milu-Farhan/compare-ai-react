const handleSignup = async (
  data,
  setNameError,
  setEmailError,
  setPasswordError
) => {
  if (!data.name) setNameError("Enter your name");
  if (!data.email) setEmailError("Enter your email address");
  if (!data.password) setPasswordError("Enter a valid password");

  if (!data.name || !data.email || !data.password) return null;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!result.success) {
      if (result.errorMessage) {
        if (result.errorMessage.name) setNameError(result.errorMessage.name);
        if (result.errorMessage.email) setEmailError(result.errorMessage.email);
        if (result.errorMessage.password)
          setPasswordError(result.errorMessage.password);
      }
      return null;
    }

    return result;
  } catch (error) {
    alert("An error occurred. Please try again later");
    console.error("Error signing up:", error);
    return null;
  }
};

export default handleSignup;
