//client/src/components/home/Footer.jsx
import { useState } from "react";
import { Briefcase, Circle, ChevronDown } from "lucide-react";

const footerLinks = [
  {
    title: "About",
    items: ["About Us", "Find store", "Categories", "Blogs"],
  },
  {
    title: "Partnership",
    items: ["About Us", "Find store", "Categories", "Blogs"],
  },
  {
    title: "Information",
    items: ["About Us", "Find store", "Categories", "Blogs"],
  },
  {
    title: "For users",
    items: ["About Us", "Find store", "Categories", "Blogs"],
  },
];

function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="bg-white">
      {/* TOP */}
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-4 py-10 md:grid-cols-[2.2fr_1fr_1fr_1fr_1fr_1.1fr] max-md:px-3 max-md:py-7">
        {/* LOGO */}
        <div className="flex flex-col max-md:items-center max-md:text-center">
          <div className="flex items-center gap-2 max-md:justify-center">
            <div className="rounded-md bg-blue-500 p-2 text-white">
              <Briefcase size={20} />
            </div>

            <span className="text-2xl font-semibold text-blue-400">
              Brand
            </span>
          </div>

          <p className="mt-4 max-w-[260px] text-gray-500 max-md:max-w-[280px] max-md:text-sm">
            Best information about the company goes here but now lorem ipsum is
          </p>

          <div className="mt-4 flex gap-3 text-gray-400 max-md:justify-center">
            <Circle size={18} />
            <Circle size={18} />
            <Circle size={18} />
            <Circle size={18} />
            <Circle size={18} />
          </div>
        </div>

        {/* LINKS */}
        {footerLinks.map((section, index) => (
          <div
            key={section.title}
            className="border-b pb-3 md:border-0 md:pb-0"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between text-left md:block"
            >
              <h3 className="mb-2 font-semibold text-gray-900 md:mb-3">
                {section.title}
              </h3>

              <ChevronDown
                size={18}
                className={`md:hidden transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <ul
              className={`space-y-2 text-sm text-gray-500 md:block ${
                openIndex === index ? "mt-2 block" : "hidden"
              }`}
            >
              {section.items.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition hover:text-blue-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* APP */}
        <div className="flex flex-col max-md:items-center max-md:text-center">
          <h3 className="mb-3 font-semibold text-gray-900">Get app</h3>

          <button className="mb-2 w-[140px] rounded-md bg-black px-4 py-2 text-center text-sm text-white transition hover:bg-gray-800">
            App Store
          </button>

          <button className="w-[140px] rounded-md bg-black px-4 py-2 text-center text-sm text-white transition hover:bg-gray-800">
            Google Play
          </button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t bg-[#eff2f4] py-5">
        <div className="mx-auto flex max-w-[1180px] justify-between px-4 text-gray-500 max-md:flex-col max-md:items-center max-md:gap-2 max-md:px-3 max-md:text-sm">
          <p>© 2023 Ecommerce.</p>
          <p>🇺🇸 English</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;