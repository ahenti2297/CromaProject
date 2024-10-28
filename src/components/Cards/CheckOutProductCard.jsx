// @ts-nocheck
import React, { useState } from "react";
import Style from "./CheckOutProductCard.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useNavigate } from "react-router-dom";

const CartProductCard = ({ product, SetCartList }) => {
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const date = new Date();
  let day = date.getDate() + 3;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;

  console.log(product);
  return (
    <>
      <div className={Style.ProductContainer}>
        <div className={Style.ProductImg}>
          <img src={product.product.displayImage} alt="Product Image" />
        </div>
        <div className={Style.ProductDetailsmain}>
          <div className={Style.ProductDetails}>
            <p className={Style.ProductName}>{product.product.name}</p>

            <div className={Style.deliveryDate}>
              <LocalShippingOutlinedIcon style={{ fontSize: "18px" }} />
              <div>&#160; Delivery by &#160;</div>
              <div>{currentDate}</div>
            </div>
          </div>
        </div>
        <div className={Style.PriceSection}>
          <div className={Style.ProductPrice}>
            <CurrencyRupeeIcon style={{ fontSize: "12px" }} />
            {product.product.price}.00
          </div>
          <div className={Style.tex}>Qty:1</div>
        </div>
      </div>
    </>
  );
};

export default CartProductCard;
