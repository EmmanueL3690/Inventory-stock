import API from "./authService";

/**
 * Product Service Layer
 * Handles all product API requests.
 */

export const productService = {
  /**
   * Fetch all active products
   */
  async getProducts() {
    try {
      const response = await API.get("/products");

      return Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  /**
   * Fetch one product
   */
  async getProductById(id) {
    try {
      const response = await API.get(`/products/${id}`);

      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  /**
   * Create product
   */
  async createProduct(payload) {
    try {
      const response = await API.post("/products", payload);

      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  /**
   * Update product
   */
  async updateProduct(id, payload) {
    try {
      console.log("PUT URL:", `/products/${id}`);
      console.log("PUT Payload:", payload);
      
      const response = await API.put(`/products/${id}`, payload);
      
      console.log("PUT Success:", response);
      
      return response.data;
    } catch (error) {
      console.error("PUT Error:", error);
      console.error("Response:", error.response);
      console.error("Error updating product:", error);
      throw error;
    }
  },

  /**
   * Soft delete product
   */
  async deleteProduct(id) {
    try {
      const response = await API.delete(`/products/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  /**
   * Fetch all categories
   */
  async getCategories() {
    try {
      const response = await API.get("/categories");

      return Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  /**
   * Fetch all units
   */
  async getUnits() {
    try {
      const response = await API.get("/units");

      return Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
    } catch (error) {
      console.error("Error fetching units:", error);
      throw error;
    }
  },
};