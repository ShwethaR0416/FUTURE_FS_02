const express = require("express");

const {
  addLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  addNoteToLead,
  getLeadNotes,
  updateLeadNote,
  deleteLeadNote
} = require("../controllers/leadController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/").post(addLead).get(getAllLeads);
router.route("/:id").get(getLeadById).put(updateLead).delete(deleteLead);
router.route("/:id/notes").post(addNoteToLead).get(getLeadNotes);
router.route("/:id/notes/:noteId").put(updateLeadNote).delete(deleteLeadNote);

module.exports = router;
