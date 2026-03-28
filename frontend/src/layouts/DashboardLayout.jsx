import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function DashboardLayout() {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand-block">
          <span className="brand-chip">Future FS 02</span>
          <h1>Mini CRM</h1>
          <p>Lead management console for business admins.</p>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/leads/new">Add Lead</NavLink>
        </nav>

        <div className="sidebar-footer">
          <span>{admin?.email || "Admin Panel"}</span>
          <strong>{admin?.name || "Secure workspace"}</strong>
          <button type="button" className="sidebar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
