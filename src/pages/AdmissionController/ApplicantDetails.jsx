import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContextAPI } from '../../context/AppContext';
import SeatAllot from '../../components/SeatAllot';

export default function ApplicantDetails() {
    const { fetchApplicantDetails, updateDocumentStatus, updateFeeStatus } = useContext(AppContextAPI);
    const params = useParams();
    const nav = useNavigate();
    const [applicantData, setApplicantData] = useState({});
    const [showSeatModal, setShowSeatModal] = useState(false);
    const [showDocModal, setShowDocModal] = useState(false);
    const [showFeeModal, setShowFeeModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchApplicantDetails(params.id);
            setApplicantData(data);
        };
        fetchData();
    }, [params.id]);

    const handleDocStatus = async (status) => {
      try {
        const result = await updateDocumentStatus(params.id, status);

        if (result.success) {
          alert("Document status updated!");
          
          const updated = await fetchApplicantDetails(params.id);
          setApplicantData(updated);
        } else {
          alert(result.error || "Update failed");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    };

    const handleFeeStatus = async (status) => {
      try {
        const result = await updateFeeStatus(params.id, status);

        if (result.success) {
          alert("Fee status updated!");

          const updated = await fetchApplicantDetails(params.id);
          setApplicantData(updated);
        } else {
          alert(result.error || "Update failed");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    };

    const programName = applicantData.programId?.name;
    const deptName = applicantData.programId?.departmentId?.name;
    const campusName = applicantData.programId?.departmentId?.campusId?.name;
    const institutionName = applicantData.programId?.departmentId?.campusId?.institutionId?.name;

    const docStatus = applicantData.documentStatus?.toLowerCase();
    const feeStatus = applicantData.feeStatus?.toLowerCase();

  return (
    <div className="max-w-5xl mx-auto my-10 p-4 md:p-8">
      <h1 className="text-3xl font-bold ">Applicant Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 border-b border-border py-6">
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
          {applicantData.entryType === "Government" && (
            <>
              <label
                className="block mb-2.5 text-sm font-semibold text-brand"
                htmlFor="allotmentNumber"
              >
                Allottment Number:
              </label>
              <p id="allotmentNumber" className="mb-4 text-lg text-body">
                {applicantData.allotmentNumber}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 py-6">
        <div>
          <label
            className="block mb-2.5 text-sm font-semibold text-brand"
            htmlFor="documentStatus"
          >
            Document Status:
          </label>
          <p id="documentStatus" className="mb-4 text-lg text-body capitalize">
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
          {applicantData.seatStatus === "Allotted" && (
            <>
              <label
                className="block mb-2.5 text-sm font-semibold text-brand"
                htmlFor="allotted"
              >
                Allotted Details:
              </label>
              <p id="allotted" className="mb-4 text-lg text-body">
                Institution: {institutionName}
                <br />
                Campus: {campusName}
                <br />
                Department: {deptName}
                <br />
                Program: {programName}
              </p>
              <label
                className="block mb-2.5 text-sm font-semibold text-brand"
                htmlFor="allottedQuota"
              >
                Quota:
              </label>
              <p
                id="allottedQuota"
                className="mb-4 text-lg text-body uppercase"
              >
                {applicantData.quotaType}
              </p>
            </>
          )}
        </div>
      </div>
      <div className='my-5 text-center'>
        <label
          className="block mb-2.5 text-sm font-semibold text-brand"
          htmlFor="admissionNumber"
        >
          Admission Number:
        </label>
        <h1 className='text-2xl'>
          {applicantData.admissionNumber ||
            "Admission Number not generated yet"}
        </h1>
      </div>
      <div>
        <button
          onClick={() => setShowSeatModal(true)}
          disabled={applicantData.seatStatus === "Allotted"}
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {applicantData.seatStatus === "Allotted"
            ? "Seat Allotted"
            : "Allot Seat"}
        </button>
        <button
          onClick={() => setShowDocModal(true)}
          className="ml-3 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50"
        >
          {docStatus === "verified"
            ? "Documents Verified"
            : "Update Document Status"}
        </button>
        <button
          onClick={() => setShowFeeModal(true)}
          className="ml-3 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {feeStatus === "paid" ? "Fee Paid" : "Update Fee Status"}
        </button>
        <button
          onClick={() => nav("/admission-home")}
          className="px-3 py-2.5 bg-gray-200 rounded-base ml-3 text-sm font-medium shadow-xs"
        >
          Back to List
        </button>
      </div>

      {/* Modals */}
      {showSeatModal && (
        <SeatAllot
          applicant={applicantData}
          onClose={() => setShowSeatModal(false)}
        />
      )}

      {showDocModal && (
        <div className="fixed inset-0 bg-background/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card w-full max-w-md border border-border p-6 rounded-lg">
            <label
              className="block mb-2.5 text-sm font-semibold text-brand"
              htmlFor="docStatus"
            >
              Document Status
            </label>
            <select
              id="docStatus"
              className="mb-4 text-lg text-body block w-full p-2 border border-border rounded-base"
              value={applicantData.documentStatus}
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  documentStatus: e.target.value,
                })
              }
            >
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="verified">Verified</option>
            </select>
            <div className="text-right">
              <button
                onClick={() => setShowDocModal(false)}
                className="px-3 py-2.5 bg-gray-200 rounded-base text-sm font-medium shadow-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDocStatus(applicantData.documentStatus)}
                className="ml-3 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showFeeModal && (
        <div className="fixed inset-0 bg-background/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card w-full max-w-md border border-border p-6 rounded-lg">
            <label
              className="block mb-2.5 text-sm font-semibold text-brand"
              htmlFor="feeStatus"
            >
              Fee Status
            </label>
            <select
              id="feeStatus"
              className="mb-4 text-lg text-body block w-full p-2 border border-border rounded-base"
              value={applicantData.feeStatus}
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  feeStatus: e.target.value,
                })
              }
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
            <div className="text-right">
              <button
                onClick={() => setShowFeeModal(false)}
                className="px-3 py-2.5 bg-gray-200 rounded-base text-sm font-medium shadow-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleFeeStatus(applicantData.feeStatus)}
                className="ml-3 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
