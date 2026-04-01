import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminContextAPI = createContext();

export function AdminProvider({ children }) {
  const [institutions, setInstitutions] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [quotas, setQuotas] = useState([]);
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

  // Load data on mount
  useEffect(() => {
    fetchInstitutions();
    fetchCampuses();
    fetchDepartments();
    fetchPrograms();
    fetchQuotas();
  }, []);

  const value = {
    institutions,
    campuses,
    departments,
    programs,
    quotas,
    loading,
    error,
    addInstitution,
    addCampus,
    addDepartment,
    addProgram,
    addQuota,
    fetchInstitutions,
    fetchCampuses,
    fetchDepartments,
    fetchPrograms,
    fetchQuotas,
  };

  return (
    <AdminContextAPI.Provider value={value}>
      {children}
    </AdminContextAPI.Provider>
  );
}
