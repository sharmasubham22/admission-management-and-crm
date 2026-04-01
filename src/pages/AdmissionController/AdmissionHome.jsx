import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContextAPI } from '../../context/AppContext';

export default function AdmissionHome() {
  const { applicants } = useContext(AppContextAPI);
  const nav = useNavigate();
  
  return (
    <div className='max-w-5xl mx-auto my-10 p-4 md:p-8'>
      <h1 className='text-2xl font-bold'>Applicants</h1>
      <button
        className="bg-brand text-white px-4 py-2 rounded-base my-5" 
        onClick={() => nav("/add-applicant")}
      >
        Add Applicants
      </button>
      <div className="space-y-3">
        {applicants.length === 0 ? (
          <p className="text-gray-500">No applicants found</p>
        ) : (
          applicants.map((app) => (
            <button
              key={app._id}
              onClick={() => nav(`/applicant/${app._id}`)}
              className="bg-card block max-w-sm p-6 border border-default rounded-base shadow-xs cursor-pointer"
            >
              <span className="my-auto text-2xl font-semibold tracking-tight text-heading">
                {app.name}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
