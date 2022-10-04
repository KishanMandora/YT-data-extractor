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
    }
      `
      );
    }

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

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setMode("visual")}>
        Visual Mode
      </button>
      <button
        className="btn btn-secondary btn-outline"
        onClick={() => setMode("markup")}
      >
        Markup
      </button>
      <button className="btn btn-secondary btn-outline" onClick={copyToBoard}>
        Copy JS
      </button>
      <a href={href} download="data.js">
        Download js
      </a>

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
