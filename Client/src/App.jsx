import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layout/MainLayout";
import SellerLayout from "./layout/SellerLayout";

// Components
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import FullPageLoader from "./components/loading/FullPageLoader";
import Review from "./pages/Review";

// Customer Pages
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));

// Seller Pages
const SellerLogin = lazy(() => import("./pages/seller/Auth"));
const Dashboard = lazy(() => import("./pages/seller/Dashboard"));
const ProductsPage = lazy(() => import("./pages/seller/Products"));
const AddProduct = lazy(() => import("./pages/seller/AddProduct"));
const EditProduct = lazy(() => import("./pages/seller/EditProduct"));
const ViewProduct = lazy(() => import("./pages/seller/ViewProduct"));
const OrdersPage = lazy(() => import("./pages/seller/Order"));
const Customers = lazy(() => import("./pages/seller/Customer"));
const Analytics = lazy(() => import("./pages/seller/Analytics"));
const Settings = lazy(() => import("./pages/seller/Setting"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  // const [appLoading, setAppLoading] = useState(true);

  // useEffect(() => {
  //   const initializeApp = async () => {
  //     try {
  //       // Future:
  //       // await checkAuth();
  //       // await fetchCurrentUser();
  //       // await initializeStore();

  //       await new Promise((resolve) => setTimeout(resolve, 600));
  //     } finally {
  //       setAppLoading(false);
  //     }
  //   };

  //   initializeApp();
  // }, []);

  // if (appLoading) {
  //   return <FullPageLoader />;
  // }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
      <ScrollToTop />
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          {" "}
          {/* Customer Website */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route path="/all-products" element={<Products />} />

            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rating-card" element={<Review/>} />

          </Route>
          {/* Seller Login */}
          <Route path="/seller/login" element={<SellerLogin />} />
          {/* Protected Seller */}
          <Route element={<ProtectedRoute />}>
            <Route path="/seller" element={<SellerLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="products" element={<ProductsPage />} />

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
      </Suspense>
    </>
  );
}

export default App;
