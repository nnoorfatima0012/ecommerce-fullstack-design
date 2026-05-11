// client/src/pages/admin/AdminOrders.jsx
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const statusOptions = [
  "all",
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const orderStatusOptions = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-purple-50 text-purple-700 border-purple-200",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const PLACEHOLDER_IMAGE =
  "https://placehold.co/120x120/e5e7eb/64748b?text=No+Image";

function OrderDetailsDrawer({
  order,
  onClose,
  onStatusChange,
  updatingId,
  formatCurrency,
  formatDate,
}) {
  if (!order) return null;

  const customer = order.customer || {};
  const items = order.items || [];

  const getOrderId = () => {
    return order.orderNumber || `#${order._id?.slice(-6).toUpperCase()}`;
  };

  const getProductImage = (item) => {
    return (
      item.product?.images?.[0] ||
      item.product?.image ||
      item.images?.[0] ||
      item.image ||
      PLACEHOLDER_IMAGE
    );
  };

  const getProductTitle = (item) => {
    return item.product?.title || item.title || item.name || "Product";
  };

  const getItemPrice = (item) => {
    return Number(item.price || item.product?.price || 0);
  };

  const getItemQuantity = (item) => {
    return Number(item.quantity || item.qty || 1);
  };

  const shippingAddress =
    order.shippingAddress || order.address || customer.address || null;

  const renderAddress = () => {
    if (!shippingAddress) return "No shipping address provided";

    if (typeof shippingAddress === "string") return shippingAddress;

    return [
      shippingAddress.address,
      shippingAddress.street,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.country,
      shippingAddress.zipCode,
      shippingAddress.postalCode,
    ]
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Order Details
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {getOrderId()}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-lg font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              ×
            </button>
          </div>
        </div>

        <div className="space-y-5 p-6">
          {/* Status and Total */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Current Status
              </p>

              <select
                value={order.status || "pending"}
                disabled={updatingId === order._id}
                onChange={(e) => onStatusChange(order._id, e.target.value)}
                className={`mt-3 w-full rounded-xl border px-3 py-2 text-sm font-semibold capitalize outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
                  statusStyles[order.status] ||
                  "border-gray-200 bg-white text-gray-600"
                }`}
              >
                {orderStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Order Total
              </p>

              <h3 className="mt-2 text-3xl font-bold text-blue-950">
                {formatCurrency(order.total)}
              </h3>
            </div>
          </div>

          {/* Customer Info */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Customer Information
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-gray-500">Name</p>
                <p className="mt-1 font-medium text-gray-900">
                  {customer.fullName || "Customer"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">Phone</p>
                <p className="mt-1 font-medium text-gray-900">
                  {customer.phone || "-"}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-medium text-gray-500">Email</p>
                <p className="mt-1 font-medium text-gray-900">
                  {customer.email || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Shipping Address
            </h3>

            <p className="mt-3 leading-relaxed text-gray-600">
              {renderAddress()}
            </p>
          </div>

          {/* Payment Info */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Details
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Payment Method
                </p>
                <p className="mt-1 font-medium capitalize text-gray-900">
                  {order.paymentMethod?.replaceAll("_", " ") || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Payment Status
                </p>
                <p className="mt-1 font-medium capitalize text-gray-900">
                  {order.paymentStatus || "Pending"}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Ordered Items
              </h3>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {items.length} items
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {items.length === 0 && (
                <p className="text-sm text-gray-500">No items found.</p>
              )}

              {items.map((item, index) => {
                const quantity = getItemQuantity(item);
                const price = getItemPrice(item);

                return (
                  <div
                    key={item._id || index}
                    className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <img
                      src={getProductImage(item)}
                      alt={getProductTitle(item)}
                      className="h-20 w-20 flex-shrink-0 rounded-xl bg-white object-contain"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="line-clamp-2 font-semibold text-gray-900">
                        {getProductTitle(item)}
                      </h4>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {quantity}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="text-sm text-gray-500">
                          Price: {formatCurrency(price)}
                        </p>

                        <p className="font-semibold text-gray-900">
                          {formatCurrency(price * quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border border-gray-900 bg-blue-600 p-5 text-white shadow-sm">
            <h3 className="text-lg font-semibold">Order Summary</h3>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-300">Subtotal</span>
                <span>{formatCurrency(order.subtotal || order.total)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-300">Shipping</span>
                <span>{formatCurrency(order.shippingFee || 0)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-300">Tax</span>
                <span>{formatCurrency(order.tax || 0)}</span>
              </div>

              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between gap-4 text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminOrders() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await API.get("/orders", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setOrders(res.data.data || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchOrders();
    }
  }, [accessToken]);

  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      const res = await API.patch(
        `/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? res.data.data : order,
        ),
      );

      setSelectedOrder((prev) =>
        prev?._id === orderId ? res.data.data : prev,
      );

      toast.success("Order status updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const search = searchTerm.toLowerCase();

      const orderNumber =
        order.orderNumber || `#${order._id?.slice(-6).toUpperCase()}`;

      const matchesSearch =
        orderNumber.toLowerCase().includes(search) ||
        String(order.customer?.fullName || "")
          .toLowerCase()
          .includes(search) ||
        String(order.customer?.email || "")
          .toLowerCase()
          .includes(search) ||
        String(order.customer?.phone || "")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0,
    );

    return {
      totalOrders: orders.length,
      pending: orders.filter((order) => order.status === "pending").length,
      delivered: orders.filter((order) => order.status === "delivered").length,
      revenue: totalRevenue,
    };
  }, [orders]);

  const formatCurrency = (amount) => {
    return `$${Number(amount || 0).toFixed(2)}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getOrderId = (order) => {
    return order.orderNumber || `#${order._id?.slice(-6).toUpperCase()}`;
  };

  const getItemsCount = (order) => {
    return order.items?.length || 0;
  };

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {stats.totalOrders}
          </h2>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-amber-700">Pending Orders</p>
          <h2 className="mt-2 text-3xl font-bold text-amber-900">
            {stats.pending}
          </h2>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-emerald-700">Delivered</p>
          <h2 className="mt-2 text-3xl font-bold text-emerald-900">
            {stats.delivered}
          </h2>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-blue-700">Total Revenue</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-900">
            {formatCurrency(stats.revenue)}
          </h2>
        </div>
      </div>

      {/* Filters */}
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <input
              type="text"
              placeholder="Search by order ID, customer, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
                  statusFilter === status
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div> */}

      {/* Filters */}
<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
  <div className="flex items-center gap-4 overflow-hidden">
    <div className="min-w-[380px] flex-1">
      <input
        type="text"
        placeholder="Search by order ID, customer, email, or phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
      />
    </div>

    <div className="flex shrink-0 gap-2 overflow-x-auto pb-1">
      {statusOptions.map((status) => (
        <button
          key={status}
          onClick={() => setStatusFilter(status)}
          className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
            statusFilter === status
              ? "bg-blue-600 text-white shadow-sm"
              : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  </div>
</div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-16 animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredOrders.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
            📦
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No orders found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or status filter.
          </p>
        </div>
      )}


      {/* Desktop Table */}
{!loading && filteredOrders.length > 0 && (
  <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
    <table className="w-full table-fixed text-sm">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <th className="w-[14%] px-4 py-4 text-left font-semibold">
            Order
          </th>
          <th className="w-[28%] px-4 py-4 text-left font-semibold">
            Customer
          </th>
          <th className="w-[8%] px-4 py-4 text-left font-semibold">
            Items
          </th>
          <th className="w-[16%] px-4 py-4 text-left font-semibold">
            Total
          </th>
          <th className="w-[15%] px-4 py-4 text-left font-semibold">
            Status
          </th>
          <th className="w-[10%] px-4 py-4 text-left font-semibold">
            Date
          </th>
          <th className="w-[9%] px-4 py-4 text-left font-semibold">
            Action
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {filteredOrders.map((order) => (
          <tr key={order._id} className="transition hover:bg-gray-50">
            <td className="px-4 py-4 align-top">
              <p className="break-words font-semibold text-blue-600">
                {getOrderId(order)}
              </p>
              <p className="mt-1 break-words text-xs text-gray-400">
                {order._id?.slice(-8)}
              </p>
            </td>

            <td className="px-4 py-4 align-top">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {order.customer?.fullName?.charAt(0)?.toUpperCase() || "C"}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900">
                    {order.customer?.fullName || "Customer"}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {order.customer?.email || "No email"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {order.customer?.phone || "No phone"}
                  </p>
                </div>
              </div>
            </td>

            <td className="px-4 py-4 align-top">
              <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                {getItemsCount(order)}
              </span>
            </td>

            <td className="px-4 py-4 align-top">
              <p className="font-semibold text-gray-900">
                {formatCurrency(order.total)}
              </p>

              <p className="mt-1 text-xs capitalize leading-5 text-gray-500">
                {order.paymentMethod?.replaceAll("_", " ") || "-"}
              </p>
            </td>

            <td className="px-4 py-4 align-top">
              <select
                value={order.status || "pending"}
                disabled={updatingId === order._id}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
                className={`w-full rounded-full border px-3 py-1.5 text-xs font-semibold capitalize outline-none transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  statusStyles[order.status] ||
                  "border-gray-200 bg-gray-50 text-gray-600"
                }`}
              >
                {orderStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>

            <td className="px-4 py-4 align-top text-gray-500">
              <span className="block leading-5">
                {formatDate(order.createdAt)}
              </span>
            </td>

            <td className="px-4 py-4 align-top">
              <button
                onClick={() => setSelectedOrder(order)}
                className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      {/* Mobile Cards */}
      {!loading && filteredOrders.length > 0 && (
        <div className="grid gap-4 lg:hidden">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-blue-600">
                    {getOrderId(order)}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                    statusStyles[order.status] ||
                    "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  {order.status || "pending"}
                </span>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="font-medium text-gray-900">
                  {order.customer?.fullName || "Customer"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {order.customer?.email || "No email"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {order.customer?.phone || "No phone"}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Items</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {getItemsCount(order)}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {formatCurrency(order.total)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Update Status
                </label>

                <select
                  value={order.status || "pending"}
                  disabled={updatingId === order._id}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm capitalize outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {orderStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setSelectedOrder(order)}
                className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                View Order Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Drawer */}
      {selectedOrder && (
        <OrderDetailsDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
          updatingId={updatingId}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

export default AdminOrders;