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

  register: async (email, password, fullName, dob) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: fullName, dob }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch profile');
    }
    return response.json();
  }
};

export const passagesApi = {
  getPassages: async (difficulty = '') => {
    const baseUrl = '/passages';
    const params = new URLSearchParams();
    if (difficulty) params.append('difficulty', difficulty);
    params.append('t', Date.now()); // Cache busting
    const url = `${baseUrl}?${params.toString()}`;
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

export const evaluationApi = {
  processAudio: async (audioBlob, groundTruthText, token) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('ground_truth_text', groundTruthText);

    const response = await fetch('/evaluate/process-audio', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Audio processing failed');
    }
    return response.json();
  },

  getHistory: async (token) => {
    const response = await fetch('/evaluate/history', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch history');
    return response.json();
  }
};
