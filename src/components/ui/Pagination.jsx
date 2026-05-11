import Button from "./Button";

const Pagination = ({ currentPage = 1, totalPages = 5 }) => (
  <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30">
    <p className="text-sm text-slate-500">
      Showing page <span className="font-medium text-slate-900">{currentPage}</span> of {totalPages}
    </p>
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" disabled>Previous</Button>
      <Button variant="secondary" size="sm">Next</Button>
    </div>
  </div>
);

export default Pagination;