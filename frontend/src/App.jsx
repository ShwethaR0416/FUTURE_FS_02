import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import LeadDetailsPage from "./pages/LeadDetailsPage";
import LeadFormPage from "./pages/LeadFormPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leads/new" element={<LeadFormPage mode="create" />} />
        <Route path="/leads/:id/edit" element={<LeadFormPage mode="edit" />} />
        <Route path="/leads/:id" element={<LeadDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
