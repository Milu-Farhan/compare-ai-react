import { useEffect, useState } from "react";
import axios from "axios";
import AiModalBox from "../components/AiModalBox";
import Navbar from "../components/Navbar";
import PromptForm from "../components/PromptForm";
import handleAIResponse from "../helper/handleAIResponse";
import fetchModelsInfo from "../helper/fetchModelsInfo";
import "../css/dashboard.css";

const Dashboard = ({ setIsLoggedin }) => {
  const [firstAiModel, setFirstAiModel] = useState("");
  const [firstAiModelAnswer, setFirstAiModelAnswer] = useState("");
  const [secondAiModelAnswer, setSecondAiModelAnswer] = useState("");
  const [firstAiModelResponse, setFirstAiModelResponse] = useState({});
  const [secondAiModel, setSecondAiModel] = useState("");
  const [secondAiModelResponse, setSecondAiModelResponse] = useState({});
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
        <div className="grid">
          <AiModalBox
            models={models}
            selectedAiModel={firstAiModel}
            setAiModel={setFirstAiModel}
            response={firstAiModelResponse}
            answer={firstAiModelAnswer}
          />
          <AiModalBox
            models={models}
            selectedAiModel={secondAiModel}
            setAiModel={setSecondAiModel}
            response={secondAiModelResponse}
            answer={secondAiModelAnswer}
          />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
