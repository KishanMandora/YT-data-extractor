import { useState } from "react";
import { createMarkupStr } from "../helpers/createMarkupStr";
import { Card } from "./Card";
import { Markup } from "./Markup";
import { Toast } from "./Toast";

function DisplayData({ data }) {
  const [mode, setMode] = useState("visual");
  const [toast, setToast] = useState(null);

  const dataStr = data.reduce((prev, curr, index) => {
    if (data.length - 1 === index) {
      return createMarkupStr(prev, curr);
    }

    return createMarkupStr(prev, curr) + ",";
  }, ``);

  const renderStr = `const data = [
    ${dataStr}
  ]
  `;

  const copyToBoard = async () => {
    await navigator.clipboard.writeText(renderStr);
    console.log("copied");

    setToast({ msg: "Data Copied Successfully", type: "success" });
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    await sleep(3000);
    setToast(null);
  };

  const downloadHandler = async () => {
    setToast({ msg: "Data Downloaded Successfully", type: "success" });
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    await sleep(3000);
    setToast(null);
  };

  const blob = new Blob([renderStr], { type: "text/javascript" });
  const href = URL.createObjectURL(blob);

  const isVisualMode = () => (mode === "visual" ? "" : "btn-outline");
  const isMarkupMode = () => (mode === "markup" ? "" : "btn-outline");

  return (
    <div className="my-2 mx-auto w-4/5  sm:w-11/12 md:w-4/5">
      <div className="my-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-around">
        <div className="flex w-full justify-between gap-2 sm:w-auto">
          <button
            className={`btn btn-primary ${isVisualMode()} `}
            onClick={() => setMode("visual")}
          >
            Visual Mode
          </button>
          <button
            className={`btn btn-accent ${isMarkupMode()}`}
            onClick={() => setMode("markup")}
          >
            Markup
          </button>
        </div>
        <div className="flex w-full justify-between gap-2 sm:w-auto">
          <button className="btn btn-secondary gap-2" onClick={copyToBoard}>
            Copy
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z" />
            </svg>
          </button>
          <a
            className="btn btn-outline btn-warning gap-2"
            href={href}
            download="data.js"
            onClick={downloadHandler}
          >
            Download
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="M6 20q-.825 0-1.412-.587Q4 18.825 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413Q18.825 20 18 20Zm6-4-5-5 1.4-1.45 2.6 2.6V4h2v8.15l2.6-2.6L17 11Z" />
            </svg>
          </a>
        </div>
      </div>

      {mode === "visual" && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.map((video) => {
            return <Card key={video.id} video={video} />;
          })}
        </section>
      )}

      {mode === "markup" && renderStr && <Markup str={renderStr} />}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

export { DisplayData };
