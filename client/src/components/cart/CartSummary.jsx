// //src/components/cart/CartSummary.jsx
// function CartSummary() {
//   return (
//     <div className="space-y-4">
//       <div className="bg-white border border-gray-200 rounded-md p-4">
//         <p className="text-gray-600 mb-2">Have a coupon?</p>

//         <div className="flex h-[40px]">
//           <input
//             placeholder="Add coupon"
//             className="flex-1 border border-gray-200 border-r-0 rounded-l-md px-3 h-full outline-none text-sm"
//           />
//           <button className="border border-gray-200 bg-white px-4 rounded-r-md text-blue-600 text-sm h-full">
//             Apply
//           </button>
//         </div>
//       </div>

//       <div className="bg-white border border-gray-200 rounded-md p-4">
//         <div className="space-y-2 text-sm">
//           <div className="flex justify-between">
//             <span className="text-gray-500">Subtotal:</span>
//             <span>$1403.97</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-500">Discount:</span>
//             <span className="text-red-500">- $60.00</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-500">Tax:</span>
//             <span className="text-green-600">+ $14.00</span>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold">
//           <span>Total:</span>
//           <span>$1357.97</span>
//         </div>

//         <button className="w-full bg-green-600 text-white rounded-md py-3 mt-4">
//           Checkout
//         </button>

//         <div className="flex justify-center gap-2 mt-4 text-xs text-gray-400">
//           <span>💳</span>
//           <span>Visa</span>
//           <span>PayPal</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartSummary;

function CartSummary() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl sm:rounded-md p-4">
        <p className="text-gray-600 mb-2 text-sm sm:text-base">
          Have a coupon?
        </p>

        <div className="flex h-[42px]">
          <input
            placeholder="Add coupon"
            className="flex-1 border border-gray-200 border-r-0 rounded-l-md px-3 h-full outline-none text-sm"
          />
          <button className="border border-gray-200 bg-white px-4 rounded-r-md text-blue-600 text-sm h-full">
            Apply
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl sm:rounded-md p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal:</span>
            <span>$1403.97</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Discount:</span>
            <span className="text-red-500">- $60.00</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Tax:</span>
            <span className="text-green-600">+ $14.00</span>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold text-[17px]">
          <span>Total:</span>
          <span>$1357.97</span>
        </div>

        <button className="hidden lg:block w-full bg-green-600 text-white rounded-md py-3 mt-4 font-medium">
          Checkout
        </button>

        <div className="flex justify-center gap-2 mt-4 text-xs text-gray-400">
          <span>💳</span>
          <span>Visa</span>
          <span>PayPal</span>
          <span>Mastercard</span>
        </div>
      </div>

      {/* Mobile Sticky Checkout */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50">
        <div className="flex items-center justify-between gap-3 max-w-[1180px] mx-auto">
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="font-semibold text-[18px] text-gray-900">$1357.97</p>
          </div>

          <button className="flex-1 max-w-[220px] bg-green-600 text-white rounded-md py-3 font-medium">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;