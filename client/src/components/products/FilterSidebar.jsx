//src/components/products/FilterSidebar.jsx
import { ChevronUp } from "lucide-react";

function FilterGroup({ title, children }) {
  return (
    <div className="border-t border-gray-200 py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <ChevronUp size={18} className="text-gray-500" />
      </div>
      {children}
    </div>
  );
}

function CheckItem({ label }) {
  return (
    <label className="flex items-center gap-3 text-[15px] text-gray-700 mb-3">
      <input type="checkbox" className="w-4 h-4" />
      {label}
    </label>
  );
}

function RadioItem({ label, defaultChecked }) {
  return (
    <label className="flex items-center gap-3 text-[15px] text-gray-700 mb-3">
      <input
        type="radio"
        name="condition"
        defaultChecked={defaultChecked}
        className="w-4 h-4"
      />
      {label}
    </label>
  );
}

function FilterSidebar() {
  return (
    <aside className="hidden lg:block w-[230px]">
      <FilterGroup title="Category">
        {["Mobile accessory", "Electronics", "Smartphones", "Modern tech"].map(
          (item) => (
            <p key={item} className="text-[15px] text-gray-700 mb-3">
              {item}
            </p>
          )
        )}
        <p className="text-blue-600 text-[15px]">See all</p>
      </FilterGroup>

      <FilterGroup title="Brands">
        {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map((item) => (
          <CheckItem key={item} label={item} />
        ))}
        <p className="text-blue-600 text-[15px]">See all</p>
      </FilterGroup>

      <FilterGroup title="Features">
        {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map(
          (item) => (
            <CheckItem key={item} label={item} />
          )
        )}
        <p className="text-blue-600 text-[15px]">See all</p>
      </FilterGroup>

      <FilterGroup title="Price range">
        <input type="range" className="w-full mb-4" />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-sm mb-1">Min</p>
            <input
              placeholder="0"
              className="w-full h-[40px] border border-gray-200 rounded-md px-3"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Max</p>
            <input
              placeholder="999999"
              className="w-full h-[40px] border border-gray-200 rounded-md px-3"
            />
          </div>
        </div>

        <button className="w-full h-[40px] border border-gray-200 rounded-md text-blue-600 bg-white">
          Apply
        </button>
      </FilterGroup>

      <FilterGroup title="Condition">
        <RadioItem label="Any" defaultChecked />
        <RadioItem label="Refurbished" />
        <RadioItem label="Brand new" />
        <RadioItem label="Old items" />
      </FilterGroup>

      <FilterGroup title="Ratings">
        {["★★★★★", "★★★★☆", "★★★☆☆", "★★☆☆☆"].map((rate) => (
          <label key={rate} className="flex items-center gap-3 mb-3">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-orange-400">{rate}</span>
          </label>
        ))}
      </FilterGroup>
    </aside>
  );
}

export default FilterSidebar;