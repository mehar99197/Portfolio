const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const apiService = {
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
  async logout() {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
  async getCurrentUser() {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
  async getProjects() {
    try {
      const response = await fetch(`${API_URL}/projects`);
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getProject(id) {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`);
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async createProject(projectData) {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(projectData),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async updateProject(id, projectData) {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(projectData),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async deleteProject(id) {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
  async submitContact(data) {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getContactMessages() {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        headers: getAuthHeaders(),
        credentials: 'include',
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
