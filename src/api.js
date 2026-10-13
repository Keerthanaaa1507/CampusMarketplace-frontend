// API Client for Campus Marketplace (Spring Boot Backend)

const API_BASE = '/api';

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'ALL') query.append('category', params.category);
    if (params.listingType && params.listingType !== 'ALL') query.append('listingType', params.listingType);
    if (params.query) query.append('query', params.query);
    if (params.status) query.append('status', params.status);

    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  async createProduct(productData) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to create listing');
    return res.json();
  },

  async updateProductStatus(id, status) {
    const res = await fetch(`${API_BASE}/products/${id}/status?status=${status}`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },

  // Auth & Users
  async getUsers() {
    const res = await fetch(`${API_BASE}/auth/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || 'Registration failed');
    }
    return res.json();
  },

  async login(email) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || 'Login failed');
    }
    return res.json();
  },

  async verifyUser(id) {
    const res = await fetch(`${API_BASE}/auth/verify/${id}`, { method: 'POST' });
    if (!res.ok) throw new Error('Verification failed');
    return res.json();
  },

  // Trades
  async sendTradeRequest(data) {
    const res = await fetch(`${API_BASE}/trades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to send trade request');
    return res.json();
  },

  async getIncomingTrades(userId) {
    const res = await fetch(`${API_BASE}/trades/incoming/${userId}`);
    if (!res.ok) return [];
    return res.json();
  },

  async getOutgoingTrades(userId) {
    const res = await fetch(`${API_BASE}/trades/outgoing/${userId}`);
    if (!res.ok) return [];
    return res.json();
  },

  async acceptTrade(tradeId) {
    const res = await fetch(`${API_BASE}/trades/${tradeId}/accept`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to accept trade');
    return res.json();
  },

  async rejectTrade(tradeId) {
    const res = await fetch(`${API_BASE}/trades/${tradeId}/reject`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reject trade');
    return res.json();
  },

  async arrangeExchange(tradeId, data) {
    const res = await fetch(`${API_BASE}/trades/${tradeId}/arrange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to arrange exchange');
    return res.json();
  },

  // Transactions
  async createTransaction(data) {
    const res = await fetch(`${API_BASE}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create transaction');
    return res.json();
  },

  async getUserTransactions(userId) {
    const res = await fetch(`${API_BASE}/transactions/user/${userId}`);
    if (!res.ok) return [];
    return res.json();
  },

  async completeTransaction(id) {
    const res = await fetch(`${API_BASE}/transactions/${id}/complete`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to complete transaction');
    return res.json();
  },

  // Reviews
  async submitReview(data) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit review');
    return res.json();
  },

  async getUserReviews(userId) {
    const res = await fetch(`${API_BASE}/reviews/user/${userId}`);
    if (!res.ok) return [];
    return res.json();
  },

  // Chat & Negotiations
  async getProductMessages(productId) {
    const res = await fetch(`${API_BASE}/chat/${productId}`);
    if (!res.ok) return [];
    return res.json();
  },

  async sendMessage(data) {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },
};
