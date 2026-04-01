import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContextAPI } from '../../context/AppContext';
import SeatAllot from '../../components/SeatAllot';

export default function ApplicantDetails() {
    const { fetchApplicantDetails } = useContext(AppContextAPI);
    const params = useParams();
    const nav = useNavigate();
    const [applicantData, setApplicantData] = useState({});
    const [showSeatModal, setShowSeatModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchApplicantDetails(params.id);
            setApplicantData(data);
        };
        fetchData();
    }, [params.id]);
  return (
    <div className="max-w-5xl mx-auto my-10 p-4 md:p-8">
      <h1 className="text-3xl font-bold ">Applicant Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-border py-6">
        <div>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="name"
          >
            Name:
          </label>
          <p id="name" className="mb-4 text-lg text-body">
            {applicantData.name}
          </p>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="email"
          >
            Email:
          </label>
          <p id="email" className="mb-4 text-lg text-body">
            {applicantData.email}
          </p>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="contact"
          >
            Contact:
          </label>
          <p id="contact" className="mb-4 text-lg text-body">
            {applicantData.contact}
          </p>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="address"
          >
            Address:
          </label>
          <p id="address" className="mb-4 text-lg text-body">
            {applicantData.address}
          </p>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="category"
          >
            Category:
          </label>
          <p id="category" className="mb-4 text-lg text-body">
            {applicantData.category}
          </p>
        </div>
        <div>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="fatherName"
          >
            Father's Name:
          </label>
          <p id="fatherName" className="mb-4 text-lg text-body">
            {applicantData.fatherName}
          </p>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="motherName"
          >
            Mother's Name:
          </label>
          <p id="motherName" className="mb-4 text-lg text-body">
            {applicantData.motherName}
          </p>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="entryType"
          >
            Entry Type:
          </label>
          <p id="entryType" className="mb-4 text-lg text-body">
            {applicantData.entryType}
          </p>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="marks"
          >
            Marks:
          </label>
          <p id="marks" className="mb-4 text-lg text-body">
            {applicantData.marks}%
          </p>
        </div>
      </div>
      <div className="py-6">
        <label
          className="block mb-2.5 text-sm font-semibold text-brand"
          htmlFor="documentStatus"
        >
          Document Status:
        </label>
        <p id="documentStatus" className="mb-4 text-lg text-body">
          {applicantData.documentStatus}
        </p>
        <label
          className="block mb-2.5 text-sm font-semibold text-brand"
          htmlFor="seatStatus"
        >
          Seat Status:
        </label>
        <p id="seatStatus" className="mb-4 text-lg text-body">
          {applicantData.seatStatus}
        </p>
        <label
          className="block mb-2.5 text-sm font-semibold text-brand"
          htmlFor="feeStatus"
        >
          Fee Status:
        </label>
        <p id="feeStatus" className="mb-4 text-lg text-body">
          {applicantData.feeStatus}
        </p>
      </div>
      <div>
        <button
          onClick={() => setShowSeatModal(true)}
          disabled={applicantData.seatStatus === "Allotted"}
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {applicantData.seatStatus === "Allotted" ? "Seat Allotted" : "Allot Seat"}
        </button>
        <button className="ml-3 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
          Update Document Status
        </button>
      </div>
      {showSeatModal && <SeatAllot applicant={applicantData} onClose={() => setShowSeatModal(false)} />}
    </div>
  );
}
