import { Card, CardContent } from "../../../components/ui/Card"
import { Table } from "../../../components/ui/Table"
import Pagination from "../../../components/ui/Pagination"

import CategoryRow from "./CategoryRow"

const CategoryTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onArchive,
}) => {

  return (
    <Card className="border-none shadow-md">

      <CardContent className="p-0">

        <div>

          <Table
            columns={columns}
            data={data}
            renderRow={(item) => (
          <CategoryRow
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onArchive={onArchive}
          />
            )}
          />

        </div>

        <Pagination
          currentPage={1}
          totalPages={3}
        />

      </CardContent>

    </Card>
  )
}

export default CategoryTable