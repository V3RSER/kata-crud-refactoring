export const actionType = {
  TODO_CREATED: "item.TODO_CREATED",
  TODO_UPDATED: "item.TODO_UPDATED",
  TODO_FINDED: "item.TODO_FINDED",
  TODO_DELETED: "item.TODO_DELETED",
  TODO_ON_EDITED: "item.TODO_ON_EDITED",
};

export default {
  saved: (idList, item) => ({ type: actionType.TODO_CREATED, item, idList }),
  deleted: (idList, itemId) => ({
    type: actionType.TODO_DELETED,
    itemId,
    idList,
  }),
  updated: (idList, item) => ({ type: actionType.TODO_UPDATED, item, idList }),
  onEdited: (idList, item) => ({
    type: actionType.TODO_ON_EDITED,
    item,
    idList,
  }),
  finded: (idList, items) => ({ type: actionType.TODO_FINDED, items, idList }),
};
