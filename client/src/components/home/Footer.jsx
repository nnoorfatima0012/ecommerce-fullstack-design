

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
      <div className="max-w-[1180px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-8 max-md:px-3 max-md:py-7">
        
        {/* LOGO */}
        <div className="md:col-span-2 flex flex-col max-md:items-center max-md:text-center">
          
          <div className="flex items-center gap-2 max-md:justify-center">
            <div className="bg-blue-500 text-white p-2 rounded-md">
              <Briefcase size={20} />
            </div>

            <span className="text-2xl font-semibold text-blue-400">
              Brand
            </span>
          </div>

          <p className="text-gray-500 mt-4 max-w-[260px] max-md:text-sm max-md:max-w-[280px]">
            Best information about the company goes here but now lorem ipsum is
          </p>

          <div className="flex gap-3 mt-4 text-gray-400 max-md:justify-center">
            <Circle size={18} />
            <Circle size={18} />
            <Circle size={18} />
            <Circle size={18} />
            <Circle size={18} />
          </div>
        </div>

        {/* LINKS (Accordion on mobile) */}
        {footerLinks.map((section, index) => (
          <div key={section.title} className="border-b md:border-0 pb-3 md:pb-0">
            
            {/* HEADER */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center md:block"
            >
              <h3 className="font-semibold text-gray-900 mb-2 md:mb-3">
                {section.title}
              </h3>

              {/* Arrow (mobile only) */}
              <ChevronDown
                size={18}
                className={`md:hidden transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* LIST */}
            <ul
              className={`
                space-y-2 text-gray-500 text-sm
                md:block
                ${openIndex === index ? "block mt-2" : "hidden"}
              `}
            >
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* APP */}
        <div className="flex flex-col max-md:items-center max-md:text-center">
          
          <h3 className="font-semibold text-gray-900 mb-3">
            Get app
          </h3>

          <div className="bg-black text-white px-4 py-2 rounded-md mb-2 text-sm max-md:w-[160px] text-center">
            App Store
          </div>

          <div className="bg-black text-white px-4 py-2 rounded-md text-sm max-md:w-[160px] text-center">
            Google Play
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bg-[#eff2f4] border-t py-5">
        <div className="max-w-[1180px] mx-auto px-4 flex justify-between text-gray-500 max-md:flex-col max-md:items-center max-md:gap-2 max-md:px-3 max-md:text-sm">
          
          <p>© 2023 Ecommerce.</p>
          <p>🇺🇸 English</p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;

// import { useState } from "react";
// import {
//   Briefcase,
//   Circle,
//   ChevronDown,
//   Facebook,
//   Twitter,
//   Instagram,
//   Youtube,
// } from "lucide-react";

// const footerLinks = [
//   {
//     title: "About",
//     items: ["About Us", "Find store", "Categories", "Blogs"],
//   },
//   {
//     title: "Partnership",
//     items: ["About Us", "Find store", "Categories", "Blogs"],
//   },
//   {
//     title: "Information",
//     items: ["Help Center", "Money Refund", "Shipping", "Contact us"],
//   },
//   {
//     title: "For users",
//     items: ["Login", "Register", "Settings", "My Orders"],
//   },
// ];

// const socialIcons = [Facebook, Twitter, Instagram, Youtube];

// function Footer() {
//   const [openIndex, setOpenIndex] = useState(null);

//   return (
//     <footer className="bg-white border-t border-gray-100">
//       <div className="max-w-[1180px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-8 max-md:px-4 max-md:py-8">
        
//         <div className="md:col-span-2 flex flex-col max-md:items-center max-md:text-center">
//           <div className="flex items-center gap-2">
//             <div className="bg-blue-500 text-white p-2 rounded-xl shadow-sm">
//               <Briefcase size={20} />
//             </div>

//             <span className="text-2xl font-semibold text-blue-500">
//               Brand
//             </span>
//           </div>

//           <p className="text-gray-500 mt-4 max-w-[260px] text-sm leading-relaxed">
//             Best information about the company goes here but now lorem ipsum is
//           </p>

//           <div className="flex gap-3 mt-5 text-gray-400">
//             {socialIcons.map((Icon, index) => (
//               <button
//                 key={index}
//                 className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-500 hover:text-white transition"
//               >
//                 <Icon size={16} />
//               </button>
//             ))}
//           </div>
//         </div>

//         {footerLinks.map((section, index) => (
//           <div
//             key={section.title}
//             className="max-md:border max-md:border-gray-200 max-md:rounded-xl max-md:px-4 max-md:py-3 max-md:bg-gray-50"
//           >
//             <button
//               onClick={() => setOpenIndex(openIndex === index ? null : index)}
//               className="w-full flex justify-between items-center md:block text-left max-md:text-center"
//             >
//               <h3 className="font-semibold text-gray-900 md:mb-3">
//                 {section.title}
//               </h3>

//               <ChevronDown
//                 size={18}
//                 className={`md:hidden text-gray-500 transition-transform duration-300 ${
//                   openIndex === index ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             <div
//               className={`overflow-hidden transition-all duration-300 md:max-h-none ${
//                 openIndex === index ? "max-h-40 mt-3" : "max-h-0 md:mt-0"
//               }`}
//             >
//               <ul className="space-y-2 text-gray-500 text-sm max-md:text-center">
//                 {section.items.map((item) => (
//                   <li
//                     key={item}
//                     className="hover:text-blue-600 cursor-pointer transition"
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}

//         <div className="flex flex-col max-md:items-center max-md:text-center">
//           <h3 className="font-semibold text-gray-900 mb-3">Get app</h3>

//           <button className="bg-black text-white px-4 py-2 rounded-lg mb-2 text-sm w-[140px] hover:bg-gray-800 transition">
//             App Store
//           </button>

//           <button className="bg-black text-white px-4 py-2 rounded-lg text-sm w-[140px] hover:bg-gray-800 transition">
//             Google Play
//           </button>
//         </div>
//       </div>

//       <div className="bg-[#eff2f4] border-t py-5">
//         <div className="max-w-[1180px] mx-auto px-4 flex justify-between text-gray-500 max-md:flex-col max-md:items-center max-md:gap-2 text-sm">
//           <p>© 2023 Ecommerce.</p>
//           <p>🇺🇸 English</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;