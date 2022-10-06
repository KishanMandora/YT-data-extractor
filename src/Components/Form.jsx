import axios from "axios";
import { useState } from "react";
import { getUrl } from "../helpers/getUrl";

function Form({ setData, setError, setLoader, data }) {
  const [inputValue, setInputValue] = useState("");

  console.log(data.length);

  const submitHandler = async (e) => {
    e.preventDefault();

    const currentUrl = getUrl(inputValue);

    setLoader(true);
    try {
      // const sleep = await new Promise((r) => setTimeout(r, 1300));
      const { data: responseData } = await axios.get(currentUrl);

      if (responseData.items.length) {
        setData((data) => [...data, responseData]);
        setError(null);
        setLoader(false);
        setInputValue("");
      } else {
        setLoader(false);
        setInputValue("");
        setError({ msg: `Please enter a valid URL`, type: "error" });
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        await sleep(3000);
        setError(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <button
          className="btn btn-error rounded-sm"
          type="reset"
          onClick={() => setData([])}
          disabled={data.length ? false : true}
        >
          Delete Data
        </button>
      </form>
    </div>
  );
}

export { Form };
