import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Package,
  Clock,
  EyeOff,
  Plus,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [ordersRes, productsRes] = await Promise.all([
          API.get("/orders"),
          API.get("/products?limit=100&includeInactive=true"),
        ]);

        setOrders(ordersRes.data.data || []);
        setProducts(productsRes.data.data || []);
      } catch (err) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const hiddenProducts = products.filter((product) => product.isActive === false).length;

  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      label: "Hidden Products",
      value: hiddenProducts,
      icon: EyeOff,
      bg: "bg-red-50",
      text: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Overview of store orders, products, and quick actions.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-200 rounded-md p-6 text-center text-gray-500">
          Loading dashboard...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="bg-white border border-gray-200 rounded-md p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <h2 className="text-3xl font-semibold text-gray-900 mt-1">
                        {stat.value}
                      </h2>
                    </div>

                    <div
                      className={`w-11 h-11 rounded-full ${stat.bg} ${stat.text} flex items-center justify-center`}
                    >
                      <Icon size={22} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
            <section className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Recent Orders</h2>

                <button
                  onClick={() => navigate("/admin/orders")}
                  className="text-blue-600 text-sm flex items-center gap-1"
                >
                  View all <ArrowRight size={16} />
                </button>
              </div>

              {recentOrders.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No orders yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left px-5 py-3">Order ID</th>
                        <th className="text-left px-5 py-3">Customer</th>
                        <th className="text-left px-5 py-3">Total</th>
                        <th className="text-left px-5 py-3">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order._id} className="border-b last:border-b-0">
                          <td className="px-5 py-3 text-blue-600 font-medium">
                            {order.orderNumber || `#${order._id.slice(-6)}`}
                          </td>

                          <td className="px-5 py-3">
                            <p className="font-medium text-gray-900">
                              {order.customer?.fullName}
                            </p>
                            <p className="text-gray-500">
                              {order.customer?.email}
                            </p>
                          </td>

                          <td className="px-5 py-3 font-medium">
                            ${Number(order.total).toFixed(2)}
                          </td>

                          <td className="px-5 py-3">
                            <span className="capitalize bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <aside className="bg-white border border-gray-200 rounded-md p-5 h-fit">
              <h2 className="font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/admin/products/create")}
                  className="w-full bg-blue-600 text-white rounded-md py-2.5 text-sm"
                >
                  Add new product
                </button>

                <button
                  onClick={() => navigate("/admin/products")}
                  className="w-full border border-gray-200 rounded-md py-2.5 text-sm text-gray-700"
                >
                  Manage products
                </button>

                <button
                  onClick={() => navigate("/admin/orders")}
                  className="w-full border border-gray-200 rounded-md py-2.5 text-sm text-gray-700"
                >
                  Manage orders
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full border border-gray-200 rounded-md py-2.5 text-sm text-gray-700"
                >
                  View store
                </button>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;