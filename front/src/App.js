import React from "react";
import { StoreProvider } from "./store";
import FormList from "./todo-list/components/FormList";
import TableList from "./todo-list/components/TableList";

function App() {
  return (
    <div className="container-fluid">
      <StoreProvider>
        <div class="jumbotron card card-block py-2">
          <h3 className="text-center my-2">Dashboard</h3>
        </div>
        <div>
          <FormList></FormList>
          <TableList />
        </div>
      </StoreProvider>
    </div>
  );
}

export default App;
