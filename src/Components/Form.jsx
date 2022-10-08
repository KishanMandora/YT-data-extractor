import axios from "axios";
import { info } from "daisyui/src/colors";
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
      return toast(`${inputValue} already in the list`, "info");
    }

    const currentUrl = getUrl(videoId);

    dispatch({ loader: true });
    try {
      const { data: responseData } = await axios.get(currentUrl);

      if (responseData.items.length) {
        const neededData = structuredResponseData(responseData);
        dispatch({ error: null, data: [...state.data, neededData] });
        setInputValue("");
      } else {
        setInputValue("");
        toast(`${inputValue} is invalid URL`, "error");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        error: { msg: `${error}`, type: "error" },
      });
    }
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
        {/* <div className="mt-4 flex gap-5">
          <label className="label cursor-pointer gap-3" htmlFor="description">
            <span className="label-text">Description</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              id="description"
              onChange={() => dispatch({ description: !state.description })}
            />
          </label>
          <label className="label cursor-pointer gap-3" htmlFor="channel">
            <span className="label-text">Channel Name</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              id="channel"
              onChange={() => dispatch({ channelName: !state.channelName })}
            />
          </label>
          <label className="label cursor-pointer gap-3" htmlFor="duration">
            <span className="label-text">Duration</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              id="duration"
              onChange={() => dispatch({ duration: !state.duration })}
            />
          </label>
          <label className="label cursor-pointer gap-3" htmlFor="thumbnails">
            <span className="label-text">Thumbnails</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              id="thumbnails"
              onChange={() => dispatch({ thumbnails: !state.thumbnails })}
            />
          </label>
        </div> */}
      </form>
    </div>
  );
}

export { Form };
