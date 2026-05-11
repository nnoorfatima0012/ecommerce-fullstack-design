import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function Breadcrumb({ categoryId, categoryName, productTitle, search }) {
  const items = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products/list" },
  ];

  if (categoryName) {
    items.push({
      label: categoryName,
      path: categoryId ? `/products/list?category=${categoryId}` : "/products/list",
    });
  }

  if (search) {
    items.push({
      label: `Search: ${search}`,
      path: null,
    });
  }

  if (productTitle) {
    items.push({
      label: productTitle,
      path: null,
    });
  }

  return (
    <div className="flex items-center gap-2 text-[15px] text-gray-400 mb-5 flex-wrap">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.path && index !== items.length - 1 ? (
            <Link to={item.path} className="hover:text-blue-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}

          {index !== items.length - 1 && <ChevronRight size={16} />}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;