import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import API from "../api/api";
import toast from "react-hot-toast";
import OrderStatusTimeline from "../components/orders/OrderStatusTimeline";

function MyOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/orders/my-orders/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />

      <main className="max-w-[900px] mx-auto px-4 py-6">
        {loading && (
          <div className="bg-white border rounded-md p-6 text-center text-gray-500">
            Loading order...
          </div>
        )}

        {!loading && order && (
          <div className="bg-white border border-gray-200 rounded-md p-5">
            <div className="flex justify-between gap-4 border-b pb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <h1 className="text-xl font-semibold text-gray-900">
                  {order.orderNumber}
                </h1>
              </div>

              <span className="capitalize bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm h-fit">
                {order.status}
              </span>
            </div>
            <div className="mt-5">
              <OrderStatusTimeline status={order.status} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 text-sm">
              <div>
                <h2 className="font-semibold mb-2">Customer</h2>
                <p>{order.customer?.fullName}</p>
                <p className="text-gray-500">{order.customer?.phone}</p>
                <p className="text-gray-500">{order.customer?.email}</p>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Delivery address</h2>
                <p>{order.customer?.address}</p>
                <p className="text-gray-500">{order.customer?.city}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold mb-3">Items</h2>

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
      </main>

      <Footer />
    </div>
  );
}

export default MyOrderDetails;
