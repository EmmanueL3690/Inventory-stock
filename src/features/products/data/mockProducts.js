import {
  Milk,
  Package,
  Wheat,
  Candy,
  ShoppingBasket,
} from "lucide-react"

export const mockProducts = [

  {
    id: 1,
    name: "Milk",
    category: "Dairy",
    stock: 30,

    costPrice: 800,
    sellingPrice: 1200,

    sku: "PRD-001",

    status: "In Stock",

    image: Milk,

    description:
      "Fresh dairy milk product",
  },

  {
    id: 2,
    name: "Bread",
    category: "Bakery",
    stock: 5,

    costPrice: 300,
    sellingPrice: 600,

    sku: "PRD-002",

    status: "Low Stock",

    image: Package,

    description:
      "Soft sliced wheat bread",
  },

  {
    id: 3,
    name: "Rice",
    category: "Grains",
    stock: 120,

    costPrice: 45000,
    sellingPrice: 60000,

    sku: "PRD-003",

    status: "In Stock",

    image: Wheat,

    description:
      "Premium bag of rice",
  },

  {
    id: 4,
    name: "Sugar",
    category: "Groceries",
    stock: 0,

    costPrice: 2000,
    sellingPrice: 3500,

    sku: "PRD-004",

    status: "Out of Stock",

    image: Candy,

    description:
      "Refined white sugar",
  },

  {
    id: 5,
    name: "Eggs",
    category: "Dairy",
    stock: 60,

    costPrice: 400,
    sellingPrice: 700,

    sku: "PRD-005",

    status: "In Stock",

    image: ShoppingBasket,

    description:
      "Farm fresh eggs crate",
  },

  

]