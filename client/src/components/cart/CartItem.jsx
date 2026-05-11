// client/src/components/cart/CartItem.jsx
import { Plus, Minus, Trash2, Heart, PackageCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart, saveForLater } = useCart();

  const productId = item.productId || item._id || item.id;
  const quantity = Number(item.quantity || 1);
  const price = Number(item.price || 0);
  const itemTotal = price * quantity;

  const increase = () => {
    updateQuantity(productId, quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    }
  };

  const handleSaveForLater = () => {
    saveForLater(item);
    toast.success("Moved to saved for later");
  };

  const handleRemove = () => {
    removeFromCart(productId);
    toast.success("Removed from cart");
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/300x300/e5e7eb/64748b?text=Product";
          }}
        />

        <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-blue-600 shadow-sm">
          x{quantity}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900">
              {item.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200">
                Brand: {item.brand || "N/A"}
              </span>

              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200">
                Supplier: {item.supplier || "N/A"}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <PackageCheck size={16} className="text-green-600" />
              <span>Ready for checkout</span>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Item total
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              ${itemTotal.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              ${price.toFixed(2)} each
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <button
              type="button"
              onClick={decrease}
              disabled={quantity <= 1}
              className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
            >
              <Minus size={16} />
            </button>

            <div className="flex h-11 w-12 items-center justify-center border-x border-gray-200 text-sm font-bold text-gray-900">
              {quantity}
            </div>

            <button
              type="button"
              onClick={increase}
              className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-50"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSaveForLater}
              className="inline-flex h-10 items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 active:scale-95"
            >
              <Heart size={16} />
              Save for later
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex h-10 items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-95"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;