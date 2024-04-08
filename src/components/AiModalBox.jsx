import { useState } from "react";
import ChooseInfo from "./ChooseInfo";
import Metrics from "./Metrics";
import AiResponse from "./AiResponse";
import RateLimits from "./RateLimits";
import SelectAiModel from "./SelectAiModel";

const AiModalBox = ({
  models,
  selectedAiModel,
  setAiModel,
  metrics,
  response,
  setResponse,
  setMetrics,
}) => {
  const [selectedModelContent, setSelectedModelContent] = useState({});

  const handleOnChange = (e) => {
    setAiModel(e.target.value);
    setResponse("");
    setMetrics({});
    setSelectedModelContent(
      models.find((item) => item.model_key === e.target.value)
    );
  };

  return (
    <section className="box-wrapper">
      <SelectAiModel
        models={models}
        selectedAiModel={selectedAiModel}
        handleOnChange={handleOnChange}
      />

      {!selectedAiModel && <ChooseInfo />}

      {selectedAiModel && (
        <RateLimits
          selectedModelContent={selectedModelContent}
          selectedAiModel={selectedAiModel}
        />
      )}

      {response && <AiResponse response={response} />}

      {Object.keys(metrics).length ? (
        <Metrics
          metrics={metrics}
          currency={selectedModelContent.input_cost[0].currency}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default AiModalBox;
