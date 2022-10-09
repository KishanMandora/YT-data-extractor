import { useState } from "react";
import ReactDOM from "react-dom";
import { alertType } from "../helpers/helpers";
import { toastPubSub } from "../helpers/pubSub";

function toast(msg, type) {
  return toastPubSub.publish({
    id: Math.random(),
    msg,
    type,
  });
}

function ToastComp() {
  const [toasts, setToasts] = useState([]);

  toastPubSub.subscribe((data) => {
    setToasts((prev) => [...prev, data]);
    setTimeout(() => {
      setToasts((prev) => {
        const [, ...arr] = prev;
        return arr;
      });
    }, 3000);
  });

  return (
    <div className="toast toast-start toast-top">
      {Boolean(toasts.length) &&
        toasts.map(({ id, msg, type }) => {
          return (
            <div className={`alert toast-${type} animate-fade`} key={id}>
              <div>
                <span>{msg}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

function Toast() {
  return ReactDOM.createPortal(
    <ToastComp />,
    document.getElementById("portal")
  );
}

export default Toast;
export { toast };
