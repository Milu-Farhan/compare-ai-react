import { useEffect, useState } from "react";

const AiModalBox = ({
  models,
  selectedAiModel,
  setAiModel,
  response,
  answer,
}) => {
  const [selectedModelContent, setSelectedModelContent] = useState({});

  const handleOnChange = (e) => {
    setAiModel(e.target.value);
    setSelectedModelContent(
      models.find((item) => item.model_key === e.target.value)
    );
  };

  return (
    <section className="box-wrapper">
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

      {selectedAiModel && (
        <>
          <div className="modal-info-wrapper">
            <h2 className="modal-info">{selectedModelContent.model}</h2>
            <div className="rate-limits">
              <h4>Rate limits</h4>
              <p>{selectedModelContent.RPM} RPM (requests per minute)</p>
              <p>{selectedModelContent.TPM} TPM (tokens per minute)</p>
              <p>{selectedModelContent.RPD} RPD (requests per day)</p>
            </div>
          </div>
        </>
      )}

      <div className="response-text">{answer}</div>

      {Object.keys(response).length ? (
        <div className="response-wrapper">
          <div className="info-wrapper">
            <p>{`Input token: ${response?.usage?.prompt_tokens}`}</p>
            <p>{`Output token: ${response?.usage?.completion_tokens}`}</p>
            <p>{`Total token: ${response?.usage?.total_tokens}`}</p>
            <p>{`Cost: $ ${response?.cost}`}</p>
            <p>{`Latency: ${response?.latency}ms`}</p>
            <p>{`Time taken: ${(response?.duration / 1000).toFixed(2)}s`}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default AiModalBox;
