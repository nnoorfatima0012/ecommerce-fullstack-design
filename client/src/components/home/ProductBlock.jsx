
// //src/components/home/ProductBlock.jsx
// function ProductBlock({ title, items, image, bgColor = "#f4efe6" }) {
//   return (
//     <section className="max-w-[1180px] mx-auto px-4 pb-4">
//       <div className="bg-white border border-gray-200 rounded-md overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr] h-auto lg:h-[257px]">
        
//         {/* LEFT ASIDE */}
//         <div
//           className="relative h-[257px] bg-cover bg-center p-6"
//           style={{
//             backgroundColor: bgColor,
//             backgroundImage: `linear-gradient(to right, ${bgColor} 0%, ${bgColor}cc 35%, transparent 100%), url(${image})`,
//           }}
//         >
//           <h2 className="text-[20px] font-semibold text-gray-900 leading-tight max-w-[150px]">
//             {title}
//           </h2>

//           <button className="mt-6 bg-white px-5 py-2 rounded-md text-[15px] shadow-sm">
//             Source now
//           </button>
//         </div>

//         {/* RIGHT GRID */}
//         <div className="grid grid-cols-2 md:grid-cols-4 h-auto lg:h-[257px]">
//           {items.map((item, i) => (
//             <div
//               key={i}
//               className="border-l border-b border-gray-200 px-5 py-4 flex justify-between min-h-[128.5px]"
//             >
//               <div>
//                 <h3 className="text-[16px] text-gray-900 leading-tight">
//                   {item.name}
//                 </h3>
//                 <p className="text-[14px] text-gray-400 mt-2 leading-tight">
//                   From <br />
//                   USD {item.price}
//                 </p>
//               </div>

//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-[82px] h-[82px] object-contain self-center"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductBlock;

import { Link } from "react-router-dom";

function ProductBlock({ title, items = [], image, bgColor = "#f4efe6" }) {
  return (
    <section className="max-w-[1180px] mx-auto px-4 pb-4">
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr] h-auto lg:h-[257px]">
        <div
          className="relative h-[257px] bg-cover bg-center p-6"
          style={{
            backgroundColor: bgColor,
            backgroundImage: `linear-gradient(to right, ${bgColor} 0%, ${bgColor}cc 35%, transparent 100%), url(${image})`,
          }}
        >
          <h2 className="text-[20px] font-semibold text-gray-900 leading-tight max-w-[150px]">
            {title}
          </h2>

          <Link
            to="/products/grid"
            className="inline-block mt-6 bg-white px-5 py-2 rounded-md text-[15px] shadow-sm"
          >
            Source now
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 h-auto lg:h-[257px]">
          {items.slice(0, 8).map((item) => {
            const image = item.images?.[0] || item.image;
            const id = item._id || item.id;

            return (
              <Link
                to={`/products/${id}`}
                key={id}
                className="border-l border-b border-gray-200 px-5 py-4 flex justify-between min-h-[128.5px] hover:bg-gray-50"
              >
                <div>
                  <h3 className="text-[16px] text-gray-900 leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-gray-400 mt-2 leading-tight">
                    From <br />
                    USD {Number(item.price).toFixed(2)}
                  </p>
                </div>

                <img
                  src={image}
                  alt={item.title}
                  className="w-[82px] h-[82px] object-contain self-center"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductBlock;