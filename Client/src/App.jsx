import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

// Customer Layout
import MainLayout from "./layout/MainLayout";

// Seller Layout
import SellerLayout from "./layout/SellerLayout";

// Customer Pages
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Orders from "./pages/Orders";
import ContactUs from "./pages/ConatctUs";
import AuthForm from "./pages/AuthForm";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import ProductDetails from "./components/ProductDetails";
import ComingSoon from "./components/ComingSoon";

// Seller Pages
import Dashboard from "./pages/seller/Dashboard";
import Products from "./pages/seller/Products";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";
import ViewProduct from "./pages/seller/ViewProduct";
// import Categories from "./pages/seller/Categories";
import OrdersPage from "./pages/seller/Order";
import Customers from "./pages/seller/Customer";
import Analytics from "./pages/seller/Analytics";
import Settings from "./pages/seller/Setting";
import SellerLogin from "./pages/seller/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* Customer Website */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<ContactUs />} />

          <Route path="/all-products" element={<AllProducts />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/products/:category/:id" element={<ProductDetails />} />

          <Route path="/coming-soon" element={<ComingSoon />} />

          <Route path="/login" element={<AuthForm />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/address" element={<AddAddress />} />
        </Route>

        {/* Seller Dashboard */}
        {/* Seller Login */}

        <Route path="/seller/login" element={<SellerLogin />} />

        {/* Protected Seller Dashboard */}

        <Route element={<ProtectedRoute />}>
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="products" element={<Products />} />

            <Route path="products/add" element={<AddProduct />} />

            <Route path="products/:id" element={<ViewProduct />} />

            <Route path="products/edit/:id" element={<EditProduct />} />

            <Route path="orders" element={<OrdersPage />} />

            <Route path="customers" element={<Customers />} />

            <Route path="analytics" element={<Analytics />} />

            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
