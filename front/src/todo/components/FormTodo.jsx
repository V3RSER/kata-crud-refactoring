import React, { useContext, useRef, useState } from "react";
import consumer from "../consumer";
import events from "../events";
import Store from "../../store";

export default ({ idList, todo }) => {
  const formRef = useRef(null);
  const { dispatch } = useContext(Store);
  const item = todo.item[idList] ? todo.item[idList] : {};
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: null,
      completed: false,
      idList: idList,
    };

    consumer.save(idList, request).then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          dispatch(events.saved(idList, result));
          setState({ name: "" });
          formRef.current.reset();
        });
      }
    });
  };

  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: item.id,
      completed: item.completed,
      idList: item.idList,
    };

    consumer.update(item.id, request).then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          dispatch(events.updated(idList, result));
          setState({ name: "" });
          formRef.current.reset();
        });
      }
    });
  };

  return (
    <form className="form-group row mb-0 ml-0" ref={formRef}>
      <div className="col-xs-2">
        <div className="input-group mb-3">
          <input
            className="form-control "
            type="text"
            name="name"
            placeholder="¿Qué piensas hacer?"
            defaultValue={item.name}
            onChange={(event) => {
              setState({ ...state, name: event.target.value });
            }}
          ></input>
          <div className="input-group-append">
            {item.id && (
              <button className="btn btn-outline-warning" onClick={onEdit}>
                Actualizar
              </button>
            )}
            {!item.id && (
              <button className="btn btn-outline-success" onClick={onAdd}>
                Crear
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
