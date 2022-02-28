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
    <form ref={formRef}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="¿Qué piensas hacer?"
          defaultValue={item.name}
          onChange={(event) => {
            setState({ ...state, name: event.target.value });
          }}
        ></input>
        {item.id && <button onClick={onEdit}>Actualizar</button>}
        {!item.id && <button onClick={onAdd}>Crear</button>}
      </div>
    </form>
  );
};
