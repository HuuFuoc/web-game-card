// API endpoints configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const endpoints = {
  // Contact endpoints
  contact: {
    submit: `${API_BASE_URL}/contact/submit`,
    list: `${API_BASE_URL}/contact/list`,
  },
  
  // User endpoints
  user: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
    profile: `${API_BASE_URL}/user/profile`,
  },
  
  // Game endpoints
  game: {
    list: `${API_BASE_URL}/games`,
    detail: (id) => `${API_BASE_URL}/games/${id}`,
    reviews: (id) => `${API_BASE_URL}/games/${id}/reviews`,
  },
  
  // News endpoints
  news: {
    list: `${API_BASE_URL}/news`,
    detail: (id) => `${API_BASE_URL}/news/${id}`,
    latest: `${API_BASE_URL}/news/latest`,
  }
};

// Contact API functions
export const contactAPI = {
  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await fetch(endpoints.contact.submit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString(),
          source: 'website'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
  
  // Get contact messages (admin only)
  getContactMessages: async () => {
    try {
      const response = await fetch(endpoints.contact.list, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  }
};

export default endpoints;