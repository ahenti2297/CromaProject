// @ts-nocheck
import React, { useState } from "react";
import Style from "./OrderListCard.module.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import OrderDetailsModal from "../Modal/OrderDetailsModal";

const WishListProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const navigate = useNavigate();
  // const toViewProduct = () => {
  //   navigate(`/Product/${product?.order?.items?.[0]?.product?._id}`);
  // };
  const date = new Date(product.createdAt);

  // Get the date in the "YYYY-MM-DD" format
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = date.getUTCDate().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;
  const toViewProduct = () => {
    setIsOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
    {/* {isOpen ?(<div className={Style.modal}>Modal</div>):(<div></div>)

    } */}
      <div className={Style.ProductContainer}>
        <div className={Style.ProductDetail}>
          <div className={Style.ProductImg}>
            <img
              src={product?.order?.items?.[0]?.product?.displayImage}
              alt="Product Image"
            />
          </div>
          <div className={Style.ProductDetails}>
            <p className={Style.ProductName}>
              {product?.order?.items?.[0]?.product?.name}
            </p>
            <div className={Style.ProductName}>
              Ordered Date: {formattedDate}
            </div>
          </div>
          <div className={Style.ref} onClick={toViewProduct}>
            view Details
          </div>
        </div>
        <div className={Style.button}></div>
      </div>
      <OrderDetailsModal
        product={product}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default WishListProductCard;
