"use strict";
import React, { useState, useEffect } from "react";
import "./app.scss";
import axios from "axios";
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";

function App() {
  const [state, setState] = useState({ data: "", requestParams: {} });
  const [history, setHistory] = useState([]);

  async function callApi(requestParams) {
    setState({ requestParams });
    setHistory([...history, requestParams.url, requestParams.method]);

    try {
      const dataUrl = await axios.get(requestParams.url);

      const data = {
        headers: [dataUrl.headers],
        results: [dataUrl.data.results],
      };
      setState({ data });
    } catch (e) {
      throw "error";
    }
  }
  useEffect(() => {
    console.log("RUN ON EVERY RE-RENDER");
  });

  useEffect(() => {
    console.log("I RUN ON HISTORY CHANGE: ${history}");
  }, [history]);

  useEffect(() => {
    console.log("I RUN ON STATE, HISTORY CHANGE: ", state);
  }, [state, history]);

  useEffect(() => {
    console.log("Initial loading ", state);
  }, []);

  //UNMOUNT
  useEffect(() => {
    return () => {
      console.log(" Component unmounted !!");
    };
  });

  return (
    <React.Fragment>
      <Header />

      {history.map((item, idx) => {
        return <div key={idx}>{item}</div>;
      })}
      <Form handleApiCall={callApi} />
      <Results data={state.data} />

      <Footer />
    </React.Fragment>
  );
}

export default App;
