
// const dealProducts = [
//   {
//     name: "Smart watches",
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
//     discount: "-25%",
//   },
//   {
//     name: "Laptops",
//     image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80",
//     discount: "-15%",
//   },
//   {
//     name: "GoPro cameras",
//     image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=300&q=80",
//     discount: "-40%",
//   },
//   {
//     name: "Headphones",
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
//     discount: "-25%",
//   },
//   {
//     name: "Canon cameras",
//     image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80",
//     discount: "-25%",
//   },
// ];

// const time = [
//   { value: "04", label: "Days" },
//   { value: "13", label: "Hour" },
//   { value: "34", label: "Min" },
//   { value: "56", label: "Sec" },
// ];

// function DealsSection() {
//   return (
//     <section className="max-w-[1180px] mx-auto px-4 pb-5 max-md:px-3 max-md:pb-4">
//       <div className="bg-white border border-gray-200 rounded-md overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr]">
//         <div className="p-5 max-md:p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
//           <div className="flex items-start justify-between gap-3 lg:block">
//             <div>
//               <h2 className="text-xl max-md:text-[18px] font-semibold text-gray-900">
//                 Deals and offers
//               </h2>

//               <p className="text-gray-500 mt-1 max-md:text-sm">
//                 Hygiene equipments
//               </p>
//             </div>

//             <div className="flex gap-2 lg:mt-5 max-md:gap-1.5">
//               {time.map((item) => (
//                 <div
//                   key={item.label}
//                   className="w-[48px] h-[55px] max-md:w-[43px] max-md:h-[48px] bg-gray-600 text-white rounded-md flex flex-col items-center justify-center"
//                 >
//                   <span className="text-lg max-md:text-base font-bold leading-none">
//                     {item.value}
//                   </span>

//                   <span className="text-xs max-md:text-[10px] mt-1">
//                     {item.label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
//           {dealProducts.map((product) => (
//             <div
//               key={product.name}
//               className="border-r border-b lg:border-b-0 border-gray-200 p-4 max-md:p-3 flex flex-col items-center text-center min-h-[190px] max-md:min-h-[170px]"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-[110px] h-[110px] max-md:w-[92px] max-md:h-[92px] object-contain"
//               />

//               <h3 className="mt-3 text-[15px] max-md:text-[14px] text-gray-800">
//                 {product.name}
//               </h3>

//               <span className="mt-2 bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm">
//                 {product.discount}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default DealsSection;

import { Link } from "react-router-dom";

const time = [
  { value: "04", label: "Days" },
  { value: "13", label: "Hour" },
  { value: "34", label: "Min" },
  { value: "56", label: "Sec" },
];

function DealsSection({ products = [] }) {
  return (
    <section className="max-w-[1180px] mx-auto px-4 pb-5 max-md:px-3 max-md:pb-4">
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <div className="p-5 max-md:p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="flex items-start justify-between gap-3 lg:block">
            <div>
              <h2 className="text-xl max-md:text-[18px] font-semibold text-gray-900">
                Deals and offers
              </h2>
              <p className="text-gray-500 mt-1 max-md:text-sm">
                Latest discounted products
              </p>
            </div>

            <div className="flex gap-2 lg:mt-5 max-md:gap-1.5">
              {time.map((item) => (
                <div
                  key={item.label}
                  className="w-[48px] h-[55px] max-md:w-[43px] max-md:h-[48px] bg-gray-600 text-white rounded-md flex flex-col items-center justify-center"
                >
                  <span className="text-lg max-md:text-base font-bold leading-none">
                    {item.value}
                  </span>
                  <span className="text-xs max-md:text-[10px] mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {products.slice(0, 5).map((product) => {
            const image = product.images?.[0] || product.image;
            const id = product._id || product.id;

            return (
              <Link
                to={`/products/${id}`}
                key={id}
                className="border-r border-b lg:border-b-0 border-gray-200 p-4 max-md:p-3 flex flex-col items-center text-center min-h-[190px] max-md:min-h-[170px] hover:bg-gray-50"
              >
                <img
                  src={image}
                  alt={product.title}
                  className="w-[110px] h-[110px] max-md:w-[92px] max-md:h-[92px] object-contain"
                />

                <h3 className="mt-3 text-[15px] max-md:text-[14px] text-gray-800 line-clamp-1">
                  {product.title}
                </h3>

                <span className="mt-2 bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm">
                  -{product.discount || 10}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DealsSection;