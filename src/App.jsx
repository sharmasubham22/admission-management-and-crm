import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import AdmissionHome from "./pages/AdmissionController/AdmissionHome";
import AddApplicant from "./pages/AdmissionController/AddApplicant";
import ApplicantDetails from "./pages/AdmissionController/ApplicantDetails";
import Login from "./pages/Login/Login";
import { AppContextAPI } from "./context/AppContext";

const RequireRole = ({ allowedRoles, children }) => {
  const { currentUser } = useContext(AppContextAPI);
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const roleRedirect = {
    admin: "/admin-panel",
    "admission officer": "/admission-home",
    management: "/admin-panel",
  };

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to={roleRedirect[currentUser.role] || "/"} replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin-panel"
        element={
          <RequireRole allowedRoles={["admin", "management"]}>
            <AdminPanel />
          </RequireRole>
        }
      />
      <Route
        path="/admission-home"
        element={
          <RequireRole allowedRoles={["admission officer"]}>
            <AdmissionHome />
          </RequireRole>
        }
      />
      <Route
        path="/add-applicant"
        element={
          <RequireRole allowedRoles={["admission officer"]}>
            <AddApplicant />
          </RequireRole>
        }
      />
      <Route
        path="/applicant/:id"
        element={
          <RequireRole allowedRoles={["admission officer", "management"]}>
            <ApplicantDetails />
          </RequireRole>
        }
      />
    </Routes>
  );
}

export default App;
