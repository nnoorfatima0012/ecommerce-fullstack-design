//src/components/products/Breadcrumb.jsx
import { ChevronRight } from "lucide-react";

function Breadcrumb() {
  const items = ["Home", "Clothings", "Men’s wear", "Summer clothing"];

  return (
    <div className="flex items-center gap-2 text-[15px] text-gray-400 mb-5">
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-2">
          <span>{item}</span>
          {index !== items.length - 1 && <ChevronRight size={16} />}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;