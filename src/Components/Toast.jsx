import ReactDOM from "react-dom";

function Toast({ msg, type }) {
  //   console.log(ReactDOM.createPortal(<h2> lol </h2>));

  return ReactDOM.createPortal(
    <div className="toast toast-start toast-top ">
      <div className={`alert alert-${type} animate-fade`}>
        <div>
          <span>{msg}</span>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export { Toast };
