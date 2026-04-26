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

const homeItems = [
  { name: "Soft chairs", price: 19, image: "https://img.icons8.com/color/96/armchair.png" },
  { name: "Sofa & chair", price: 19, image: "https://img.icons8.com/color/96/sofa.png" },
  { name: "Kitchen dishes", price: 19, image: "https://img.icons8.com/color/96/plate.png" },
  { name: "Smart watches", price: 19, image: "https://img.icons8.com/color/96/apple-watch.png" },
  { name: "Kitchen mixer", price: 100, image: "https://img.icons8.com/color/96/blender.png" },
  { name: "Blenders", price: 39, image: "https://img.icons8.com/color/96/kitchen.png" },
  { name: "Home appliance", price: 19, image: "https://img.icons8.com/color/96/coffee-maker.png" },
  { name: "Coffee maker", price: 10, image: "https://img.icons8.com/color/96/coffee.png" },
];

const electronicItems = [
  { name: "Smart watches", price: 19, image: "https://img.icons8.com/color/96/apple-watch.png" },
  { name: "Cameras", price: 89, image: "https://img.icons8.com/color/96/camera.png" },
  { name: "Headphones", price: 10, image: "https://img.icons8.com/color/96/headphones.png" },
  { name: "Smart watches", price: 90, image: "https://img.icons8.com/color/96/apple-watch.png" },
  { name: "Gaming set", price: 35, image: "https://img.icons8.com/color/96/controller.png" },
  { name: "Laptops & PC", price: 340, image: "https://img.icons8.com/color/96/laptop.png" },
  { name: "Smartphones", price: 19, image: "https://img.icons8.com/color/96/iphone.png" },
  { name: "Electric kettle", price: 240, image: "https://img.icons8.com/color/96/kettle.png" },
];

function Home() {
  return (
    <div className="min-h-screen bg-[#f7fafc] overflow-x-hidden">
      <Header />
      <Navbar />

      <main className="pb-4">
        <HeroSection />
        <DealsSection />

        <ProductBlock
          title="Home and outdoor"
          items={homeItems}
          image="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
          bgColor="#f7efe2"
        />

        <ProductBlock
          title="Consumer electronics and gadgets"
          items={electronicItems}
          image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
          bgColor="#dceaf5"
        />

        <InquirySection />
        <RecommendedItems />
        <ServicesSection />
        <SuppliersSection />
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;