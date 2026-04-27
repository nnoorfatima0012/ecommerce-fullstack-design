// //src/components/home/RecommendedItems.jsx
// const recommendedItems = [
//   {
//     price: "$10.30",
//     title: "T-shirts with multiple colors, for men",
//     image: "https://img.icons8.com/color/160/polo-shirt.png",
//   },
//   {
//     price: "$10.30",
//     title: "Jeans shorts for men blue color",
//     image: "https://img.icons8.com/color/160/jacket.png",
//   },
//   {
//     price: "$12.50",
//     title: "Brown winter coat medium size",
//     image: "https://img.icons8.com/color/160/suit.png",
//   },
//   {
//     price: "$34.00",
//     title: "Jeans bag for travel for men",
//     image: "https://img.icons8.com/color/160/wallet.png",
//   },
//   {
//     price: "$99.00",
//     title: "Leather wallet",
//     image: "https://img.icons8.com/color/160/backpack.png",
//   },
//   {
//     price: "$9.99",
//     title: "Canon camera black, 100x zoom",
//     image: "https://img.icons8.com/color/160/jeans.png",
//   },
//   {
//     price: "$8.99",
//     title: "Headset for gaming with mic",
//     image: "https://img.icons8.com/color/160/headphones.png",
//   },
//   {
//     price: "$10.30",
//     title: "Smartwatch silver color modern",
//     image: "https://img.icons8.com/color/160/apple-watch.png",
//   },
//   {
//     price: "$10.30",
//     title: "Blue wallet for men leather meterial",
//     image: "https://img.icons8.com/color/160/pottery.png",
//   },
//   {
//     price: "$80.95",
//     title: "Jeans bag for travel for men",
//     image: "https://img.icons8.com/color/160/electric-kettle.png",
//   },
// ];

// function RecommendedItems() {
//   return (
//     <section className="max-w-[1180px] mx-auto px-4 pb-5 max-md:px-3">
//       <h2 className="text-[24px] font-semibold text-gray-900 mb-4 max-md:text-[22px] max-md:mb-3 ">
//         Recommended items
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-md:gap-2.5">
//         {recommendedItems.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white border border-gray-200 rounded-md p-4 min-h-[240px] max-md:p-3 max-md:min-h-[260px]"
//           >
//             <div className="h-[145px] flex items-center justify-center max-md:h-[150px]">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="max-h-[135px] object-contain max-md:max-h-[145px]"
//               />
//             </div>

//             <p className="text-[16px] font-medium text-gray-900 mt-3">
//               {item.price}
//             </p>

//             <p className="text-[15px] text-gray-500 leading-snug mt-1">
//               {item.title}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default RecommendedItems;

import { Link } from "react-router-dom";

function RecommendedItems({ products = [] }) {
  if (!products.length) return null;

  return (
    <section className="max-w-[1180px] mx-auto px-4 pb-5 max-md:px-3">
      <h2 className="text-[24px] font-semibold text-gray-900 mb-4 max-md:text-[22px] max-md:mb-3">
        Recommended items
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-md:gap-2.5">
        {products.slice(0, 10).map((item) => {
          const image = item.images?.[0] || item.image;
          const id = item._id || item.id;

          return (
            <Link
              to={`/products/${id}`}
              key={id}
              className="bg-white border border-gray-200 rounded-md p-4 min-h-[240px] max-md:p-3 max-md:min-h-[260px] hover:shadow-sm transition"
            >
              <div className="h-[145px] flex items-center justify-center max-md:h-[150px]">
                <img
                  src={image}
                  alt={item.title}
                  className="max-h-[135px] object-contain max-md:max-h-[145px]"
                />
              </div>

              <p className="text-[16px] font-medium text-gray-900 mt-3">
                ${Number(item.price).toFixed(2)}
              </p>

              <p className="text-[15px] text-gray-500 leading-snug mt-1 line-clamp-2">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default RecommendedItems;