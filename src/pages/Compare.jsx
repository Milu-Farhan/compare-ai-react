import { useEffect, useRef, useState } from "react";
import AiModalBox from "../components/AiModalBox";
import Navbar from "../components/Navbar";
import PromptForm from "../components/PromptForm";
import handleAIResponse from "../helper/handleAIResponse";
import fetchModelsInfo from "../helper/fetchModelsInfo";
import "../css/dashboard.css";

const Compare = ({ setIsLoggedin }) => {
  const [firstAiModel, setFirstAiModel] = useState("");
  const [firstAiModelAnswer, setFirstAiModelAnswer] = useState("");
  const [secondAiModelAnswer, setSecondAiModelAnswer] = useState("");
  const [firstAiModelResponse, setFirstAiModelResponse] = useState({});
  const [secondAiModel, setSecondAiModel] = useState("");
  const [secondAiModelResponse, setSecondAiModelResponse] = useState({});
  const [models, setModels] = useState([]);
  const [prompt, setPrompt] = useState("");
  const containerRef = useRef(null);
  useEffect(() => {
    fetchModelsInfo(setModels, setIsLoggedin);
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!prompt) {
      return alert("Please enter a prompt.");
    }

    if (!firstAiModel || !secondAiModel || firstAiModel === secondAiModel)
      return alert("Please select two different AI models");

    await Promise.all([
      handleAIResponse(
        prompt,
        firstAiModel,
        setFirstAiModelAnswer,
        setFirstAiModelResponse,
        setIsLoggedin
      ),
      handleAIResponse(
        prompt,
        secondAiModel,
        setSecondAiModelAnswer,
        setSecondAiModelResponse,
        setIsLoggedin
      ),
    ]);

    scrollToBottom();
  };

  return (
    <>
      <Navbar setIsLoggedin={setIsLoggedin} />
      <main className="dashboard-main">
        <h2>Compare AI models</h2>
        <PromptForm
          onSubmitHandler={onSubmitHandler}
          prompt={prompt}
          setPrompt={setPrompt}
        />
        <div className="grid" ref={containerRef}>
          <AiModalBox
            models={models}
            selectedAiModel={firstAiModel}
            setAiModel={setFirstAiModel}
            answer={firstAiModelAnswer}
            otherDetails={firstAiModelResponse}
            setAnswer={setFirstAiModelAnswer}
            setOtherDetails={setFirstAiModelResponse}
          />
          <AiModalBox
            models={models}
            selectedAiModel={secondAiModel}
            setAiModel={setSecondAiModel}
            answer={secondAiModelAnswer}
            otherDetails={secondAiModelResponse}
            setAnswer={setSecondAiModelAnswer}
            setOtherDetails={setSecondAiModelResponse}
          />
        </div>
      </main>
    </>
  );
};

export default Compare;
