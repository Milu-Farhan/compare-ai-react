import { useState } from "react";

const AiModalBox = ({
  models,
  selectedAiModel,
  setAiModel,
  otherDetails,
  answer,
  setAnswer,
  setOtherDetails,
}) => {
  const [selectedModelContent, setSelectedModelContent] = useState({});

  const handleOnChange = (e) => {
    setAiModel(e.target.value);
    setAnswer("");
    setOtherDetails({});
    setSelectedModelContent(
      models.find((item) => item.model_key === e.target.value)
    );
  };

  return (
    <section className="box-wrapper">
      <div className="select-wrap">
        <label htmlFor="modal">Choose AI model</label>
        <select name="modal" onChange={handleOnChange} value={selectedAiModel}>
          <option value="">Choose</option>
          {models.map((item) => {
            return (
              <option value={item.model_key} key={item.model_key}>
                {item.model}
              </option>
            );
          })}
        </select>
      </div>
      {selectedAiModel && (
        <>
          <div className="modal-info-wrapper">
            <h3 className="modal-info">{selectedModelContent.model}</h3>
            <h4>Rate limits</h4>
            <ul className="rate-limits">
              <li>{selectedModelContent.RPM} RPM (requests per minute)</li>
              <li>{selectedModelContent.TPM} TPM (tokens per minute)</li>
              <li>{selectedModelContent.RPD} RPD (requests per day)</li>
            </ul>
          </div>
        </>
      )}

      {answer ? (
        <div className="response-wrapper">
          <h4>Response</h4>
          <div className="response-text">{answer}</div>
        </div>
      ) : (
        ""
      )}

      {Object.keys(otherDetails).length ? (
        <div className="metrics-wrapper">
          <h4>Performance metrics</h4>
          <div>
            <p>
              Input token:{" "}
              <span className="highlight">{otherDetails?.input_tokens}</span>
            </p>
            <p>
              Output token:{" "}
              <span className="highlight">{otherDetails?.output_tokens}</span>
            </p>
            <p>
              Total token:{" "}
              <span className="highlight">{otherDetails?.total_tokens}</span>
            </p>
            <p>
              Cost: <span className="highlight">${otherDetails?.cost}</span>
            </p>
            <p>
              Latency:{" "}
              <span className="highlight">{otherDetails?.latency}ms</span>
            </p>
            <p>
              Time taken:{" "}
              <span className="highlight">
                {(otherDetails?.time_taken / 1000).toFixed(2)}s
              </span>
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default AiModalBox;
