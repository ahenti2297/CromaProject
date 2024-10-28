// @ts-nocheck
import React, { useState } from "react";
import Style from "./ProductCard.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { getRandomDecimal } from "../../utils/data";

const ProductCard = ({ product }) => {
  const rating = getRandomDecimal();
  const [wishList, setWishList] = useState(false);
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  console.log("location", parseUserLocation);
  const navigate = useNavigate();
  const toViewProduct = () => {
    navigate(`/Product/${product._id}`);
  };
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const AddWishList = async (e) => {
    e.stopPropagation();
    try {
      if (!parseUserDetails || !parseUserDetails.token) {
        navigate("/login");
        console.log("User details or token not found.");
        return;
      }
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "7dey245ji457",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
          }),
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        toast.error(` ${data.message}`, {
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
      } else {
        setWishList(true);
        toast.success("item added to wishList Successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={Style.ProductContainer} onClick={toViewProduct}>
        <div className={Style.ProductImg}>
          <img src={product.displayImage} alt="Product Image" />
          <div className={Style.compare}>
            <CheckBoxOutlineBlankIcon />
            COMPARE
          </div>
        </div>
        <div className={Style.ProductDetails}>
          <p className={Style.ProductName}>{product.name}</p>
          <div className={Style.btnSect}>
            <button>
              {Math.floor(Math.random() * (6000 - 2000 + 1) + 2000)}
              &nbsp;off on payment OTP page
            </button>
            <button>6 Months No CostEMI</button>
          </div>
          <div className={Style.ProductRating}>
            <div>{rating}&nbsp; </div>
            <StarIcon style={{ fontSize: "16px" }} />
            &nbsp;rating
          </div>
          <div className={Style.ProductPrice}>
            <CurrencyRupeeIcon style={{ fontSize: "20px" }} />
            {product.price}.00
          </div>
          <div className={Style.tex}>(Incl. all Texes)</div>
          <div className={Style.DeliveryAddress}>
            Delivery Address: {parseUserLocation?.City},
            {parseUserLocation?.Pincode}
          </div>
          <div className={Style.StanderdDelivery}>
            Standard Delivery by Tomorrow
          </div>
        </div>
        <div className={Style.HeartIcon} onClick={AddWishList}>
          {wishList ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
        <div className={Style.ShareIcon}>
          <ShareIcon style={{ cursor: "not-allowed" }} />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
