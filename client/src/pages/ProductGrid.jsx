
// //client/src/pages/ProductGrid.jsx
// import Header from "../components/layout/Header";
// import Navbar from "../components/layout/Navbar";
// import Breadcrumb from "../components/products/Breadcrumb";
// import FilterSidebar from "../components/products/FilterSidebar";
// import ProductListTopBar from "../components/products/ProductListTopBar";
// import ProductPagination from "../components/products/ProductPagination";
// import ProductGridCard from "../components/products/ProductGridCard";
// import MobileProductTop from "../components/products/MobileProductTop";
// import Newsletter from "../components/home/Newsletter";
// import Footer from "../components/home/Footer";

// const products = [
//   { id: 1, title: "GoPro HERO6 4K Action Camera - Black", price: "99.50", oldPrice: "1128.00", image: "https://img.icons8.com/color/200/iphone.png" },
//   { id: 2, title: "GoPro HERO6 4K Action Camera - Black", price: "99.50", oldPrice: "1128.00", image: "https://img.icons8.com/color/200/smartphone-tablet.png" },
//   { id: 3, title: "GoPro HERO6 4K Action Camera - Black", price: "99.50", image: "https://img.icons8.com/color/200/tablet.png" },
//   { id: 4, title: "GoPro HERO6 4K Action Camera - Black", price: "99.50", image: "https://img.icons8.com/color/200/camera.png" },
//   { id: 5, title: "GoPro HERO6 4K Action Camera - Black", price: "99.50", image: "https://img.icons8.com/color/200/iphone.png" },
//   { id: 6, title: "GoPro HERO6 4K Action Camera - Black", price: "99.50", image: "https://img.icons8.com/color/200/laptop.png" },
//   { id: 7, title: "GoPro HERO6 4K Action Camera - Black", price: "99.50", image: "https://img.icons8.com/color/200/apple-watch.png" },
//   { id: 8, title: "GoPro HERO6 4K Action Camera - Black", price: "99.50", image: "https://img.icons8.com/color/200/iphone.png" },
//   { id: 9, title: "GoPro HERO6 4K Action Camera - Black", price: "99.50", image: "https://img.icons8.com/color/200/headphones.png" },
// ];

// function ProductGrid() {
//   return (
//     <div className="bg-[#f7fafc] min-h-screen overflow-x-hidden">
//       <div className="hidden md:block">
//         <Header />
//         <Navbar />
//       </div>

//       <MobileProductTop />

//       <main className="max-w-[1180px] mx-auto px-3 md:px-4 py-3 md:py-5">
//         <div className="hidden md:block">
//           <Breadcrumb />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
//           <FilterSidebar />

//           <section>
//             <div className="hidden md:block">
//               <ProductListTopBar />
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
//               {products.map((product) => (
//                 <ProductGridCard key={product.id} product={product} />
//               ))}
//             </div>

//             <div className="hidden md:block">
//               <ProductPagination />
//             </div>
//           </section>
//         </div>
//       </main>

      
//         <Newsletter />


//       <Footer />
//     </div>
//   );
// }

// export default ProductGrid;

// //client/src/pages/ProductGrid.jsx
import { useEffect, useState } from "react";

import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Breadcrumb from "../components/products/Breadcrumb";
import FilterSidebar from "../components/products/FilterSidebar";
import ProductListTopBar from "../components/products/ProductListTopBar";
import ProductPagination from "../components/products/ProductPagination";
import ProductGridCard from "../components/products/ProductGridCard";
import MobileProductTop from "../components/products/MobileProductTop";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";
import API from "../api/api";

function ProductGrid() {
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
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#f7fafc] min-h-screen overflow-x-hidden">
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

            {!loading && !error && products.length === 0 && (
              <div className="bg-white border rounded-md p-6 text-center text-gray-500">
                No products found.
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {products.map((product) => (
                  <ProductGridCard key={product._id} product={product} />
                ))}
              </div>
            )}

            <div className="hidden md:block">
              <ProductPagination />
            </div>
          </section>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default ProductGrid;