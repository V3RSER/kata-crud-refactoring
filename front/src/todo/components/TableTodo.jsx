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
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Tarea</td>
            <td>¿Completado?</td>
            <td></td>
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
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>
                  <div>
                    <input
                      type="checkbox"
                      defaultChecked={todo.completed}
                      onChange={(event) => onChange(event, todo)}
                    ></input>
                  </div>
                </td>
                <td>
                  <button type="button" onClick={() => onDelete(todo.id)}>
                    Eliminar
                  </button>
                  <button
                    type="button"
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
