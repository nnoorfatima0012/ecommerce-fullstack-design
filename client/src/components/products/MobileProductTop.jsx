import { ArrowLeft, ShoppingCart, User, Search, SlidersHorizontal, Grid2X2, List } from "lucide-react";

function MobileProductTop() {
  const chips = ["Tablets", "Phones", "Ipads", "Ipod", "Accessories"];
  const filters = ["Huawei", "Apple", "64GB"];

  return (
    <div className="md:hidden bg-[#f7fafc]">
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ArrowLeft size={22} />
          <h1 className="font-semibold text-[18px]">Mobile accessory</h1>
        </div>

        <div className="flex items-center gap-5">
          <ShoppingCart size={22} />
          <User size={22} />
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search"
            className="w-full h-[42px] border border-gray-300 rounded-md bg-white pl-10 outline-none"
          />
        </div>
      </div>

      <div className="px-4 pb-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {chips.map((chip) => (
            <button key={chip} className="bg-white text-blue-600 px-4 py-2 rounded-md">
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border-y px-3 py-2 flex items-center gap-2">
        <button className="flex-1 h-[36px] border rounded-md flex items-center justify-center gap-2">
          Sort: Newest <SlidersHorizontal size={16} />
        </button>

        <button className="flex-1 h-[36px] border rounded-md flex items-center justify-center gap-2">
          Filter (3) <SlidersHorizontal size={16} />
        </button>

        <div className="flex border rounded-md overflow-hidden h-[36px]">
          <button className="w-[36px] flex items-center justify-center">
            <Grid2X2 size={18} />
          </button>
          <button className="w-[36px] flex items-center justify-center bg-gray-100 border-l">
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="px-3 py-3 flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <button key={filter} className="border border-blue-500 text-gray-700 px-3 py-1 rounded-md bg-white whitespace-nowrap">
            {filter} <span className="text-gray-400 ml-1">×</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MobileProductTop;