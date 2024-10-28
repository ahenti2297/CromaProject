// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Style from "./indexMenu.module.css";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [showModal, setShowModal] = useState(false);
  const MenuIconRef = useRef(null);
  const Navigate = useNavigate();
  useEffect(() => {
    const hideModal = (e) => {
      if (MenuIconRef.current) {
        if (MenuIconRef.current.contains(e.target)) {
          return;
        }
        setShowModal(false);
      }
    };
    if (showModal) {
      document.addEventListener("click", hideModal);
    }
    return () => {
      document.removeEventListener("click", hideModal);
    };
  }, [showModal]);
  const gotoTelevition = () => {
    Navigate("/subCategory/tv");
    setShowModal(false);
  };
  const gotoLaptop = () => {
    Navigate("/subCategory/laptop");
    setShowModal(false);
  };
  const gotoHomeAppliance = () => {
    Navigate("/subCategory/refrigerator");
    setShowModal(false);
  };
  const gotoHealth = () => {
    Navigate("/subCategory/health");
    setShowModal(false);
  };
  const gotokitchenappliances = () => {
    Navigate("/subCategory/kitchenappliances");
    setShowModal(false);
  };
  const gotoaudio = () => {
    Navigate("/subCategory/audio");
    setShowModal(false);
  };
  const gototravel = () => {
    Navigate("/subCategory/travel");
    setShowModal(false);
  };
  const gotoPhones = () => {
    Navigate("/subCategory/mobile");
    setShowModal(false);
  };
  const gotoUpdateSoon = () => {
    Navigate("/UpdateSoon");
  };

  return (
    <div className={Style.menu}>
      <div
        className={Style.menuInNav}
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(!showModal);
        }}
      >
        {showModal ? (
          <CloseOutlinedIcon className={Style.closeIcon} />
        ) : (
          <MenuIcon className={Style.menuIcon} />
        )}
        Menu
      </div>
      {showModal && (
        <section
          ref={MenuIconRef}
          className={Style.menuContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={Style.services}>
            <div onClick={gotoUpdateSoon}>
              <NewReleasesOutlinedIcon />
              Exclusive At Croma
            </div>
            <div onClick={gotoUpdateSoon}>
              <EmojiEventsOutlinedIcon />
              Top Brands
            </div>
            <div onClick={gotoUpdateSoon}>
              <StorefrontSharpIcon />
              croma Store Locator
            </div>
            <div onClick={gotoUpdateSoon}>
              <PaymentOutlinedIcon />
              Gift Card
            </div>
          </div>
          <div className={Style.Category}>
            <h3 className={Style.heading}>Shop By Category</h3>
            <div onClick={gotoTelevition}>Television & Accessories</div>
            <div onClick={gotoHomeAppliance}>Home Appliance</div>
            <div onClick={gotoPhones}>Phones & Wearables</div>
            <div onClick={gotoLaptop}>Computer & Tablets</div>
            <div onClick={gotokitchenappliances}>Kitchen Appliances</div>
            <div onClick={gotoaudio}> Audio & video</div>
            <div onClick={gotoHealth}>Health & Fitness</div>
            <div onClick={gototravel}>Grooming & Personal Care</div>
            <div>Cameras & Accessories</div>
            <div>Smart Devises</div>
            <div>Gaming</div>
            <div>Accessries</div>
            <div>Zipcare</div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Menu;
