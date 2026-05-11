// // src/components/home/SuppliersSection.jsx

const regions = [
  {
    code: "ae",
    name: "United Arab Emirates",
    domain: "shopname.ae",
  },
  {
    code: "au",
    name: "Australia",
    domain: "shopname.com.au",
  },
  {
    code: "us",
    name: "United States",
    domain: "shopname.com",
  },
  {
    code: "ru",
    name: "Russia",
    domain: "shopname.ru",
  },
  {
    code: "it",
    name: "Italy",
    domain: "shopname.it",
  },
  {
    code: "dk",
    name: "Denmark",
    domain: "denmark.com.dk",
  },
  {
    code: "fr",
    name: "France",
    domain: "shopname.com.fr",
  },
  {
    code: "ae",
    name: "United Arab Emirates",
    domain: "shopname.ae",
  },
  {
    code: "cn",
    name: "China",
    domain: "shopname.cn",
  },
  {
    code: "gb",
    name: "Great Britain",
    domain: "shopname.co.uk",
  },
];

function SuppliersSection() {
  return (
    <section className="max-w-[1180px] mx-auto px-4 pb-6 max-md:px-3">
      <h2 className="text-[24px] font-semibold mb-5 max-md:text-[20px] max-md:mb-4">
        Suppliers by region
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-4 max-md:gap-y-3">
        {regions.map((region, index) => (
          <div key={index} className="flex items-start gap-3">
            <img
              src={`https://flagcdn.com/w40/${region.code}.png`}
              srcSet={`https://flagcdn.com/w80/${region.code}.png 2x`}
              alt={`${region.name} flag`}
              className="w-[28px] h-[20px] object-cover rounded-sm shadow-sm mt-[2px]"
              loading="lazy"
            />

            <div>
              <p className="text-[15px] text-gray-900 leading-tight">
                {region.name}
              </p>
              <p className="text-[13px] text-gray-400">
                {region.domain}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SuppliersSection;