// // //src/components/cart/SavedForLater.jsx
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

function SavedForLater() {
  const { savedForLater, moveToCart, removeFromSaved } = useCart();

  if (!savedForLater || savedForLater.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex flex-col justify-between gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Heart size={21} className="fill-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Saved for later
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Products saved from your cart or product listing.
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
          {savedForLater.length} {savedForLater.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {savedForLater.map((item) => {
          const quantity = Number(item.quantity || 1);
          const price = Number(item.price || 0);

          return (
            <div
              key={item.productId}
              className="flex gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-3 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/300x300/e5e7eb/64748b?text=Product";
                  }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Qty: {quantity} • ${price.toFixed(2)} each
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  ${(price * quantity).toFixed(2)}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveToCart(item)}
                    className="inline-flex h-9 items-center gap-2 rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    <ShoppingCart size={15} />
                    Move to cart
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFromSaved(item.productId)}
                    className="inline-flex h-9 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SavedForLater;