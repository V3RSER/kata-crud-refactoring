import React, { useContext, useEffect, useState } from "react";
import FormTodo from "../../todo/components/FormTodo";
import TableTodo from "../../todo/components/TableTodo";
import consumer from "../consumer";
import events from "../events";
import Store from "../../store";

export default () => {
  const {
    state: { list, todo },
    dispatch,
  } = useContext(Store);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    consumer.findAll().then((response) => {
      if (response.ok) {
        response.json().then((list) => {
          dispatch(events.finded(list));
          console.log("Successful List");
        });
      }
      setLoaded(true);
    });
  }, [dispatch]);

  const onDelete = (idList) => {
    consumer.delete(idList).then((response) => {
      if (response.ok) {
        dispatch(events.deleted(idList));
      }
    });
  };

  return (
    <div>
      {!isLoaded && <div>Loading...</div>}
      {list.elements.length === 0 && <div>Empty list!</div>}
      {list.elements.map((element) => {
        return (
          <div key={element.id} id={"list-todo-" + element.id}>
            <fieldset className="default-field pt-1 px-4 mt-2">
              <legend className="w-auto">
                {element.name.toUpperCase()}
                <button
                  type="button"
                  className="btn btn-danger ml-1"
                  onClick={() => onDelete(element.id)}
                >
                  Eliminar
                </button>
              </legend>

              <FormTodo idList={element.id} todo={todo} />
              <TableTodo idList={element.id} todo={todo} />
            </fieldset>
          </div>
        );
      })}
    </div>
  );
};
