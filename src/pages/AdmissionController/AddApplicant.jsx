import React, { useContext, useState } from 'react'
import { AppContextAPI } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function AddApplicant() {
    const { addApplicant } = useContext(AppContextAPI);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [category, setCategory] = useState("");
    const [entryType, setEntryType] = useState("");
    const [marks, setMarks] = useState("");
    const [allotmentNumber, setAllotmentNumber] = useState("");
    const [documentStatus, setDocumentStatus] = useState("Pending");
    const [seatStatus, setSeatStatus] = useState("Not Allotted");
    const [feeStatus, setFeeStatus] = useState("Unpaid");

    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addApplicant({
            name,
            email,
            contact: Number(contact),
            address,
            fatherName,
            motherName,
            category,
            entryType,
            marks: Number(marks),
            allotmentNumber,
            documentStatus,
            seatStatus,
            feeStatus,
        });
        if (result.success) {
            alert("Applicant added Successfully!")
            setName("");
            setEmail("");
            setContact("");
            setAddress("");
            setFatherName("");
            setMotherName("");
            setCategory("");
            setEntryType("");
            setMarks("");
            setAllotmentNumber("");
        } else {
            alert("Adding applicant failed: " + result.error);
        }
    };
  return (
    <div className="max-w-5xl mx-auto my-10 p-4 md:p-8">
      <h1 className="text-2xl font-bold my-5">Add Applicant</h1>
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              required
            >
              <option value="">Select category</option>
              <option value="General">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="father_name"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Father's Name
            </label>
            <input
              type="text"
              id="father_name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter father's name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="mother_name"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Mother's Name
            </label>
            <input
              type="text"
              id="mother_name"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter mother's name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="entry_type"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Entry Type
            </label>
            <select
              id="entry_type"
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              required
            >
              <option value="">Select entry type</option>
              <option value="Government">Government</option>
              <option value="Management">Management</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="marks"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Marks in qualifying exam (percentage)
            </label>
            <input
              type="number"
              id="marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter marks"
              required
            />
          </div>
        </div>
        {entryType === "Government" && (
          <div className='mb-6'>
            <label
              htmlFor="allotment number"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Allotment Number
            </label>
            <input
              type="text"
              id="allotment number"
              value={allotmentNumber}
              onChange={(e) => setAllotmentNumber(e.target.value)}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter allotment number"
              required
            />
          </div>
        )}
        <div className="mb-6">
          <label
            className="block mb-2.5 text-sm font-medium text-heading"
            htmlFor="documentStatus"
          >
            Document Status
          </label>
          <select
            id="documentStatus"
            value={documentStatus}
            onChange={(e) => setDocumentStatus(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
          >
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="verified">Verified</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Enter address"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Create Applicant
          </button>
          <button
            type="button"
            onClick={() => nav("/admission-home")}
            className="px-3 py-2.5 bg-gray-200 rounded-base ml-3 text-sm font-medium shadow-xs"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
