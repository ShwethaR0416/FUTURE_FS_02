export const mockLeads = [
  {
    id: "lead-001",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "9876543210",
    source: "Website Contact Form",
    status: "new",
    createdDate: "2026-03-25T09:30:00.000Z",
    notes: [
      {
        _id: "note-001",
        text: "Asked for pricing details and enterprise package options.",
        timestamp: "2026-03-25T10:15:00.000Z"
      }
    ]
  },
  {
    id: "lead-002",
    name: "Meera Iyer",
    email: "meera@example.com",
    phone: "9123456780",
    source: "Landing Page Form",
    status: "contacted",
    createdDate: "2026-03-24T13:10:00.000Z",
    notes: [
      {
        _id: "note-002",
        text: "Demo shared. Waiting for internal approval from their team.",
        timestamp: "2026-03-24T16:45:00.000Z"
      },
      {
        _id: "note-003",
        text: "Follow-up call scheduled for next Tuesday.",
        timestamp: "2026-03-26T11:00:00.000Z"
      }
    ]
  },
  {
    id: "lead-003",
    name: "Rohan Kapoor",
    email: "rohan@example.com",
    phone: "9012345678",
    source: "Google Ads",
    status: "converted",
    createdDate: "2026-03-20T08:05:00.000Z",
    notes: [
      {
        _id: "note-004",
        text: "Converted after final proposal review.",
        timestamp: "2026-03-23T14:20:00.000Z"
      }
    ]
  }
];
