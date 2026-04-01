import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import AdmissionHome from "./pages/AdmissionController/AdmissionHome";
import AddApplicant from "./pages/AdmissionController/AddApplicant";
import ApplicantDetails from "./pages/AdmissionController/ApplicantDetails";

function App() {
  return (
      <Routes>
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/" element={<AdmissionHome />} />
        <Route path="/add-applicant" element={<AddApplicant />} />
        <Route path="/applicant/:id" element={<ApplicantDetails />} />
      </Routes>
  );
}

export default App;
