import { Grid2X2, List } from "lucide-react";

function ProductListTopBar() {
  return (
    <div className="bg-white border border-gray-200 rounded-md h-[62px] px-4 flex items-center justify-between mb-3">
      <p className="text-[16px] text-gray-900">
        12,911 items in <span className="font-semibold">Mobile accessory</span>
      </p>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-[15px] text-gray-700">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          Verified only
        </label>

        <select className="h-[40px] w-[170px] border border-gray-200 rounded-md px-3 bg-white text-gray-700">
          <option>Featured</option>
          <option>Newest</option>
          <option>Price low to high</option>
          <option>Price high to low</option>
        </select>

        <div className="flex border border-gray-200 rounded-md overflow-hidden h-[40px]">
          <button className="w-[40px] flex items-center justify-center bg-white">
            <Grid2X2 size={20} />
          </button>

          <button className="w-[40px] flex items-center justify-center bg-gray-100 border-l border-gray-200">
            <List size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductListTopBar;