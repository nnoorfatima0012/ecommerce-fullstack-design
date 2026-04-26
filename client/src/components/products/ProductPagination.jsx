import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductPagination() {
  return (
    <div className="flex items-center justify-end gap-2 mt-5">
      <select className="h-[40px] border border-gray-200 rounded-md px-3 bg-white text-gray-700">
        <option>Show 10</option>
        <option>Show 20</option>
        <option>Show 50</option>
      </select>

      <div className="flex border border-gray-200 rounded-md overflow-hidden bg-white">
        <button className="w-[40px] h-[40px] flex items-center justify-center text-gray-400 border-r">
          <ChevronLeft size={18} />
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`w-[40px] h-[40px] border-r ${
              page === 1 ? "bg-gray-100 text-gray-900" : "text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        <button className="w-[40px] h-[40px] flex items-center justify-center text-gray-700">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default ProductPagination;