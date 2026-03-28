import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import LeadSummaryCard from "../components/LeadSummaryCard";
import api from "../services/api";

function LeadDetailsPage() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/leads/${id}`);
        setLead(response.data.lead);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || "Unable to load lead details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleAddNote = async (event) => {
    event.preventDefault();

    if (!noteText.trim()) {
      setError("Please enter a note before saving.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      const response = await api.post(`/leads/${id}/notes`, { text: noteText });
      setLead((current) => ({
        ...current,
        notes: response.data.notes
      }));
      setNoteText("");
    } catch (saveError) {
      setError(saveError.response?.data?.message || "Unable to save note.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <section className="page-section"><div className="feedback-banner">Loading lead details...</div></section>;
  }

  if (!lead) {
    return <section className="page-section"><div className="feedback-banner error">{error || "Lead not found."}</div></section>;
  }

  return (
    <section className="page-section">
      <header className="page-header compact">
        <div>
          <span className="eyebrow">Lead Details</span>
          <h2>{lead.name}</h2>
          <p>View contact details, lead source, and follow-up notes in one place.</p>
        </div>
        <Link className="primary-button" to={`/leads/${lead._id}/edit`}>
          Edit Lead
        </Link>
      </header>

      <LeadSummaryCard lead={lead} />

      <div className="details-grid">
        <article className="panel-card">
          <h3>Follow-up Notes</h3>
          {error ? <div className="feedback-banner error compact-banner">{error}</div> : null}
          <div className="notes-list">
            {lead.notes?.length ? (
              lead.notes.map((note) => (
                <div className="note-card" key={note._id}>
                  <p>{note.text}</p>
                  <span>{new Date(note.timestamp).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <div className="empty-state">No notes added yet for this lead.</div>
            )}
          </div>
        </article>

        <article className="panel-card">
          <h3>Add Quick Note</h3>
          <form className="stack-form" onSubmit={handleAddNote}>
            <label>
              Note
              <textarea
                rows="5"
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
                placeholder="Add a follow-up note for this lead"
              />
            </label>
            <button type="submit" className="primary-button" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Note"}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}

export default LeadDetailsPage;
