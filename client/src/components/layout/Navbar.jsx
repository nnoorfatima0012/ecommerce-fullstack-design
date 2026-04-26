// //ecommerce-fullstack-design/src/components/layout/Navbar.jsx
// import { Menu, ChevronDown } from "lucide-react";

// function Navbar() {
//   return (
//     <div className="bg-white border-b">
//       <div className="max-w-[1180px] mx-auto px-4 h-[56px] flex items-center justify-between">
//         <div className="flex items-center gap-7 text-[15px] text-gray-800">
//           <div className="flex items-center gap-2 font-medium">
//             <Menu size={22} />
//             <span>All category</span>
//           </div>

//           <span>Hot offers</span>
//           <span>Gift boxes</span>
//           <span>Projects</span>
//           <span>Menu item</span>

//           <div className="flex items-center gap-1">
//             <span>Help</span>
//             <ChevronDown size={16} />
//           </div>
//         </div>

//         <div className="flex items-center gap-8 text-[15px] text-gray-800">
//           <div className="flex items-center gap-1">
//             <span>English, USD</span>
//             <ChevronDown size={16} />
//           </div>

//           <div className="flex items-center gap-1">
//             <span>Ship to</span>
//             <span>🇩🇪</span>
//             <ChevronDown size={16} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import { Menu, ChevronDown } from "lucide-react";

function Navbar() {
  const mobileCategories = [
    "All category",
    "Gadgets",
    "Clothes",
    "Accessory",
    "Electronics",
  ];

  return (
    <div className="bg-white border-b">
      {/* Mobile category chips */}
      <div className="md:hidden px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {mobileCategories.map((item) => (
            <button
              key={item}
              className="bg-gray-100 text-blue-600 px-4 py-2 rounded-md whitespace-nowrap"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop navbar */}
      <div className="hidden md:flex max-w-[1180px] mx-auto px-4 h-[56px] items-center justify-between">
        <div className="flex items-center gap-7 text-[15px] text-gray-800">
          <div className="flex items-center gap-2 font-medium">
            <Menu size={22} />
            <span>All category</span>
          </div>

          <span>Hot offers</span>
          <span>Gift boxes</span>
          <span>Projects</span>
          <span>Menu item</span>

          <div className="flex items-center gap-1">
            <span>Help</span>
            <ChevronDown size={16} />
          </div>
        </div>

        <div className="flex items-center gap-8 text-[15px] text-gray-800">
          <div className="flex items-center gap-1">
            <span>English, USD</span>
            <ChevronDown size={16} />
          </div>

          <div className="flex items-center gap-1">
            <span>Ship to</span>
            <span>🇩🇪</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;