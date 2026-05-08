// ////client/src/App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import ProductList from "./pages/ProductList";
// import ProductGrid from "./pages/ProductGrid";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import AdminRoute from "./routes/AdminRoute";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminOrders from "./pages/admin/AdminOrders";
// import AdminProducts from "./pages/admin/AdminProducts";
// import AdminProductForm from "./pages/admin/AdminProductForm";
// import OrderSuccess from "./pages/OrderSuccess";
// import TrackOrder from "./pages/TrackOrder";
// import MyOrders from "./pages/MyOrders";
// import MyOrderDetails from "./pages/MyOrderDetails";
// import Profile from "./pages/Profile";
// import AdminLayout from "./components/admin/AdminLayout";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products/list" element={<ProductList />} />
//         <Route path="/products/grid" element={<ProductGrid />} />
//         <Route path="/products/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />
//         <Route
//           path="/admin/orders"
//           element={
//             <AdminRoute>
//               <AdminOrders />
//             </AdminRoute>
//           }
//         />

//         <Route
//           path="/admin/products"
//           element={
//             <AdminRoute>
//               <AdminProducts />
//             </AdminRoute>
//           }
//         />

//         <Route
//           path="/admin/products/create"
//           element={
//             <AdminRoute>
//               <AdminProductForm />
//             </AdminRoute>
//           }
//         />

//         <Route
//           path="/admin/products/:id/edit"
//           element={
//             <AdminRoute>
//               <AdminProductForm />
//             </AdminRoute>
//           }
//         />

//         <Route path="/order-success/:orderNumber" element={<OrderSuccess />} />
//         <Route path="/track-order" element={<TrackOrder />} />

//         <Route
//           path="/my-orders"
//           element={
//             <ProtectedRoute>
//               <MyOrders />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/my-orders/:id"
//           element={
//             <ProtectedRoute>
//               <MyOrderDetails />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductGrid from "./pages/ProductGrid";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminLayout from "./components/admin/AdminLayout";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";
import MyOrders from "./pages/MyOrders";
import MyOrderDetails from "./pages/MyOrderDetails";
import Profile from "./pages/Profile";
import AdminCategories from "./pages/admin/AdminCategories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public store routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products/list" element={<ProductList />} />
        <Route path="/products/grid" element={<ProductGrid />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderNumber" element={<OrderSuccess />} />
        <Route path="/track-order" element={<TrackOrder />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User protected routes */}
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders/:id"
          element={
            <ProtectedRoute>
              <MyOrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin nested routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/create" element={<AdminProductForm />} />
          <Route path="products/:id/edit" element={<AdminProductForm />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
