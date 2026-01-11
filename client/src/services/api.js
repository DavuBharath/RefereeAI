const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * API service for communicating with backend
 * Includes proper error handling and loading states
 */
class ApiService {
  
  /**
   * Get all comparison categories
   */
  static async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/comparisons/categories`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch categories');
      }
      
      return response.json();
    } catch (error) {
      console.error('API Error (getCategories):', error);
      throw new Error(error.message || 'Network error. Please check your connection.');
    }
  }
  
  /**
   * Get options for a specific category
   */
  static async getCategoryOptions(categoryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/comparisons/categories/${categoryId}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch category options');
      }
      
      return response.json();
    } catch (error) {
      console.error('API Error (getCategoryOptions):', error);
      throw new Error(error.message || 'Network error. Please check your connection.');
    }
  }
  
  /**
   * Create a new comparison
   */
  static async createComparison(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/comparisons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create comparison');
      }
      
      return result;
    } catch (error) {
      console.error('API Error (createComparison):', error);
      throw new Error(error.message || 'Network error. Please check your connection.');
    }
  }
}

export default ApiService;