import StatusBadge from "./StatusBadge";

function LeadSummaryCard({ lead }) {
  return (
    <article className="lead-summary-card">
      <div className="lead-summary-top">
        <div>
          <h3>{lead.name}</h3>
          <p>{lead.email}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>
      <div className="lead-summary-grid">
        <div>
          <span>Phone</span>
          <strong>{lead.phone}</strong>
        </div>
        <div>
          <span>Source</span>
          <strong>{lead.source}</strong>
        </div>
        <div>
          <span>Created</span>
          <strong>{new Date(lead.createdDate).toLocaleString()}</strong>
        </div>
        <div>
          <span>Notes</span>
          <strong>{lead.notes?.length || 0}</strong>
        </div>
      </div>
    </article>
  );
}

export default LeadSummaryCard;
