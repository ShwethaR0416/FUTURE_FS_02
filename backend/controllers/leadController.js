const Lead = require("../models/Lead");

const addLead = async (req, res) => {
  try {
    const { name, email, phone, source, status } = req.body;

    if (!name || !email || !phone || !source) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, and source are required."
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      source,
      status
    });

    return res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      lead
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create lead.",
      error: error.message
    });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdDate: -1 });

    return res.status(200).json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch leads.",
      error: error.message
    });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    return res.status(200).json({
      success: true,
      lead
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch lead.",
      error: error.message
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const { name, email, phone, source, status } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    lead.name = name ?? lead.name;
    lead.email = email ?? lead.email;
    lead.phone = phone ?? lead.phone;
    lead.source = source ?? lead.source;
    lead.status = status ?? lead.status;

    const updatedLead = await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully.",
      lead: updatedLead
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update lead.",
      error: error.message
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    await lead.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete lead.",
      error: error.message
    });
  }
};

const addNoteToLead = async (req, res) => {
  try {
    const { text } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note text is required."
      });
    }

    lead.notes.push({
      text: text.trim()
    });

    await lead.save();

    return res.status(201).json({
      success: true,
      message: "Note added successfully.",
      notes: lead.notes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to add note.",
      error: error.message
    });
  }
};

const getLeadNotes = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).select("notes");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    return res.status(200).json({
      success: true,
      count: lead.notes.length,
      notes: lead.notes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch notes.",
      error: error.message
    });
  }
};

const updateLeadNote = async (req, res) => {
  try {
    const { text } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    const note = lead.notes.id(req.params.noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found."
      });
    }

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note text is required."
      });
    }

    note.text = text.trim();
    note.timestamp = new Date();

    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      notes: lead.notes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update note.",
      error: error.message
    });
  }
};

const deleteLeadNote = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    const note = lead.notes.id(req.params.noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found."
      });
    }

    note.deleteOne();
    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
      notes: lead.notes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete note.",
      error: error.message
    });
  }
};

module.exports = {
  addLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  addNoteToLead,
  getLeadNotes,
  updateLeadNote,
  deleteLeadNote
};
