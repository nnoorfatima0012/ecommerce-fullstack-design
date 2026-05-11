//src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Breadcrumb from "../components/products/Breadcrumb";
import ProductDetailsMain from "../components/products/ProductDetailsMain";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";
import ProductTabs from "../components/products/ProductTabs";
import RelatedProducts from "../components/products/RelatedProducts";
import DiscountBanner from "../components/products/DiscountBanner";
import API from "../api/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const productRes = await API.get(`/products/${id}`);
        const currentProduct = productRes.data.data;

        setProduct(currentProduct);

        const relatedRes = await API.get("/products");
        const filteredRelated = relatedRes.data.data.filter(
          (item) => item._id !== currentProduct._id,
        );

        setRelatedProducts(filteredRelated.slice(0, 4));
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />
      <Navbar />

      <main className="max-w-[1180px] mx-auto px-0 sm:px-4 py-0 sm:py-5">
        <div className="hidden sm:block">
          <Breadcrumb
            categoryId={product?.category?._id}
            categoryName={product?.category?.name}
            productTitle={product?.title}
          />
        </div>

        {loading && (
          <div className="bg-white border rounded-md p-6 text-center text-gray-500">
            Loading product details...
          </div>
        )}

        {error && (
          <div className="bg-white border rounded-md p-6 text-center text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && product && (
          <>
            <ProductDetailsMain product={product} />
            <ProductTabs product={product} />
            <RelatedProducts products={relatedProducts} />
            <DiscountBanner />
          </>
        )}
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default ProductDetails;
