// // //client/src/components/home/ProductBlock.jsx
import { Link } from "react-router-dom";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/160x160/e5e7eb/64748b?text=No+Image";

function ProductBlock({ title, items = [], image, bgColor = "#f4efe6" }) {
  return (
    <section className="max-w-[1180px] mx-auto px-4 pb-4">
      <div className="grid h-auto overflow-hidden rounded-md border border-gray-200 bg-white lg:h-[257px] lg:grid-cols-[280px_1fr]">
        {/* Static section banner */}
        <div
          className="relative h-[257px] overflow-hidden bg-cover bg-center p-6"
          style={{
            backgroundColor: bgColor,
            backgroundImage: `linear-gradient(to right, ${bgColor} 0%, ${bgColor}e6 38%, ${bgColor}66 70%, transparent 100%), url(${image})`,
          }}
        >
          <div className="relative z-10">
            <h2 className="max-w-[160px] text-[20px] font-semibold leading-tight text-gray-900">
              {title}
            </h2>

            <Link
              to="/products/list"
              className="mt-6 inline-block rounded-md bg-white px-5 py-2 text-[15px] text-gray-900 shadow-sm transition hover:bg-blue-600 hover:text-white"
            >
              Source now
            </Link>
          </div>
        </div>

        {/* Dynamic product cards */}
        <div className="grid h-auto grid-cols-2 md:grid-cols-4 lg:h-[257px]">
          {items.slice(0, 8).map((item) => {
            const id = item._id || item.id;
            const productTitle = item.title || item.name || "Product";

            const productImage =
              Array.isArray(item.images) &&
              item.images.length > 0 &&
              item.images[0]
                ? item.images[0]
                : item.image || PLACEHOLDER_IMAGE;

            return (
              <Link
                to={`/products/${id}`}
                key={id}
                className="relative min-h-[128.5px] overflow-hidden border-l border-b border-gray-200 bg-white px-4 py-4 transition hover:bg-gray-50"
              >
                <div className="relative z-10 max-w-[130px]">
                  <h3 className="line-clamp-2 text-[16px] font-medium leading-tight text-gray-900">
                    {productTitle}
                  </h3>

                  <p className="mt-2 text-[13px] leading-tight text-gray-400">
                    From <br />
                    USD {Number(item.price || 0).toFixed(2)}
                  </p>
                </div>

                <img
                  src={productImage}
                  alt={productTitle}
                  // className="absolute bottom-3 right-3 h-[76px] w-[86px] object-contain"
                  className="absolute bottom-3 right-4 h-[68px] w-[78px] object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductBlock;