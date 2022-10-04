import axios from "axios";
import { useState } from "react";
import { Header } from "./Components/Header";
import { Form } from "./Components/Form";
import { DisplayData } from "./Components/DisplayData";
import { getUrl } from "./helpers/getUrl";
import "./App.css";

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
      } else {
        setError(`Please enter a valid URL`);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue("");
    setLoader(false);
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
      {error && <h3> {error} </h3>}

      <DisplayData data={data} />
    </div>
  );
}

export default App;
