import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import API from "../api/api";
import OrderStatusTimeline from "../components/orders/OrderStatusTimeline";

function OrderSuccess() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedPhone = sessionStorage.getItem("lastOrderPhone");

    if (!savedPhone || !orderNumber) return;

    const fetchOrder = async () => {
      try {
        const res = await API.post("/orders/track", {
          orderNumber,
          phone: savedPhone,
        });

        setOrder(res.data.data);
      } catch (err) {
        console.log("Could not fetch order details");
      }
    };

    fetchOrder();
  }, [orderNumber]);

  return (
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />

      <main className="max-w-[760px] mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
            ✓
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Order placed successfully
          </h1>

          <p className="text-gray-500 mt-2">
            Thank you for your order. Please save your order ID for tracking.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-6">
            <p className="text-sm text-gray-500">Your Order ID</p>
            <p className="text-xl font-semibold text-blue-600 mt-1">
              {orderNumber}
            </p>
          </div>

          {order && (
            <div className="text-left mt-6 border-t pt-5 space-y-5">
              <OrderStatusTimeline status={order.status} />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="capitalize font-medium">{order.status}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Customer</span>
                  <span>{order.customer?.fullName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Total</span>
                  <span className="font-semibold">
                    ${Number(order.total).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Payment</span>
                  <span>{order.paymentMethod?.replaceAll("_", " ")}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => navigate(`/track-order?order=${orderNumber}`)}
              className="flex-1 bg-blue-600 text-white rounded-md py-3"
            >
              Track order
            </button>

            <button
              onClick={() => navigate("/products/list")}
              className="flex-1 border border-gray-200 rounded-md py-3 text-gray-700"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OrderSuccess;
