import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContextAPI } from '../../context/AppContext';
import { LogOut, SquareUserRound } from 'lucide-react';

export default function AdmissionHome() {
  const { applicants, currentUser, logoutUser } = useContext(AppContextAPI);
  const nav = useNavigate();
  const isAdmin = currentUser?.role === "admin";
  const isOfficer = currentUser?.role === "admission officer";
  const isManagement = currentUser?.role === "management";
  
  return (
    <div className="max-w-5xl mx-auto my-10 p-4 md:p-8">
      <button
        onClick={logoutUser}
        className="flex cursor-pointer text-brand hover:underline px-3 py-2.5 rounded-base float-end"
      >
        <LogOut />
        <span className="ms-3">Logout</span>
      </button>
      <h1 className="text-2xl font-bold">Applicants</h1>
      {isManagement ? (
        <p className="text-sm text-gray-500">
          Management may view applicants only.
        </p>
      ) : (
        <button
          className="bg-brand text-white px-4 py-2 rounded-base my-5"
          onClick={() => nav("/add-applicant")}
        >
          Add Applicants
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {applicants.length === 0 ? (
          <p className="text-gray-500">No applicants found</p>
        ) : (
          applicants.map((app) =>
            app._id ? (
              <button
                key={app._id}
                onClick={() => nav(`/applicant/${app._id}`)}
                className="flex items-center bg-card max-w-sm p-6 border border-default rounded-base shadow-xs hover:shadow-lg transition-shadow text-left cursor-pointer"
              >
                <SquareUserRound className="text-brand" />
                <span className="my-auto text-2xl font-semibold tracking-tight text-heading ml-3">
                  {app.name}
                </span>
              </button>
            ) : null,
          )
        )}
      </div>
    </div>
  );
}
