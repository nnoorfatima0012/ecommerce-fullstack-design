import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";

import Header from "../components/layout/Header";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import SavedForLater from "../components/cart/SavedForLater";
import DiscountBanner from "../components/products/DiscountBanner";
import Footer from "../components/home/Footer";
import Newsletter from "../components/home/Newsletter";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, cartCount, clearCart } = useCart();

  const hasItems = cartItems.length > 0;

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <Header />

      <main className="mx-auto max-w-[1180px] px-3 py-6 sm:px-4 lg:py-7">
        <section className="mb-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />

          <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ShoppingBag size={28} />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Shopping Cart
                </p>

                <h1 className="mt-1 text-3xl font-bold text-gray-900">
                  My cart{" "}
                  <span className="font-medium text-gray-400">
                    ({cartCount})
                  </span>
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Review your selected products before checkout.
                </p>
              </div>
            </div>

            {hasItems && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/products/list")}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <ArrowLeft size={17} />
                  Continue shopping
                </button>

                <button
                  onClick={clearCart}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={17} />
                  Remove all
                </button>
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_310px]">
          <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            {!hasItems ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <ShoppingBag size={32} />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Your cart is empty
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Looks like you have not added anything yet. Browse products
                  and add your favorite items to cart.
                </p>

                <button
                  onClick={() => navigate("/products/list")}
                  className="mt-6 h-11 rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Go to shop
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Cart items
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {cartCount} {cartCount === 1 ? "item" : "items"} added to
                      your cart
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                    Ready to checkout
                  </span>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-3 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
                    >
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={() => navigate("/products/list")}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    <ArrowLeft size={17} />
                    Back to shop
                  </button>

                  <button
                    onClick={clearCart}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                    Remove all items
                  </button>
                </div>
              </>
            )}
          </section>

          <aside className="h-fit space-y-5 lg:sticky lg:top-5">
            <CartSummary />

            {hasItems && (
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                    <Sparkles size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Almost there
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Confirm your order details and continue to checkout
                      securely.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>

        <section className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ShieldCheck size={22} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Secure payment</p>
                <p className="mt-1 text-xs text-gray-500">
                  Your payment details are protected.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <MessageCircle size={22} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Customer support</p>
                <p className="mt-1 text-xs text-gray-500">
                  Get help whenever you need it.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                <Truck size={22} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">Fast delivery</p>
                <p className="mt-1 text-xs text-gray-500">
                  Available on selected products.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-5">
          <SavedForLater />
          <DiscountBanner />
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;