//src/components/home/SuppliersSection.jsx
const regions = [
  ["🇦🇪", "Arabic Emirates", "shopname.ae"],
  ["🇦🇺", "Australia", "shopname.ae"],
  ["🇺🇸", "United States", "shopname.ae"],
  ["🇷🇺", "Russia", "shopname.ru"],
  ["🇮🇹", "Italy", "shopname.it"],
  ["🇩🇰", "Denmark", "denmark.com.dk"],
  ["🇫🇷", "France", "shopname.com.fr"],
  ["🇦🇪", "Arabic Emirates", "shopname.ae"],
  ["🇨🇳", "China", "shopname.ae"],
  ["🇬🇧", "Great Britain", "shopname.co.uk"],
];

function SuppliersSection() {
  return (
    <section className="max-w-[1180px] mx-auto px-4 pb-6 max-md:px-3">
      <h2 className="text-[24px] font-semibold mb-5 max-md:text-[20px] max-md:mb-4">
        Suppliers by region
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-4 max-md:gap-y-3">
        {regions.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-2xl">{item[0]}</span>

            <div>
              <p className="text-[15px] text-gray-900 leading-tight">
                {item[1]}
              </p>
              <p className="text-[13px] text-gray-400">
                {item[2]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SuppliersSection;