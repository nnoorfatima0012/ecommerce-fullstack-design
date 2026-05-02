// //client/src/components/cart/CartItem.jsx

// import { useState } from "react";
// import { Plus, Minus, Trash2, Heart } from "lucide-react";

// function CartItem({ item }) {
//   const [qty, setQty] = useState(item.qty);

//   const increase = () => setQty(qty + 1);
//   const decrease = () => {
//     if (qty > 1) setQty(qty - 1);
//   };

//   return (
//     <div className="flex gap-3 sm:gap-4 border-b border-gray-200 py-4 last:border-b-0">
      
//       {/* Image */}
//       <div className="w-[86px] h-[86px] bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
//         <img src={item.image} alt={item.title} className="max-h-[68px]" />
//       </div>

//       {/* Content */}
//       <div className="flex-1 min-w-0">
        
//         {/* Title + Price */}
//         <div className="flex justify-between gap-3">
//           <h3 className="font-medium text-gray-900 text-[15px] leading-snug line-clamp-2">
//             {item.title}
//           </h3>

//           <p className="font-semibold text-gray-900 whitespace-nowrap">
//             ${item.price}
//           </p>
//         </div>

//         {/* Meta */}
//         <p className="text-sm text-gray-500 mt-1">
//           Size: medium, Color: blue
//         </p>

//         {/* Bottom Row */}
//         <div className="flex items-center justify-between mt-3">

//           {/* Quantity Stepper */}
//           <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
//             <button
//               onClick={decrease}
//               className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition"
//             >
//               <Minus size={16} />
//             </button>

//             <div className="w-10 text-center text-sm font-medium">
//               {qty}
//             </div>

//             <button
//               onClick={increase}
//               className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition"
//             >
//               <Plus size={16} />
//             </button>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center gap-2">

//             {/* Mobile Icons */}
//             <button className="sm:hidden w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-blue-600">
//               <Heart size={17} />
//             </button>

//             <button className="sm:hidden w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-red-500">
//               <Trash2 size={17} />
//             </button>

//             {/* Desktop Buttons */}
//             <button className="hidden sm:block text-blue-600 border border-gray-200 px-3 py-1 rounded-md text-sm">
//               Save for later
//             </button>

//             <button className="hidden sm:block text-red-500 border border-gray-200 px-3 py-1 rounded-md text-sm">
//               Remove
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartItem;


import { Plus, Minus, Trash2, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const increase = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  const decrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  return (
    <div className="flex gap-3 sm:gap-4 border-b border-gray-200 py-4 last:border-b-0">
      <div className="w-[86px] h-[86px] bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
        <img src={item.image} alt={item.title} className="max-h-[68px]" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-3">
          <h3 className="font-medium text-gray-900 text-[15px] leading-snug line-clamp-2">
            {item.title}
          </h3>

          <p className="font-semibold text-gray-900 whitespace-nowrap">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Brand: {item.brand || "N/A"} • Supplier: {item.supplier || "N/A"}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={decrease}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition"
            >
              <Minus size={16} />
            </button>

            <div className="w-10 text-center text-sm font-medium">
              {item.quantity}
            </div>

            <button
              onClick={increase}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="sm:hidden w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-blue-600">
              <Heart size={17} />
            </button>

            <button
              onClick={() => removeFromCart(item.productId)}
              className="sm:hidden w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-red-500"
            >
              <Trash2 size={17} />
            </button>

            <button className="hidden sm:block text-blue-600 border border-gray-200 px-3 py-1 rounded-md text-sm">
              Save for later
            </button>

            <button
              onClick={() => removeFromCart(item.productId)}
              className="hidden sm:block text-red-500 border border-gray-200 px-3 py-1 rounded-md text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;