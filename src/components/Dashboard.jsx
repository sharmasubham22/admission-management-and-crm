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

    const institutionQuotaStats = useMemo(() => {
        const stats = {};
        quotas.forEach((q) => {
        const institution =
        q.programId?.departmentId?.campusId?.institutionId;
        if (!institution) return;
        const instName = institution.name;
        if (!stats[instName]) {
        stats[instName] = {
          totalSeats: 0,
          filledSeats: 0,
          kcet: { total: 0, filled: 0 },
          comedk: { total: 0, filled: 0 },
          management: { total: 0, filled: 0 },
        };
        }
        stats[instName].totalSeats += q.totalSeats || 0;
        stats[instName].filledSeats += q.filledSeats || 0;
        stats[instName].kcet.total += q.kcet || 0;
        stats[instName].kcet.filled += q.filledKcet || 0;
        stats[instName].comedk.total += q.comedk || 0;
        stats[instName].comedk.filled += q.filledComedk || 0;
        stats[instName].management.total += q.management || 0;
        stats[instName].management.filled += q.filledManagement || 0;
    });
    return stats;
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
        {Object.entries(institutionQuotaStats).map(([inst, data]) => (
          <div key={inst} className="mb-6 p-4 border border-border rounded-base bg-white shadow">
            <h3 className="font-semibold text-lg mb-3">{inst}</h3>

            <p className="text-sm mb-4">
              Total Seats:{" "}
              <strong>
                {data.filledSeats} / {data.totalSeats}
              </strong>
            </p>

            {["kcet", "comedk", "management"].map((type) => {
              const total = data[type].total;
              const filled = data[type].filled;
              const percentage =
                total > 0 ? Math.round((filled / total) * 100) : 0;

              return (
                <div key={type} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{type}</span>
                    <span>
                      {filled} / {total}
                    </span>
                  </div>

                  <div className="w-full bg-card rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-brand"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
