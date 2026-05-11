import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import API from "../api/api";
import OrderStatusTimeline from "../components/orders/OrderStatusTimeline";

const placeholderImage =
  "https://placehold.co/300x300/e5e7eb/64748b?text=Product";

const formatMoney = (value) => {
  return `$${Number(value || 0).toFixed(2)}`;
};

const getStatusStyle = (status) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    placed: "bg-blue-100 text-blue-700",
    confirmed: "bg-green-100 text-green-700",
    processing: "bg-purple-100 text-purple-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
};

const getProductImage = (item) => {
  const product = item.product || item.productId || {};

  const image =
    item.image ||
    item.imageUrl ||
    item.thumbnail ||
    product.image ||
    product.imageUrl ||
    product.thumbnail ||
    product.images?.[0]?.url ||
    product.images?.[0];

  if (typeof image === "string") return image;
  if (image?.url) return image.url;

  return placeholderImage;
};

function TrackOrder() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    orderNumber: searchParams.get("order") || "",
    phone: "",
    email: "",
  });

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!formData.orderNumber || (!formData.phone && !formData.email)) {
      toast.error("Please enter order ID and phone or email");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        orderNumber: formData.orderNumber.trim(),
      };

      if (formData.phone.trim()) payload.phone = formData.phone.trim();
      if (formData.email.trim()) payload.email = formData.email.trim();

      const res = await API.post("/orders/track", payload);

      setOrder(res.data.data);
      toast.success("Order found");
    } catch (err) {
      setOrder(null);
      toast.error(err.response?.data?.message || "Order not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <Header />

      <main className="mx-auto max-w-[1280px] px-4 py-4">
        <div className="mb-4">
          <p className="text-sm font-medium text-blue-600">Order Tracking</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Track your order
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Enter your order ID with phone number or email to view order status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_1fr]">
          <form
            onSubmit={handleTrack}
            className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-4"
          >
            <div className="mb-4 rounded-2xl bg-blue-50 p-3">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                #
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                Find your order
              </h2>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                Use the same phone or email used during checkout.
              </p>
            </div>

            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Order ID
            </label>
            <input
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
              placeholder="ORD-260501-CSWXW5"
              className="mb-3 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Phone number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mb-3 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <div className="mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Email address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="mb-4 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <button
              disabled={loading}
              className="h-11 w-full rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {loading ? "Searching..." : "Track order"}
            </button>
          </form>

          <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            {!order ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
                  📦
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  Order details will appear here
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Search your order to view timeline, products, and payment
                  details.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col justify-between gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Order ID
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                      {order.orderNumber}
                    </h2>
                  </div>

                  <span
                    className={`h-fit w-fit rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="rounded-2xl border border-gray-200 p-4">
                  <OrderStatusTimeline status={order.status} />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                        C
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900">
                          Customer Details
                        </h3>
                        <p className="text-xs text-gray-500">
                          Buyer information
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-gray-900">
                        {order.customer?.fullName || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        {order.customer?.phone || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        {order.customer?.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                        A
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900">
                          Delivery Address
                        </h3>
                        <p className="text-xs text-gray-500">
                          Shipping location
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-gray-900">
                        {order.customer?.address || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        {order.customer?.city || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
                  <div className="rounded-2xl border border-gray-200 bg-white">
                    <div className="flex flex-col justify-between gap-2 border-b border-gray-200 p-4 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Ordered Products
                        </h3>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Products included in this order
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600">
                        {order.items?.length || 0} Items
                      </span>
                    </div>

                    <div className="space-y-3 p-4">
                      {order.items?.map((item, index) => {
                        const product = item.product || item.productId || {};

                        const title =
                          item.title ||
                          item.name ||
                          product.title ||
                          product.name ||
                          "Product";

                        const quantity = Number(item.quantity || item.qty || 1);
                        const price = Number(item.price || product.price || 0);
                        const subtotal = price * quantity;
                        const image = getProductImage(item);

                        return (
                          <div
                            key={item._id || product._id || index}
                            className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 transition hover:border-blue-200 hover:bg-white hover:shadow-sm sm:flex-row sm:items-center"
                          >
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
                              <img
                                src={image}
                                alt={title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = placeholderImage;
                                }}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4 className="text-base font-bold text-gray-900">
                                {title}
                              </h4>

                              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                                <span className="rounded-full bg-white px-3 py-1 font-medium text-gray-700 ring-1 ring-gray-200">
                                  Qty: {quantity}
                                </span>

                                <span className="rounded-full bg-white px-3 py-1 font-medium text-gray-700 ring-1 ring-gray-200">
                                  Unit Price: {formatMoney(price)}
                                </span>
                              </div>
                            </div>

                            <div className="rounded-xl bg-white px-4 py-2 text-left ring-1 ring-gray-200 sm:min-w-[120px] sm:text-right">
                              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Subtotal
                              </p>
                              <p className="mt-0.5 text-lg font-bold text-gray-900">
                                {formatMoney(subtotal)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                      Payment Summary
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium text-gray-900">
                          {formatMoney(order.subtotal)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">Discount</span>
                        <span className="font-medium text-red-500">
                          - {formatMoney(order.discount)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">Tax</span>
                        <span className="font-medium text-green-600">
                          + {formatMoney(order.tax)}
                        </span>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-gray-900">Total</span>
                          <span className="text-blue-600">
                            {formatMoney(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 rounded-xl bg-white p-3 text-xs leading-5 text-gray-500 ring-1 ring-gray-200">
                      Current status:{" "}
                      <span className="font-semibold capitalize text-gray-900">
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TrackOrder;