const SelectAiModel = ({ handleOnChange, selectedAiModel, models }) => {
  return (
    <div className="select-wrap">
      <label htmlFor="modal">Choose AI model</label>
      <select name="modal" onChange={handleOnChange} value={selectedAiModel}>
        <option value="" disabled>
          Choose
        </option>
        {models.map((item) => {
          return (
            <option value={item.model_key} key={item.model_key}>
              {item.model}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectAiModel;
