// // // //src/components/cart/CartSummary.jsx
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  Lock,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";

function CartSummary() {
  const { subtotal, cartItems } = useCart();
  const navigate = useNavigate();

  const safeSubtotal = Number(subtotal || 0);
  const discount = safeSubtotal > 100 ? 20 : 0;
  const tax = safeSubtotal * 0.05;
  const total = safeSubtotal - discount + tax;

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Tag size={20} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900">Have a coupon?</h3>
            <p className="text-xs text-gray-500">Apply your discount code.</p>
          </div>
        </div>

        <div className="flex h-12 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <input
            placeholder="Add coupon"
            className="min-w-0 flex-1 px-4 text-sm outline-none placeholder:text-gray-400"
          />

          <button
            type="button"
            className="border-l border-gray-200 px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
          <p className="mt-1 text-sm text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "product" : "products"}{" "}
            in your cart
          </p>
        </div>

        <div className="p-5">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-900">
                ${safeSubtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Discount</span>
              <span className="font-semibold text-red-500">
                - ${discount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span className="font-semibold text-green-600">
                + ${tax.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Delivery</span>
              <span className="font-semibold text-gray-900">Free</span>
            </div>
          </div>

          <div className="my-5 border-t border-gray-200" />

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>

          {safeSubtotal > 0 && safeSubtotal <= 100 && (
            <div className="mt-4 rounded-2xl bg-blue-50 p-3 text-xs leading-5 text-blue-700">
              Add ${(100 - safeSubtotal).toFixed(2)} more to unlock a $20
              discount.
            </div>
          )}

          {safeSubtotal > 100 && (
            <div className="mt-4 rounded-2xl bg-green-50 p-3 text-xs leading-5 text-green-700">
              Great! A $20 discount has been applied to your cart.
            </div>
          )}

          <button
            disabled={isCartEmpty}
            onClick={() => navigate("/checkout")}
            className="mt-5 hidden h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none lg:flex"
          >
            Checkout
            <ArrowRight size={18} />
          </button>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
            <CreditCard size={15} />
            <span>Visa</span>
            <span>PayPal</span>
            <span>Mastercard</span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <Lock size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Secure checkout
              </p>
              <p className="text-xs text-gray-500">Protected payment process</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Truck size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Fast delivery
              </p>
              <p className="text-xs text-gray-500">Reliable shipping support</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Buyer protection
              </p>
              <p className="text-xs text-gray-500">Safe and trusted orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 p-3 shadow-[0_-12px_40px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </p>
          </div>

          <button
            disabled={isCartEmpty}
            onClick={() => navigate("/checkout")}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 font-semibold text-white shadow-lg shadow-blue-600/20 transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
          >
            Checkout
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;