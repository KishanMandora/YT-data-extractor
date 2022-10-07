import ReactDOM from "react-dom";

function Toast({ msg, type }) {
  const alertType = (type) => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "info":
        return "alert-info";
      default:
        return "";
    }
  };

  return ReactDOM.createPortal(
    <div className="toast toast-start toast-top ">
      <div className={`alert ${alertType(type)} animate-fade`}>
        <div>
          <span>{msg}</span>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export { Toast };
