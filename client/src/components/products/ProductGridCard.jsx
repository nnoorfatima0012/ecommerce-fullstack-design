// // //src/components/ProductGridCard.jsx
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ProductGridCard({ product }) {
  const { toggleSavedForLater, isSavedForLater } = useCart();

  const productImage =
    product.images?.[0]?.url || product.images?.[0] || product.image;
  const productId = product._id || product.id || product.productId;
  const saved = isSavedForLater(productId);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-blue-200 hover:shadow-md">
      <Link to={`/products/${productId}`}>
        <div className="flex h-[150px] items-center justify-center bg-gray-50 p-3 md:h-[230px] md:p-5">
          <img
            src={productImage}
            alt={product.title}
            className="max-h-[125px] object-contain md:max-h-[200px]"
          />
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSavedForLater(product);
        }}
        className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
          saved
            ? "border-blue-100 bg-blue-50 text-blue-600"
            : "border-gray-200 bg-white text-blue-600 hover:border-blue-200 hover:bg-blue-50"
        }`}
        title={saved ? "Remove from saved" : "Save for later"}
      >
        <Heart size={20} className={saved ? "fill-blue-600" : ""} />
      </button>

      <div className="border-t border-gray-200 p-3 md:p-4">
        <div className="flex items-start justify-between gap-2 md:gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[16px] font-bold text-gray-900 md:text-[18px]">
                ${Number(product.price || 0).toFixed(2)}
              </p>

              {product.oldPrice && (
                <p className="text-[12px] text-gray-400 line-through md:text-[14px]">
                  ${Number(product.oldPrice).toFixed(2)}
                </p>
              )}
            </div>

            <div className="mt-1 flex items-center gap-1 text-[12px] md:text-sm">
              <span className="text-orange-400">★★★★☆</span>
              <span className="text-orange-500">{product.rating || 0}</span>
            </div>
          </div>
        </div>

        <Link to={`/products/${productId}`}>
          <p className="mt-2 text-[13px] leading-snug text-gray-500 line-clamp-2 hover:text-blue-600 md:text-[15px]">
            {product.title}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ProductGridCard;