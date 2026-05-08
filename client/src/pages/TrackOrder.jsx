import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import API from "../api/api";
import OrderStatusTimeline from "../components/orders/OrderStatusTimeline";

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
        orderNumber: formData.orderNumber,
      };

      if (formData.phone) payload.phone = formData.phone;
      if (formData.email) payload.email = formData.email;

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
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />

      <main className="max-w-[900px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-5">
          Track your order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5">
          <form
            onSubmit={handleTrack}
            className="bg-white border border-gray-200 rounded-md p-5 h-fit"
          >
            <p className="text-gray-500 text-sm mb-4">
              Enter your order ID and phone or email used during checkout.
            </p>

            <input
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
              placeholder="Order ID e.g. ORD-260501-CSWXW5"
              className="w-full h-11 border border-gray-200 rounded-md px-3 mb-3 outline-none"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full h-11 border border-gray-200 rounded-md px-3 mb-3 outline-none"
            />

            <div className="text-center text-xs text-gray-400 mb-3">OR</div>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full h-11 border border-gray-200 rounded-md px-3 mb-4 outline-none"
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-md h-11 disabled:bg-gray-300"
            >
              {loading ? "Searching..." : "Track order"}
            </button>
          </form>

          <section className="bg-white border border-gray-200 rounded-md p-5">
            {!order ? (
              <div className="text-center py-10 text-gray-500">
                Order details will appear here.
              </div>
            ) : (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {order.orderNumber}
                    </h2>
                  </div>

                  <span className="capitalize bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm w-fit">
                    {order.status}
                  </span>
                </div>
                <div className="mt-5">
                  <OrderStatusTimeline status={order.status} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-sm">
                  <div>
                    <p className="text-gray-500">Customer</p>
                    <p className="font-medium">{order.customer?.fullName}</p>
                    <p className="text-gray-500">{order.customer?.phone}</p>
                    <p className="text-gray-500">{order.customer?.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Delivery address</p>
                    <p className="font-medium">{order.customer?.address}</p>
                    <p className="text-gray-500">{order.customer?.city}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Items</h3>

                  <div className="space-y-3">
                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b pb-2 text-sm"
                      >
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                        </div>

                        <p className="font-medium">
                          ${Number(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${Number(order.subtotal).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-red-500">
                      - ${Number(order.discount).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-green-600">
                      + ${Number(order.tax).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between font-semibold text-lg border-t pt-3">
                    <span>Total</span>
                    <span>${Number(order.total).toFixed(2)}</span>
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
