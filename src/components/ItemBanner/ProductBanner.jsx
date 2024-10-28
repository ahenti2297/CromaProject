import React from "react";
import { NavLink } from "react-router-dom";

const ProductBanner = () => {
  return (
    <>
      <div className="image-ad">
        <div>
          <NavLink to="/Product/65153c11c2bdf54cfdbd06d2">
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1696915634/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/Oct%202023/10-10-2023/10.56%20am/HP_2Split_AppleAtCroma_macbook_10oct2023_w4h7c9.png?tr=w-1024"
              alt="macbook"
              className="apple-image-add"
            />
          </NavLink>
        </div>
        <div>
          <NavLink to="/Product/65117372c15e83afc68be097">
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697004188/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/Oct%202023/11-10-2023/HP_2Split_AppleAtCroma_iPhone13_11Oct2023_cndllu.png?tr=w-1024"
              alt="ipohne"
              className="apple-image-add"
            />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ProductBanner;
