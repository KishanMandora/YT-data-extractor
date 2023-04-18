import axios from "axios";
import { useState } from "react";
import { structuredResponseData } from "../helpers/helpers";
import { getUrl, getVideoId, checkForDuplicate } from "../helpers/helpers";
import { toast } from "./Toast";

function Form({ dispatch, state }) {
  const [inputValue, setInputValue] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const videoId = getVideoId(inputValue);

    const isDulicate = checkForDuplicate(state.data, videoId);

    if (isDulicate) {
      setInputValue("");
      return toast(`${isDulicate} already in the list`, "info");
    }

    const { videoDetailsUrl, commentsUrl } = getUrl(videoId);

    dispatch({ loader: true });
    try {
      const [
        { data: responseData },
        {
          data: { items: comments },
        },
      ] = await Promise.all([
        axios.get(videoDetailsUrl),
        axios.get(commentsUrl),
      ]);

      const neededData = structuredResponseData(responseData, comments);
      dispatch({ data: [...state.data, neededData] });
    } catch (error) {
      if (error.response.status === 404) {
        toast(`${inputValue} is invalid URL`, "error");
      } else {
        toast(`Some error occurred, please try again`, "error");
      }
    }
    setInputValue("");
    dispatch({ loader: false });
  };

  const isDisabled = () => {
    const regex = new RegExp(
      "^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+"
    );

    const isValidUrl = regex.test(inputValue);
    return isValidUrl ? false : true;
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="my-2 mx-auto flex w-4/5 justify-center">
      <form onSubmit={submitHandler}>
        <div className="flex gap-2">
          <input
            placeholder="youtube link"
            className="input input-bordered input-primary w-full max-w-xs rounded-r-none"
            type="text"
            value={inputValue}
            onChange={(e) => inputChangeHandler(e)}
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
            onClick={() => dispatch({ data: [] })}
            disabled={state.data.length ? false : true}
          >
            Delete Data
          </button>
        </div>
      </form>
    </div>
  );
}

export { Form };
