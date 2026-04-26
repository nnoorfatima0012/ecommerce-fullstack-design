// const relatedProducts = [
//   {
//     title: "Xiaomi Redmi 8 Original",
//     price: "$32.00-$40.00",
//     image: "https://img.icons8.com/color/120/iphone.png",
//   },
//   {
//     title: "Xiaomi Redmi 8 Original",
//     price: "$32.00-$40.00",
//     image: "https://img.icons8.com/color/120/smartphone-tablet.png",
//   },
//   {
//     title: "Xiaomi Redmi 8 Original",
//     price: "$32.00-$40.00",
//     image: "https://img.icons8.com/color/120/apple-watch.png",
//   },
//   {
//     title: "Xiaomi Redmi 8 Original",
//     price: "$32.00-$40.00",
//     image: "https://img.icons8.com/color/120/laptop.png",
//   },
//   {
//     title: "Xiaomi Redmi 8 Original",
//     price: "$32.00-$40.00",
//     image: "https://img.icons8.com/color/120/headphones.png",
//   },
//   {
//     title: "Xiaomi Redmi 8 Original",
//     price: "$32.00-$40.00",
//     image: "https://img.icons8.com/color/120/camera.png",
//   },
// ];

// function RelatedProducts() {
//   return (
//     <section className="bg-white border border-gray-200 rounded-md mt-5 p-5">
//       <h2 className="text-[20px] font-semibold text-gray-900 mb-4">
//         Related products
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//         {relatedProducts.map((item, index) => (
//           <div key={index}>
//             <div className="bg-[#f7f7f7] rounded-md h-[120px] flex items-center justify-center">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="max-h-[95px] object-contain"
//               />
//             </div>

//             <p className="text-[15px] text-gray-700 mt-3 leading-snug">
//               {item.title}
//             </p>

//             <p className="text-[14px] text-gray-500 mt-1">
//               {item.price}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default RelatedProducts;

const relatedProducts = [
  {
    title: "T-shirts with multiple colors, for men",
    price: "$10.30",
    image: "https://img.icons8.com/color/160/polo-shirt.png",
  },
  {
    title: "Brown winter jacket with hood",
    price: "$10.30",
    image: "https://img.icons8.com/color/160/jacket.png",
  },
  {
    title: "T-shirts with multiple colors, for men",
    price: "$10.30",
    image: "https://img.icons8.com/color/160/clothes.png",
  },
  {
    title: "Xiaomi Redmi 8 Original",
    price: "$32.00-$40.00",
    image: "https://img.icons8.com/color/120/iphone.png",
  },
  {
    title: "Smart watch original",
    price: "$25.00",
    image: "https://img.icons8.com/color/120/apple-watch.png",
  },
  {
    title: "Camera for daily use",
    price: "$45.00",
    image: "https://img.icons8.com/color/120/camera.png",
  },
];

function RelatedProducts() {
  return (
    <section className="mt-4 sm:mt-5 px-3 sm:px-0">
      <h2 className="text-[18px] sm:text-[20px] font-semibold text-gray-900 mb-4">
        Similar products
      </h2>

      <div className="sm:bg-white sm:border sm:border-gray-200 sm:rounded-md sm:p-5">
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0">
          {relatedProducts.map((item, index) => (
            <div
              key={index}
              className="min-w-[150px] sm:min-w-0 bg-white border border-gray-200 sm:border-0 rounded-md p-3 sm:p-0"
            >
              <div className="bg-white sm:bg-[#f7f7f7] rounded-md h-[130px] sm:h-[120px] flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[105px] sm:max-h-[95px] object-contain"
                />
              </div>

              <p className="text-[16px] sm:text-[15px] font-medium sm:font-normal text-gray-900 sm:text-gray-700 mt-3 leading-snug">
                {item.price}
              </p>

              <p className="text-[14px] text-gray-500 mt-1 leading-snug line-clamp-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;