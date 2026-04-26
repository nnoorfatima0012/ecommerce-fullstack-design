

// //src/components/ProductGridCard.jsx
// import { Heart } from "lucide-react";

// function ProductGridCard({ product }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-md overflow-hidden relative">
//       <div className="h-[150px] md:h-[230px] flex items-center justify-center p-3 md:p-5">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="max-h-[125px] md:max-h-[200px] object-contain"
//         />
//       </div>

//       <div className="border-t border-gray-200 p-3 md:p-4">
//         <div className="flex items-start justify-between gap-2 md:gap-3">
//           <div>
//             <div className="flex items-center gap-2 flex-wrap">
//               <p className="text-[15px] md:text-[17px] font-semibold text-gray-900">
//                 ${product.price}
//               </p>

//               {product.oldPrice && (
//                 <p className="text-[12px] md:text-[14px] text-gray-400 line-through">
//                   ${product.oldPrice}
//                 </p>
//               )}
//             </div>

//             <div className="mt-1 flex items-center gap-1 text-[12px] md:text-sm">
//               <span className="text-orange-400">★★★★☆</span>
//               <span className="text-orange-500">7.5</span>
//             </div>
//           </div>

//           <button className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] border border-gray-200 rounded-md flex items-center justify-center text-blue-600 shrink-0">
//             <Heart size={18} />
//           </button>
//         </div>

//         <p className="text-[13px] md:text-[15px] text-gray-500 mt-2 leading-snug line-clamp-2">
//           {product.title}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ProductGridCard;


import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function ProductGridCard({ product }) {
  const productImage = product.images?.[0] || product.image;
  const productId = product._id || product.id;

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden relative hover:shadow-sm transition">
      <Link to={`/products/${productId}`}>
        <div className="h-[150px] md:h-[230px] flex items-center justify-center p-3 md:p-5">
          <img
            src={productImage}
            alt={product.title}
            className="max-h-[125px] md:max-h-[200px] object-contain"
          />
        </div>
      </Link>

      <div className="border-t border-gray-200 p-3 md:p-4">
        <div className="flex items-start justify-between gap-2 md:gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[15px] md:text-[17px] font-semibold text-gray-900">
                ${Number(product.price).toFixed(2)}
              </p>

              {product.oldPrice && (
                <p className="text-[12px] md:text-[14px] text-gray-400 line-through">
                  ${Number(product.oldPrice).toFixed(2)}
                </p>
              )}
            </div>

            <div className="mt-1 flex items-center gap-1 text-[12px] md:text-sm">
              <span className="text-orange-400">★★★★☆</span>
              <span className="text-orange-500">{product.rating || 0}</span>
            </div>
          </div>

          <button className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] border border-gray-200 rounded-md flex items-center justify-center text-blue-600 shrink-0">
            <Heart size={18} />
          </button>
        </div>

        <Link to={`/products/${productId}`}>
          <p className="text-[13px] md:text-[15px] text-gray-500 mt-2 leading-snug line-clamp-2 hover:text-blue-600">
            {product.title}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ProductGridCard;