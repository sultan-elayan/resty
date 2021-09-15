import React, { useState } from "react";
import { useReducer } from "react";
import "./form.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Form } from "react-bootstrap";

function Form1(props) {
  let [showPostTextArea, setShowPostTextArea] = useState(false);
  let [method, setMethod] = useState("get");
  let [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  let [requestBody, setRequestBody] = useState("");
  const initialState = { api: [] };
  const [state, dispatch] = useReducer(apiReducer, initialState);

  function getHandler(e) {
    setMethod(e.target.id);
    console.log("method------------------>", e.target.id);
  }
  // =====================================

  function postHandler(e) {
    setShowPostTextArea(!showPostTextArea);
    setMethod(e.target.id);
  }
  // =====================================
  function updateHandler(e) {
    setShowPostTextArea(!showPostTextArea);
    setMethod(e.target.id);
  }

  // =====================================

  function deleteHandler(e) {
    setMethod(e.target.id);
  }
  // =====================================

  let urlHandler = async (e) => {
    setUrl(e.target.value);
  };
  // =====================================

  function handleRequestBody(e) {
    setRequestBody(e.target.value);
  }
  // =====================================

  function handleSubmit(e) {
    e.preventDefault();
    console.log("e.target >>> ", e.target);
    const name = e.target.api.value;
    const data = {
      method: method,
      name: name,
    };
    console.log("method===============================", method);
    dispatch(addAction(data));
    e.target.reset();
  }

  function apiReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case "ADD_API":
        const api = [...state.api, payload.method, payload.name];
        // return the new state
        return { api };
      case "REMOVE_API":
        const peopleWithoutPerson = state.api.filter((api) => api !== payload);
        return { api: peopleWithoutPerson };
      // return the new state
      case "EMPTY_API":
        return initialState;
      default:
        return state;
    }
  }

  let addAction = (name) => {
    return {
      type: "ADD_API",
      payload: name,
    };
  };

  let removeAction = (name) => {
    return {
      type: "REMOVE_API",
      payload: name,
    };
  };

  let emptyAction = () => {
    return {
      type: "EMPTY_API",
    };
  };

  return (
    <>
      <h1>History</h1>

      <ul>
        {state.api.map((api, indx) => {
          return (
            <li key={indx} onClick={() => dispatch(removeAction(api))}>
              {api}
            </li>
          );
        })}
      </ul>

      {/* =========== */}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>URL : </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter API URL"
              name="api"
              type="text"
              onChange={urlHandler}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3"></Row>

        <Button variant="primary" type="submit" data-testid="submit">
          GO !
        </Button>

        <Button
          variant="primary"
          onClick={() => dispatch(emptyAction())}
          style={{ marginLeft: "40px" }}
        >
          Clear All !
        </Button>
      </Form>
      {/* =========== */}
      <form onSubmit={handleSubmit}>
        {/* <label>
          <span>URL: </span>
          <input name="api" type="text" onChange={urlHandler} required />
          <button type="submit" data-testid="submit">
            GO!
          </button>
          <button onClick={() => dispatch(emptyAction())}>Clear All</button>
        </label> */}
        <Form.Label>Pick Method : </Form.Label>
        <label className="methods">
          <button className="butt" type="button" id="get" onClick={getHandler}>
            {" "}
            GET{" "}
          </button>
          <button
            className="butt"
            type="button"
            id="post"
            onClick={postHandler}
          >
            {" "}
            POST
          </button>
          <button
            className="butt"
            type="button"
            id="put"
            onClick={updateHandler}
          >
            PUT{" "}
          </button>
          <button
            className="butt"
            type="button"
            id="delete"
            onClick={deleteHandler}
          >
            DELETE
          </button>
        </label>
        {showPostTextArea && (
          <textarea
            name="postAndPut"
            rows="10"
            cols="35"
            onChange={handleRequestBody}
          />
        )}
      </form>
    </>
  );
}

export default Form1;
