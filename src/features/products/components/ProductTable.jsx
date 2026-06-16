import { Card, CardContent }from "../../../components/ui/Card"

import {Table,} from "../../../components/ui/Table"

import Pagination
from "../../../components/ui/Pagination"

import ProductRow from "./ProductRow"

const ProductTable = ({
  columns,
  data,

  onEdit,
  onDelete,
  onArchive,
  onView,
}) => {

  return (

    <Card className="border-none shadow-md">

      <CardContent className="p-0">

        <Table
          columns={columns}
          data={data}

          renderRow={(item) => (

            <ProductRow
              key={item.id}
              item={item}

              onEdit={onEdit}
              onDelete={onDelete}
              onArchive={onArchive}
              onView={onView}
            />

          )}
        />

        {/* Pagination */}

        <Pagination
          currentPage={1}
          totalPages={3}
        />

      </CardContent>

    </Card>
  )
}

export default ProductTable