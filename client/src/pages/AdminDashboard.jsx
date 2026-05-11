// client/src/pages/AdminDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Package,
  Clock,
  EyeOff,
  Plus,
  ArrowRight,
  DollarSign,
  CheckCircle2,
  Store,
  Boxes,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-purple-50 text-purple-700 border-purple-200",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [ordersRes, productsRes] = await Promise.all([
          API.get("/orders", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
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

    if (accessToken) {
      fetchDashboardData();
    }
  }, [accessToken]);

  const dashboardStats = useMemo(() => {
    const totalOrders = orders.length;
    const totalProducts = products.length;

    const pendingOrders = orders.filter(
      (order) => order.status === "pending",
    ).length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered",
    ).length;

    const hiddenProducts = products.filter(
      (product) => product.isActive === false,
    ).length;

    const lowStockProducts = products.filter(
      (product) => Number(product.stock || 0) > 0 && Number(product.stock) <= 5,
    ).length;

    const totalRevenue = orders
      .filter((order) => order.status === "delivered")
      .reduce((sum, order) => sum + Number(order.total || 0), 0);

    return {
      totalOrders,
      totalProducts,
      pendingOrders,
      deliveredOrders,
      hiddenProducts,
      lowStockProducts,
      totalRevenue,
    };
  }, [orders, products]);

  const recentOrders = orders.slice(0, 5);
  const recentProducts = products.slice(0, 5);

  const formatCurrency = (amount) => {
    return `$${Number(amount || 0).toFixed(2)}`;
  };

  const getOrderId = (order) => {
    return order.orderNumber || `#${order._id?.slice(-6).toUpperCase()}`;
  };

  const getProductImage = (product) => {
    return (
      product.images?.[0] ||
      product.image ||
      "https://placehold.co/100x100/e5e7eb/64748b?text=No+Image"
    );
  };

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(dashboardStats.totalRevenue),
      icon: DollarSign,
      bg: "bg-blue-50",
      text: "text-blue-600",
      note: "Overall store sales",
    },
    {
      label: "Total Orders",
      value: dashboardStats.totalOrders,
      icon: ShoppingBag,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      note: "All customer orders",
    },
    {
      label: "Total Products",
      value: dashboardStats.totalProducts,
      icon: Package,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      note: "Active and hidden items",
    },
    {
      label: "Pending Orders",
      value: dashboardStats.pendingOrders,
      icon: Clock,
      bg: "bg-amber-50",
      text: "text-amber-600",
      note: "Need attention",
    },
  ];

  const quickActions = [
    {
      title: "Add new product",
      description: "Create a new product listing",
      icon: Plus,
      primary: true,
      onClick: () => navigate("/admin/products/create"),
    },
    {
      title: "Manage products",
      description: "Edit, hide, or update products",
      icon: Boxes,
      onClick: () => navigate("/admin/products"),
    },
    {
      title: "Manage orders",
      description: "Track and update order status",
      icon: ClipboardList,
      onClick: () => navigate("/admin/orders"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-50 blur-2xl" />
        <div className="absolute bottom-0 right-24 h-24 w-24 rounded-full bg-emerald-50 blur-2xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Store size={14} />
              Admin Overview
            </div>

            {/* <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-950">
              Store Overview
            </h1> */}

            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
              Monitor sales, orders, products, and key store activity from one clean place.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/products/create")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>

          <div className="h-80 animate-pulse rounded-2xl bg-gray-100" />
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.label}
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-gray-950">
                        {stat.value}
                      </h2>

                      <p className="mt-2 text-xs text-gray-400">{stat.note}</p>
                    </div>

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.text}`}
                    >
                      <Icon size={23} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mini Insights */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  <CheckCircle2 size={22} />
                </div>

                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    Delivered Orders
                  </p>
                  <h3 className="text-2xl font-bold text-emerald-950">
                    {dashboardStats.deliveredOrders}
                  </h3>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm">
                  <EyeOff size={22} />
                </div>

                <div>
                  <p className="text-sm font-medium text-red-700">
                    Hidden Products
                  </p>
                  <h3 className="text-2xl font-bold text-red-950">
                    {dashboardStats.hiddenProducts}
                  </h3>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                  <AlertTriangle size={22} />
                </div>

                <div>
                  <p className="text-sm font-medium text-amber-700">
                    Low Stock Products
                  </p>
                  <h3 className="text-2xl font-bold text-amber-950">
                    {dashboardStats.lowStockProducts}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
            {/* Recent Orders */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-950">
                    Recent Orders
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Latest customer purchases
                  </p>
                </div>

                <button
                  onClick={() => navigate("/admin/orders")}
                  className="inline-flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  View all <ArrowRight size={16} />
                </button>
              </div>

              {recentOrders.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                    📦
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-900">
                    No orders yet
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Orders will appear here once customers start purchasing.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="grid grid-cols-1 gap-4 px-5 py-4 transition hover:bg-gray-50 md:grid-cols-[1.1fr_1.4fr_0.8fr_0.8fr]"
                    >
                      <div>
                        <p className="font-semibold text-blue-600">
                          {getOrderId(order)}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {order._id?.slice(-10)}
                        </p>
                      </div>

                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                          {order.customer?.fullName?.charAt(0)?.toUpperCase() ||
                            "C"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-900">
                            {order.customer?.fullName || "Customer"}
                          </p>
                          <p className="truncate text-sm text-gray-500">
                            {order.customer?.email || "No email"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Total
                        </p>
                        <p className="mt-1 font-bold text-gray-950">
                          {formatCurrency(order.total)}
                        </p>
                      </div>

                      <div>
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                            statusStyles[order.status] ||
                            "border-gray-200 bg-gray-50 text-gray-600"
                          }`}
                        >
                          {order.status || "pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Quick Actions */}
            <aside className="space-y-5">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-gray-950">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-gray-500">Common admin tasks</p>

                <div className="mt-5 space-y-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.title}
                        onClick={action.onClick}
                        className={`group flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${
                          action.primary
                            ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                            : "border-gray-200 bg-white text-gray-700 hover:border-blue-100 hover:bg-blue-50"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                            action.primary
                              ? "bg-white/15 text-white"
                              : "bg-gray-100 text-gray-700 group-hover:bg-white group-hover:text-blue-700"
                          }`}
                        >
                          <Icon size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold">{action.title}</p>
                          <p
                            className={`mt-0.5 text-xs ${
                              action.primary ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {action.description}
                          </p>
                        </div>

                        <ArrowRight
                          size={17}
                          className={
                            action.primary ? "text-white" : "text-gray-400"
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent Products */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-950">
                      Recent Products
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Latest uploaded items
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/admin/products")}
                    className="text-sm font-semibold text-blue-600"
                  >
                    View
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {recentProducts.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No products uploaded yet.
                    </p>
                  )}

                  {recentProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3"
                    >
                      <img
                        src={getProductImage(product)}
                        alt={product.title}
                        className="h-12 w-12 rounded-xl bg-white object-contain"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/100x100/e5e7eb/64748b?text=No+Image";
                        }}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {product.title || "Product"}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {formatCurrency(product.price)} · Stock{" "}
                          {product.stock || 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
