// ////src/components/home/Newsletter.jsx
// function Newsletter() {
//   return (
//     <section className="bg-[#eff2f4] py-8">
//       <div className="max-w-[1180px] mx-auto px-4 text-center">
//         <h2 className="text-[22px] font-semibold">
//           Subscribe on our newsletter
//         </h2>

//         <p className="text-gray-500 mt-1">
//           Get daily news on upcoming offers from many suppliers all over the world
//         </p>

//         <div className="mt-5 flex justify-center">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-[300px] h-[40px] border border-gray-300 rounded-l-md px-4 outline-none bg-white"
//           />

//           <button className="bg-blue-600 text-white px-6 rounded-r-md">
//             Subscribe
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Newsletter;

function Newsletter() {
  return (
    <section className="bg-[#eff2f4] py-8 max-md:py-6">
      <div className="max-w-[1180px] mx-auto px-4 text-center max-md:px-3">
        <h2 className="text-[22px] font-semibold max-md:text-[18px]">
          Subscribe on our newsletter
        </h2>

        <p className="text-gray-500 mt-1 max-md:text-sm max-md:max-w-[300px] max-md:mx-auto">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>

        <div className="mt-5 flex justify-center max-md:w-full">
          <input
            type="email"
            placeholder="Email"
            className="w-[300px] h-[40px] border border-gray-300 rounded-l-md px-4 outline-none bg-white max-md:flex-1 max-md:w-auto"
          />

          <button className="bg-blue-600 text-white px-6 rounded-r-md max-md:px-4">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;