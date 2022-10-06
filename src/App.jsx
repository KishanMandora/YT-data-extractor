import { useState } from "react";
import { Header } from "./Components/Header";
import { Form } from "./Components/Form";
import { DisplayData } from "./Components/DisplayData";
import "./App.css";
import { Toast } from "./Components/Toast";
import { useLocalStorage } from "./Hooks/useLocalStorage";

function App() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useLocalStorage("data", []);
  const [error, setError] = useState(null);

  return (
    <div className="App font-kanit">
      <Header />
      <Form
        setLoader={setLoader}
        setData={setData}
        setError={setError}
        data={data}
      />
      {loader && <h3> LOADING..... </h3>}
      {error && <Toast msg={error.msg} type={error.type} />}

      <DisplayData data={data} />
    </div>
  );
}

export default App;
