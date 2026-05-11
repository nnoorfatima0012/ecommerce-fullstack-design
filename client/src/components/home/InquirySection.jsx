function InquirySection() {
  return (
    <section className="max-w-[1180px] mx-auto px-4 pb-5 max-md:px-0 max-md:pb-4">
      <div
        className="rounded-md overflow-hidden h-[300px] grid grid-cols-1 lg:grid-cols-[1fr_440px] px-8 py-6 gap-8 items-center max-md:h-auto max-md:min-h-[170px] max-md:rounded-none max-md:px-6 max-md:py-7 max-md:block"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(13,110,253,0.95), rgba(0,188,212,0.65)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white">
          <h2 className="text-[30px] font-semibold leading-tight max-w-[460px] max-md:text-[22px] max-md:max-w-[280px]">
            An easy way to send <br />
            requests to all suppliers
          </h2>

          <p className="mt-3 text-[15px] max-w-[430px] text-white/90 max-md:text-[12px] max-md:max-w-[260px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>

        <div className="bg-white rounded-md p-5 shadow-sm max-md:mt-5 max-md:p-0 max-md:bg-transparent max-md:shadow-none">
          <h3 className="text-[20px] font-semibold text-gray-900 mb-3 max-md:hidden">
            Send quote to suppliers
          </h3>

          <input className="w-full h-[36px] border border-gray-200 rounded-md px-3 outline-none text-sm mb-2 max-md:hidden" />
          <textarea className="w-full h-[55px] border border-gray-200 rounded-md px-3 py-2 outline-none text-sm mb-2 resize-none max-md:hidden" />

          <div className="flex gap-2">
            <input className="w-[150px] h-[34px] border border-gray-200 rounded-md px-3 outline-none text-sm max-md:hidden" />
            <select className="w-[90px] h-[34px] border border-gray-200 rounded-md px-2 outline-none text-sm bg-white max-md:hidden">
              <option>Pcs</option>
            </select>

            <button className="bg-blue-600 text-white px-4 h-[34px] rounded-md text-sm max-md:h-[38px] max-md:px-5">
              Send inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InquirySection;