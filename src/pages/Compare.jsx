import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AiModalBox from "../components/AiModalBox";
import Navbar from "../components/Navbar";
import PromptForm from "../components/PromptForm";
import handleAIResponse from "../helper/handleAIResponse";
import fetchModelsInfo from "../helper/fetchModelsInfo";
import HowToStart from "../components/HowToStart";
import "../css/main.css";

const Compare = ({ setIsLoggedin }) => {
  const [firstAiModel, setFirstAiModel] = useState("");
  const [firstAiModelResponse, setFirstAiModelResponse] = useState("");
  const [firstAiModelMetrics, setFirstAiModelMetrics] = useState({});
  const [secondAiModel, setSecondAiModel] = useState("");
  const [secondAiModelResponse, setSecondAiModelResponse] = useState("");
  const [secondAiModelMetrics, setSecondAiModelMetrics] = useState({});
  const [models, setModels] = useState([]);
  const [prompt, setPrompt] = useState("");

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

    const uuid = uuidv4();

    await Promise.all([
      handleAIResponse(
        prompt,
        uuid,
        firstAiModel,
        setFirstAiModelResponse,
        setFirstAiModelMetrics,
        setIsLoggedin
      ),
      handleAIResponse(
        prompt,
        uuid,
        secondAiModel,
        setSecondAiModelResponse,
        setSecondAiModelMetrics,
        setIsLoggedin
      ),
    ]);
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
        {!firstAiModel && !secondAiModel ? HowToStart : ""}
        <div className="grid">
          <AiModalBox
            models={models}
            selectedAiModel={firstAiModel}
            setAiModel={setFirstAiModel}
            response={firstAiModelResponse}
            metrics={firstAiModelMetrics}
            setResponse={setFirstAiModelResponse}
            setMetrics={setFirstAiModelMetrics}
          />
          <AiModalBox
            models={models}
            selectedAiModel={secondAiModel}
            setAiModel={setSecondAiModel}
            response={secondAiModelResponse}
            metrics={secondAiModelMetrics}
            setResponse={setSecondAiModelResponse}
            setMetrics={setSecondAiModelMetrics}
          />
        </div>
      </main>
    </>
  );
};

export default Compare;
