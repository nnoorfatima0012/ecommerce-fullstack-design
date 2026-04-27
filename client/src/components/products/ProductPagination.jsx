import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductPagination({ page = 1, pages = 1, limit = 10, onPageChange, onLimitChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2 mt-5">
      <select
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="h-[40px] border border-gray-200 rounded-md px-3 bg-white text-gray-700"
      >
        <option value={10}>Show 10</option>
        <option value={20}>Show 20</option>
        <option value={50}>Show 50</option>
      </select>

      <div className="flex border border-gray-200 rounded-md overflow-hidden bg-white">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="w-[40px] h-[40px] flex items-center justify-center text-gray-700 border-r disabled:text-gray-300"
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: pages }).map((_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-[40px] h-[40px] border-r ${
                page === pageNumber ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          disabled={page === pages}
          onClick={() => onPageChange(page + 1)}
          className="w-[40px] h-[40px] flex items-center justify-center text-gray-700 disabled:text-gray-300"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default ProductPagination;