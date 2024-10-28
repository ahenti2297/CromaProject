import React, { useEffect, useState } from "react";
import Style from "./AllProduct.module.css";
import ProductCard from "../SingleCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const AllProduct = () => {
  const [ProductList, SetProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedlist, setupdatedlist] = useState([]);
  const [searchParams] = useSearchParams();
  const searchProductName = searchParams.get("product_name");
  const [sortedProductList, setSortedProductList] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");

  const handleProductList = async (searchName) => {
    setLoading(true);
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=1000${
          searchName && `&search={"name":"${searchName}"}`
        }`,
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
        SetProductList([]);
        return;
      }
      SetProductList(parseData.data);
      console.log(ProductList);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProductList(searchProductName);
  }, [searchParams]);
  const sortProducts = () => {
    // Create a copy of the original productList to avoid mutating state directly
    const sortedList = [...ProductList];
    sortedList.sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    console.log(sortedList, "sortedList");
    // @ts-ignore
    setSortedProductList([...sortedList]);
    // Toggle the sort order for the next click
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  return (
    <div>
      {loading && (
        <div className={Style.loading}>
          <TailSpin
            height="60"
            width="60"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {/* <button className={Style.shorbutton} onClick={sortProducts}>
        {sortOrder === "ascending" ? "lowToHigh" : "highToLow"}
      </button> */}
      {ProductList && ProductList.length === 0 && (
        <p className={Style.productNotFount}>Products not found!</p>
      )}
      {sortedProductList.length > 0
        ? sortedProductList.map((product) => <ProductCard product={product} />)
        : ProductList.map((product) => <ProductCard product={product} />)}
    </div>
  );
};

export default AllProduct;
