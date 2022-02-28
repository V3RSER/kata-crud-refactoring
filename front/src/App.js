import React from "react";
import { StoreProvider } from "./store";
import FormList from "./todo-list/components/FormList";
import TableList from "./todo-list/components/TableList";

function App() {
  return (
    <StoreProvider>
      <div>
        <h3>Dashboard</h3>
      </div>
      <div>
        <FormList></FormList>
        <TableList />
      </div>
    </StoreProvider>
  );
}

export default App;
