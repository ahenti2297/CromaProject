import React, { useState } from "react";
import Carousel from "./Carousel/Carousel";
import { CAROUSEL_DATA } from "./Carousel/constants";
import Brand from "./CategoryList/Brand";
import Categories from "./CategoryList/Categories";
import TrandingProduct from "./DealsOnCroma/TrandingProduct";
import KitchenAppliances from "./Pages/KitchenAppliances";
import Footer from "./Footer";
import ProductBanner from "./ItemBanner/ProductBanner";
import DealOnLeptop from "./DealsOnCroma/DealOnLeptop";
import DealOnAc from "./DealsOnCroma/DealOnAc";
import DealOnAudio from "./DealsOnCroma/DealOnAudio";
import Login from "./LogIn/Login";
const Home = () => {
  const [showLoginPage, setShowLoginPage] = useState(false);
  return (
    <div>
      <Carousel data={CAROUSEL_DATA.slides} />
      <div className="offer">
        <img src="https://mouhumi-croma-clone.netlify.app/static/media/hdfc-banner.ec286e91a06140a527a8.webp" />
        <img src="https://mouhumi-croma-clone.netlify.app/static/media/paytm.c3c162b7900e3671cc05.png" />
      </div>
      <div className="productSection">
        <Categories />
      </div>
      <div className="productSection">
        <h2>Top Tranding Deal</h2>
        <TrandingProduct setShowLoginPage={setShowLoginPage}/>
      </div>
      <div className="productSection">
        <h2>Kitchen Appliances</h2>
        <KitchenAppliances setShowLoginPage={setShowLoginPage}/>
      </div>
      <div className="productSection">
        <h2>Apple at Croma</h2>
        <ProductBanner setShowLoginPage={setShowLoginPage}/>
      </div>
      <div className="productSection">
        <h2>Deal on Audio</h2>
        <DealOnAudio setShowLoginPage={setShowLoginPage}/>
      </div>
      <div className="productSection">
        <h2>Brands</h2>
        <Brand />
      </div>
      <div className="productSection">
        <h2>Deal on Leptop</h2>
        <DealOnLeptop setShowLoginPage={setShowLoginPage}/>
      </div>
      <div className="productSection">
        <h2>Deal on Ac</h2>
        <DealOnAc setShowLoginPage={setShowLoginPage} />
      </div>
      <Login onClose={() => setShowLoginPage(false)} isOpen={showLoginPage} />
      <Footer />
    </div>
  );
};

export default Home;
