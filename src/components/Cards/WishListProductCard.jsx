// @ts-nocheck
import React, { useState } from "react";
import Style from "./WishListProductCard.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";

const WishListProductCard = ({ product, setList }) => {
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const RemoveOne = async (e) => {
    // e.stopPropagation();
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${product._id} `,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "7dey245ji457",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        alert(data.message);
        return;
      } else {
        setList((list) =>
          list.filter((item) => item.products._id !== product._id)
        );
        // setList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const AddtoCart = async (e) => {
    // e.stopPropagation();
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${product._id} `,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "7dey245ji457",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        alert(data.message);
        return;
      } else {
        // setList((list) =>
        //   list.filter((item) => item.products._id !== product._id)
        // );
        alert("add Successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={Style.ProductContainer}>
        <div className={Style.ProductDetail}>
          <div className={Style.ProductImg}>
            <img src={product.displayImage} alt="Product Image" />
          </div>
          <div className={Style.ProductDetails}>
            <p className={Style.ProductName}>{product.name}</p>
            {/* <div className={Style.ProductRating}>{product.ratings}</div> */}
            <div className={Style.ProductId}>Product id:{product._id}</div>
            <div className={Style.ProductPrice}>
              <CurrencyRupeeIcon style={{ fontSize: "20px" }} />
              {product.price}.00
            </div>
          </div>
        </div>
        <div className={Style.button}>
          <button onClick={AddtoCart}>Add to cart</button>
          <button onClick={RemoveOne}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default WishListProductCard;
