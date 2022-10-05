import axios from "axios";
import { useState } from "react";
import { Header } from "./Components/Header";
import { Form } from "./Components/Form";
import { DisplayData } from "./Components/DisplayData";
import { getUrl } from "./helpers/getUrl";
import "./App.css";
import { Toast } from "./Components/Toast";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const currentUrl = getUrl(inputValue);

    setLoader(true);
    try {
      // const sleep = await new Promise((r) => setTimeout(r, 1300));
      const { data: responseData } = await axios.get(currentUrl);

      if (responseData.items.length) {
        setData((data) => [...data, responseData]);
        setError(null);
        setLoader(false);
      } else {
        setError({ msg: `Please enter a valid URL`, type: "error" });
        setLoader(false);
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        await sleep(3000);
        setError(null);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue("");
  };

  return (
    <div className="App font-kanit">
      <Header />
      <Form
        inputValue={inputValue}
        setInputValue={setInputValue}
        submitHandler={submitHandler}
      />
      {loader && <h3> LOADING..... </h3>}
      {error && <Toast msg={error.msg} type={error.type} />}

      <DisplayData data={data} />
    </div>
  );
}

export default App;
