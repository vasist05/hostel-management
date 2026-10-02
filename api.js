/**
 * StayEase API Client Utility
 * Provides clean async methods to communicate with the Node.js/Express backend.
 */

const API_BASE_URL = window.STAYEASE_API_URL || 'http://localhost:5000/api';

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    // `options` must be spread first: spreading it last would replace the merged
    // headers object with options.headers, silently dropping Content-Type.
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[StayEase API] Error calling ${endpoint}:`, err.message);
    throw err;
  }
}

const StayEaseApi = {
  baseUrl: API_BASE_URL,

  // Health
  async checkHealth() {
    return apiRequest('/health');
  },

  // Hostel
  async getHostel() {
    return apiRequest('/hostel');
  },
  async updateHostel(data) {
    return apiRequest('/hostel', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Rooms
  async getRooms(params = {}) {
    const query = new URLSearchParams();
    if (params.floor && params.floor !== 'ALL') query.append('floor', params.floor);
    if (params.ac !== undefined) query.append('ac', params.ac);
    if (params.category) query.append('category', params.category);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return apiRequest(`/rooms${qs}`);
  },
  async getRoom(id) {
    return apiRequest(`/rooms/${id}`);
  },
  async createRoom(roomData) {
    return apiRequest('/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData)
    });
  },
  async updateRoom(id, roomData) {
    return apiRequest(`/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(roomData)
    });
  },
  async deleteRoom(id) {
    return apiRequest(`/rooms/${id}`, {
      method: 'DELETE'
    });
  },

  // Beds
  async getBedsForRoom(roomId) {
    return apiRequest(`/rooms/${roomId}/beds`);
  },
  async updateBed(bedId, bedData) {
    return apiRequest(`/beds/${bedId}`, {
      method: 'PUT',
      body: JSON.stringify(bedData)
    });
  },

  // Maintenance Tickets
  async getTickets() {
    return apiRequest('/tickets');
  },
  async createTicket(ticketData) {
    return apiRequest('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData)
    });
  },
  async updateTicket(id, ticketData) {
    return apiRequest(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticketData)
    });
  },
  async deleteTicket(id) {
    return apiRequest(`/tickets/${id}`, {
      method: 'DELETE'
    });
  },

  // Notices
  async getNotices() {
    return apiRequest('/notices');
  },
  async createNotice(noticeData) {
    return apiRequest('/notices', {
      method: 'POST',
      body: JSON.stringify(noticeData)
    });
  },
  async updateNotice(id, noticeData) {
    return apiRequest(`/notices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(noticeData)
    });
  },
  async deleteNotice(id) {
    return apiRequest(`/notices/${id}`, {
      method: 'DELETE'
    });
  },

  // Expenses
  async getExpenses() {
    return apiRequest('/expenses');
  },
  async createExpense(expenseData) {
    return apiRequest('/expenses', {
      method: 'POST',
      body: JSON.stringify(expenseData)
    });
  },
  async deleteExpense(id) {
    return apiRequest(`/expenses/${id}`, {
      method: 'DELETE'
    });
  },

  // Visitors
  async getVisitors() {
    return apiRequest('/visitors');
  },
  async checkInVisitor(visitorData) {
    return apiRequest('/visitors', {
      method: 'POST',
      body: JSON.stringify(visitorData)
    });
  },
  async checkOutVisitor(id, exitTime) {
    return apiRequest(`/visitors/${id}/checkout`, {
      method: 'PUT',
      body: JSON.stringify({ exitTime })
    });
  },

  // Bookings
  async getBookings() {
    return apiRequest('/bookings');
  },
  async createBooking(bookingData) {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },
  async updateBooking(id, status) {
    return apiRequest(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  // Reviews
  async getReviews() {
    return apiRequest('/reviews');
  },
  async createReview(reviewData) {
    return apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  // Menu & Staff
  async getMenu() {
    return apiRequest('/menu');
  },
  async updateMenu(idOrDay, menuData) {
    return apiRequest(`/menu/${idOrDay}`, {
      method: 'PUT',
      body: JSON.stringify(menuData)
    });
  },
  async getStaff() {
    return apiRequest('/staff');
  },
  async createStaff(staffData) {
    return apiRequest('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData)
    });
  },

  // Dashboard Stats
  async getStats() {
    return apiRequest('/stats');
  }
};

// Expose globally
if (typeof window !== 'undefined') {
  window.StayEaseApi = StayEaseApi;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StayEaseApi;
}
