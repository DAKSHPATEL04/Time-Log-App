import { useState } from "react";
import Filters from "./components/Filters";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  const [editId, setEditId] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">TimeLog</h1>
      <Filters />
      <Form editId={editId} />
      <Table setEditId={setEditId} />
    </div>
  );
}

export default App;
