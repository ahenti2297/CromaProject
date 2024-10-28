import React, { useEffect, useState } from "react";
import ProductCard from "../SingleCard/ProductCard";
import { useParams } from "react-router-dom";

const SubCategory = () => {
  const { type } = useParams();
  const [ProductList, setProductList] = useState([]);

  const url = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"${type}"}`;
  const handleProductList = async () => {
    const responce = await fetch(
      // `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products`,
      url,
      {
        method: "GET",
        headers: {
          projectId: "7dey245ji457",
        },
      }
    );
    const parseData = await responce.json();
    console.log(parseData.data);
    if (responce.status >= 400) {
      console.log(parseData.message || "Product not Found");
      return;
    }
    setProductList(parseData.data);
  };
  useEffect(() => {
    if (type) {
      handleProductList();
    }
  }, [type]);
  return (
    <div>
      {/* <div>Television & Accessories</div> */}
      {ProductList &&
        ProductList.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
    </div>
  );
};

export default SubCategory;
