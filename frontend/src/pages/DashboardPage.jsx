import { useEffect, useState } from "react";

import LeadTable from "../components/LeadTable";
import StatCard from "../components/StatCard";
import api from "../services/api";

function DashboardPage() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/leads");
        setLeads(response.data.leads || []);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || "Unable to load leads.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const contactedLeads = leads.filter((lead) => lead.status === "contacted").length;
  const convertedLeads = leads.filter((lead) => lead.status === "converted").length;

  return (
    <section className="page-section">
      <header className="page-header">
        <div>
          <span className="eyebrow">Overview</span>
          <h2>Lead Dashboard</h2>
          <p>Monitor recent activity and keep the sales pipeline moving.</p>
        </div>
      </header>

      <div className="stats-grid">
        <StatCard label="Total Leads" value={totalLeads} hint="All captured leads" />
        <StatCard label="New Leads" value={newLeads} hint="Need first response" />
        <StatCard label="Contacted" value={contactedLeads} hint="Follow-up in progress" />
        <StatCard label="Converted" value={convertedLeads} hint="Won opportunities" />
      </div>

      {error ? <div className="feedback-banner error">{error}</div> : null}
      {isLoading ? <div className="feedback-banner">Loading leads...</div> : <LeadTable leads={leads} />}
    </section>
  );
}

export default DashboardPage;
