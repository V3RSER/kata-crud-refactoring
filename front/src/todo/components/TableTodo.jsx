import React, { useContext, useEffect, useState } from "react";
import consumer from "../consumer";
import events from "../events";
import Store from "../../store";

export default ({ idList, todo }) => {
  const { dispatch } = useContext(Store);
  const [isLoaded, setLoaded] = useState(false);
  const list = todo.elements.filter((element) => {
    return element.idList === idList;
  });
  useEffect(() => {
    consumer.findAll(idList).then((response) => {
      if (response.ok) {
        response.json().then((items) => {
          console.log("Successful ToDo");
          setLoaded(true);
          dispatch(events.finded(idList, items));
        });
      }
    });
  }, [idList, dispatch]);

  const onDelete = (itemId) => {
    consumer.delete(itemId).then((response) => {
      if (response.ok) {
        dispatch(events.deleted(idList, itemId));
      }
    });
  };

  const onEdit = (item) => {
    dispatch(events.onEdited(idList, item));
  };

  const onChange = (event, item) => {
    const request = {
      name: item.name,
      id: item.id,
      completed: event.target.checked,
      idList: item.idList,
    };

    consumer.update(item.id, request).then((response) => {
      if (response.ok) {
        response.json().then(() => {
          dispatch(events.updated(idList, request));
        });
      }
    });
  };

  const decorationDone = {
    textDecoration: "line-through",
    color: "#c3c3c3",
  };
  return (
    <div>
      {!isLoaded && <div>Loading...</div>}
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tarea</th>
            <th scope="col">¿Completado?</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {list.map((todo) => {
            return (
              <tr
                key={todo.id}
                style={todo.completed ? decorationDone : {}}
                id={"to-do-" + todo.id}
              >
                <th scope="row">{todo.id}</th>
                <td>{todo.name}</td>
                <td>
                  <div>
                    <input
                      className="form-checkbox-input"
                      type="checkbox"
                      defaultChecked={todo.completed}
                      onChange={(event) => onChange(event, todo)}
                    ></input>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(todo.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary ml-2"
                    disabled={todo.completed}
                    onClick={() => onEdit(todo)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
