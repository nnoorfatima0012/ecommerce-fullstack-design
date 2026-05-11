// //src/components/products/DiscountBanner.jsx
function DiscountBanner() {
  return (
    <section className="mt-5">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl sm:rounded-md px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-white">
          <h2 className="text-[18px] sm:text-[22px] font-semibold leading-snug">
            Super discount on more than 100 USD
          </h2>
          <p className="text-[14px] sm:text-[15px] text-white/90 mt-1">
            Have you ever finally just write dummy info
          </p>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-3 rounded-md text-[15px] font-medium w-full sm:w-auto">
          Shop now
        </button>
      </div>
    </section>
  );
}

export default DiscountBanner;