import ReactDOM from "react-dom";

function Toast({ msg, type }) {
  const alertType = type === "success" ? "alert-success" : "alert-error";

  return ReactDOM.createPortal(
    <div className="toast toast-start toast-top ">
      <div className={`alert ${alertType} animate-fade`}>
        <div>
          <span>{msg}</span>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export { Toast };
