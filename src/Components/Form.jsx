import axios from "axios";
import { useState } from "react";
import { filterResponseData } from "../helpers/filterResponseData";
import { getUrl } from "../helpers/getUrl";

function Form({ dispatch, state }) {
  const [inputValue, setInputValue] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const urls = inputValue.split(",");

    for (let i = 0; i < urls.length; i++) {
      const currentUrl = getUrl(urls[i].trim());

      dispatch({ loader: true });
      try {
        const { data: responseData } = await axios.get(currentUrl);

        if (responseData.items.length) {
          const neededData = filterResponseData(responseData);
          dispatch({ error: null, data: [...state.data, neededData] });
          setInputValue("");
        } else {
          setInputValue("");
          dispatch({
            error: { msg: `${urls[i]} is invalid URL`, type: "error" },
          });
          const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
          await sleep(3000);
          dispatch({ error: null });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          error: { msg: `${error}`, type: "error" },
        });
      }
      dispatch({ loader: false });
    }
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
          <button className="btn btn-primary rounded-l-none" type="submit">
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
        <div className="mt-4 flex gap-5">
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
        </div>
      </form>
    </div>
  );
}

export { Form };
