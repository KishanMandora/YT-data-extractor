function Form({ submitHandler, inputValue, setInputValue }) {
  const isDisabled = () => {
    const regex = new RegExp(
      "^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+"
    );

    const isValidUrl = regex.test(inputValue);
    return isValidUrl ? false : true;
  };

  return (
    <div className="my-2 mx-auto flex w-4/5 justify-center">
      <form onSubmit={submitHandler} className="flex gap-2">
        <input
          placeholder="youtube link"
          className="input input-bordered input-primary w-full max-w-xs rounded-r-none"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="btn btn-primary rounded-l-none"
          type="submit"
          disabled={isDisabled()}
        >
          Show Data
        </button>
      </form>
    </div>
  );
}

export { Form };
