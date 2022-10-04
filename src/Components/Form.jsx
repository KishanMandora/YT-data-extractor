function Form({ submitHandler, inputValue, setInputValue }) {
  const isDisabled = () => {
    const regex = new RegExp(
      "^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+"
    );

    const isValidUrl = regex.test(inputValue);
    return isValidUrl ? false : true;
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        className="input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="btn" type="submit" disabled={isDisabled()}>
        Show Data
      </button>
    </form>
  );
}

export { Form };
