// Static API implementation - uses mock data instead of real API calls
// Simplified for Flats Only - No PG features
import { staticData } from "./staticData.js";

// Helper to simulate delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Console log helper for static mode
const logStatic = (method, endpoint, ...args) => {
  console.log(`[STATIC API] ${method} ${endpoint}`, ...args);
};

export const API_BASE_URL = "/api";

const buildQuery = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    query.append(key, value);
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

export const api = {
  // Auth endpoints
  async register(name, email, password) {
    logStatic("POST", "/auth/register", { name, email });
    await delay();
    return staticData.register(name, email, password);
  },

  async login(email, password) {
    logStatic("POST", "/auth/login", { email });
    await delay();
    const result = await staticData.login(email, password);
    // Store user in localStorage for static mode
    if (result.user) {
      localStorage.setItem("staticUser", JSON.stringify(result.user));
    }
    return result;
  },

  // OAuth endpoints (mock)
  async loginWithGoogle(idToken) {
    logStatic("POST", "/auth/google");
    await delay();
    return {
      user: { ...(await staticData.getMe()), email: "google@example.com" },
      token: "mock-google-token",
    };
  },

  async loginWithFacebook(accessToken) {
    logStatic("POST", "/auth/facebook");
    await delay();
    return {
      user: { ...(await staticData.getMe()), email: "facebook@example.com" },
      token: "mock-facebook-token",
    };
  },

  async verifySetupToken(token) {
    logStatic("GET", "/auth/verify-setup-token");
    await delay();
    return { valid: true, email: "user@example.com" };
  },

  async setupPassword(token, password) {
    logStatic("POST", "/auth/setup-password");
    await delay();
    return { success: true, message: "Password set successfully" };
  },

  // Tenant onboarding endpoints (simplified)
  async getTenantOnboarding() {
    logStatic("GET", "/tenant/onboarding");
    await delay();
    return {
      status: "completed",
      steps: {
        kyc: { completed: true },
        agreement: { completed: true },
      },
    };
  },

  async sendAadhaarOtp(aadhaarNumber, reason) {
    logStatic("POST", "/tenant/ekyc/otp");
    await delay();
    return {
      referenceId: "mock-ref-123",
      message: "OTP sent successfully",
    };
  },

  async submitTenantKyc(formData) {
    logStatic("POST", "/tenant/ekyc");
    await delay();
    return {
      success: true,
      message: "KYC submitted successfully",
      kycStatus: "pending",
    };
  },

  async getAgreementPreview() {
    logStatic("GET", "/tenant/agreement/preview");
    await delay();
    return "<html><body><h1>Mock Agreement Preview</h1><p>This is a static agreement preview.</p></body></html>";
  },

  async acceptAgreement(otp, consentFlags) {
    logStatic("POST", "/tenant/agreement/accept");
    await delay();
    return {
      success: true,
      message: "Agreement accepted successfully",
    };
  },

  async forgotPassword(email) {
    logStatic("POST", "/auth/forgot-password");
    await delay();
    return { message: "Password reset email sent" };
  },

  async resetPassword(token, password) {
    logStatic("POST", "/auth/reset-password");
    await delay();
    return { message: "Password reset successfully" };
  },

  async updatePassword(token, password) {
    logStatic("POST", "/auth/update-password");
    await delay();
    return { message: "Password updated successfully" };
  },

  async getMe() {
    logStatic("GET", "/me");
    await delay(300);
    return staticData.getMe();
  },

  // Complaint endpoints
  async createComplaint(title, description, category, flatId) {
    logStatic("POST", "/complaints", { title, category });
    await delay();
    return staticData.createComplaint(title, description, category, flatId);
  },

  async getMyComplaints() {
    logStatic("GET", "/complaints/my");
    await delay();
    return staticData.getMyComplaints();
  },

  // Officer endpoints
  async getOfficerComplaints() {
    logStatic("GET", "/officer/complaints");
    await delay();
    return staticData.getOfficerComplaints();
  },

  async updateComplaintStatus(complaintId, status) {
    logStatic("PATCH", `/officer/complaints/${complaintId}/status`);
    await delay();
    return staticData.updateComplaintStatus(complaintId, status);
  },

  async assignComplaintToMe(complaintId) {
    logStatic("PATCH", `/officer/complaints/${complaintId}/assign`);
    await delay();
    return { success: true, message: "Complaint assigned" };
  },

  // Profile endpoints
  async getProfile() {
    logStatic("GET", "/profile");
    await delay();
    return staticData.getMe();
  },

  async updateProfile(profileData) {
    logStatic("PATCH", "/profile", profileData);
    await delay();
    return { ...(await staticData.getMe()), ...profileData };
  },

  // Flats & assignments
  async getMyFlats() {
    logStatic("GET", "/flats/my");
    await delay();
    return staticData.getMyFlats();
  },

  // Announcements - Only create/publish, no update/delete
  async getAnnouncements() {
    logStatic("GET", "/announcements");
    await delay();
    return staticData.getAnnouncements();
  },

  async getAdminAnnouncements(params) {
    logStatic("GET", `/admin/announcements${buildQuery(params)}`);
    await delay();
    return staticData.getAdminAnnouncements();
  },

  async createAnnouncement(payload) {
    logStatic("POST", "/admin/announcements", payload);
    await delay();
    return staticData.createAnnouncement(payload);
  },

  // Update/Delete removed - return success but don't actually update
  async updateAnnouncement(id, payload) {
    logStatic("PATCH", `/admin/announcements/${id}`, payload);
    await delay();
    return { success: true, message: "Update not available in static mode" };
  },

  async deleteAnnouncement(id) {
    logStatic("DELETE", `/admin/announcements/${id}`);
    await delay();
    return { success: true, message: "Delete not available in static mode" };
  },

  // Events - Only create/publish, no update/delete
  async getEvents() {
    logStatic("GET", "/events");
    await delay();
    return staticData.getEvents();
  },

  async createEvent(payload) {
    logStatic("POST", "/events", payload);
    await delay();
    return staticData.createEvent(payload);
  },

  // Update/Delete removed - return success but don't actually update
  async updateEvent(id, payload) {
    logStatic("PATCH", `/events/${id}`, payload);
    await delay();
    return { success: true, message: "Update not available in static mode" };
  },

  async deleteEvent(id) {
    logStatic("DELETE", `/events/${id}`);
    await delay();
    return { success: true, message: "Delete not available in static mode" };
  },

  async setEventParticipation(eventId, status) {
    logStatic("POST", `/events/${eventId}/participation`, { status });
    await delay();
    return { success: true, message: "Participation updated" };
  },

  async getEventParticipants(eventId) {
    logStatic("GET", `/events/${eventId}/participants`);
    await delay();
    return { participants: [], total: 0 };
  },

  // Admin users
  async getAdminUsers(params) {
    logStatic("GET", `/admin/users${buildQuery(params)}`);
    await delay();
    return staticData.getAdminUsers();
  },

  async createAdminUser(payload) {
    logStatic("POST", "/admin/users", payload);
    await delay();
    return {
      id: "new-user",
      ...payload,
      createdAt: new Date().toISOString(),
    };
  },

  async updateUserRole(userId, role) {
    logStatic("PATCH", `/admin/users/${userId}/role`, { role });
    await delay();
    return { success: true, message: "Role updated" };
  },

  async updateUserStatus(userId, isActive) {
    logStatic("PATCH", `/admin/users/${userId}/status`, { isActive });
    await delay();
    return { success: true, message: "Status updated" };
  },

  async getAdminUser(userId) {
    logStatic("GET", `/admin/users/${userId}`);
    await delay();
    return staticData.getMe();
  },

  async updateAdminUserPassword(userId, password) {
    logStatic("PATCH", `/admin/users/${userId}/password`);
    await delay();
    return { success: true, message: "Password updated" };
  },

  async updateAdminUser(userId, userData) {
    logStatic("PUT", `/admin/users/${userId}`, userData);
    await delay();
    return { id: userId, ...userData, updatedAt: new Date().toISOString() };
  },

  async patchAdminUser(userId, userData) {
    logStatic("PATCH", `/admin/users/${userId}`, userData);
    await delay();
    return { id: userId, ...userData, updatedAt: new Date().toISOString() };
  },

  async deleteAdminUser(userId) {
    logStatic("DELETE", `/admin/users/${userId}`);
    await delay();
    return { success: true, message: "User deleted" };
  },

  // Documents
  async getMyDocuments() {
    logStatic("GET", "/documents/my-documents");
    await delay();
    return staticData.getMyDocuments();
  },

  async downloadDocument(type) {
    logStatic("GET", `/documents/download/${type}`);
    await delay();
    // Create a mock PDF blob
    const blob = new Blob(["Mock PDF content"], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "ekyc" ? "eKYC-Document.pdf" : "Agreement.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  async viewDocument(type) {
    logStatic("GET", `/documents/download/${type}`);
    await delay();
    // Create a mock PDF blob and open in new tab
    const blob = new Blob(["Mock PDF content"], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  },

  async getTenantDocuments(tenantId) {
    logStatic(
      "GET",
      `/documents/tenant-documents${tenantId ? `?tenantId=${tenantId}` : ""}`
    );
    await delay();
    return staticData.getMyDocuments();
  },

  async downloadTenantDocument(tenantId, type) {
    logStatic("GET", `/documents/tenant/${tenantId}/download/${type}`);
    await delay();
    const blob = new Blob(["Mock PDF content"], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "ekyc" ? "eKYC-Document.pdf" : "Agreement.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  async viewTenantDocument(tenantId, type) {
    logStatic("GET", `/documents/tenant/${tenantId}/download/${type}`);
    await delay();
    const blob = new Blob(["Mock PDF content"], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  },

  // Admin flats
  async getAdminFlats(params) {
    logStatic("GET", `/admin/flats${buildQuery(params)}`);
    await delay();
    return staticData.getAdminFlats();
  },

  async createFlat(payload) {
    logStatic("POST", "/admin/flats", payload);
    await delay();
    return {
      id: "new-flat",
      ...payload,
      createdAt: new Date().toISOString(),
    };
  },

  async updateFlat(id, payload) {
    logStatic("PATCH", `/admin/flats/${id}`, payload);
    await delay();
    return { id, ...payload, updatedAt: new Date().toISOString() };
  },

  async deleteFlat(id) {
    logStatic("DELETE", `/admin/flats/${id}`);
    await delay();
    return { success: true, message: "Flat deleted" };
  },

  // Flat assignments
  async getFlatAssignments() {
    logStatic("GET", "/admin/flat-assignments");
    await delay();
    return staticData.getFlatAssignments();
  },

  async createFlatAssignment(payload) {
    logStatic("POST", "/admin/flat-assignments", payload);
    await delay();
    return staticData.createFlatAssignment(payload);
  },

  async deleteFlatAssignment(id) {
    logStatic("DELETE", `/admin/flat-assignments/${id}`);
    await delay();
    return staticData.deleteFlatAssignment(id);
  },

  // Admin events
  async getAdminEvents() {
    logStatic("GET", "/admin/events");
    await delay();
    return staticData.getAdminEvents();
  },

  async createAdminEvent(payload) {
    logStatic("POST", "/admin/events", payload);
    await delay();
    return staticData.createEvent(payload);
  },

  // Update/Delete removed - return success but don't actually update
  async updateAdminEvent(id, payload) {
    logStatic("PATCH", `/admin/events/${id}`, payload);
    await delay();
    return { success: true, message: "Update not available in static mode" };
  },

  async deleteAdminEvent(id) {
    logStatic("DELETE", `/admin/events/${id}`);
    await delay();
    return { success: true, message: "Delete not available in static mode" };
  },

  async getAdminDashboardSummary() {
    logStatic("GET", "/admin/dashboard/summary");
    await delay();
    return staticData.getAdminDashboardSummary();
  },

  async getOfficerSummary() {
    logStatic("GET", "/officer/summary");
    await delay();
    return staticData.getOfficerSummary();
  },

  async getAdminComplaints(view = "all", params = {}) {
    logStatic("GET", `/admin/complaints/${view}${buildQuery(params)}`);
    await delay();
    return {
      complaints: await staticData.getMyComplaints(),
      total: (await staticData.getMyComplaints()).length,
    };
  },

  async getAdminAnnouncementsList(params = {}) {
    logStatic("GET", `/admin/announcements/all${buildQuery(params)}`);
    await delay();
    return staticData.getAdminAnnouncements();
  },

  async getAdminEventsList(params = {}) {
    logStatic("GET", `/admin/events/all${buildQuery(params)}`);
    await delay();
    return staticData.getAdminEvents();
  },

  async getAdminFlatsDetailed() {
    logStatic("GET", "/admin/flats/detailed");
    await delay();
    return {
      flats: await staticData.getMyFlats(),
      total: (await staticData.getMyFlats()).length,
    };
  },

  async exportAdminCsv(type, params = {}) {
    logStatic("GET", `/admin/export/${type}${buildQuery(params)}`);
    await delay();
    // Create mock CSV blob
    const csvContent =
      "Mock CSV Data\nColumn1,Column2,Column3\nValue1,Value2,Value3";
    return new Blob([csvContent], { type: "text/csv" });
  },

  async getAdminBillingSummary(params = {}) {
    logStatic("GET", `/admin/billing/summary${buildQuery(params)}`);
    await delay();
    return {
      totalRevenue: 500000,
      monthlyRevenue: 50000,
      pendingAmount: 25000,
      paidAmount: 475000,
    };
  },

  async getAdminBillingInvoices(params = {}) {
    logStatic("GET", `/admin/billing/invoices${buildQuery(params)}`);
    await delay();
    return staticData.getMyBillingInvoices();
  },

  async getAdminBillingInvoice(id) {
    logStatic("GET", `/admin/billing/invoices/${id}`);
    await delay();
    return staticData.getMyBillingInvoice(id);
  },

  async getMyBillingInvoices(params = {}) {
    logStatic("GET", `/billing/my-invoices${buildQuery(params)}`);
    await delay();
    return staticData.getMyBillingInvoices();
  },

  async getMyBillingInvoice(id) {
    logStatic("GET", `/billing/my-invoices/${id}`);
    await delay();
    return staticData.getMyBillingInvoice(id);
  },

  // Rent Payment - Static success message "Payment done"
  async createInvoicePaymentOrder(id, payload = {}) {
    logStatic("POST", `/billing/my-invoices/${id}/create-order`, payload);
    await delay(1000); // Simulate payment processing
    return staticData.createInvoicePaymentOrder(id, payload);
  },

  async verifyInvoicePayment(payload) {
    logStatic("POST", "/billing/verify-payment", payload);
    await delay(1500); // Simulate payment verification
    const result = await staticData.verifyInvoicePayment(payload);
    // Return static success message
    return {
      success: true,
      message: "Payment done",
      invoice: result.invoice,
    };
  },

  // Tenant Management (for flat owners)
  async getTenantUsers() {
    logStatic("GET", "/tenants/users");
    await delay();
    return { users: [], total: 0 };
  },

  async createTenantUser(payload) {
    logStatic("POST", "/tenants/users", payload);
    await delay();
    return {
      id: "new-tenant-user",
      ...payload,
      createdAt: new Date().toISOString(),
    };
  },

  async getMyOwnedFlats() {
    logStatic("GET", "/tenants/my-flats");
    await delay();
    return staticData.getMyFlats();
  },

  async getTenantForFlat(flatId, filters = {}) {
    logStatic("GET", `/tenants/flat/${flatId}${buildQuery(filters)}`);
    await delay();
    return { tenants: [], total: 0 };
  },

  async createTenant(payload) {
    logStatic("POST", "/tenants", payload);
    await delay();
    return {
      id: "new-tenant",
      ...payload,
      createdAt: new Date().toISOString(),
    };
  },

  async updateTenant(tenantId, payload) {
    logStatic("PATCH", `/tenants/${tenantId}`, payload);
    await delay();
    return { id: tenantId, ...payload, updatedAt: new Date().toISOString() };
  },

  async removeTenant(tenantId) {
    logStatic("DELETE", `/tenants/${tenantId}`);
    await delay();
    return { success: true, message: "Tenant removed" };
  },

  async sendRentReminder(tenantId) {
    logStatic("POST", `/tenants/${tenantId}/send-reminder`);
    await delay();
    return { success: true, message: "Reminder sent" };
  },

  // Owner dashboards & complaints
  async getOwnerDashboard(params = {}) {
    logStatic("GET", `/owner/dashboard${buildQuery(params)}`);
    await delay();
    return staticData.getOwnerDashboard();
  },

  async getOwnerProperties() {
    logStatic("GET", "/owner/properties");
    await delay();
    return [];
  },

  async getOwnerComplaints(params = {}) {
    logStatic("GET", `/owner/complaints${buildQuery(params)}`);
    await delay();
    return staticData.getOwnerComplaints();
  },

  async getOwnerComplaint(id) {
    logStatic("GET", `/owner/complaints/${id}`);
    await delay();
    return staticData.getComplaint(id);
  },

  async updateOwnerComplaintStatus(id, status) {
    logStatic("PATCH", `/owner/complaints/${id}/status`, { status });
    await delay();
    return staticData.updateComplaintStatus(id, status);
  },

  async addOwnerComplaintComment(id, message) {
    logStatic("POST", `/owner/complaints/${id}/comments`, { message });
    await delay();
    return {
      id: "new-comment",
      message,
      createdAt: new Date().toISOString(),
    };
  },

  // Admin role access
  async getRoleAccess() {
    logStatic("GET", "/admin/role-access");
    await delay();
    return { roles: [] };
  },

  async updateRoleAccess(role, navItems) {
    logStatic("PATCH", `/admin/role-access/${role}`, { navItems });
    await delay();
    return { success: true, message: "Role access updated" };
  },

  // Notifications
  async getNotifications() {
    logStatic("GET", "/notifications");
    await delay();
    return staticData.getNotifications();
  },

  // Documents
  async generateDocuments() {
    logStatic("POST", "/documents/generate");
    await delay();
    return { success: true, message: "Documents generated" };
  },

  // PG Tenant methods (stubs for compatibility - not used in flats-only version)
  async getPgTenantProfile() {
    logStatic("GET", "/pg-tenant/profile");
    await delay();
    return null; // Return null since PG features are removed
  },

  async getRentPaymentHistory(params = {}) {
    logStatic("GET", `/pg-tenant/payments/history${buildQuery(params)}`);
    await delay();
    return { payments: [], total: 0, items: [] }; // Return empty for flats-only
  },
};
