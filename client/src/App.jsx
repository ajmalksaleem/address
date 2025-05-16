import { Route, Routes } from "react-router-dom";
import Layout from "./components/auth/Layout";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminProducts from "./pages/admin-view/AdminProducts";
import ShoppingLayout from "./components/shopping view/ShoppingLayout";
import NotFound from "./pages/shopping-view/notfound/NotFound";
import Home from "./pages/shopping-view/Home";
import PaypalReturn from "./pages/shopping-view/PaypalReturn";
import PaypalCancell from "./pages/shopping-view/PaypalCancell";
import Listing from "./pages/shopping-view/Listing";
import CheckoutPage from "./pages/shopping-view/CheckoutPage";
import AccountPage from "./pages/shopping-view/AccountPage";
import { useDispatch, useSelector } from "react-redux";
import { CheckAuth } from "./redux/auth/authSlice";
import { useEffect, useState } from "react";
import { Skeleton } from "./components/ui/skeleton";
import PaymentSuccess from "./pages/shopping-view/PaymentSuccess";
import Search from "./pages/shopping-view/Search";

function App() {
  const [authChecked, setAuthChecked] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckAuth()).then(()=>{
      setAuthChecked(true)
    })
  }, [dispatch]);

  if (!authChecked) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <Routes>
      {/* auth routes */}
      <Route path="/auth" element={<Layout />}>
        <Route path="sign-up" element={<Signup />} />
        <Route path="sign-in" element={<Signin />} />
      </Route>
      {/* admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="features" element={<AdminFeatures />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>
      {/* shopping routes */}
      <Route path="/shop" element={<ShoppingLayout />}>
        <Route path="" element={<Home />} />
        <Route path="listing" element={<Listing />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="paypal-return" element={<PaypalReturn />} />
        <Route path="paypal-cancel" element={<PaypalCancell />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="search" element={<Search />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
