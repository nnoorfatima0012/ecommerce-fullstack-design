// src/components/home/ServicesSection.jsx
import { Search, Archive, Send, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "Source from Industry Hubs",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=500&q=80",
    icon: Search,
  },
  {
    title: "Customize Your Products",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
    icon: Archive,
  },
  {
    title: "Fast, reliable shipping by ocean or air",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80",
    icon: Send,
  },
  {
    title: "Product monitoring and inspection",
    image:
      "https://images.unsplash.com/photo-1586528116493-9b845a14f8a1?auto=format&fit=crop&w=500&q=80",
    icon: ShieldCheck,
  },
];

function ServicesSection() {
  return (
    <section className="max-w-[1180px] mx-auto px-4 pb-6 max-md:px-3">
      <h2 className="text-[24px] font-semibold text-gray-900 mb-4 max-md:text-[20px]">
        Our extra services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-md:gap-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="bg-white border border-gray-200 rounded-md overflow-hidden relative"
            >
              <div className="h-[120px] relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/25"></div>

                <div className="absolute right-5 -bottom-6 w-12 h-12 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                  <Icon size={22} className="text-gray-800" />
                </div>
              </div>

              <div className="p-5 pt-6">
                <h3 className="text-[16px] font-medium text-gray-900 leading-snug max-w-[180px]">
                  {service.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ServicesSection;