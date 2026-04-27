// //src/pages/Home.jsx
// import Header from "../components/layout/Header";
// import Navbar from "../components/layout/Navbar";
// import HeroSection from "../components/home/HeroSection";
// import DealsSection from "../components/home/DealsSection";
// import ProductBlock from "../components/home/ProductBlock";
// import InquirySection from "../components/home/InquirySection";
// import RecommendedItems from "../components/home/RecommendedItems";
// import ServicesSection from "../components/home/ServicesSection";
// import SuppliersSection from "../components/home/SuppliersSection";
// import Newsletter from "../components/home/Newsletter";
// import Footer from "../components/home/Footer";


// const homeItems = [
//   {
//     name: "Soft chairs",
//     price: 19,
//     image: "https://img.icons8.com/color/96/armchair.png",
//   },
//   {
//     name: "Sofa & chair",
//     price: 19,
//     image: "https://img.icons8.com/color/96/sofa.png",
//   },
//   {
//     name: "Kitchen dishes",
//     price: 19,
//     image: "https://img.icons8.com/color/96/plate.png",
//   },
//   {
//     name: "Smart watches",
//     price: 19,
//     image: "https://img.icons8.com/color/96/apple-watch.png",
//   },
//   {
//     name: "Kitchen mixer",
//     price: 100,
//     image: "https://img.icons8.com/color/96/blender.png",
//   },
//   {
//     name: "Blenders",
//     price: 39,
//     image: "https://img.icons8.com/color/96/kitchen.png",
//   },
//   {
//     name: "Home appliance",
//     price: 19,
//     image: "https://img.icons8.com/color/96/coffee-maker.png",
//   },
//   {
//     name: "Coffee maker",
//     price: 10,
//     image: "https://img.icons8.com/color/96/coffee.png",
//   },
// ];

// const electronicItems = [
//   {
//     name: "Smart watches",
//     price: 19,
//     image: "https://img.icons8.com/color/96/apple-watch.png",
//   },
//   {

import { useEffect, useState } from "react";

import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import DealsSection from "../components/home/DealsSection";
import ProductBlock from "../components/home/ProductBlock";
import InquirySection from "../components/home/InquirySection";
import RecommendedItems from "../components/home/RecommendedItems";
import ServicesSection from "../components/home/ServicesSection";
import SuppliersSection from "../components/home/SuppliersSection";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";
import API from "../api/api";

function Home() {
  const [deals, setDeals] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [homeItems, setHomeItems] = useState([]);
  const [electronics, setElectronics] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [dealRes, recRes, allRes] = await Promise.all([
          API.get("/products?deal=true"),
          API.get("/products?recommended=true"),
          API.get("/products"),
        ]);

        const allProducts = allRes.data.data || [];

        console.log("ALL PRODUCTS:", allProducts);

        setDeals(dealRes.data.data || []);
        setRecommended(recRes.data.data || []);

        setHomeItems(
          allProducts.filter(
            (p) => p.category?.name === "Home and outdoor"
          )
        );

        setElectronics(
          allProducts.filter(
            (p) => p.category?.name === "Consumer electronics"
          )
        );
      } catch (err) {
        console.log("Home fetch error", err);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7fafc] overflow-x-hidden">
      <Header />
      <Navbar />

      <main className="pb-4">
        <HeroSection />

        <DealsSection products={deals} />

        <ProductBlock
          title="Home and outdoor"
          items={homeItems}
          image="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
          bgColor="#f7efe2"
        />

        <ProductBlock
          title="Consumer electronics"
          items={electronics}
          image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          bgColor="#dceaf5"
        />

        <InquirySection />

        <RecommendedItems products={recommended} />

        <ServicesSection />
        <SuppliersSection />
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;