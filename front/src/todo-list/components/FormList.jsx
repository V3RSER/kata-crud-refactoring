import React, { useContext, useRef, useState } from "react";
import consumer from "../consumer";
import events from "../events";
import Store from "../../store";

export default () => {
  const { dispatch } = useContext(Store);
  const formRef = useRef(null);
  const [state, setState] = useState({ name: "" });

  const onCreate = (event) => {
    event.preventDefault();
    consumer.save({ name: state.name, id: null }).then((response) => {
      if (response.ok) {
        response.json().then((newList) => {
          dispatch(events.saved(newList));
          formRef.current.reset();
          setState({ name: "" });
        });
      }
    });
  };

  return (
    <form className="form-group row m-0" ref={formRef}>
      <div className="col-xs-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="name"
            className="form-control "
            placeholder="Lista de TO-DO"
            onChange={(event) => {
              setState({ name: event.target.value });
            }}
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              onClick={onCreate}
            >
              Nueva lista
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
