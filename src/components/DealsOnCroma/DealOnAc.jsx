// @ts-nocheck
import React, { useEffect, useState } from "react";
import SingleProductCard from "../Cards/SingleProductCard";
import Style from "../CategoryList/index.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const DealOnAc = ({ setShowLoginPage }) => {
  const [trandingProduct, setTrandingProduct] = useState([]);
  const getTrandingDeal = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&subCategory=ac`,
        {
          method: "GET",
          headers: {
            projectId: "7dey245ji457",
          },
        }
      );
      const parseData = await responce.json();
      if (responce.status >= 400) {
        console.log(parseData.message || "Product not Found");
        return;
      }
      console.log("parseData", parseData.data);
      setTrandingProduct(parseData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTrandingDeal();
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
  return (
    <>
      <div className={Style.mainContainer}>
        <Carousel responsive={responsive}>
          {trandingProduct &&
            trandingProduct.map((product, index) => {
              return (
                <SingleProductCard
                  product={product}
                  key={index}
                  setShowLoginPage={setShowLoginPage}
                />
              );
            })}
        </Carousel>
      </div>
    </>
  );
};

export default DealOnAc;
