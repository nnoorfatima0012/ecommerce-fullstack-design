// import { useState } from "react";

// function ProductTabs() {
//   const [activeTab, setActiveTab] = useState("description");

//   return (
//     <section className="bg-white border border-gray-200 rounded-md mt-5">
//       {/* Tabs */}
//       <div className="flex border-b border-gray-200">
//         {["description", "reviews", "shipping"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-5 py-3 text-[15px] capitalize ${
//               activeTab === tab
//                 ? "border-b-2 border-blue-600 text-blue-600"
//                 : "text-gray-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-5 text-[15px] text-gray-600">
//         {activeTab === "description" && (
//           <div className="space-y-4">
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>

//             <div className="grid grid-cols-2 gap-3 max-w-[500px]">
//               <div className="flex justify-between border-b py-2">
//                 <span className="text-gray-500">Model</span>
//                 <span>#8786867</span>
//               </div>
//               <div className="flex justify-between border-b py-2">
//                 <span className="text-gray-500">Style</span>
//                 <span>Classic</span>
//               </div>
//               <div className="flex justify-between border-b py-2">
//                 <span className="text-gray-500">Certificate</span>
//                 <span>ISO-898921212</span>
//               </div>
//               <div className="flex justify-between border-b py-2">
//                 <span className="text-gray-500">Size</span>
//                 <span>34mm x 450mm</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "reviews" && (
//           <div>
//             <p className="font-medium mb-3">Customer Reviews</p>
//             <p>⭐⭐⭐⭐☆ - Very good product</p>
//             <p className="mt-2 text-gray-500">No more reviews yet...</p>
//           </div>
//         )}

//         {activeTab === "shipping" && (
//           <div className="space-y-2">
//             <p>🚚 Worldwide shipping available</p>
//             <p>⏱ Delivery: 5-10 business days</p>
//             <p>💰 Shipping cost depends on location</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default ProductTabs;


import { useState } from "react";

function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="hidden sm:block bg-white border border-gray-200 rounded-md mt-5">
      <div className="flex border-b border-gray-200">
        {["description", "reviews", "shipping"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-[15px] capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-5 text-[15px] text-gray-600">
        {activeTab === "description" && (
          <div className="space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-[500px]">
              <div className="flex justify-between border-b py-2">
                <span className="text-gray-500">Model</span>
                <span>#8786867</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-gray-500">Style</span>
                <span>Classic</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-gray-500">Certificate</span>
                <span>ISO-898921212</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-gray-500">Size</span>
                <span>34mm x 450mm</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <p className="font-medium mb-3">Customer Reviews</p>
            <p>⭐⭐⭐⭐☆ - Very good product</p>
            <p className="mt-2 text-gray-500">No more reviews yet...</p>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-2">
            <p>🚚 Worldwide shipping available</p>
            <p>⏱ Delivery: 5-10 business days</p>
            <p>💰 Shipping cost depends on location</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductTabs;