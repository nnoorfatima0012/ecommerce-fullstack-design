//client/src/pages/Checkout.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import API from "../api/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const discount = subtotal > 100 ? 20 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal - discount + tax;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cash_on_delivery",
  });

  const [useSavedProfile, setUseSavedProfile] = useState(true);

  const fillFromProfile = () => {
    if (!user) return;

    setFormData((prev) => ({
      ...prev,
      fullName: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      postalCode: user.postalCode || "",
    }));
  };

  useEffect(() => {
  if (!isAuthenticated || !user || !useSavedProfile) return;

  setFormData((prev) => ({
    ...prev,
    fullName: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    postalCode: user.postalCode || "",
  }));
}, [
  isAuthenticated,
  useSavedProfile,
  user?.name,
  user?.email,
  user?.phone,
  user?.address,
  user?.city,
  user?.postalCode,
]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        items: cartItems.map((item) => ({
          productId: item.productId,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal,
        discount,
        tax,
        total,
        paymentMethod: formData.paymentMethod,
      };

      const res = await API.post("/orders", orderPayload);

      toast.success(res.data.message || "Order placed successfully");

      sessionStorage.setItem("lastOrderPhone", formData.phone);

      clearCart();
      navigate(`/order-success/${res.data.data.orderNumber}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />

      <main className="max-w-[1180px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-5">Checkout</h1>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5"
        >
          <section className="bg-white border border-gray-200 rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Customer details</h2>

              {isAuthenticated && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Logged in as {user?.name}
                </span>
              )}
            </div>
            {isAuthenticated && (
              <label className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 border border-blue-100 rounded-md p-3 mb-4">
                <input
                  type="checkbox"
                  checked={useSavedProfile}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setUseSavedProfile(checked);

                    if (checked) {
                      fillFromProfile();
                    }
                  }}
                />
                Use my saved profile information for this order
              </label>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Full name"
                className="border border-gray-200 rounded-md h-11 px-3 outline-none"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                placeholder="Email address"
                className="border border-gray-200 rounded-md h-11 px-3 outline-none"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Phone number"
                className="border border-gray-200 rounded-md h-11 px-3 outline-none"
              />

              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="border border-gray-200 rounded-md h-11 px-3 outline-none"
              />

              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Complete address"
                className="md:col-span-2 border border-gray-200 rounded-md h-11 px-3 outline-none"
              />

              <input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                className="border border-gray-200 rounded-md h-11 px-3 outline-none"
              />
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-3">Payment method</h2>

            <label className="flex items-center gap-3 border border-gray-200 rounded-md p-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={formData.paymentMethod === "cash_on_delivery"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
          </section>

          <aside className="bg-white border border-gray-200 rounded-md p-5 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="text-red-500">- ${discount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="text-green-600">+ ${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              disabled={loading || cartItems.length === 0}
              className="w-full bg-green-600 text-white rounded-md py-3 mt-5 font-medium disabled:bg-gray-300"
            >
              {loading ? "Placing order..." : "Place order"}
            </button>
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
