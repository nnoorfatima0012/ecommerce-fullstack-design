// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   User,
//   MessageCircle,
//   Heart,
//   ShoppingCart,
//   Menu,
//   Briefcase,
// } from "lucide-react";

// function Header() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();

//     const query = search.trim();

//     if (query) {
//       navigate(`/products/list?search=${encodeURIComponent(query)}`);
//     } else {
//       navigate("/products/list");
//     }
//   };

//   return (
//     <div className="bg-white border-b">
//       <div className="max-w-[1180px] mx-auto px-4 py-3">
//         <div className="flex md:hidden items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Menu size={24} />
//             <div className="flex items-center gap-2">
//               <div className="bg-blue-500 text-white p-2 rounded-md">
//                 <Briefcase size={20} />
//               </div>
//               <span className="text-2xl font-semibold text-blue-400">
//                 Brand
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center gap-5">
//             <ShoppingCart size={24} />
//             <User size={24} />
//           </div>
//         </div>

//         <form onSubmit={handleSearch} className="md:hidden mt-4 relative">
//           <Search
//             size={20}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//           <input
//             type="text"
//             placeholder="Search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full h-[44px] border border-gray-300 rounded-md pl-10 pr-4 outline-none bg-gray-50"
//           />
//         </form>

//         <div className="hidden md:flex items-center justify-between">
//           <div
//             onClick={() => navigate("/")}
//             className="flex items-center gap-2 cursor-pointer"
//           >
//             <div className="bg-blue-600 text-white p-2 rounded-md font-bold">
//               B
//             </div>
//             <span className="text-xl font-semibold text-gray-700">Brand</span>
//           </div>

//           <form
//             onSubmit={handleSearch}
//             className="flex items-center w-[50%] border rounded-md overflow-hidden"
//           >
//             <input
//               type="text"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="flex-1 px-3 py-2 outline-none"
//             />

//             <select className="border-l px-2 py-2 text-sm text-gray-600">
//               <option>All category</option>
//             </select>

//             <button type="submit" className="bg-blue-600 text-white px-5 py-2">
//               Search
//             </button>
//           </form>

//           <div className="flex items-center gap-6 text-gray-600 text-sm">
//             <div className="flex flex-col items-center cursor-pointer">
//               <User size={20} />
//               <span>Profile</span>
//             </div>

//             <div className="flex flex-col items-center cursor-pointer">
//               <MessageCircle size={20} />
//               <span>Message</span>
//             </div>

//             <div className="flex flex-col items-center cursor-pointer">
//               <Heart size={20} />
//               <span>Orders</span>
//             </div>

//             <div
//               onClick={() => navigate("/cart")}
//               className="flex flex-col items-center cursor-pointer"
//             >
//               <ShoppingCart size={20} />
//               <span>My cart</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;

//client/src/components/layout/Header.jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  User,
  MessageCircle,
  Heart,
  ShoppingCart,
  Menu,
  Briefcase,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);
  const { cartCount } = useCart();

  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    navigate(queryString ? `/products/list?${queryString}` : "/products/list");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "" && searchParams.get("search")) {
      const params = new URLSearchParams(searchParams);
      params.delete("search");

      const queryString = params.toString();
      navigate(
        queryString ? `/products/list?${queryString}` : "/products/list",
      );
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-[1180px] mx-auto px-4 py-3">
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
            <div
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            <User size={24} />
          </div>
        </div>

        <form onSubmit={handleSearch} className="md:hidden mt-4 relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="w-full h-[44px] border border-gray-300 rounded-md pl-10 pr-4 outline-none bg-gray-50"
          />
        </form>

        <div className="hidden md:flex items-center justify-between">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-blue-600 text-white p-2 rounded-md font-bold">
              B
            </div>
            <span className="text-xl font-semibold text-gray-700">Brand</span>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex items-center w-[50%] border rounded-md overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              className="flex-1 px-3 py-2 outline-none"
            />

            <select className="border-l px-2 py-2 text-sm text-gray-600">
              <option>All category</option>
            </select>

            <button type="submit" className="bg-blue-600 text-white px-5 py-2">
              Search
            </button>
          </form>

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

            <div
              onClick={() => navigate("/cart")}
              className="flex flex-col items-center cursor-pointer relative"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>My cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
