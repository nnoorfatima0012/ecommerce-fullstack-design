// //src/components/home/HeroSection.jsx
// const categories = [
//   "Automobiles",
//   "Clothes and wear",
//   "Home interiors",
//   "Computer and tech",
//   "Tools, equipments",
//   "Sports and outdoor",
//   "Animal and pets",
//   "Machinery tools",
//   "More category",
// ];

// function HeroSection() {
//   return (
//     <section className="max-w-[1180px] mx-auto px-4 py-5">
//       <div className="bg-white border border-gray-200 rounded-md p-4 grid grid-cols-1 lg:grid-cols-[250px_1fr_200px] gap-4">
        
//         {/* Left Category Menu */}
//         <div className="hidden lg:block">
//           {categories.map((item, index) => (
//             <div
//               key={item}
//               className={`px-3 py-2 rounded-md text-[15px] ${
//                 index === 0
//                   ? "bg-blue-100 text-gray-900 font-medium"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               {item}
//             </div>
//           ))}
//         </div>

//         {/* Center Banner */}
//         <div className="relative min-h-[250px] rounded-sm overflow-hidden bg-[#9be3cf]">
//           <img
//             src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
//             alt="Electronic items"
//             className="absolute inset-0 w-full h-full object-cover opacity-80"
//           />

//           <div className="absolute inset-0 bg-gradient-to-r from-[#9be3cf] via-[#9be3cf]/80 to-transparent"></div>

//           <div className="relative z-10 p-10">
//             <p className="text-3xl text-gray-900">Latest trending</p>
//             <h2 className="text-4xl font-bold text-gray-900 leading-tight">
//               Electronic items
//             </h2>

//             <button className="mt-6 bg-white text-gray-800 px-6 py-3 rounded-md shadow-sm font-medium">
//               Learn more
//             </button>
//           </div>
//         </div>

//         {/* Right Cards */}
//         <div className="hidden lg:flex flex-col gap-3">
//           <div className="bg-blue-50 rounded-md p-3">
//             <div className="flex items-center gap-3">
//               <div className="w-11 h-11 rounded-full bg-blue-200 flex items-center justify-center text-white font-bold">
//                 U
//               </div>

//               <p className="text-[15px] leading-tight text-gray-800">
//                 Hi, user <br />
//                 let's get stated
//               </p>
//             </div>

//             <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md text-sm">
//               Join now
//             </button>

//             <button className="w-full mt-2 bg-white border border-gray-200 text-blue-600 py-2 rounded-md text-sm">
//               Log in
//             </button>
//           </div>

//           <div className="bg-orange-500 text-white rounded-md p-4 min-h-[90px] flex items-center">
//             <p className="text-lg leading-tight">
//               Get US $10 off <br />
//               with a new <br />
//               supplier
//             </p>
//           </div>

//           <div className="bg-teal-500 text-white rounded-md p-4 min-h-[90px] flex items-center">
//             <p className="text-lg leading-tight">
//               Send quotes with <br />
//               supplier <br />
//               preferences
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HeroSection;

const categories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
  "More category",
];

function HeroSection() {
  return (
    <section className="max-w-[1180px] mx-auto px-4 py-5 max-md:px-3 max-md:py-3">
      <div className="bg-white border border-gray-200 rounded-md p-4 grid grid-cols-1 lg:grid-cols-[250px_1fr_200px] gap-4 max-md:bg-transparent max-md:border-0 max-md:p-0">
        
        {/* Left Category Menu - desktop only */}
        <div className="hidden lg:block">
          {categories.map((item, index) => (
            <div
              key={item}
              className={`px-3 py-2 rounded-md text-[15px] ${
                index === 0
                  ? "bg-blue-100 text-gray-900 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Center Banner */}
        <div className="relative min-h-[250px] max-md:min-h-[205px] rounded-sm max-md:rounded-md overflow-hidden bg-[#9be3cf]">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
            alt="Electronic items"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#9be3cf] via-[#9be3cf]/80 to-transparent"></div>

          <div className="relative z-10 p-10 max-md:p-6">
            <p className="text-3xl max-md:text-[22px] text-gray-900 leading-tight">
              Latest trending
            </p>

            <h2 className="text-4xl max-md:text-[26px] font-bold text-gray-900 leading-tight">
              Electronic items
            </h2>

            <button className="mt-6 max-md:mt-5 bg-white text-gray-800 px-6 max-md:px-5 py-3 max-md:py-2 rounded-md shadow-sm font-medium text-base max-md:text-sm">
              Learn more
            </button>
          </div>
        </div>

        {/* Right Cards - desktop only */}
        <div className="hidden lg:flex flex-col gap-3">
          <div className="bg-blue-50 rounded-md p-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-200 flex items-center justify-center text-white font-bold">
                U
              </div>

              <p className="text-[15px] leading-tight text-gray-800">
                Hi, user <br />
                let's get stated
              </p>
            </div>

            <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md text-sm">
              Join now
            </button>

            <button className="w-full mt-2 bg-white border border-gray-200 text-blue-600 py-2 rounded-md text-sm">
              Log in
            </button>
          </div>

          <div className="bg-orange-500 text-white rounded-md p-4 min-h-[90px] flex items-center">
            <p className="text-lg leading-tight">
              Get US $10 off <br />
              with a new <br />
              supplier
            </p>
          </div>

          <div className="bg-teal-500 text-white rounded-md p-4 min-h-[90px] flex items-center">
            <p className="text-lg leading-tight">
              Send quotes with <br />
              supplier <br />
              preferences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;