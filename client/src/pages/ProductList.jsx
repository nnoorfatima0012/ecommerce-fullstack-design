

// import Header from "../components/layout/Header";
// import Navbar from "../components/layout/Navbar";
// import Breadcrumb from "../components/products/Breadcrumb";
// import Newsletter from "../components/home/Newsletter";
// import Footer from "../components/home/Footer";
// import FilterSidebar from "../components/products/FilterSidebar";
// import ProductListTopBar from "../components/products/ProductListTopBar";
// import ProductListCard from "../components/products/ProductListCard";
// import ProductPagination from "../components/products/ProductPagination";
// import MobileProductTop from "../components/products/MobileProductTop";
// function ProductList() {
//   const products = [
//   {
//     id: 1,
//     title: "Canon Cmera EOS 2000, Black 10x zoom",
//     price: "998.00",
//     oldPrice: "1128.00",
//     image: "https://img.icons8.com/color/200/iphone.png",
//   },
//   {
//     id: 2,
//     title: "GoPro HERO6 4K Action Camera - Black",
//     price: "998.00",
//     image: "https://img.icons8.com/color/200/smartphone-tablet.png",
//   },
//   {
//     id: 3,
//     title: "GoPro HERO6 4K Action Camera - Black",
//     price: "998.00",
//     image: "https://img.icons8.com/color/200/tablet.png",
//   },
//   {
//     id: 4,
//     title: "GoPro HERO6 4K Action Camera - Black",
//     price: "998.00",
//     image: "https://img.icons8.com/color/200/laptop.png",
//   },
//   {
//     id: 5,
//     title: "GoPro HERO6 4K Action Camera - Black",
//     price: "998.00",
//     oldPrice: "1128.00",
//     image: "https://img.icons8.com/color/200/apple-watch.png",
//   },
//   {
//     id: 6,
//     title: "GoPro HERO6 4K Action Camera - Black",
//     price: "998.00",
//     image: "https://img.icons8.com/color/200/headphones.png",
//   },
// ];
//   return (
// //     <div className="bg-[#f7fafc] min-h-screen">
// //       <Header />
// //       <Navbar />

// //       <main className="max-w-[1180px] mx-auto px-4 py-5">
// //         <Breadcrumb />

// //         <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
// //           <FilterSidebar />

// //           <section>
// //             <ProductListTopBar />
// //             <div className="space-y-3">
// //   {products.map((product) => (
// //     <ProductListCard key={product.id} product={product} />
// //   ))}
// // </div>
// // <ProductPagination />
// //           </section>
// //         </div>
// //       </main>

// //       <Newsletter />
// //       <Footer />
// //     </div>
// <div className="bg-[#f7fafc] min-h-screen pb-10">
//   <div className="hidden md:block">
//     <Header />
//     <Navbar />
//   </div>

//   <MobileProductTop />

//   <main className="max-w-[1180px] mx-auto px-3 md:px-4 py-3 md:py-5">
//     <div className="hidden md:block">
//       <Breadcrumb />
//     </div>

//     <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
//       <FilterSidebar />

//       <section>
//         <div className="hidden md:block">
//           <ProductListTopBar />
//         </div>

//         <div className="space-y-2 md:space-y-3">
//           {products.map((product) => (
//             <ProductListCard key={product.id} product={product} />
//           ))}
//         </div>

//         <div className="hidden md:block">
//           <ProductPagination />
//         </div>
//       </section>
//     </div>

//     <div className="md:hidden mt-6">
//   <h2 className="text-[18px] font-semibold mb-3">You may also like</h2>

//   <div className="flex gap-3 overflow-x-auto pb-3">
//     {products.slice(0, 4).map((product) => (
//       <div
//         key={product.id}
//         className="min-w-[150px] bg-white border border-gray-200 rounded-md p-3"
//       >
//         <div className="h-[120px] flex items-center justify-center">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="max-h-[100px] object-contain"
//           />
//         </div>

//         <p className="font-semibold text-gray-900 mt-2">$10.30</p>
//         <p className="text-gray-500 text-sm leading-snug">
//           Solid Backpack blue jeans large size
//         </p>
//       </div>
//     ))}
//   </div>
//   <div className="md:hidden h-10"></div>
// </div>
//   </main>

//   <div className="hidden md:block">
//     <Newsletter />
//     <Footer />
//   </div>
// </div>
//   );
// }

// export default ProductList;

import { useEffect, useState } from "react";

import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Breadcrumb from "../components/products/Breadcrumb";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";
import FilterSidebar from "../components/products/FilterSidebar";
import ProductListTopBar from "../components/products/ProductListTopBar";
import ProductListCard from "../components/products/ProductListCard";
import ProductPagination from "../components/products/ProductPagination";
import MobileProductTop from "../components/products/MobileProductTop";
import API from "../api/api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get("/products");
        setProducts(res.data.data || []);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#f7fafc] min-h-screen pb-10">
      <div className="hidden md:block">
        <Header />
        <Navbar />
      </div>

      <MobileProductTop />

      <main className="max-w-[1180px] mx-auto px-3 md:px-4 py-3 md:py-5">
        <div className="hidden md:block">
          <Breadcrumb />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
          <FilterSidebar />

          <section>
            <div className="hidden md:block">
              <ProductListTopBar />
            </div>

            {loading && (
              <div className="bg-white border rounded-md p-6 text-center text-gray-500">
                Loading products...
              </div>
            )}

            {error && (
              <div className="bg-white border rounded-md p-6 text-center text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-2 md:space-y-3">
                {products.map((product) => (
                  <ProductListCard key={product._id} product={product} />
                ))}
              </div>
            )}

            <div className="hidden md:block">
              <ProductPagination />
            </div>
          </section>
        </div>

        {!loading && !error && (
          <div className="md:hidden mt-6">
            <h2 className="text-[18px] font-semibold mb-3">You may also like</h2>

            <div className="flex gap-3 overflow-x-auto pb-3">
              {products.slice(0, 4).map((product) => {
                const image = product.images?.[0] || product.image;

                return (
                  <div
                    key={product._id}
                    className="min-w-[150px] bg-white border border-gray-200 rounded-md p-3"
                  >
                    <div className="h-[120px] flex items-center justify-center">
                      <img
                        src={image}
                        alt={product.title}
                        className="max-h-[100px] object-contain"
                      />
                    </div>

                    <p className="font-semibold text-gray-900 mt-2">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm leading-snug line-clamp-2">
                      {product.title}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="md:hidden h-10"></div>
          </div>
        )}
      </main>

      <div className="hidden md:block">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}

export default ProductList;