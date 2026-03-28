const statusMap = {
  new: "status-badge new",
  contacted: "status-badge contacted",
  converted: "status-badge converted"
};

function StatusBadge({ status }) {
  return <span className={statusMap[status] || "status-badge"}>{status}</span>;
}

export default StatusBadge;
