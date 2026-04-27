


// import { ChevronUp } from "lucide-react";

// function FilterGroup({ title, children }) {
//   return (
//     <div className="border-t border-gray-200 py-4">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-semibold text-gray-900">{title}</h3>
//         <ChevronUp size={18} className="text-gray-500" />
//       </div>
//       {children}
//     </div>
//   );
// }

// function CheckItem({ label }) {
//   return (
//     <label className="flex items-center gap-3 text-[15px] text-gray-700 mb-3">
//       <input type="checkbox" className="w-4 h-4" />
//       {label}
//     </label>
//   );
// }

// function RadioItem({ label, defaultChecked }) {
//   return (
//     <label className="flex items-center gap-3 text-[15px] text-gray-700 mb-3">
//       <input
//         type="radio"
//         name="condition"
//         defaultChecked={defaultChecked}
//         className="w-4 h-4"
//       />
//       {label}
//     </label>
//   );
// }

// function FilterSidebar({
//   categories = [],
//   selectedCategory,
//   setSelectedCategory,
//   minPrice,
//   setMinPrice,
//   maxPrice,
//   setMaxPrice,
//   applyPriceFilter,
//   clearFilters,
// }) {
//   return (
//     <aside className="hidden lg:block w-[230px]">
//       <FilterGroup title="Category">
//         <button
//           type="button"
//           onClick={() => setSelectedCategory("")}
//           className={`block text-left text-[15px] mb-3 ${
//             selectedCategory === "" ? "text-blue-600 font-medium" : "text-gray-700"
//           }`}
//         >
//           All categories
//         </button>

//         {categories.map((category) => (
//           <button
//             type="button"
//             key={category._id}
//             onClick={() => setSelectedCategory(category._id)}
//             className={`block text-left text-[15px] mb-3 ${
//               selectedCategory === category._id
//                 ? "text-blue-600 font-medium"
//                 : "text-gray-700"
//             }`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </FilterGroup>

//       <FilterGroup title="Brands">
//         {["Samsung", "Apple", "Sony", "Philips", "Logitech"].map((item) => (
//           <CheckItem key={item} label={item} />
//         ))}
//         <p className="text-blue-600 text-[15px]">See all</p>
//       </FilterGroup>

//       <FilterGroup title="Features">
//         {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map(
//           (item) => (
//             <CheckItem key={item} label={item} />
//           )
//         )}
//         <p className="text-blue-600 text-[15px]">See all</p>
//       </FilterGroup>

//       <FilterGroup title="Price range">
//         <input type="range" className="w-full mb-4" />

//         <div className="grid grid-cols-2 gap-3 mb-3">
//           <div>
//             <p className="text-sm mb-1">Min</p>
//             <input
//               value={minPrice}
//               onChange={(e) => setMinPrice(e.target.value)}
//               placeholder="0"
//               type="number"
//               className="w-full h-[40px] border border-gray-200 rounded-md px-3"
//             />
//           </div>

//           <div>
//             <p className="text-sm mb-1">Max</p>
//             <input
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//               placeholder="999999"
//               type="number"
//               className="w-full h-[40px] border border-gray-200 rounded-md px-3"
//             />
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={applyPriceFilter}
//           className="w-full h-[40px] border border-gray-200 rounded-md text-blue-600 bg-white"
//         >
//           Apply
//         </button>

//         <button
//           type="button"
//           onClick={clearFilters}
//           className="w-full h-[36px] mt-2 text-gray-500 text-sm"
//         >
//           Clear filters
//         </button>
//       </FilterGroup>

//       <FilterGroup title="Condition">
//         <RadioItem label="Any" defaultChecked />
//         <RadioItem label="Refurbished" />
//         <RadioItem label="Brand new" />
//         <RadioItem label="Old items" />
//       </FilterGroup>

//       <FilterGroup title="Ratings">
//         {["★★★★★", "★★★★☆", "★★★☆☆", "★★☆☆☆"].map((rate) => (
//           <label key={rate} className="flex items-center gap-3 mb-3">
//             <input type="checkbox" className="w-4 h-4" />
//             <span className="text-orange-400">{rate}</span>
//           </label>
//         ))}
//       </FilterGroup>
//     </aside>
//   );
// }

// export default FilterSidebar;

import { useState } from "react";
import { ChevronUp } from "lucide-react";

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-200 py-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-3"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <ChevronUp
          size={18}
          className={`text-gray-500 transition ${open ? "" : "rotate-180"}`}
        />
      </button>

      {open && children}
    </div>
  );
}

function CheckItem({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 text-[15px] text-gray-700 mb-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4"
      />
      {label}
    </label>
  );
}

function RadioItem({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 text-[15px] text-gray-700 mb-3 cursor-pointer">
      <input
        type="radio"
        name="rating"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4"
      />
      {label}
    </label>
  );
}

function FilterSidebar({
  categories = [],
  selectedCategory,
  setSelectedCategory,

  filterOptions = { brands: [], ratings: [5, 4, 3, 2] },

  selectedBrands = [],
  toggleBrand,

  selectedRating,
  setSelectedRating,

  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,

  applyPriceFilter,
  clearFilters,
}) {
  return (
    <aside className="hidden lg:block w-[230px]">
      <FilterGroup title="Category">
        <button
          type="button"
          onClick={() => setSelectedCategory("")}
          className={`block text-left text-[15px] mb-3 ${
            selectedCategory === ""
              ? "text-blue-600 font-medium"
              : "text-gray-700"
          }`}
        >
          All categories
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category._id}
            onClick={() => setSelectedCategory(category._id)}
            className={`block text-left text-[15px] mb-3 ${
              selectedCategory === category._id
                ? "text-blue-600 font-medium"
                : "text-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="Brands">
        {filterOptions.brands?.length > 0 ? (
          filterOptions.brands.map((brand) => (
            <CheckItem
              key={brand}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No brands available</p>
        )}
      </FilterGroup>

      <FilterGroup title="Features">
        {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map(
          (item) => (
            <CheckItem
              key={item}
              label={item}
              checked={false}
              onChange={() => {}}
            />
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
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              type="number"
              className="w-full h-[40px] border border-gray-200 rounded-md px-3"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Max</p>
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="999999"
              type="number"
              className="w-full h-[40px] border border-gray-200 rounded-md px-3"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={applyPriceFilter}
          className="w-full h-[40px] border border-gray-200 rounded-md text-blue-600 bg-white"
        >
          Apply
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className="w-full h-[36px] mt-2 text-gray-500 text-sm"
        >
          Clear filters
        </button>
      </FilterGroup>

      <FilterGroup title="Condition">
        <RadioItem label="Any" checked={true} onChange={() => {}} />
        <RadioItem label="Refurbished" checked={false} onChange={() => {}} />
        <RadioItem label="Brand new" checked={false} onChange={() => {}} />
        <RadioItem label="Old items" checked={false} onChange={() => {}} />
      </FilterGroup>

      <FilterGroup title="Ratings">
        {filterOptions.ratings?.map((rating) => (
          <RadioItem
            key={rating}
            label={`${rating}+ stars`}
            checked={Number(selectedRating) === Number(rating)}
            onChange={() => setSelectedRating(String(rating))}
          />
        ))}

        {selectedRating && (
          <button
            type="button"
            onClick={() => setSelectedRating("")}
            className="text-blue-600 text-sm"
          >
            Clear rating
          </button>
        )}
      </FilterGroup>
    </aside>
  );
}

export default FilterSidebar;