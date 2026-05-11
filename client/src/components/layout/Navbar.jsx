import { Menu, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const goToProducts = (query = "") => {
    navigate(query ? `/products/list?${query}` : "/products/list");
  };

  const mobileCategories = [
    { label: "All category", query: "" },
    { label: "Hot offers", query: "hotOffer=true" },
    { label: "Gift boxes", query: "giftBox=true" },
    { label: "Deals", query: "deal=true" },
    { label: "Recommended", query: "recommended=true" },
  ];

  return (
    <div className="bg-white border-b">
      {/* Mobile category chips */}
      <div className="md:hidden px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {mobileCategories.map((item) => (
            <button
              key={item.label}
              onClick={() => goToProducts(item.query)}
              className="bg-gray-100 text-blue-600 px-4 py-2 rounded-md whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop navbar */}
      <div className="hidden md:flex max-w-[1180px] mx-auto px-4 h-[56px] items-center justify-between">
        <div className="flex items-center gap-7 text-[15px] text-gray-800">
          <button
            type="button"
            onClick={() => goToProducts()}
            className="flex items-center gap-2 font-medium"
          >
            <Menu size={22} />
            <span>All category</span>
          </button>

          <button type="button" onClick={() => goToProducts("hotOffer=true")}>
            Hot offers
          </button>

          <button type="button" onClick={() => goToProducts("giftBox=true")}>
            Gift boxes
          </button>

          <button type="button" onClick={() => goToProducts("featured=true")}>
            Featured
          </button>

          <button type="button" onClick={() => goToProducts("recommended=true")}>
            Recommended
          </button>

          <div className="flex items-center gap-1">
            <span>Help</span>
            <ChevronDown size={16} />
          </div>
        </div>

        <div className="flex items-center gap-8 text-[15px] text-gray-800">
          <div className="flex items-center gap-1">
            <span>English, USD</span>
            <ChevronDown size={16} />
          </div>

          <div className="flex items-center gap-1">
            <span>Ship to</span>
            <span>🇩🇪</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;