// //client/src/pages/admin/AdminOrders.jsx
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import API from "../../api/api";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function AdminOrders() {
//   const { accessToken } = useAuth();
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);

//         const res = await API.get("/orders", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         setOrders(res.data.data || []);
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to load orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (accessToken) {
//       fetchOrders();
//     }
//   }, [accessToken]);

//   const handleStatusChange = async (orderId, status) => {
//     try {
//       const res = await API.patch(`/orders/${orderId}/status`, { status });

//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? res.data.data : order,
//         ),
//       );

//       toast.success("Order status updated");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update status");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f7fafc]">
//       <div className="bg-white border-b">
//         <div className="max-w-[1180px] mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-semibold text-gray-900">Admin Orders</h1>

//           <button
//             onClick={() => navigate("/")}
//             className="text-blue-600 text-sm"
//           >
//             Go to store
//           </button>
//         </div>
//       </div>

//       <main className="max-w-[1180px] mx-auto px-4 py-6">
//         {loading && (
//           <div className="bg-white border rounded-md p-6 text-center text-gray-500">
//             Loading orders...
//           </div>
//         )}

//         {!loading && orders.length === 0 && (
//           <div className="bg-white border rounded-md p-6 text-center text-gray-500">
//             No orders found.
//           </div>
//         )}

//         {!loading && orders.length > 0 && (
//           <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="text-left px-4 py-3">Order ID</th>
//                     <th className="text-left px-4 py-3">Customer</th>
//                     <th className="text-left px-4 py-3">Phone</th>
//                     <th className="text-left px-4 py-3">Items</th>
//                     <th className="text-left px-4 py-3">Total</th>
//                     <th className="text-left px-4 py-3">Payment</th>
//                     <th className="text-left px-4 py-3">Status</th>
//                     <th className="text-left px-4 py-3">Date</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {orders.map((order) => (
//                     <tr key={order._id} className="border-b last:border-b-0">
//                       <td className="px-4 py-3 text-gray-600">
//                         #{order._id.slice(-6).toUpperCase()}
//                       </td>

//                       <td className="px-4 py-3">
//                         <p className="font-medium text-gray-900">
//                           {order.customer?.fullName}
//                         </p>
//                         <p className="text-gray-500">{order.customer?.email}</p>
//                       </td>

//                       <td className="px-4 py-3 text-gray-600">
//                         {order.customer?.phone}
//                       </td>

//                       <td className="px-4 py-3 text-gray-600">
//                         {order.items?.length || 0}
//                       </td>

//                       <td className="px-4 py-3 font-medium">
//                         ${Number(order.total).toFixed(2)}
//                       </td>

//                       <td className="px-4 py-3 text-gray-600">
//                         {order.paymentMethod?.replaceAll("_", " ")}
//                       </td>

//                       <td className="px-4 py-3">
//                         <select
//                           value={order.status}
//                           onChange={(e) =>
//                             handleStatusChange(order._id, e.target.value)
//                           }
//                           className="border border-gray-200 rounded-md px-2 py-1 text-xs capitalize outline-none bg-white"
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="confirmed">Confirmed</option>
//                           <option value="processing">Processing</option>
//                           <option value="shipped">Shipped</option>
//                           <option value="delivered">Delivered</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select>
//                       </td>

//                       <td className="px-4 py-3 text-gray-500">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminOrders;


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const res = await API.patch(`/orders/${orderId}/status`, { status });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? res.data.data : order,
        ),
      );

      toast.success("Order status updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Orders
          </h1>
          <p className="text-sm text-gray-500">
            View and manage customer orders
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="border border-gray-200 px-4 py-2 rounded-md text-gray-700"
        >
          Go to store
        </button>
      </div>

      {loading && (
        <div className="bg-white border rounded-md p-6 text-center text-gray-500">
          Loading orders...
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="bg-white border rounded-md p-6 text-center text-gray-500">
          No orders found.
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3">Order ID</th>
                  <th className="text-left px-4 py-3">Customer</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">Items</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Payment</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 text-blue-600 font-medium">
                      {order.orderNumber || `#${order._id.slice(-6).toUpperCase()}`}
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">
                        {order.customer?.fullName}
                      </p>
                      <p className="text-gray-500">{order.customer?.email}</p>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {order.customer?.phone}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {order.items?.length || 0}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      ${Number(order.total).toFixed(2)}
                    </td>

                    <td className="px-4 py-3 text-gray-600 capitalize">
                      {order.paymentMethod?.replaceAll("_", " ")}
                    </td>

                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border border-gray-200 rounded-md px-2 py-1 text-xs capitalize outline-none bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="px-4 py-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;