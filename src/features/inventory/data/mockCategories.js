import {
  Shirt,
  Laptop,
  Smartphone,
  Package,
} from "lucide-react"

export const categories = [
  {
    id: 1,
    name: "Fashion",
    description: "Clothing and wears",
    products: 120,
    status: "Active",
    icon: Shirt,
  },

  {
    id: 2,
    name: "Electronics",
    description: "Devices and gadgets",
    products: 80,
    status: "Active",
    icon: Laptop,
  },

  {
    id: 3,
    name: "Phones",
    description: "Mobile devices",
    products: 65,
    status: "Inactive",
    icon: Smartphone,
  },

  {
    id: 4,
    name: "Accessories",
    description: "Extra product add-ons",
    products: 30,
    status: "Archived",
    icon: Package,
  },
]