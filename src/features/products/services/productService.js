import { mockProducts } from "../data/mockProducts"

export const productService = {

  getProductById(id) {
    return mockProducts.find(
      (product) => String(product.id) === String(id)
    )
  },

  getStockTrend(id) {
    return [
      { month: "Jan", stock: 120 },
      { month: "Feb", stock: 90 },
      { month: "Mar", stock: 80 },
      { month: "Apr", stock: 100 },
      { month: "May", stock: 60 },
      { month: "Jun", stock: 75 },
    ]
  },

  getSalesSummary(id) {
    return [
      { month: "Jan", sales: 100000 },
      { month: "Feb", sales: 150000 },
      { month: "Mar", sales: 180000 },
      { month: "Apr", sales: 130000 },
      { month: "May", sales: 220000 },
    ]
  },

  getActivities(id) {
    return [
      {
        id: 1,
        action: "Stock Added",
        user: "Admin",
        date: "2026-05-10",
      },
      {
        id: 2,
        action: "Price Updated",
        user: "Admin",
        date: "2026-05-12",
      },
    ]
  },

}