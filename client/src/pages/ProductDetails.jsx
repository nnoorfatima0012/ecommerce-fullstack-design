// import Header from "../components/layout/Header";
// import Navbar from "../components/layout/Navbar";
// import Breadcrumb from "../components/products/Breadcrumb";
// import ProductDetailsMain from "../components/products/ProductDetailsMain";
// import Newsletter from "../components/home/Newsletter";
// import Footer from "../components/home/Footer";
// import ProductTabs from "../components/products/ProductTabs";
// import RelatedProducts from "../components/products/RelatedProducts";
// import DiscountBanner from "../components/products/DiscountBanner";
// function ProductDetails() {
//   return (
//     <div className="bg-[#f7fafc] min-h-screen">
//       <Header />
//       <Navbar />

//       <main className="max-w-[1180px] mx-auto px-4 py-5">
//         <Breadcrumb />
//         <ProductDetailsMain />
//         <ProductTabs />
//         <RelatedProducts />
//         <DiscountBanner />
//       </main>

//       <Newsletter />
//       <Footer />
//     </div>
//   );
// }

// export default ProductDetails;


import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Breadcrumb from "../components/products/Breadcrumb";
import ProductDetailsMain from "../components/products/ProductDetailsMain";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";
import ProductTabs from "../components/products/ProductTabs";
import RelatedProducts from "../components/products/RelatedProducts";
import DiscountBanner from "../components/products/DiscountBanner";

function ProductDetails() {
  return (
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />
      <Navbar />

      <main className="max-w-[1180px] mx-auto px-0 sm:px-4 py-0 sm:py-5">
        <div className="hidden sm:block">
          <Breadcrumb />
        </div>

        <ProductDetailsMain />
        <ProductTabs />
        <RelatedProducts />
        <DiscountBanner />
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default ProductDetails;