

// import { Heart, Trash2 } from "lucide-react";
// import { Plus, Minus } from "lucide-react";
// import { useState } from "react";


// function CartItem({ item }) {
//   const [qty, setQty] = useState(item.qty);

//   const increase = () => setQty(qty + 1);
//   const decrease = () => {
//     if (qty > 1) setQty(qty - 1);
//   };
//   return (
//     <div className="flex gap-3 sm:gap-4 border-b border-gray-200 py-4 last:border-b-0">
//       <div className="w-[86px] h-[86px] sm:w-[80px] sm:h-[80px] bg-gray-100 rounded-xl sm:rounded-md flex items-center justify-center shrink-0">
//         <img src={item.image} alt={item.title} className="max-h-[68px]" />
//       </div>

//       <div className="flex-1 min-w-0">
//         <div className="flex justify-between gap-3">
//           <div>
//             <h3 className="font-medium text-gray-900 text-[15px] sm:text-base leading-snug line-clamp-2">
//               {item.title}
//             </h3>

//             <p className="text-sm text-gray-500 mt-1 line-clamp-1">
//               Size: medium, Color: blue
//             </p>
//             <p className="text-sm text-gray-500 hidden sm:block">
//               Material: Plastic, Seller: Artel Market
//             </p>
//           </div>

//           <p className="font-semibold text-gray-900 whitespace-nowrap">
//             ${item.price}
//           </p>
//         </div>


//         {/* Quantity Stepper */}
//         <div className="flex items-center justify-between mt-3">
          
//           <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
//             <button
//               onClick={decrease}
//               className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100"
//             >
//               <Minus size={16} />
//             </button>

//             <div className="w-10 text-center text-sm font-medium">
//               {qty}
//             </div>

//             <button
//               onClick={increase}
//               className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100"
//             >
//               <Plus size={16} />
//             </button>
//           </div>

//         </div>
//         {/* <div className="flex items-center justify-between mt-3">
          

//           <div className="flex gap-2">
//             <button className="hidden sm:block text-red-500 border border-gray-200 px-3 py-1 rounded-md text-sm">
//               Remove
//             </button>

//             <button className="hidden sm:block text-blue-600 border border-gray-200 px-3 py-1 rounded-md text-sm">
//               Save for later
//             </button>

//             <button className="sm:hidden w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-blue-600">
//               <Heart size={17} />
//             </button>

//             <button className="sm:hidden w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-red-500">
//               <Trash2 size={17} />
//             </button>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default CartItem;


import { useState } from "react";
import { Plus, Minus, Trash2, Heart } from "lucide-react";

function CartItem({ item }) {
  const [qty, setQty] = useState(item.qty);

  const increase = () => setQty(qty + 1);
  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  return (
    <div className="flex gap-3 sm:gap-4 border-b border-gray-200 py-4 last:border-b-0">
      
      {/* Image */}
      <div className="w-[86px] h-[86px] bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
        <img src={item.image} alt={item.title} className="max-h-[68px]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        
        {/* Title + Price */}
        <div className="flex justify-between gap-3">
          <h3 className="font-medium text-gray-900 text-[15px] leading-snug line-clamp-2">
            {item.title}
          </h3>

          <p className="font-semibold text-gray-900 whitespace-nowrap">
            ${item.price}
          </p>
        </div>

        {/* Meta */}
        <p className="text-sm text-gray-500 mt-1">
          Size: medium, Color: blue
        </p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-3">

          {/* Quantity Stepper */}
          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={decrease}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition"
            >
              <Minus size={16} />
            </button>

            <div className="w-10 text-center text-sm font-medium">
              {qty}
            </div>

            <button
              onClick={increase}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* Mobile Icons */}
            <button className="sm:hidden w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-blue-600">
              <Heart size={17} />
            </button>

            <button className="sm:hidden w-9 h-9 border border-gray-200 rounded-md flex items-center justify-center text-red-500">
              <Trash2 size={17} />
            </button>

            {/* Desktop Buttons */}
            <button className="hidden sm:block text-blue-600 border border-gray-200 px-3 py-1 rounded-md text-sm">
              Save for later
            </button>

            <button className="hidden sm:block text-red-500 border border-gray-200 px-3 py-1 rounded-md text-sm">
              Remove
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;