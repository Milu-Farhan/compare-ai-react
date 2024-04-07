import { isJSON } from "../utils";
const scrollDown = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

const handleAIResponse = async (
  prompt,
  uuid,
  AiModel,
  setAiModelAnswer,
  setAiModelMoreDetails,
  setIsLoggedin,
  containerRef
) => {
  setAiModelAnswer("");
  setAiModelMoreDetails("");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    Accept: "application/json, text/plain",
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/models/${AiModel}`,
    {
      method: "post",
      headers: headers,
      body: JSON.stringify({ prompt, uuid }),
    }
  );

  if (response.status == 401) {
    alert("Authentication failed. Logging out ....");
    setIsLoggedin(false);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const loopRunner = true;
  let timeoutId = null;

  while (loopRunner) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const decodedChunk = decoder.decode(value, { stream: true });
    if (isJSON(decodedChunk)) {
      const parsedJSON = JSON.parse(decodedChunk);
      setAiModelMoreDetails(parsedJSON);
    } else {
      setAiModelAnswer((answer) => answer + decodedChunk);
    }

    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        scrollDown();
        timeoutId = null;
      }, 100);
    }
  }
};

export default handleAIResponse;
