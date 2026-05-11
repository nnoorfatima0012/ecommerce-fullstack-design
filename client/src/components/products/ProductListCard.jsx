// //client/src/components/products/ProductListCard.jsx
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ProductListCard({ product }) {
  const { toggleSavedForLater, isSavedForLater } = useCart();

  const image = product.images?.[0]?.url || product.images?.[0] || product.image;
  const id = product._id || product.id || product.productId;
  const saved = isSavedForLater(id);

  return (
    <div className="relative flex gap-3 rounded-2xl border border-gray-200 bg-white p-3 transition hover:border-blue-200 hover:shadow-md md:gap-5 md:p-4">
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={product.title}
          className="h-[92px] w-[92px] rounded-xl object-cover md:h-[180px] md:w-[180px]"
        />
      </Link>

      <div className="min-w-0 flex-1 md:pr-12">
        <h3 className="text-[16px] font-semibold text-gray-900 md:text-[18px]">
          <Link to={`/products/${id}`} className="hover:text-blue-600">
            {product.title}
          </Link>
        </h3>

        <div className="mt-1 flex items-center gap-2 md:mt-2">
          <span className="text-[18px] font-bold text-gray-900 md:text-[24px]">
            ${Number(product.price || 0).toFixed(2)}
          </span>

          {product.oldPrice && (
            <span className="hidden text-gray-400 line-through md:inline">
              ${Number(product.oldPrice).toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-2 text-[13px] md:mt-2 md:text-[15px]">
          <span className="text-orange-400">★★★★☆</span>
          <span className="text-orange-500">{product.rating || 0}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400">{product.sold || 0} orders</span>
        </div>

        <p className="mt-3 hidden max-w-[620px] text-[15px] leading-relaxed text-gray-600 line-clamp-2 md:block">
          {product.description || "No description available."}
        </p>

        <p className="mt-1 text-[14px] text-green-600 md:text-[15px]">
          {product.shipping?.freeShipping
            ? "Free Shipping"
            : "Shipping available"}
        </p>

        <Link
          to={`/products/${id}`}
          className="mt-2 hidden text-[15px] font-semibold text-blue-600 md:block"
        >
          View details
        </Link>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSavedForLater(product);
        }}
        className={`absolute right-4 top-4 hidden h-11 w-11 items-center justify-center rounded-2xl border transition md:flex ${
          saved
            ? "border-blue-100 bg-blue-50 text-blue-600"
            : "border-gray-200 bg-white text-blue-600 hover:border-blue-200 hover:bg-blue-50"
        }`}
        title={saved ? "Remove from saved" : "Save for later"}
      >
        <Heart size={22} className={saved ? "fill-blue-600" : ""} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSavedForLater(product);
        }}
        className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl border transition md:hidden ${
          saved
            ? "border-blue-100 bg-blue-50 text-blue-600"
            : "border-gray-200 bg-white text-blue-600"
        }`}
      >
        <Heart size={18} className={saved ? "fill-blue-600" : ""} />
      </button>
    </div>
  );
}

export default ProductListCard;