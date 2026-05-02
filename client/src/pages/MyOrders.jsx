import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import API from "../api/api";
import toast from "react-hot-toast";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const res = await API.get("/orders/my-orders");
        setOrders(res.data.data || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />

      <main className="max-w-[1180px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-5">
          My Orders
        </h1>

        {loading && (
          <div className="bg-white border rounded-md p-6 text-center text-gray-500">
            Loading orders...
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="bg-white border rounded-md p-6 text-center text-gray-500">
            You have no orders yet.
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3">Order ID</th>
                    <th className="text-left px-4 py-3">Date</th>
                    <th className="text-left px-4 py-3">Items</th>
                    <th className="text-left px-4 py-3">Total</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-right px-4 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b last:border-b-0">
                      <td className="px-4 py-3 font-medium text-blue-600">
                        {order.orderNumber}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {order.items?.length || 0}
                      </td>

                      <td className="px-4 py-3 font-medium">
                        ${Number(order.total).toFixed(2)}
                      </td>

                      <td className="px-4 py-3">
                        <span className="capitalize bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                          {order.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => navigate(`/my-orders/${order._id}`)}
                          className="text-blue-600"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyOrders;