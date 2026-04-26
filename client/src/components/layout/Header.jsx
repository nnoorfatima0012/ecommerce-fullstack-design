// //ecommerce-fullstack-design/src/components/layout/Header.jsx
// import { Search, User, MessageCircle, Heart, ShoppingCart } from "lucide-react";

// function Header() {
//   return (
//     <div className="bg-white border-b">
//       <div className="max-w-[1180px] mx-auto px-4 py-3 flex items-center justify-between">
        
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <div className="bg-blue-600 text-white p-2 rounded-md font-bold">
//             B
//           </div>
//           <span className="text-xl font-semibold text-gray-700">
//             Brand
//           </span>
//         </div>

//         {/* Search Bar */}
//         <div className="flex items-center w-[50%] border rounded-md overflow-hidden">
//           <input
//             type="text"
//             placeholder="Search"
//             className="flex-1 px-3 py-2 outline-none"
//           />

//           <select className="border-l px-2 py-2 text-sm text-gray-600">
//             <option>All category</option>
//           </select>

//           <button className="bg-blue-600 text-white px-5 py-2">
//             Search
//           </button>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-6 text-gray-600 text-sm">
//           <div className="flex flex-col items-center cursor-pointer">
//             <User size={20} />
//             <span>Profile</span>
//           </div>

//           <div className="flex flex-col items-center cursor-pointer">
//             <MessageCircle size={20} />
//             <span>Message</span>
//           </div>

//           <div className="flex flex-col items-center cursor-pointer">
//             <Heart size={20} />
//             <span>Orders</span>
//           </div>

//           <div className="flex flex-col items-center cursor-pointer">
//             <ShoppingCart size={20} />
//             <span>My cart</span>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Header;

import {
  Search,
  User,
  MessageCircle,
  Heart,
  ShoppingCart,
  Menu,
  Briefcase,
} from "lucide-react";

function Header() {
  return (
    <div className="bg-white border-b">
      <div className="max-w-[1180px] mx-auto px-4 py-3">
        {/* Mobile top row */}
        <div className="flex md:hidden items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu size={24} />
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 text-white p-2 rounded-md">
                <Briefcase size={20} />
              </div>
              <span className="text-2xl font-semibold text-blue-400">
                Brand
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <ShoppingCart size={24} />
            <User size={24} />
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4 relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[44px] border border-gray-300 rounded-md pl-10 pr-4 outline-none bg-gray-50"
          />
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-md font-bold">
              B
            </div>
            <span className="text-xl font-semibold text-gray-700">Brand</span>
          </div>

          <div className="flex items-center w-[50%] border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-3 py-2 outline-none"
            />

            <select className="border-l px-2 py-2 text-sm text-gray-600">
              <option>All category</option>
            </select>

            <button className="bg-blue-600 text-white px-5 py-2">
              Search
            </button>
          </div>

          <div className="flex items-center gap-6 text-gray-600 text-sm">
            <div className="flex flex-col items-center cursor-pointer">
              <User size={20} />
              <span>Profile</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <MessageCircle size={20} />
              <span>Message</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <Heart size={20} />
              <span>Orders</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <ShoppingCart size={20} />
              <span>My cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;