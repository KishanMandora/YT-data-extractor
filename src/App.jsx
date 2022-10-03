import axios from "axios";
import { useEffect, useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import "./App.css";

const key = import.meta.env.VITE_API_KEY;
const url = (inputValue) =>
  `https://www.googleapis.com/youtube/v3/videos?id=${inputValue}&key=${key}&part=snippet,contentDetails,statistics,status`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const currentUrl = url(inputValue);

    setLoader(true);
    try {
      // const sleep = await new Promise((r) => setTimeout(r, 1300));
      const { data: responseData } = await axios.get(currentUrl);

      if (responseData.items.length) {
        setData((data) => [...data, responseData]);
        setInputValue("");
      } else {
        // setError(`Video doesn't exist`);
      }
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const dataStr = data.reduce((prev, curr, index) => {
    console.log("index", index);

    if (data.length - 1 === index) {
      console.log("yess");
      return (
        prev +
        `
    {
      title: "${curr.items[0].snippet.title}"
    }
      `
      );
    }
    console.log("noo");

    return (
      prev +
      `
    {
      title: "${curr.items[0].snippet.title}"
    },
    `
    );
  }, ``);

  const renderStr = `
  [
    ${dataStr}
  ]
  `;

  const copyToBoard = async () => {
    console.log("copy please");
    await navigator.clipboard.writeText(dataStr);
  };

  const blob = new Blob([dataStr], { type: "text/javascript" });
  const href = URL.createObjectURL(blob);

  console.log("data", data);
  console.log("data items", data.items);

  return (
    <div className="App">
      <h2> Yt-Dēta </h2>
      <p> Your goto app for extracting the data of Youtube Videos </p>

      <form onSubmit={submitHandler}>
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit"> Show Data </button>
      </form>

      {loader && <h3> LOADING..... </h3>}

      <section>
        {data.map((video) => {
          return <h4>{video.items[0].snippet.title}</h4>;
        })}
      </section>

      <button onClick={copyToBoard}> Copy JSON </button>
      <a href={href} download="data.js">
        Download
      </a>

      {dataStr && (
        <Highlight
          {...defaultProps}
          code={renderStr}
          theme={theme}
          language="javascript"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      )}
    </div>
  );
}

export default App;
