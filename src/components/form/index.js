import React from "react";
import { useState } from "react";
import "./form.scss";

function Form(props) {
  let [showPostTextArea, setShowPostTextArea] = useState(false);
  let [method, setMethod] = useState("get");
  let [url, setUrl] = useState("");
  let [requestBody, setRequestBody] = useState("https://pokeapi.co/api/v2/pokemon");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
    };
    props.handleApiCall(formData, requestBody);
    e.target.reset();
  }
  // =====================================
  function getHandler(e) {
    setMethod(e.target.id);
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

  function urlHandler(e) {
    setUrl(e.target.value);
  }
  // =====================================

  function handleRequestBody(e) {
    setRequestBody(e.target.value);
  }
  // =====================================

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input name="url" type="text" onChange={urlHandler} />
          <button type="submit"  data-testid="submit">
            GO!
          </button>
        </label>
        <label className="methods">
          <button className="butt" type="button" id="get" onClick={getHandler}>
            GET
          </button>
          <button
            className="butt"
            type="button"
            id="post"
            onClick={postHandler}
          >
            POST
          </button>
          <button
            className="butt"
            type="button"
            id="put"
            onClick={updateHandler}
          >
            PUT
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

export default Form;
