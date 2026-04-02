import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContextAPI = createContext();

export function AppProvider({ children }) {
  const [institutions, setInstitutions] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add Institution
  const addInstitution = async (data) => {
    try {
      setError(null);
      await axios.post(
        "http://localhost:3000/api/admin/add-institutions",
        data,
      );
      await fetchInstitutions();
      return { success: true };
    } catch (err) {
      console.error("Error adding institution:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Fetch Institutions
  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        "http://localhost:3000/api/admin/institutions",
      );
      setInstitutions(res.data);
    } catch (err) {
      console.error("Error fetching institutions:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add Campus
  const addCampus = async (data) => {
    try {
      setError(null);
      await axios.post("http://localhost:3000/api/admin/add-campus", data);
      await fetchCampuses();
      return { success: true };
    } catch (err) {
      console.error("Error adding campus:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Fetch Campuses
  const fetchCampuses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:3000/api/admin/campuses");
      setCampuses(res.data);
    } catch (err) {
      console.error("Error fetching campuses:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add Department
  const addDepartment = async (data) => {
    try {
      setError(null);
      await axios.post("http://localhost:3000/api/admin/add-department", data);
      await fetchDepartments();
      return { success: true };
    } catch (err) {
      console.error("Error adding department:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Fetch Departments
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        "http://localhost:3000/api/admin/departments",
      );
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add Program
  const addProgram = async (data) => {
    try {
      setError(null);
      await axios.post("http://localhost:3000/api/admin/add-program", data);
      return { success: true };
    } catch (err) {
      console.error("Error adding program:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Fetch Programs
  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:3000/api/admin/programs");
      setPrograms(res.data);
    } catch (err) {
      console.error("Error fetching programs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add Quota
  const addQuota = async (data) => {
    try {
      setError(null);
      await axios.post("http://localhost:3000/api/admin/add-quota", data);
      await fetchQuotas();
      return { success: true };
    } catch (err) {
      console.error("Error adding quota:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Fetch Quotas
  const fetchQuotas = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:3000/api/admin/quotas");
      setQuotas(res.data);
    } catch (err) {
      console.error("Error fetching quotas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add Applicant
  const addApplicant = async (data) => {
    try {
      setError(null);
      await axios.post("http://localhost:3000/api/applicant/add-applicant", data);
      await fetchApplicants();
      return { success: true };
    } catch (err) {
      console.error("Error adding applicant:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Fetch Applicants
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:3000/api/applicant/applicants");
      setApplicants(res.data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Applicant Details
  const fetchApplicantDetails = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`http://localhost:3000/api/applicant/applicant-details/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching applicant details:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Allot Seat
  const allotSeat = async (applicantId, programId, quotaType) => {
    try {
      setError(null);
      const res = await axios.post("http://localhost:3000/api/applicant/allot-seat", {
        applicantId,
        programId,
        quotaType,
      });
      await fetchApplicants(); // Refresh applicants list
      await fetchQuotas(); // Refresh quotas
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Error allotting seat:", err);
      setError(err.response?.data?.message || err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  // Update Document Status
  const updateDocumentStatus = async (applicantId, documentStatus) => {
    try {
      setError(null);
      const res = await axios.patch(`http://localhost:3000/api/applicant/update-doc-status/${applicantId}`, {
        documentStatus,
      });
      await fetchApplicants();
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Error updating document status:", err);
      setError(err.response?.data?.message || err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchInstitutions();
    fetchCampuses();
    fetchDepartments();
    fetchPrograms();
    fetchQuotas();
    fetchApplicants();
    fetchApplicantDetails();
  }, []);

  const value = {
    institutions,
    campuses,
    departments,
    programs,
    quotas,
    applicants,
    loading,
    error,
    addInstitution,
    addCampus,
    addDepartment,
    addProgram,
    addQuota,
    addApplicant,
    fetchInstitutions,
    fetchCampuses,
    fetchDepartments,
    fetchPrograms,
    fetchQuotas,
    fetchApplicants,
    fetchApplicantDetails,
    allotSeat,
    updateDocumentStatus,
  };

  return (
    <AppContextAPI.Provider value={value}>
      {children}
    </AppContextAPI.Provider>
  );
}
