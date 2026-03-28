import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

function LeadFormPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "new"
  });
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = mode === "edit";

  useEffect(() => {
    if (!isEdit) {
      setIsLoading(false);
      return;
    }

    const fetchLead = async () => {
      try {
        const response = await api.get(`/leads/${id}`);
        const lead = response.data.lead;
        setFormData({
          name: lead.name || "",
          email: lead.email || "",
          phone: lead.phone || "",
          source: lead.source || "",
          status: lead.status || "new"
        });
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || "Unable to load lead.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLead();
  }, [id, isEdit]);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");

      if (isEdit) {
        await api.put(`/leads/${id}`, formData);
        navigate(`/leads/${id}`);
      } else {
        const response = await api.post("/leads", formData);
        navigate(`/leads/${response.data.lead._id}`);
      }
    } catch (saveError) {
      setError(saveError.response?.data?.message || "Unable to save lead.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <section className="page-section"><div className="feedback-banner">Loading lead form...</div></section>;
  }

  return (
    <section className="page-section">
      <header className="page-header compact">
        <div>
          <span className="eyebrow">{isEdit ? "Update Lead" : "New Lead"}</span>
          <h2>{isEdit ? "Edit Lead Details" : "Create Lead"}</h2>
          <p>Capture lead information cleanly so your follow-up process stays organized.</p>
        </div>
        <Link className="ghost-link" to="/dashboard">
          Back to dashboard
        </Link>
      </header>

      <article className="panel-card">
        <form className="lead-form-grid" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </label>

          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </label>

          <label>
            Source
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="Website Contact Form"
            />
          </label>

          <label className="full-span">
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </label>

          {error ? <p className="form-error full-span">{error}</p> : null}

          <div className="form-actions full-span">
            <button type="submit" className="primary-button" disabled={isSaving}>
              {isSaving ? "Saving..." : isEdit ? "Update Lead" : "Save Lead"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default LeadFormPage;
