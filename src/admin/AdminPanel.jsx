import { ContactRound, Landmark, LayoutDashboard, Menu } from "lucide-react";
import React, { useState } from "react";
import Institutions from "./Institutions";
import Campuses from "./Campuses";
import Departments from "./Departments";
import Programs from "./Programs";
import Quotas from "./Quotas";

export default function AdminPanel() {
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔥 Hierarchy state
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // 🔁 Reset hierarchy when switching sidebar
  const resetHierarchy = () => {
    setSelectedInstitution(null);
    setSelectedCampus(null);
    setSelectedDepartment(null);
    setSelectedProgram(null);
  };

  return (
    <div>
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="ms-3 mt-3 p-2 lg:hidden border border-border rounded"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 bg-card border-e border-border">
          <h2 className="text-xl font-bold mb-5">Edumerge</h2>

          <ul className="space-y-2 text-lg">
            {/* Dashboard */}
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

            {/* Institutions */}
            <li>
              <button
                onClick={() => {
                  setView("institutions");
                  resetHierarchy();
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-2 py-2 rounded ${
                  view === "institutions"
                    ? "bg-brand hover:bg-brand-strong cursor-pointer text-white"
                    : "hover:bg-brand-softer cursor-pointer hover:text-white"
                }`}
              >
                <Landmark />
                <span className="ms-3">Institutions</span>
              </button>
            </li>

            {/* Applicants */}
            <li>
              <button
                onClick={() => {
                  setView("applicants");
                  resetHierarchy();
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-2 py-2 rounded ${
                  view === "applicants"
                    ? "bg-brand hover:bg-brand-strong cursor-pointer text-white"
                    : "hover:bg-brand-softer cursor-pointer hover:text-white"
                }`}
              >
                <ContactRound />
                <span className="ms-3">Applicants</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 lg:ml-64">
        {/* Breadcrumb */}
        {view === "institutions" && (
          <p className="text-sm text-gray-500 mb-4">
            Institutions
            {selectedInstitution && ` > ${selectedInstitution.name}`}
            {selectedCampus && ` > ${selectedCampus.name}`}
            {selectedDepartment && ` > ${selectedDepartment.name}`}
            {selectedProgram && ` > ${selectedProgram.name}`}
          </p>
        )}

        {/* Dashboard */}
        {view === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p>Welcome to the admin panel</p>
          </div>
        )}

        {/* Applicants */}
        {view === "applicants" && (
          <div>
            <h1 className="text-2xl font-bold">Applicants</h1>
            <p>Applicant management coming here</p>
          </div>
        )}

        {/* 🔥 Institutions Flow */}

        {/* Level 1: Institutions */}
        {view === "institutions" && !selectedInstitution && (
          <Institutions onSelect={(inst) => setSelectedInstitution(inst)} />
        )}

        {/* Level 2: Campuses */}
        {view === "institutions" && selectedInstitution && !selectedCampus && (
          <Campuses
            institution={selectedInstitution}
            onBack={() => setSelectedInstitution(null)}
            onSelect={(campus) => setSelectedCampus(campus)}
          />
        )}

        {/* Level 3: Departments */}
        {view === "institutions" && selectedCampus && !selectedDepartment && (
          <Departments
            campus={selectedCampus}
            onBack={() => setSelectedCampus(null)}
            onSelect={(dept) => setSelectedDepartment(dept)}
          />
        )}

        {/* Level 4: Programs */}
        {view === "institutions" && selectedDepartment && !selectedProgram && (
          <Programs
            department={selectedDepartment}
            onBack={() => setSelectedDepartment(null)}
            onSelect={(program) => setSelectedProgram(program)}
          />
        )}

        {/* Level 5: Quotas */}
        {view === "institutions" && selectedProgram && (
          <Quotas
            program={selectedProgram}
            onBack={() => setSelectedProgram(null)}
          />
        )}
      </div>
    </div>
  );
}
