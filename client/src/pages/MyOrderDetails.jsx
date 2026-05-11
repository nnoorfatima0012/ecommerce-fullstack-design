import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import API from "../api/api";
import toast from "react-hot-toast";
import OrderStatusTimeline from "../components/orders/OrderStatusTimeline";

const placeholderImage =
  "https://placehold.co/300x300/e5e7eb/64748b?text=Product";

const formatMoney = (value) => {
  return `$${Number(value || 0).toFixed(2)}`;
};

const getStatusStyle = (status) => {
  const styles = {
    placed: "bg-blue-100 text-blue-700",
    confirmed: "bg-yellow-100 text-yellow-700",
    processing: "bg-purple-100 text-purple-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
};

const getProductImage = (item) => {
  const product = item.product || item.productId || {};

  const image =
    item.image ||
    item.imageUrl ||
    product.image ||
    product.imageUrl ||
    product.images?.[0]?.url ||
    product.images?.[0];

  if (typeof image === "string") return image;
  if (image?.url) return image.url;

  return placeholderImage;
};

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
    <div className="min-h-screen bg-[#f7fafc]">
      <Header />

      <main className="mx-auto max-w-[1100px] px-4 py-8">
        {loading && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
            <p className="text-gray-500">Loading order details...</p>
          </div>
        )}

        {!loading && order && (
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order ID</p>
                  <h1 className="mt-1 text-2xl font-bold text-gray-900">
                    {order.orderNumber}
                  </h1>
                </div>

                <span
                  className={`h-fit w-fit rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mt-6">
                <OrderStatusTimeline status={order.status} />
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600">
                    C
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Customer Details</h2>
                    <p className="text-sm text-gray-500">Buyer information</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">
                    {order.customer?.fullName || "N/A"}
                  </p>
                  <p className="text-gray-600">{order.customer?.phone}</p>
                  <p className="text-gray-600">{order.customer?.email}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-lg font-bold text-green-600">
                    A
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">
                      Delivery Address
                    </h2>
                    <p className="text-sm text-gray-500">Shipping location</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">
                    {order.customer?.address || "N/A"}
                  </p>
                  <p className="text-gray-600">{order.customer?.city}</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5 flex flex-col justify-between gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Ordered Products
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Products included in this order
                  </p>
                </div>

                <span className="w-fit rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600">
                  {order.items?.length || 0} Items
                </span>
              </div>

              <div className="space-y-4">
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
                      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-md sm:flex-row sm:items-center"
                    >
                      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
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
                        <h3 className="text-lg font-bold text-gray-900">
                          {title}
                        </h3>

                        {(item.category || product.category?.name) && (
                          <p className="mt-1 text-sm text-gray-500">
                            Category: {item.category || product.category?.name}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap gap-2 text-sm">
                          <span className="rounded-full bg-white px-3 py-1 font-medium text-gray-700 ring-1 ring-gray-200">
                            Qty: {quantity}
                          </span>

                          <span className="rounded-full bg-white px-3 py-1 font-medium text-gray-700 ring-1 ring-gray-200">
                            Unit Price: {formatMoney(price)}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-white px-4 py-3 text-left ring-1 ring-gray-200 sm:min-w-[140px] sm:text-right">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          Subtotal
                        </p>
                        <p className="mt-1 text-xl font-bold text-gray-900">
                          {formatMoney(subtotal)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-gray-900">
                  Order Note
                </h2>
                <p className="text-sm leading-6 text-gray-500">
                  Your order is currently marked as{" "}
                  <span className="font-semibold capitalize text-gray-900">
                    {order.status}
                  </span>
                  . You can track the progress above.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-lg font-bold text-gray-900">
                  Payment Summary
                </h2>

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
              </div>
            </section>
          </div>
        )}

        {!loading && !order && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order not found
            </h2>
            <p className="mt-2 text-gray-500">
              The order details could not be loaded.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyOrderDetails;