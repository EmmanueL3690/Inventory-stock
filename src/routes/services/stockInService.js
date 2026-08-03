/**
 * Stock In Module Service Layer
 * Placeholder for future REST / GraphQL api actions.
 */

export const stockInService = {
  /**
   * Save incoming batch details to database
   * @param {Object} stockInData 
   */
  async recordStockIn(stockInData) {
    // TODO: Write POST request logic here when backend integration is ready
    return Promise.resolve({ success: true, data: stockInData });
  },

  /**
   * Fetch recent stock in logs
   */
  async getRecentStockInRecords() {
    // TODO: Write GET request logic here when backend integration is ready
    return Promise.resolve([]);
  }
};