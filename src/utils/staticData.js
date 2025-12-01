// Static mock data for all API endpoints - Simplified for Flats Only

// Helper to simulate delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock users - Only ADMIN, FLAT_OWNER, and CITIZEN (flat rental/tenant)
const mockUsers = {
  admin: {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "ADMIN",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  flatOwner: {
    id: "2",
    name: "Flat Owner",
    email: "flatowner@example.com",
    role: "FLAT_OWNER",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  citizen: {
    id: "3",
    name: "Flat Tenant",
    email: "tenant@example.com",
    role: "CITIZEN",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
};

// Mock complaints
const mockComplaints = [
  {
    id: "1",
    title: "Water Leakage Issue",
    description: "There is a water leakage in the bathroom",
    category: "MAINTENANCE",
    status: "OPEN",
    priority: "MEDIUM",
    flatId: "1",
    flat: { id: "1", number: "101", building: "A", floor: 1, type: "2BHK" },
    createdBy: mockUsers.citizen.id,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: "2",
    title: "Power Outage",
    description: "No electricity in flat 202",
    category: "ELECTRICAL",
    status: "IN_PROGRESS",
    priority: "HIGH",
    flatId: "2",
    flat: { id: "2", number: "102", building: "A", floor: 1, type: "3BHK" },
    createdBy: mockUsers.citizen.id,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [
      {
        id: "1",
        message: "Working on it",
        createdBy: mockUsers.admin.id,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "3",
    title: "Garbage Collection",
    description: "Garbage not being collected regularly",
    category: "SANITATION",
    status: "RESOLVED",
    priority: "LOW",
    flatId: "3",
    flat: { id: "3", number: "201", building: "A", floor: 2, type: "2BHK" },
    createdBy: mockUsers.citizen.id,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [],
  },
];

// Mock flats
const mockFlats = [
  {
    id: "1",
    number: "101",
    building: "A",
    floor: 1,
    type: "2BHK",
    status: "OCCUPIED",
  },
  {
    id: "2",
    number: "102",
    building: "A",
    floor: 1,
    type: "3BHK",
    status: "OCCUPIED",
  },
  {
    id: "3",
    number: "201",
    building: "A",
    floor: 2,
    type: "2BHK",
    status: "OCCUPIED",
  },
  {
    id: "4",
    number: "202",
    building: "B",
    floor: 2,
    type: "3BHK",
    status: "VACANT",
  },
  {
    id: "5",
    number: "301",
    building: "B",
    floor: 3,
    type: "2BHK",
    status: "VACANT",
  },
];

// Mock flat assignments
const mockFlatAssignments = [
  {
    id: "1",
    flatId: "1",
    userId: mockUsers.citizen.id,
    flat: mockFlats[0],
    user: mockUsers.citizen,
    assignedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock announcements
const mockAnnouncements = [
  {
    id: "1",
    title: "Maintenance Schedule",
    content: "Scheduled maintenance on Saturday from 9 AM to 5 PM",
    priority: "HIGH",
    targetAudience: "ALL",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Community Meeting",
    content:
      "Monthly community meeting this Sunday at 10 AM in the community hall",
    priority: "MEDIUM",
    targetAudience: "ALL",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock events
const mockEvents = [
  {
    id: "1",
    title: "Annual Community Festival",
    description:
      "Join us for the annual community festival with food, games, and entertainment",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Community Hall",
    category: "FESTIVAL",
    status: "UPCOMING",
    createdAt: new Date().toISOString(),
    participants: 25,
    maxParticipants: 100,
  },
  {
    id: "2",
    title: "Yoga Session",
    description: "Morning yoga session in the park",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Community Park",
    category: "FITNESS",
    status: "UPCOMING",
    createdAt: new Date().toISOString(),
    participants: 15,
    maxParticipants: 30,
  },
];

// Mock billing invoices (rent payments)
const mockInvoices = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    amount: 5000,
    status: "PENDING",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    flatId: "1",
    flat: mockFlats[0],
    items: [
      { description: "Maintenance Fee", amount: 3000 },
      { description: "Water Charges", amount: 1000 },
      { description: "Electricity", amount: 1000 },
    ],
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    amount: 3500,
    status: "PAID",
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    flatId: "1",
    flat: mockFlats[0],
    items: [
      { description: "Maintenance Fee", amount: 2500 },
      { description: "Water Charges", amount: 1000 },
    ],
  },
];

// Mock notifications
const mockNotifications = [
  {
    id: "1",
    title: "New Complaint",
    message: "A new complaint has been assigned to you",
    type: "COMPLAINT",
    read: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Payment Reminder",
    message: "Your rent payment is due in 3 days",
    type: "PAYMENT",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Event Reminder",
    message: "Community meeting tomorrow",
    type: "EVENT",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock documents
const mockDocuments = {
  ekyc: {
    status: "VERIFIED",
    verifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  agreement: {
    status: "SIGNED",
    signedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

// Mock dashboard summaries
const mockDashboardSummary = {
  stats: {
    totalComplaints: 15,
    openComplaints: 5,
    resolvedComplaints: 10,
    totalUsers: 50,
    activeUsers: 45,
    totalFlats: 5,
    occupiedFlats: 3,
    vacantFlats: 2,
    totalRevenue: 500000,
    monthlyRevenue: 50000,
    activeAnnouncements: 2,
    upcomingEvents: 2,
    rentPaymentsPaid: 0,
    rentPaymentsPending: 0,
    rentPaymentsTotalReceived: 0,
    rentPaymentsTotalPending: 0,
  },
  charts: {
    complaintsByStatus: [
      { status: "OPEN", count: 5 },
      { status: "IN_PROGRESS", count: 3 },
      { status: "RESOLVED", count: 10 },
    ],
    complaintsByCategory: [
      { category: "MAINTENANCE", count: 8 },
      { category: "ELECTRICAL", count: 4 },
      { category: "SANITATION", count: 3 },
    ],
  },
};

// Export static data getters
export const staticData = {
  // Auth
  login: async (email, password) => {
    await delay();
    const user = Object.values(mockUsers).find((u) => u.email === email);
    if (user && password === "password") {
      return {
        user,
        token: `mock-token-${user.id}`,
      };
    }
    throw new Error("Invalid credentials");
  },

  register: async (name, email, password) => {
    await delay();
    return {
      user: { id: "new", name, email, role: "CITIZEN" },
      token: "mock-token-new",
    };
  },

  getMe: async () => {
    await delay(300);
    // Return default user (can be changed via localStorage)
    const storedUser = localStorage.getItem("staticUser");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return mockUsers.citizen;
  },

  // Complaints
  getMyComplaints: async () => {
    await delay();
    return mockComplaints;
  },

  getComplaint: async (id) => {
    await delay();
    return mockComplaints.find((c) => c.id === id) || mockComplaints[0];
  },

  createComplaint: async (title, description, category, flatId) => {
    await delay();
    const flat = mockFlats.find((f) => f.id === flatId) || mockFlats[0];
    const newComplaint = {
      id: String(mockComplaints.length + 1),
      title,
      description,
      category,
      status: "OPEN",
      priority: "MEDIUM",
      flatId,
      flat,
      createdBy: mockUsers.citizen.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    };
    mockComplaints.unshift(newComplaint);
    return newComplaint;
  },

  getOfficerComplaints: async () => {
    await delay();
    return mockComplaints;
  },

  updateComplaintStatus: async (id, status) => {
    await delay();
    const complaint = mockComplaints.find((c) => c.id === id);
    if (complaint) {
      complaint.status = status;
      complaint.updatedAt = new Date().toISOString();
    }
    return complaint || mockComplaints[0];
  },

  // Flats
  getMyFlats: async () => {
    await delay();
    return mockFlats;
  },

  getAdminFlats: async () => {
    await delay();
    return { flats: mockFlats, total: mockFlats.length };
  },

  // Flat Assignments
  getFlatAssignments: async () => {
    await delay();
    return {
      assignments: mockFlatAssignments,
      total: mockFlatAssignments.length,
    };
  },

  createFlatAssignment: async (payload) => {
    await delay();
    const flat = mockFlats.find((f) => f.id === payload.flatId) || mockFlats[0];
    const user = mockUsers.citizen;
    const newAssignment = {
      id: String(mockFlatAssignments.length + 1),
      ...payload,
      flat,
      user,
      assignedAt: new Date().toISOString(),
    };
    mockFlatAssignments.push(newAssignment);
    return newAssignment;
  },

  deleteFlatAssignment: async (id) => {
    await delay();
    const index = mockFlatAssignments.findIndex((a) => a.id === id);
    if (index > -1) {
      mockFlatAssignments.splice(index, 1);
    }
    return { success: true };
  },

  // Announcements - Only create/publish, no update/delete
  getAnnouncements: async () => {
    await delay();
    return mockAnnouncements;
  },

  getAdminAnnouncements: async () => {
    await delay();
    return {
      announcements: mockAnnouncements,
      total: mockAnnouncements.length,
    };
  },

  createAnnouncement: async (payload) => {
    await delay();
    const newAnnouncement = {
      id: String(mockAnnouncements.length + 1),
      ...payload,
      createdAt: new Date().toISOString(),
      expiresAt:
        payload.expiresAt ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
    mockAnnouncements.unshift(newAnnouncement);
    return newAnnouncement;
  },

  // Events - Only create/publish, no update/delete
  getEvents: async () => {
    await delay();
    return mockEvents;
  },

  getAdminEvents: async () => {
    await delay();
    return { events: mockEvents, total: mockEvents.length };
  },

  createEvent: async (payload) => {
    await delay();
    const newEvent = {
      id: String(mockEvents.length + 1),
      ...payload,
      status: "UPCOMING",
      participants: 0,
      createdAt: new Date().toISOString(),
    };
    mockEvents.unshift(newEvent);
    return newEvent;
  },

  // Billing/Rent Payments
  getMyBillingInvoices: async () => {
    await delay();
    return { invoices: mockInvoices, total: mockInvoices.length };
  },

  getMyBillingInvoice: async (id) => {
    await delay();
    return mockInvoices.find((inv) => inv.id === id) || mockInvoices[0];
  },

  // Rent Payment - Static success message
  createInvoicePaymentOrder: async (id, payload = {}) => {
    await delay(1000); // Simulate payment processing
    return {
      orderId: "mock-order-123",
      amount: mockInvoices.find((inv) => inv.id === id)?.amount || 5000,
      currency: "INR",
      key: "mock-key",
    };
  },

  verifyInvoicePayment: async (payload) => {
    await delay(1500); // Simulate payment verification
    // Update invoice status to PAID
    const invoice = mockInvoices.find((inv) => inv.id === payload.invoiceId);
    if (invoice) {
      invoice.status = "PAID";
      invoice.paidAt = new Date().toISOString();
    }
    return {
      success: true,
      message: "Payment done",
      invoice: invoice || mockInvoices[0],
    };
  },

  // Dashboard
  getAdminDashboardSummary: async () => {
    await delay();
    // Return the full structure with stats and charts
    return mockDashboardSummary;
  },

  getOfficerSummary: async () => {
    await delay();
    return {
      assignedComplaints: 8,
      openComplaints: 3,
      inProgressComplaints: 4,
      resolvedComplaints: 1,
    };
  },

  // Admin Users
  getAdminUsers: async () => {
    await delay();
    return {
      users: Object.values(mockUsers),
      total: Object.keys(mockUsers).length,
    };
  },

  // Owner Dashboard
  getOwnerDashboard: async () => {
    await delay();
    return {
      totalFlats: 5,
      occupiedFlats: 3,
      vacantFlats: 2,
      totalRevenue: 15000,
      monthlyRevenue: 5000,
      pendingComplaints: 2,
    };
  },

  getOwnerComplaints: async () => {
    await delay();
    return { complaints: mockComplaints, total: mockComplaints.length };
  },

  // Notifications
  getNotifications: async () => {
    await delay();
    return {
      notifications: mockNotifications,
      total: mockNotifications.length,
    };
  },

  // Documents
  getMyDocuments: async () => {
    await delay();
    return mockDocuments;
  },

  // Default response for any other endpoint
  default: async () => {
    await delay();
    return { message: "Static data response" };
  },
};
