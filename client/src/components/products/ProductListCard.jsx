// import { Heart } from "lucide-react";

// function ProductListCard({ product }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-md p-4 flex gap-5 relative">
//       <img
//         src={product.image}
//         alt={product.title}
//         className="w-[180px] h-[180px] object-contain"
//       />

//       <div className="flex-1 pr-10">
//         <h3 className="text-[17px] font-medium text-gray-900">
//           {product.title}
//         </h3>

//         <div className="mt-2 flex items-center gap-2">
//           <span className="text-[22px] font-semibold text-gray-900">
//             ${product.price}
//           </span>

//           {product.oldPrice && (
//             <span className="text-gray-400 line-through">
//               ${product.oldPrice}
//             </span>
//           )}
//         </div>

//         <div className="mt-2 flex items-center gap-2 text-[15px]">
//           <span className="text-orange-400">★★★★☆</span>
//           <span className="text-orange-500">7.5</span>
//           <span className="text-gray-300">•</span>
//           <span className="text-gray-400">154 orders</span>
//           <span className="text-gray-300">•</span>
//           <span className="text-green-600">Free Shipping</span>
//         </div>

//         <p className="mt-3 text-[15px] text-gray-600 leading-relaxed max-w-[620px]">
//           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
//           ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit.
//         </p>

//         <button className="mt-2 text-blue-600 text-[15px] font-medium">
//           View details
//         </button>
//       </div>

//       <button className="absolute top-4 right-4 w-[40px] h-[40px] border border-gray-200 rounded-md flex items-center justify-center text-blue-600 bg-white">
//         <Heart size={22} />
//       </button>
//     </div>
//   );
// }

// export default ProductListCard;

import { Heart } from "lucide-react";

function ProductListCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-3 md:p-4 flex gap-3 md:gap-5 relative">
      <img
        src={product.image}
        alt={product.title}
        className="w-[92px] h-[92px] md:w-[180px] md:h-[180px] object-contain"
      />

      <div className="flex-1 md:pr-10">
        <h3 className="text-[16px] md:text-[17px] font-medium text-gray-700 md:text-gray-900">
          <span className="md:hidden">Regular Fit Resort Shirt</span>
          <span className="hidden md:inline">{product.title}</span>
        </h3>

        <div className="mt-1 md:mt-2 flex items-center gap-2">
          <span className="text-[17px] md:text-[22px] font-semibold text-gray-900">
            <span className="md:hidden">$57.70</span>
            <span className="hidden md:inline">${product.price}</span>
          </span>

          {product.oldPrice && (
            <span className="hidden md:inline text-gray-400 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>

        <div className="mt-1 md:mt-2 flex items-center gap-2 text-[13px] md:text-[15px]">
          <span className="text-orange-400">★★★★☆</span>
          <span className="text-orange-500">7.5</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400">154 orders</span>
        </div>

        <p className="hidden md:block mt-3 text-[15px] text-gray-600 leading-relaxed max-w-[620px]">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit.
        </p>

        <p className="text-green-600 text-[14px] md:text-[15px] mt-1">
          Free Shipping
        </p>

        <button className="hidden md:block mt-2 text-blue-600 text-[15px] font-medium">
          View details
        </button>
      </div>

      <button className="hidden md:flex absolute top-4 right-4 w-[40px] h-[40px] border border-gray-200 rounded-md items-center justify-center text-blue-600 bg-white">
        <Heart size={22} />
      </button>
    </div>
  );
}

export default ProductListCard;