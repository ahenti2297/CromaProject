// @ts-nocheck
import React, { useEffect, useState } from "react";
import Style from "./WishList.module.css";
import WishListProductCard from "../Cards/WishListProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishList = ({ product }) => {
  const [List, setList] = useState();
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const DeleteWishList = async () => {
    try {
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
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
        setList("");
        toast.success("Remove all product from WishList Successfully!", {
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
  const GetWishList = async () => {
    try {
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
        {
          method: "GET",
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
        setList(data?.data?.items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetWishList();
  }, []);

  return (
    <div className={Style.WishListContainer}>
      <div className={Style.Heading}>
        <div>My WishList</div>
        <button onClick={DeleteWishList}>Delete All</button>
      </div>
      {List &&
        List.filter((product) => product?.products)?.map((product, index) => (
          <WishListProductCard
            product={product.products}
            setList={setList}
            key={index}
          />
        ))}
    </div>
  );
};

export default WishList;
