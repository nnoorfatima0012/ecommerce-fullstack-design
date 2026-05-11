import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import API from "../api/api";
import toast from "react-hot-toast";

const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusStyle = (status) => {
  const styles = {
    pending: "bg-yellow-50 text-yellow-700 ring-yellow-200",
    placed: "bg-blue-50 text-blue-700 ring-blue-200",
    confirmed: "bg-green-50 text-green-700 ring-green-200",
    processing: "bg-purple-50 text-purple-700 ring-purple-200",
    shipped: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    cancelled: "bg-red-50 text-red-700 ring-red-200",
  };

  return styles[status?.toLowerCase()] || "bg-gray-50 text-gray-700 ring-gray-200";
};

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

  const orderStats = useMemo(() => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );
    const activeOrders = orders.filter(
      (order) =>
        !["delivered", "cancelled"].includes(order.status?.toLowerCase())
    ).length;

    return {
      totalOrders,
      totalSpent,
      activeOrders,
    };
  }, [orders]);

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <Header />

      <main className="mx-auto max-w-[1180px] px-4 py-7">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Account Orders
            </p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              My Orders
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              View your order history, payment totals, and latest delivery
              status in one place.
            </p>
          </div>

          <button
            onClick={() => navigate("/track-order")}
            className="h-11 w-fit rounded-2xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Track an order
          </button>
        </div>

        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total orders</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {orderStats.totalOrders}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                🧾
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active orders</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {orderStats.activeOrders}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-xl">
                📦
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total spent</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {formatMoney(orderStats.totalSpent)}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-xl">
                💳
              </div>
            </div>
          </div>
        </section>

        {loading && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-gray-100 bg-gray-50 p-5"
                >
                  <div className="mb-4 h-5 w-44 rounded bg-gray-200" />
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <div className="h-4 rounded bg-gray-200" />
                    <div className="h-4 rounded bg-gray-200" />
                    <div className="h-4 rounded bg-gray-200" />
                    <div className="h-4 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
              🛍️
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Your orders will appear here after checkout. Start shopping and
              track everything from your account.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 h-11 rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Start shopping
            </button>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
            <div className="mb-5 flex flex-col justify-between gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Orders
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Tap any order to view full details and progress.
                </p>
              </div>

              <span className="w-fit rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                {orders.length} Orders
              </span>
            </div>

            <div className="space-y-4">
              {orders.map((order) => {
                const itemCount = order.items?.length || 0;
                const firstItem = order.items?.[0]?.title || "Order items";
                const extraItems = itemCount > 1 ? itemCount - 1 : 0;

                return (
                  <div
                    key={order._id}
                    className="group rounded-3xl border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => navigate(`/my-orders/${order._id}`)}
                            className="text-left text-lg font-bold text-blue-600 transition hover:text-blue-700"
                          >
                            {order.orderNumber}
                          </button>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                          <div className="rounded-2xl bg-white p-3 ring-1 ring-gray-200">
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                              Date
                            </p>
                            <p className="mt-1 font-semibold text-gray-900">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white p-3 ring-1 ring-gray-200">
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                              Items
                            </p>
                            <p className="mt-1 font-semibold text-gray-900">
                              {itemCount} {itemCount === 1 ? "item" : "items"}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white p-3 ring-1 ring-gray-200">
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                              Total
                            </p>
                            <p className="mt-1 font-semibold text-gray-900">
                              {formatMoney(order.total)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                          <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200">
                            {firstItem}
                          </span>

                          {extraItems > 0 && (
                            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200">
                              +{extraItems} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
                        <button
                          onClick={() => navigate(`/my-orders/${order._id}`)}
                          className="h-11 rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                        >
                          View details
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/track-order?order=${order.orderNumber}`)
                          }
                          className="h-11 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          Track order
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyOrders;