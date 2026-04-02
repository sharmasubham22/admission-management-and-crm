import { ContactRound, Landmark, LayoutDashboard, LogOut, Menu, SquareUserRound, User } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import Institutions from "./Institutions";
import Campuses from "./Campuses";
import Departments from "./Departments";
import Programs from "./Programs";
import Quotas from "./Quotas";
import { AppContextAPI } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import CreateUser from "../pages/Login/CreateUser";
import Dashboard from "../components/Dashboard";

export default function AdminPanel() {
  const { applicants, users, currentUser, logoutUser } = useContext(AppContextAPI);
  const [view, setView] = useState("dashboard");
  const nav = useNavigate();

  const isAdmin = currentUser?.role === "admin";
  const isOfficer = currentUser?.role === "admission officer";
  const isManagement = currentUser?.role === "management";

  useEffect(() => {
    if (!currentUser) {
      nav("/");
      return;
    }
    if (isOfficer) {
      nav("/admission-home");
    }
  }, [currentUser]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const resetHierarchy = () => {
    setSelectedInstitution(null);
    setSelectedCampus(null);
    setSelectedDepartment(null);
    setSelectedProgram(null);
  };

  return (
    <div>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="ms-3 mt-3 p-2 lg:hidden border border-border rounded"
      >
        <Menu />
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 bg-card border-e border-border">
          <h1 className="text-xl font-bold mb-5">Edumerge</h1>

          <ul className="space-y-2 text-lg">
            <li>
              <button
                onClick={() => {
                  setView("dashboard");
                  resetHierarchy();
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-2 py-2 rounded-base ${
                  view === "dashboard"
                    ? "bg-brand hover:bg-brand-strong cursor-pointer text-white"
                    : "hover:bg-brand-softer cursor-pointer hover:text-white"
                }`}
              >
                <LayoutDashboard />
                <span className="ms-3">Dashboard</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setView("institutions");
                  resetHierarchy();
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-2 py-2 rounded-base ${
                  view === "institutions"
                    ? "bg-brand hover:bg-brand-strong cursor-pointer text-white"
                    : "hover:bg-brand-softer cursor-pointer hover:text-white"
                }`}
              >
                <Landmark />
                <span className="ms-3">Institutions</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setView("applicants");
                  resetHierarchy();
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-2 py-2 rounded-base ${
                  view === "applicants"
                    ? "bg-brand hover:bg-brand-strong cursor-pointer text-white"
                    : "hover:bg-brand-softer cursor-pointer hover:text-white"
                }`}
              >
                <ContactRound />
                <span className="ms-3">Applicants</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setView("users");
                  resetHierarchy();
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-2 py-2 rounded-base ${
                  view === "users"
                    ? "bg-brand hover:bg-brand-strong cursor-pointer text-white"
                    : "hover:bg-brand-softer cursor-pointer hover:text-white"
                }`}
              >
                <User />
                <span className="ms-3">Users</span>
              </button>
            </li>

            <li>
              <button
                onClick={logoutUser}
                className={`flex items-center w-full px-2 py-2 rounded-base ${
                  ""
                    ? "bg-brand hover:bg-brand-strong cursor-pointer text-white"
                    : "hover:bg-brand-softer cursor-pointer hover:text-white"
                }`}
              >
                <LogOut />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 lg:ml-64">
        {view === "institutions" && (
          <>
            <h1 className="text-2xl font-bold mb-5">Institutions</h1>
            <p className="text-sm text-gray-500 mb-4">
              Institutions
              {selectedInstitution && ` > ${selectedInstitution.name}`}
              {selectedCampus && ` > ${selectedCampus.name}`}
              {selectedDepartment && ` > ${selectedDepartment.name}`}
              {selectedProgram && ` > ${selectedProgram.name}`}
            </p>
          </>
        )}

        {view === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
            <Dashboard />
          </div>
        )}

        {/* Applicants */}
        {view === "applicants" && (
          <div>
            <h1 className="text-2xl font-bold mb-5">Applicants</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {applicants.length === 0 ? (
                <p className="text-gray-500">No applicants found</p>
              ) : (
                applicants.map((app) =>
                  app._id ? (
                    <div
                      key={app._id}
                      className=" bg-card max-w-sm p-6 border border-default rounded-base shadow-xs hover:shadow-lg transition-shadow text-left"
                    >
                      <SquareUserRound className="text-brand" />
                      <h1 className="my-auto text-2xl font-semibold tracking-tight text-heading">
                        {app.name}
                      </h1>

                      <p>Seat: {app.seatStatus}</p>
                      <p>
                        Documents:{" "}
                        <span className="capitalize">{app.documentStatus}</span>
                      </p>
                      <p>Fees: {app.feeStatus}</p>
                      <p>{app.admissionNumber}</p>
                    </div>
                  ) : null,
                )
              )}
            </div>
          </div>
        )}

        {view === "institutions" && !selectedInstitution && (
          <Institutions onSelect={(inst) => setSelectedInstitution(inst)} />
        )}

        {view === "institutions" && selectedInstitution && !selectedCampus && (
          <Campuses
            institution={selectedInstitution}
            onBack={() => setSelectedInstitution(null)}
            onSelect={(campus) => setSelectedCampus(campus)}
          />
        )}

        {view === "institutions" && selectedCampus && !selectedDepartment && (
          <Departments
            campus={selectedCampus}
            onBack={() => setSelectedCampus(null)}
            onSelect={(dept) => setSelectedDepartment(dept)}
          />
        )}

        {view === "institutions" && selectedDepartment && !selectedProgram && (
          <Programs
            department={selectedDepartment}
            onBack={() => setSelectedDepartment(null)}
            onSelect={(program) => setSelectedProgram(program)}
          />
        )}

        {view === "institutions" && selectedProgram && (
          <Quotas
            program={selectedProgram}
            onBack={() => setSelectedProgram(null)}
          />
        )}

        {view === "users" && (
          <div>
            {isAdmin ? (
              <CreateUser />
            ) : (
              <></>
            )}
            <h1 className="text-2xl font-bold my-5">Users:</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {users.map((user) => (
                <div className="bg-card p-4 border border-border rounded-base">
                  <h1 className="text-xl text-heading font-bold">
                    {user.name}
                  </h1>
                  <p className="text-body">
                    Role: <span className="capitalize">{user.role}</span>
                  </p>
                  <p className="text-body">Email: {user.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
