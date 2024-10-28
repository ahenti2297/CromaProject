// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./Cart.module.css";
import PercentIcon from "@mui/icons-material/Percent";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CartProductCard from "../Cards/CartProductCard";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cartList, SetCartList] = useState([]);
  const [allData, setAllData] = useState({});
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  const navigate = useNavigate();
  const getAllProduct = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "7dey245ji457",
            "Content-Type": "application/json",
          },
        }
      );
      const parseData = await responce.json();
      // console.log(parseData.data);
      if (responce.status >= 400) {
        toast.error(`{data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      SetCartList(parseData?.data?.items);
      // console.log(parseData?.data?.items);
      setAllData(parseData);
      console.log(parseData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleclearall = async () => {
    try {
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/cart/",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "7dey245ji457",
            "Content-Type": "application/json",
          },
        }
      );
      const parseData = await responce.json();
      // console.log("parseData", parseData);
      if (responce.status >= 400) {
        console.log(parseData.message || "Product not Found");
        return;
      }
      SetCartList(parseData.data.item);

      toast.success("Remove all product from cart Successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  const toUpdateAddress = () => {
    navigate("/udateAddress");
  };
  const toCheckOut = () => {
    const UserLocation = localStorage.getItem("locationDetails");
    const parseUserLocation = JSON.parse(UserLocation);
    if(parseUserLocation?.Street !=null){
      navigate("/checkOut");
    }else{
      toast.error("Please Add Your Address !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
  };

  return (
    <div className={Style.CartContainer}>
      {cartList?.length > 0 ? (
        <>
          <h2>Your Cart</h2>
          <div className={Style.allSection}>
            <div className={Style.leftSection}>
              <div className={Style.AddressSection}
              >
                <div className={Style.ShippingAddressText}>
                  Shipping Address
                </div>
                <div className={Style.home}>Home</div>
                <div className={Style.Address}>
                  {parseUserLocation?.Street}
                </div>
                <div className={Style.Address}>{parseUserLocation?.City},
                  {parseUserLocation?.State}</div>
                <div className={Style.Address}>{parseUserLocation?.Zipcode}</div>
                <a href="" onClick={toUpdateAddress}>
                  Edit Shipping Address
                </a>
              </div>
              {/* <div className={Style.CoupenSection}>
                <PercentIcon className={Style.percentIcon} />
                Apply Coupon
              </div> */}
              <div className={Style.Product}>
                {cartList &&
                  cartList?.map((product, index) => (
                    <CartProductCard
                      product={product}
                      key={index}
                      SetCartList={SetCartList}
                    />
                  ))}
              </div>
            </div>
            <div className={Style.OrderSummaryContainer}>
              <h3>Order Summary ({allData?.data?.items?.length} item)</h3>
              <div className={Style.OriginalPrice}>
                <div>Original Price</div>
                <div className={Style.ProductPrice}>
                  <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                  {allData?.data?.totalPrice}.00
                </div>
              </div>
              <div className={Style.DeliveryCharge}>
                <div>Delivery</div>
                <div>Free</div>
              </div>
              <div className={Style.TotalPrice}>
                <div>Total</div>
                <div className={Style.ProductPrice}>
                  <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                  {allData?.data?.totalPrice}.00
                </div>
              </div>
              <button onClick={toCheckOut}>Check Out</button>
              <button onClick={handleclearall}>clear all</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>Your Cart</h2>
          <div className={Style.mainContainer}>
            <img
              src="https://mouhumi-croma-clone.netlify.app/static/media/emptyCart.902a230807b6137f4b24.webp"
              alt="Empty Cart Image"
            />
            <div className={Style.info}>
              <div>Oops! Your cart is empty</div>
              <div className={Style.innerInfo}>
                Add to cart from your wishlist or
                <a href="/">Continue Shopping</a>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default Cart;
