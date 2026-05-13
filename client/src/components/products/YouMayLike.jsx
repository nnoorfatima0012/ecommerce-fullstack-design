//client/src/components/products/YouMayLike.jsx
import { Link } from "react-router-dom";

const getImageSrc = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (image.url) return image.url;
  return "";
};

function YouMayLike({ products = [] }) {
  if (!products.length) return null;

  return (
    <aside className="h-fit rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-[16px] font-semibold text-gray-900">
        You may like
      </h3>

      <div className="space-y-4">
        {products.slice(0, 5).map((product) => {
          const image =
            getImageSrc(product.images?.[0]) ||
            getImageSrc(product.image) ||
            "https://placehold.co/120x120/e5e7eb/64748b?text=Product";

          return (
            <Link
              key={product._id || product.id}
              to={`/products/${product._id || product.id}`}
              className="flex gap-3 rounded-lg p-2 transition hover:bg-gray-50"
            >
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                <img
                  src={image}
                  alt={product.title}
                  className="max-h-[62px] max-w-[62px] object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[14px] font-medium leading-snug text-gray-800">
                  {product.title}
                </p>

                <p className="mt-1 text-[13px] text-gray-500">
                  ${Number(product.price || 0).toFixed(2)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default YouMayLike;