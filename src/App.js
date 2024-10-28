// @ts-nocheck
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AllProduct from "./components/AllProduct/AllProduct";
import Home from "./components/Home";
import SubCategory from "./components/Pages/SubCategory";
import ViewProduct from "./components/ViewProduct/ViewProduct";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/LogIn/Login";
import { AuthProvider } from "./components/Provider/AuthProvider";
import Profile from "./components/Pages/Profile";
import WishList from "./components/Pages/WishList";
import Cart from "./components/Pages/Cart";
import UpdateAddress from "./components/UpdateAddress/UpdateAddress";
import CheckOut from "./components/Pages/CheckOut";
import FeatureUpdateSoon from "./components/FeatureUpdateSoon/FeatureUpdateSoon";
import MyOrder from "./components/Pages/MyOrder";
import { createContext, useState } from "react";
import BrandCategory from "./components/Pages/BrandCategory";
import MyProfile from "./components/Pages/MyProfile";
import { ToastContainer } from "react-toastify";

export const CartValue = createContext();

function App() {
  const [cartnum, setCartNum] = useState(0);

  return (
    <CartValue.Provider value={{ cartnum, setCartNum }}>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AllProduct" element={<AllProduct />} />
          <Route path="/subCategory/:type" element={<SubCategory />} />
          <Route path="/Product/:productID" element={<ViewProduct />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/udateAddress" element={<UpdateAddress />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route path="/UpdateSoon" element={<FeatureUpdateSoon />} />
          <Route path="/MyOrder" element={<MyOrder />} />
          <Route path="/brandPage/:brand" element={<BrandCategory />} />
          <Route path="/Profile/edit-Profile" element={<MyProfile />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </CartValue.Provider>
  );
}

export default App;
