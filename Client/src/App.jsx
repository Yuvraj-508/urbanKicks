import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layout/MainLayout";
import SellerLayout from "./layout/SellerLayout";

// Components
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import FullPageLoader from "./components/loading/FullPageLoader";

// Customer Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Seller Pages
import SellerLogin from "./pages/seller/Auth";
import Dashboard from "./pages/seller/Dashboard";
import ProductsPage from "./pages/seller/Products";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";
import ViewProduct from "./pages/seller/ViewProduct";
import OrdersPage from "./pages/seller/Order";
import Customers from "./pages/seller/Customer";
import Analytics from "./pages/seller/Analytics";
import Settings from "./pages/seller/Setting";
import Profile from "./pages/Profile";

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
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <ScrollToTop />

      <Routes>
        {/* Customer Website */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route
            path="/all-products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />
           <Route
        path="/profile"
        element={<Profile/>}
        />
        </Route>

       

        {/* Seller Login */}
        <Route
          path="/seller/login"
          element={<SellerLogin />}
        />

        {/* Protected Seller */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/seller"
            element={<SellerLayout />}
          >
            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="products"
              element={<ProductsPage />}
            />

            <Route
              path="products/add"
              element={<AddProduct />}
            />

            <Route
              path="products/:id"
              element={<ViewProduct />}
            />

            <Route
              path="products/edit/:id"
              element={<EditProduct />}
            />

            <Route
              path="orders"
              element={<OrdersPage />}
            />

            <Route
              path="customers"
              element={<Customers />}
            />

            <Route
              path="analytics"
              element={<Analytics />}
            />

            <Route
              path="settings"
              element={<Settings />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;