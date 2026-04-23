const API_BASE_URL = ''; // Proxy handles this in development

export const authApi = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }
    return response.json();
  },

  register: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }
    return response.json();
  }
};

export const passagesApi = {
  getPassages: async (difficulty = '') => {
    const url = difficulty ? `/passages?difficulty=${difficulty}` : '/passages';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch passages');
    return response.json();
  },

  getPassage: async (id) => {
    const response = await fetch(`/passages/${id}`);
    if (!response.ok) throw new Error('Failed to fetch passage');
    return response.json();
  }
};
