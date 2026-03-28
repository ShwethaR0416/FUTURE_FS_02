import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { admin, isLoading, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "admin@futurefs02.com",
    password: "Admin@123"
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);
      await login(formData);
    } catch (loginError) {
      setError(loginError.response?.data?.message || "Unable to login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (admin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section className="login-page">
      <div className="login-panel">
        <span className="brand-chip">Future FS 02</span>
        <h1>Admin Login</h1>
        <p>
          Sign in to manage new leads, update lead status, and capture follow-up notes.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@futurefs02.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="primary-button full-width" disabled={isLoading || isSubmitting}>
            {isLoading || isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
