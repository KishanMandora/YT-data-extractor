import { useState } from "react";
import { Card } from "./Card";
import { Markup } from "./Markup";

function DisplayData({ data }) {
  const [mode, setMode] = useState("visual");

  const dataStr = data.reduce((prev, curr, index) => {
    if (data.length - 1 === index) {
      return (
        prev +
        `
    {
      title: "${curr.items[0].snippet.title}"
    }`
      );
    }

    return (
      prev +
      `
    {
      title: "${curr.items[0].snippet.title}"
    },`
    );
  }, ``);

  const renderStr = `
  const data = [
    ${dataStr}
  ]
  `;

  const copyToBoard = async () => {
    await navigator.clipboard.writeText(renderStr);
    console.log("copied");
  };

  const blob = new Blob([renderStr], { type: "text/javascript" });
  const href = URL.createObjectURL(blob);

  const isVisualMode = () => (mode === "visual" ? "" : "btn-outline");
  const isMarkupMode = () => (mode === "markup" ? "" : "btn-outline");

  return (
    <div className="my-2 mx-auto w-4/5">
      <div className="my-4 flex items-center justify-around">
        <div className="flex gap-2">
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
        <div className="flex gap-2">
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
          >
            Download
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="M6 20q-.825 0-1.412-.587Q4 18.825 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413Q18.825 20 18 20Zm6-4-5-5 1.4-1.45 2.6 2.6V4h2v8.15l2.6-2.6L17 11Z" />
            </svg>
          </a>
        </div>
      </div>

      {mode === "visual" && (
        <section>
          {data.map((video) => {
            return <Card video={video} />;
          })}
        </section>
      )}

      {mode === "markup" && renderStr && <Markup str={renderStr} />}
    </div>
  );
}

export { DisplayData };
