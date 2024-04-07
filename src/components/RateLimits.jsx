const RateLimits = ({ selectedModelContent, selectedAiModel }) => {
  return (
    <div className="modal-info-wrapper">
      <h3 className="modal-info">{selectedModelContent.model}</h3>
      <h4>Rate limits</h4>
      <ul className="rate-limits">
        <li>{selectedModelContent.RPM} RPM (requests per minute)</li>
        <li>{selectedModelContent.TPM} TPM (tokens per minute)</li>
        {selectedAiModel == "claude" ? (
          <li>{selectedModelContent.TPD} TPD (tokens per day)</li>
        ) : (
          <li>{selectedModelContent.RPD} RPD (requests per day)</li>
        )}
      </ul>
    </div>
  );
};

export default RateLimits;
