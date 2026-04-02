import React, { useContext, useMemo } from 'react'
import { AppContextAPI } from '../context/AppContext';

export default function Dashboard() {
    const { applicants, quotas } = useContext(AppContextAPI);

    const stats = useMemo(() => {
      const totalApplicants = applicants.length;
      const pendingDocs = applicants.filter((a) => a.documentStatus === "pending").length;
      const verifiedDocs = applicants.filter((a) => a.documentStatus === "verified").length;
      const seatsAllotted = applicants.filter((a) => a.seatStatus === "Allotted").length;
      const feesPaid = applicants.filter((a) => a.feeStatus === "Paid").length;
      return {
        totalApplicants,
        pendingDocs,
        verifiedDocs,
        seatsAllotted,
        feesPaid,
      };
    }, [applicants]);

    const institutionSeatStats = useMemo(() => {
      const stats = {};

      quotas.forEach((q) => {
        const institution = q.programId?.departmentId?.campusId?.institutionId;

        if (!institution) return;

        const instName = institution.name;

        if (!stats[instName]) {
          stats[instName] = {
            totalSeats: 0,
            filledSeats: 0,
          };
        }

        stats[instName].totalSeats += q.totalSeats || 0;
        stats[instName].filledSeats += q.filledSeats || 0;
      });

      return Object.entries(stats).map(([name, data]) => ({
        name,
        totalSeats: data.totalSeats,
        filledSeats: data.filledSeats,
        percentage:
          data.totalSeats > 0
            ? Math.round((data.filledSeats / data.totalSeats) * 100)
            : 0,
      }));
    }, [quotas]);
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card shadow rounded-xl p-5 border border-border">
            <h2 className="text-body text-sm">Total Applicants</h2>
            <p className="text-2xl font-bold mt-2">{stats.totalApplicants}</p>
          </div>
          <div className="bg-card shadow rounded-xl p-5 border border-border">
            <h2 className="text-body text-sm">Pending Document</h2>
            <p className="text-2xl font-bold mt-2">{stats.pendingDocs}</p>
          </div>
          <div className="bg-card shadow rounded-xl p-5 border border-border">
            <h2 className="text-body text-sm">Verified Documents</h2>
            <p className="text-2xl font-bold mt-2">{stats.verifiedDocs}</p>
          </div>
          <div className="bg-card shadow rounded-xl p-5 border border-border">
            <h2 className="text-body text-sm">Seats Allotted</h2>
            <p className="text-2xl font-bold mt-2">{stats.seatsAllotted}</p>
          </div>
          <div className="bg-card shadow rounded-xl p-5 border border-border">
            <h2 className="text-body text-sm">Fees Paid</h2>
            <p className="text-2xl font-bold mt-2">{stats.feesPaid}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Institution-wise Seats Data
        </h2>

        <div className="space-y-4">
          {institutionSeatStats.map((inst) => (
            <div
              key={inst.name}
              className="bg-white p-4 rounded-base shadow border border-border"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{inst.name}</h3>
                <span className="text-sm text-body">
                  {inst.filledSeats} / {inst.totalSeats}
                </span>
              </div>

              <div className="w-full bg-card rounded-full h-3">
                <div
                  className="bg-brand h-3 rounded-full"
                  style={{ width: `${inst.percentage}%` }}
                ></div>
              </div>

              <p className="text-xs mt-1 text-body">
                {inst.percentage}% filled
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
