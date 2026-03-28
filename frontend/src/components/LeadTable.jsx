import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";

function LeadTable({ leads }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <h3>Lead Pipeline</h3>
          <p>Track incoming leads and open their details quickly.</p>
        </div>
        <Link className="primary-button" to="/leads/new">
          Add Lead
        </Link>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Source</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">No leads found yet. Add your first lead to get started.</div>
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td>
                    <div className="lead-name">{lead.name}</div>
                    <div className="lead-subtext">{lead.email}</div>
                  </td>
                  <td>{lead.source}</td>
                  <td>
                    <StatusBadge status={lead.status} />
                  </td>
                  <td>{new Date(lead.createdDate).toLocaleDateString()}</td>
                  <td>
                    <Link className="text-link" to={`/leads/${lead._id}`}>
                      View details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadTable;
