import { actionType } from "./events";

export default () => {
  const action = {};

  action[actionType.TODO_FINDED] = (state, action) => {
    const list = state.todo.elements;
    action.items.forEach((element) => {
      list.push(element);
    });
    return { ...state, todo: { elements: list, item: {} } };
  };

  action[actionType.TODO_CREATED] = (state, action) => {
    const list = state.todo.elements;
    list.push(action.item);
    return { ...state, todo: { elements: list, item: {} } };
  };

  action[actionType.TODO_ON_EDITED] = (state, action) => {
    const editToDo = { ...state.todo };
    editToDo.item[action.idList] = action.item;
    return { ...state, todo: editToDo };
  };

  action[actionType.TODO_UPDATED] = (state, action) => {
    const list = state.todo.elements.map((element) => {
      if (element.id === action.item.id) {
        return { ...action.item, idList: action.idList };
      }
      return element;
    });
    return { ...state, todo: { elements: list, item: {} } };
  };

  action[actionType.TODO_DELETED] = (state, action) => {
    const list = state.todo.elements.filter((element) => {
      return element.id !== action.itemId;
    });
    return { ...state, todo: { elements: list, item: {} } };
  };

  return action;
};
