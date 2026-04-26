// import { Heart, ShieldCheck, Truck, MessageCircle } from "lucide-react";

// function ProductDetailsMain() {
//   return (
//     <section className="bg-white border border-gray-200 rounded-md p-5 grid grid-cols-1 lg:grid-cols-[380px_1fr_280px] gap-5">
//       {/* Images */}
//       <div>
//         <div className="border border-gray-200 rounded-md h-[360px] flex items-center justify-center">
//           <img
//             src="https://img.icons8.com/color/350/polo-shirt.png"
//             alt="Product"
//             className="max-h-[320px] object-contain"
//           />
//         </div>

//         <div className="grid grid-cols-6 gap-2 mt-3">
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <div
//               key={item}
//               className="border border-gray-200 rounded-md h-[55px] flex items-center justify-center"
//             >
//               <img
//                 src="https://img.icons8.com/color/80/polo-shirt.png"
//                 alt="thumb"
//                 className="h-[45px] object-contain"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Info */}
//       <div>
//         <p className="text-green-600 text-[15px]">✓ In stock</p>

//         <h1 className="text-[22px] font-semibold text-gray-900 leading-snug mt-2">
//           Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
//         </h1>

//         <div className="flex items-center gap-3 mt-3 text-[15px]">
//           <span className="text-orange-400">★★★★☆</span>
//           <span className="text-orange-500">9.3</span>
//           <span className="text-gray-400">32 reviews</span>
//           <span className="text-gray-400">154 sold</span>
//         </div>

//         <div className="bg-[#fff0df] grid grid-cols-3 mt-5 p-4">
//           <div>
//             <p className="text-red-600 font-semibold">$98.00</p>
//             <p className="text-gray-500 text-sm">50-100 pcs</p>
//           </div>
//           <div>
//             <p className="font-semibold">$90.00</p>
//             <p className="text-gray-500 text-sm">100-700 pcs</p>
//           </div>
//           <div>
//             <p className="font-semibold">$78.00</p>
//             <p className="text-gray-500 text-sm">700+ pcs</p>
//           </div>
//         </div>

//         <div className="mt-5 space-y-3 text-[15px]">
//           <div className="grid grid-cols-[120px_1fr]">
//             <span className="text-gray-500">Price:</span>
//             <span>Negotiable</span>
//           </div>
//           <div className="grid grid-cols-[120px_1fr]">
//             <span className="text-gray-500">Type:</span>
//             <span>Classic shoes</span>
//           </div>
//           <div className="grid grid-cols-[120px_1fr]">
//             <span className="text-gray-500">Material:</span>
//             <span>Plastic material</span>
//           </div>
//           <div className="grid grid-cols-[120px_1fr]">
//             <span className="text-gray-500">Design:</span>
//             <span>Modern nice</span>
//           </div>
//         </div>
//       </div>

//       {/* Supplier Card */}
//       <aside className="border border-gray-200 rounded-md p-4 h-fit">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-md flex items-center justify-center font-semibold">
//             R
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Supplier</p>
//             <p className="font-medium">Guanjxi Trading LLC</p>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 mt-4 pt-4 space-y-3 text-[15px] text-gray-600">
//           <p>🇩🇪 Germany, Berlin</p>
//           <p className="flex gap-2 items-center">
//             <ShieldCheck size={18} /> Verified Seller
//           </p>
//           <p className="flex gap-2 items-center">
//             <Truck size={18} /> Worldwide shipping
//           </p>
//         </div>

//         <button className="w-full h-[40px] bg-blue-600 text-white rounded-md mt-4">
//           Send inquiry
//         </button>

//         <button className="w-full h-[40px] border border-gray-200 text-blue-600 rounded-md mt-2">
//           Seller’s profile
//         </button>

//         <button className="flex items-center justify-center gap-2 w-full mt-4 text-blue-600">
//           <Heart size={18} />
//           Save for later
//         </button>
//       </aside>
//     </section>
//   );
// }

// export default ProductDetailsMain;

import {
  Heart,
  ShieldCheck,
  Truck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  User,
} from "lucide-react";

function ProductDetailsMain() {
  return (
    <section className="bg-white sm:border sm:border-gray-200 sm:rounded-md sm:p-5 grid grid-cols-1 lg:grid-cols-[380px_1fr_280px] gap-0 sm:gap-5">
      
      {/* Mobile Top Icons */}
      <div className="sm:hidden h-[56px] flex items-center justify-between px-4 bg-white">
        <ChevronLeft size={24} />
        <div className="flex items-center gap-5">
          <ShoppingCart size={22} />
          <User size={22} />
        </div>
      </div>

      {/* Images */}
      <div>
        <div className="relative bg-[#f7f7f7] sm:bg-white sm:border sm:border-gray-200 sm:rounded-md h-[305px] sm:h-[360px] flex items-center justify-center">
          <img
            src="https://img.icons8.com/color/350/polo-shirt.png"
            alt="Product"
            className="max-h-[260px] sm:max-h-[320px] object-contain"
          />

          <div className="sm:hidden absolute right-4 bottom-3 bg-gray-400/80 text-white rounded-full px-3 py-2 flex gap-3">
            <ChevronLeft size={18} />
            <ChevronRight size={18} />
          </div>
        </div>

        <div className="hidden sm:grid grid-cols-6 gap-2 mt-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="border border-gray-200 rounded-md h-[55px] flex items-center justify-center"
            >
              <img
                src="https://img.icons8.com/color/80/polo-shirt.png"
                alt="thumb"
                className="h-[45px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-4 sm:px-0 sm:py-0">
        <p className="hidden sm:block text-green-600 text-[15px]">✓ In stock</p>

        <div className="flex items-center gap-2 text-[14px] sm:text-[15px]">
          <span className="text-orange-400">★★★★☆</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400 flex items-center gap-1">
            <MessageCircle size={16} /> 32 reviews
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400">154 sold</span>
        </div>

        <h1 className="text-[17px] sm:text-[22px] font-semibold text-gray-900 leading-snug mt-2">
          Product name goes here
        </h1>

        <div className="sm:hidden mt-2">
          <span className="text-red-600 font-semibold text-[18px]">$129.95</span>
          <span className="text-gray-400 text-[14px] ml-2">(50-100 pcs)</span>
        </div>

        <div className="hidden sm:grid bg-[#fff0df] grid-cols-3 mt-5 p-4">
          <div>
            <p className="text-red-600 font-semibold">$98.00</p>
            <p className="text-gray-500 text-sm">50-100 pcs</p>
          </div>
          <div>
            <p className="font-semibold">$90.00</p>
            <p className="text-gray-500 text-sm">100-700 pcs</p>
          </div>
          <div>
            <p className="font-semibold">$78.00</p>
            <p className="text-gray-500 text-sm">700+ pcs</p>
          </div>
        </div>

        <div className="sm:hidden flex gap-2 mt-4">
          <button className="flex-1 h-[40px] bg-blue-600 text-white rounded-md">
            Send inquiry
          </button>
          <button className="w-[48px] h-[40px] border border-gray-200 rounded-md flex items-center justify-center text-blue-600">
            <Heart size={22} />
          </button>
        </div>

        <div className="mt-5 space-y-2 sm:space-y-3 text-[15px]">
          <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
            <span className="text-gray-500">Condition</span>
            <span>Brand new</span>
          </div>
          <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
            <span className="text-gray-500">Material</span>
            <span>Plastic</span>
          </div>
          <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
            <span className="text-gray-500">Category</span>
            <span>Electronics, gadgets</span>
          </div>
          <div className="grid grid-cols-[115px_1fr] sm:grid-cols-[120px_1fr]">
            <span className="text-gray-500">Item num</span>
            <span>23421</span>
          </div>
        </div>

        <p className="sm:hidden mt-3 text-gray-600 leading-snug">
          Info about edu item is an ideal companion for anyone engaged in
          learning. The drone provides precise and ...
        </p>

        <button className="sm:hidden text-blue-600 mt-2 font-medium">
          Read more
        </button>
      </div>

      {/* Supplier Card */}
      <aside className="mx-3 sm:mx-0 mb-4 sm:mb-0 border border-gray-200 rounded-md p-3 sm:p-4 h-fit">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-md flex items-center justify-center font-semibold text-[22px]">
            R
          </div>

          <div className="flex-1">
            <p className="text-gray-500 text-sm">Supplier</p>
            <p className="font-medium">Guanjxi Trading LLC</p>
          </div>

          <ChevronRight className="sm:hidden text-gray-400" size={22} />
        </div>

        <div className="border-t border-gray-200 mt-3 pt-3 flex sm:block items-center gap-4 sm:space-y-3 text-[14px] sm:text-[15px] text-gray-600">
          <p>🇩🇪 Germany</p>

          <p className="flex gap-1 sm:gap-2 items-center">
            <ShieldCheck size={17} /> Verified
          </p>

          <p className="flex gap-1 sm:gap-2 items-center">
            <Truck size={17} /> Shipping
          </p>
        </div>

        <button className="hidden sm:block w-full h-[40px] bg-blue-600 text-white rounded-md mt-4">
          Send inquiry
        </button>

        <button className="hidden sm:block w-full h-[40px] border border-gray-200 text-blue-600 rounded-md mt-2">
          Seller’s profile
        </button>

        <button className="hidden sm:flex items-center justify-center gap-2 w-full mt-4 text-blue-600">
          <Heart size={18} />
          Save for later
        </button>
      </aside>
    </section>
  );
}

export default ProductDetailsMain;