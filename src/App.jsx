import { useReducer, useEffect } from "react";
import { Header } from "./Components/Header";
import { Form } from "./Components/Form";
import { DisplayData } from "./Components/DisplayData";
import "./App.css";
import Loader from "./Components/Loader";

const initialValue = {
  description: true,
  channelName: true,
  duration: true,
  thumbnails: true,
  loader: false,
  data: JSON.parse(localStorage.getItem("data")) || [],
};

function App() {
  const [state, dispatch] = useReducer(
    (state, action) => ({ ...state, ...action }),
    initialValue
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.data));
  }, [state.data]);

  return (
    <div className="App font-kanit">
      <Header />
      <Form dispatch={dispatch} state={state} />
      {state.loader && <Loader />}

      <DisplayData data={state.data} dispatch={dispatch} />
    </div>
  );
}

export default App;
