const PromptForm = ({ setPrompt, prompt, onSubmitHandler }) => {
  return (
    <form className="prompt-form" onSubmit={onSubmitHandler}>
      <textarea
        name="prompt"
        id="prompt"
        rows="2"
        placeholder="Enter your prompt here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button className="send-btn">Send</button>
    </form>
  );
};

export default PromptForm;
