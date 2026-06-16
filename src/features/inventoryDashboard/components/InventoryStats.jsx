import {
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react"

import {
  Card,
  CardContent,
} from "../../../components/ui/Card"

const InventoryStats = ({
  totalItems,
  inStock,
  lowStock,
  outOfStock,
  totalValue,
}) => {

  const stats = [
    {
      title: "Total Items",
      value: totalItems,
      icon: Package,
    },

    {
      title: "In Stock",
      value: inStock,
      icon: CheckCircle,
    },

    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
    },

    {
      title: "Out of Stock",
      value: outOfStock,
      icon: XCircle,
    },

    {
      title: "Total Value",
      value: `₦${totalValue.toLocaleString()}`,
      icon: Package,
    },
  ]

  return (

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

      {stats.map((stat) => {

        const Icon = stat.icon

        return (

          <Card
            key={stat.title}
            className="border-none shadow-sm"
          >

            <CardContent className="flex items-center justify-between p-5">

              <div>

                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {stat.value}
                </h3>

              </div>

              <div className="rounded-xl bg-slate-100 p-3">

                <Icon
                  size={22}
                  className="text-slate-700"
                />

              </div>

            </CardContent>

          </Card>
        )
      })}

    </div>
  )
}

export default InventoryStats