// //src/pages/Cart.jsx
// import Header from "../components/layout/Header";
// import CartItem from "../components/cart/CartItem";
// import CartSummary from "../components/cart/CartSummary";
// import SavedForLater from "../components/cart/SavedForLater";
// import DiscountBanner from "../components/products/DiscountBanner";
// import Footer from "../components/home/Footer";

// const cartItems = [
//   {
//     id: 1,
//     title: "T-shirts with multiple colors, for men and lady",
//     price: "78.99",
//     qty: 9,
//     image: "https://img.icons8.com/color/120/polo-shirt.png",
//   },
//   {
//     id: 2,
//     title: "T-shirts with multiple colors, for men and lady",
//     price: "39.00",
//     qty: 3,
//     image: "https://img.icons8.com/color/120/backpack.png",
//   },
//   {
//     id: 3,
//     title: "T-shirts with multiple colors, for men and lady",
//     price: "170.50",
//     qty: 1,
//     image: "https://img.icons8.com/color/120/table-lamp.png",
//   },
// ];

// function Cart() {
//   return (
//     <div className="bg-[#f7fafc] min-h-screen">
//       <Header />

//       <main className="max-w-[1180px] mx-auto px-4 py-6">
//         <h1 className="text-[24px] font-semibold mb-5">My cart (3)</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
//           <section className="bg-white border border-gray-200 rounded-md p-5">
//             {cartItems.map((item) => (
//               <CartItem key={item.id} item={item} />
//             ))}

//             <div className="flex justify-between mt-5">
//               <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
//                 ← Back to shop
//               </button>
//               <button className="text-blue-600">Remove all</button>
//             </div>
//           </section>

//           <CartSummary />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-5">
  
//   <div className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-md">
//     <span className="text-xl">🔒</span>
//     <div>
//       <p className="text-sm font-medium text-gray-900">Secure payment</p>
//       <p className="text-xs text-gray-500">Have you ever finally just</p>
//     </div>
//   </div>

//   <div className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-md">
//     <span className="text-xl">💬</span>
//     <div>
//       <p className="text-sm font-medium text-gray-900">Customer support</p>
//       <p className="text-xs text-gray-500">Have you ever finally just</p>
//     </div>
//   </div>

//   <div className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-md">
//     <span className="text-xl">🚚</span>
//     <div>
//       <p className="text-sm font-medium text-gray-900">Free delivery</p>
//       <p className="text-xs text-gray-500">Have you ever finally just</p>
//     </div>
//   </div>

// </div>

//         <SavedForLater />
//         <DiscountBanner />
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Cart;

import Header from "../components/layout/Header";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import SavedForLater from "../components/cart/SavedForLater";
import DiscountBanner from "../components/products/DiscountBanner";
import Footer from "../components/home/Footer";
import { ShieldCheck, MessageCircle, Truck } from "lucide-react";
import Newsletter from "../components/home/Newsletter";

const cartItems = [
  {
    id: 1,
    title: "T-shirts with multiple colors, for men and lady",
    price: "78.99",
    qty: 9,
    image: "https://img.icons8.com/color/120/polo-shirt.png",
  },
  {
    id: 2,
    title: "T-shirts with multiple colors, for men and lady",
    price: "39.00",
    qty: 3,
    image: "https://img.icons8.com/color/120/backpack.png",
  },
  {
    id: 3,
    title: "T-shirts with multiple colors, for men and lady",
    price: "170.50",
    qty: 1,
    image: "https://img.icons8.com/color/120/table-lamp.png",
  },
];

function Cart() {
  return (
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />

      <main className="max-w-[1180px] mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-28 lg:pb-6">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h1 className="text-[22px] sm:text-[24px] font-semibold text-gray-900">
            My cart <span className="text-gray-500 font-normal">(3)</span>
          </h1>

          <button className="lg:hidden text-blue-600 text-sm font-medium">
            Remove all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          <section className="bg-white border border-gray-200 rounded-xl sm:rounded-md p-3 sm:p-5 shadow-sm sm:shadow-none">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <div className="hidden sm:flex justify-between mt-5">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                ← Back to shop
              </button>
              <button className="text-blue-600">Remove all</button>
            </div>
          </section>

          <CartSummary />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 my-5">
          <div className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-xl sm:rounded-md">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Secure payment
              </p>
              <p className="text-xs text-gray-500">Your payment is protected</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-xl sm:rounded-md">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Customer support
              </p>
              <p className="text-xs text-gray-500">Fast help when needed</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-xl sm:rounded-md">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Free delivery</p>
              <p className="text-xs text-gray-500">Available on selected items</p>
            </div>
          </div>
        </div>

        <SavedForLater />
        <DiscountBanner />
        <Newsletter/>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;