import React from "react";
import Style from "./index.module.css";
import { category } from "../../utils/category";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";

const Categories = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 9,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 7,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };
  return (
    <div className={Style.mainContainer}>
      <Carousel responsive={responsive}>
        {category.map((name, index) => {
          return (
            <NavLink key={index} to={`/subCategory/${name.category}`}>
              <div>
                <img
                  className={Style.categoryImage}
                  src={name.url}
                  alt="category Image"
                />
              </div>
            </NavLink>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Categories;
