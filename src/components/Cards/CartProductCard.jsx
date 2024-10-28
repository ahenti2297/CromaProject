// @ts-nocheck
import React, { useContext, useState } from "react";
import Style from "./CartProductCart.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { CartValue } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRandomDecimal } from "../../utils/data";

const CartProductCard = ({ product, SetCartList }) => {
  const rating = getRandomDecimal();
  const { setCartNum } = useContext(CartValue);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const date = new Date();
  let day = date.getDate() + 3;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;
  const RemoveOne = async (e) => {
    // e.stopPropagation();
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${product.product._id} `,
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
      } else {
        SetCartList((list) =>
          list.filter((item) => item.product._id !== product.product._id)
        );
        setCartNum((prev) => prev - 1);
        toast.success("Remove Successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // setList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const AddWishList = async (e) => {
  //   e.stopPropagation();
  //   try {
  //     const responce = await fetch(
  //       "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${parseUserDetails.token}`,
  //           projectId: "z9qnjrap5ytl",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           productId: `${product._id}`,
  //         }),
  //       }
  //     );
  //     const data = await responce.json();
  //     console.log(data);
  //     if (responce.status >= 400) {
  //       toast.error(`${data.message}`, {
  //          position: "bottom-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       return;
  //     } else {
  //       SetCartList((list) =>
  //         list.filter((item) => item.product._id !== product.product._id)
  //       );
  //       setCartNum((prev) => prev - 1);
  //       toast.success("item added to wishList successfully!", {
  //          position: "bottom-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       // setWishList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
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
            <div className={Style.ProductRating}>
              <div>{rating}</div>
              <StarIcon style={{ fontSize: "16px" }} />
            </div>

            <div className={Style.deliveryDate}>
              <div>Standard Delivery</div>
              <div>{currentDate}</div>
            </div>
            <div className={Style.buttons}>
              {/* <button className={Style.MovetoWishList} onClick={AddWishList}>
                Move to WishList
              </button> */}
              <button className={Style.RemoveButton} onClick={RemoveOne}>
                Remove
              </button>
            </div>
          </div>
          <div className={Style.PriceSection}>
            <div className={Style.ProductPrice}>
              <CurrencyRupeeIcon />
              {product.product.price}.00
            </div>
            <div className={Style.tex}>(incl. all Texes)</div>
            <hr></hr>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProductCard;
