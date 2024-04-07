const PromptForm = ({ setPrompt, prompt, onSubmitHandler }) => {
  return (
    <form className="prompt-form" onSubmit={onSubmitHandler}>
      <input
        name="prompt"
        id="prompt"
        type="text"
        placeholder="Enter your prompt here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="send-btn" type="submit">
        Compare
      </button>
    </form>
  );
};

export default PromptForm;
