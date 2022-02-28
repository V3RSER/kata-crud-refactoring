const HOST_API = "http://localhost:8080/api/";
export default {
  findAll: async (idList) => {
    return fetch(HOST_API + "todo/list/" + idList).catch((error) =>
      console.error("Error:", error)
    );
  },

  save: async (idList, request) => {
    return fetch(HOST_API + "todo/list/" + idList, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error:", error));
  },

  update: async (id, request) => {
    return fetch(HOST_API + "todo/" + id, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error:", error));
  },

  delete: async (id) => {
    return fetch(HOST_API + "todo/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.error("Error:", error));
  },
};
