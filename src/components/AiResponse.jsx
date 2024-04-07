const AiResponse = ({ response }) => {
  return (
    <div className="response-wrapper">
      <h4>Response</h4>
      <div className="response-text">{response}</div>
    </div>
  );
};

export default AiResponse;
