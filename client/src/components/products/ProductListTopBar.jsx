import { Grid2X2, List } from "lucide-react";

function ProductListTopBar({
  view = "list",
  setView,
  productsCount = 0,
  sort = "featured",
  setSort,
  title = "Products",
  verifiedOnly,
  setVerifiedOnly,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-md h-[62px] px-4 flex items-center justify-between mb-3">
      <p className="text-[16px] text-gray-900">
        {productsCount} {productsCount === 1 ? "item" : "items"} in{" "}
        <span className="font-semibold">{title}</span>
      </p>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-[15px] text-gray-700">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4"
          />
          Verified only
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-[40px] w-[170px] border border-gray-200 rounded-md px-3 bg-white text-gray-700"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price low to high</option>
          <option value="price-high">Price high to low</option>
          <option value="rating">Top rated</option>
        </select>

        <div className="flex border border-gray-200 rounded-md overflow-hidden h-[40px]">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`w-[40px] flex items-center justify-center ${
              view === "grid" ? "bg-gray-100" : "bg-white"
            }`}
          >
            <Grid2X2 size={20} />
          </button>

          <button
            type="button"
            onClick={() => setView("list")}
            className={`w-[40px] flex items-center justify-center border-l border-gray-200 ${
              view === "list" ? "bg-gray-100" : "bg-white"
            }`}
          >
            <List size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductListTopBar;
