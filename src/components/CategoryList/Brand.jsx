import React from "react";
import Style from "./index.module.css";
import { brands } from "../../utils/brands";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";

const Brand = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };
  return (
    <div className={Style.mainContainer}>
      <Carousel responsive={responsive}>
        {brands.map((brand, index) => {
          return (
            <NavLink key={index} to={`/brandpage/${brand.brand}`}>
              <div>
                <img
                  className={Style.mainContainer}
                  src={brand.url}
                  alt="brand logo"
                />
              </div>
            </NavLink>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Brand;
