import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";

function App() {
  return (
      <Routes>
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
  );
}

export default App;
