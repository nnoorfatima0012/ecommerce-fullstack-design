// //src/components/cart/SavedForLater.jsx
// const saved = [
//   { title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", image: "https://img.icons8.com/color/160/tablet.png" },
//   { title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", image: "https://img.icons8.com/color/160/iphone.png" },
//   { title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", image: "https://img.icons8.com/color/160/apple-watch.png" },
//   { title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", image: "https://img.icons8.com/color/160/laptop.png" },
// ];

// function SavedForLater() {
//   return (
//     <section className="bg-white border border-gray-200 rounded-md p-5 mt-5">
//       <h2 className="font-semibold text-lg mb-4">Saved for later</h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {saved.map((item, index) => (
//           <div key={index}>
//             <div className="h-[170px] bg-gray-100 rounded-md flex items-center justify-center">
//               <img src={item.image} alt={item.title} className="max-h-[140px]" />
//             </div>

//             <p className="font-semibold mt-3">{item.price}</p>
//             <p className="text-sm text-gray-500 mt-1">{item.title}</p>

//             <button className="mt-3 border border-gray-200 text-blue-600 px-3 py-2 rounded-md text-sm">
//               🛒 Move to cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default SavedForLater;


import { ShoppingCart } from "lucide-react";

const saved = [
  {
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$99.50",
    image: "https://img.icons8.com/color/160/tablet.png",
  },
  {
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$99.50",
    image: "https://img.icons8.com/color/160/iphone.png",
  },
  {
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$99.50",
    image: "https://img.icons8.com/color/160/apple-watch.png",
  },
  {
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$99.50",
    image: "https://img.icons8.com/color/160/laptop.png",
  },
];

function SavedForLater() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl sm:rounded-md p-4 sm:p-5 mt-5">
      <h2 className="font-semibold text-lg mb-4">Saved for later</h2>

      <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
        {saved.map((item, index) => (
          <div
            key={index}
            className="min-w-[165px] sm:min-w-0 border border-gray-200 sm:border-0 rounded-xl sm:rounded-none p-3 sm:p-0"
          >
            <div className="h-[135px] sm:h-[170px] bg-gray-100 rounded-lg sm:rounded-md flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[105px] sm:max-h-[140px]"
              />
            </div>

            <p className="font-semibold mt-3">{item.price}</p>

            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {item.title}
            </p>

            <button className="mt-3 border border-gray-200 text-blue-600 px-3 py-2 rounded-md text-sm flex items-center gap-2">
              <ShoppingCart size={16} />
              Move to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SavedForLater;