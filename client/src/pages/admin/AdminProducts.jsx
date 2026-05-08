// //client/src/pages/admin/AdminProducts.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import API from "../../api/api";

// function AdminProducts() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({
//     total: 0,
//     page: 1,
//     pages: 1,
//     limit: 20,
//   });
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get("/products?limit=50&includeInactive=true");

//       setProducts(res.data.data || []);
//       setPagination(res.data.pagination || pagination);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // const handleDelete = async (productId) => {
//   //   const confirmDelete = window.confirm(
//   //     "Are you sure you want to delete this product?"
//   //   );

//   //   if (!confirmDelete) return;

//   //   try {
//   //     await API.delete(`/products/${productId}`);

//   //     setProducts((prev) => prev.filter((product) => product._id !== productId));

//   //     toast.success("Product deleted successfully");
//   //   } catch (err) {
//   //     toast.error(err.response?.data?.message || "Failed to delete product");
//   //   }
//   // };

//   const handleHideProduct = async (productId) => {
//     const confirmHide = window.confirm(
//       "Are you sure you want to hide this product from customers?",
//     );

//     if (!confirmHide) return;

//     try {
//       const res = await API.delete(`/products/${productId}`);

//       setProducts((prev) =>
//         prev.map((product) =>
//           product._id === productId ? res.data.data : product,
//         ),
//       );

//       toast.success("Product hidden successfully");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to hide product");
//     }
//   };

//   const handleRestoreProduct = async (productId) => {
//     try {
//       const res = await API.patch(`/products/${productId}/restore`);

//       setProducts((prev) =>
//         prev.map((product) =>
//           product._id === productId ? res.data.data : product,
//         ),
//       );

//       toast.success("Product restored successfully");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to restore product");
//     }
//   };

//   const handlePermanentDelete = async (productId) => {
//     const confirmDelete = window.confirm(
//       "This will permanently delete the product from database. Are you sure?",
//     );

//     if (!confirmDelete) return;

//     try {
//       await API.delete(`/products/${productId}/permanent`);

//       setProducts((prev) =>
//         prev.filter((product) => product._id !== productId),
//       );

//       toast.success("Product deleted permanently");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete product");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f7fafc]">
//       <div className="bg-white border-b">
//         <div className="max-w-[1180px] mx-auto px-4 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-semibold text-gray-900">
//               Admin Products
//             </h1>
//             <p className="text-sm text-gray-500">
//               Manage products, prices, stock, and homepage placements
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <button
//               onClick={() => navigate("/admin/orders")}
//               className="border border-gray-200 px-4 py-2 rounded-md text-gray-700"
//             >
//               Orders
//             </button>

//             <button
//               onClick={() => navigate("/admin/products/create")}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md"
//             >
//               + Add Product
//             </button>
//           </div>
//         </div>
//       </div>

//       <main className="max-w-[1180px] mx-auto px-4 py-6">
//         {loading && (
//           <div className="bg-white border rounded-md p-6 text-center text-gray-500">
//             Loading products...
//           </div>
//         )}

//         {!loading && products.length === 0 && (
//           <div className="bg-white border rounded-md p-6 text-center text-gray-500">
//             No products found.
//           </div>
//         )}

//         {!loading && products.length > 0 && (
//           <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="text-left px-4 py-3">Product</th>
//                     <th className="text-left px-4 py-3">Category</th>
//                     <th className="text-left px-4 py-3">Price</th>
//                     <th className="text-left px-4 py-3">Stock</th>
//                     <th className="text-left px-4 py-3">Placement</th>
//                     <th className="text-left px-4 py-3">Status</th>
//                     <th className="text-right px-4 py-3">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {products.map((product) => {
//                     const image = product.images?.[0];

//                     return (
//                       <tr
//                         key={product._id}
//                         className="border-b last:border-b-0"
//                       >
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-3">
//                             <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center">
//                               {image ? (
//                                 <img
//                                   src={image}
//                                   alt={product.title}
//                                   className="max-h-12 object-contain"
//                                 />
//                               ) : (
//                                 <span className="text-xs text-gray-400">
//                                   No image
//                                 </span>
//                               )}
//                             </div>

//                             <div>
//                               <p className="font-medium text-gray-900">
//                                 {product.title}
//                               </p>
//                               <p className="text-gray-500">{product.brand}</p>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-4 py-3 text-gray-600">
//                           {product.category?.name || "N/A"}
//                         </td>

//                         <td className="px-4 py-3 font-medium">
//                           ${Number(product.price).toFixed(2)}
//                         </td>

//                         <td className="px-4 py-3 text-gray-600">
//                           {product.stock}
//                         </td>

//                         <td className="px-4 py-3">
//                           <div className="flex flex-wrap gap-1">
//                             {product.isDeal && (
//                               <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
//                                 Deal
//                               </span>
//                             )}

//                             {product.isHotOffer && (
//                               <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
//                                 Hot
//                               </span>
//                             )}

//                             {product.isGiftBox && (
//                               <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
//                                 Gift
//                               </span>
//                             )}

//                             {product.isFeatured && (
//                               <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
//                                 Featured
//                               </span>
//                             )}

//                             {product.isRecommended && (
//                               <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
//                                 Recommended
//                               </span>
//                             )}
//                           </div>
//                         </td>

//                         <td className="px-4 py-3">
//                           {product.isActive !== false ? (
//                             <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
//                               Active
//                             </span>
//                           ) : (
//                             <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
//                               Hidden
//                             </span>
//                           )}
//                         </td>

//                         <td className="px-4 py-3">
//                           <div className="flex justify-end gap-2">
//                             <button
//                               onClick={() =>
//                                 navigate(`/admin/products/${product._id}/edit`)
//                               }
//                               className="border border-gray-200 px-3 py-1 rounded-md text-blue-600"
//                             >
//                               Edit
//                             </button>

//                             {product.isActive !== false ? (
//                               <button
//                                 onClick={() => handleHideProduct(product._id)}
//                                 className="border border-gray-200 px-3 py-1 rounded-md text-red-500"
//                               >
//                                 Hide
//                               </button>
//                             ) : (
//                               <>
//                                 <button
//                                   onClick={() =>
//                                     handleRestoreProduct(product._id)
//                                   }
//                                   className="border border-gray-200 px-3 py-1 rounded-md text-green-600"
//                                 >
//                                   Restore
//                                 </button>

//                                 <button
//                                   onClick={() =>
//                                     handlePermanentDelete(product._id)
//                                   }
//                                   className="border border-red-200 px-3 py-1 rounded-md text-red-600"
//                                 >
//                                   Delete
//                                 </button>
//                               </>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             <div className="px-4 py-3 border-t text-sm text-gray-500">
//               Showing {products.length} products
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminProducts;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/api";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    limit: 20,
  });
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products?limit=50&includeInactive=true");

      setProducts(res.data.data || []);
      setPagination(res.data.pagination || pagination);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHideProduct = async (productId) => {
    const confirmHide = window.confirm(
      "Are you sure you want to hide this product from customers?",
    );

    if (!confirmHide) return;

    try {
      const res = await API.delete(`/products/${productId}`);

      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId ? res.data.data : product,
        ),
      );

      toast.success("Product hidden successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to hide product");
    }
  };

  const handleRestoreProduct = async (productId) => {
    try {
      const res = await API.patch(`/products/${productId}/restore`);

      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId ? res.data.data : product,
        ),
      );

      toast.success("Product restored successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to restore product");
    }
  };

  const handlePermanentDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "This will permanently delete the product from database. Are you sure?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${productId}/permanent`);

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );

      toast.success("Product deleted permanently");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Products
          </h1>
          <p className="text-sm text-gray-500">
            Manage products, prices, stock, and homepage placements
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/orders")}
            className="border border-gray-200 px-4 py-2 rounded-md text-gray-700"
          >
            Orders
          </button>

          <button
            onClick={() => navigate("/admin/products/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            + Add Product
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-white border rounded-md p-6 text-center text-gray-500">
          Loading products...
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="bg-white border rounded-md p-6 text-center text-gray-500">
          No products found.
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3">Product</th>
                  <th className="text-left px-4 py-3">Category</th>
                  <th className="text-left px-4 py-3">Price</th>
                  <th className="text-left px-4 py-3">Stock</th>
                  <th className="text-left px-4 py-3">Placement</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => {
                  const image = product.images?.[0];

                  return (
                    <tr key={product._id} className="border-b last:border-b-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                            {image ? (
                              <img
                                src={image}
                                alt={product.title}
                                className="max-h-12 object-contain"
                              />
                            ) : (
                              <span className="text-xs text-gray-400">
                                No image
                              </span>
                            )}
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {product.title}
                            </p>
                            <p className="text-gray-500">{product.brand}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {product.category?.name || "N/A"}
                      </td>

                      <td className="px-4 py-3 font-medium">
                        ${Number(product.price).toFixed(2)}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {product.stock}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {product.isDeal && (
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                              Deal
                            </span>
                          )}

                          {product.isHotOffer && (
                            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                              Hot
                            </span>
                          )}

                          {product.isGiftBox && (
                            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                              Gift
                            </span>
                          )}

                          {product.isFeatured && (
                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                              Featured
                            </span>
                          )}

                          {product.isRecommended && (
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                              Recommended
                            </span>
                          )}

                          {product.isNewArrival && (
                            <span className="bg-cyan-100 text-cyan-600 px-2 py-1 rounded-full text-xs">
                              New
                            </span>
                          )}

                          {product.isTopSelling && (
                            <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs">
                              Top
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        {product.isActive !== false ? (
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                            Active
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            Hidden
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/products/${product._id}/edit`)
                            }
                            className="border border-gray-200 px-3 py-1 rounded-md text-blue-600"
                          >
                            Edit
                          </button>

                          {product.isActive !== false ? (
                            <button
                              onClick={() => handleHideProduct(product._id)}
                              className="border border-gray-200 px-3 py-1 rounded-md text-red-500"
                            >
                              Hide
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  handleRestoreProduct(product._id)
                                }
                                className="border border-gray-200 px-3 py-1 rounded-md text-green-600"
                              >
                                Restore
                              </button>

                              <button
                                onClick={() =>
                                  handlePermanentDelete(product._id)
                                }
                                className="border border-red-200 px-3 py-1 rounded-md text-red-600"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t text-sm text-gray-500">
            Showing {products.length} products
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;