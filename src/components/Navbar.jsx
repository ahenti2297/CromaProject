// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "./MenuInNevbar/Menu.jsx";
import { useNavigate } from "react-router-dom";
import { CartValue } from "../App";
import Login from "./LogIn/Login.jsx";


function Navbar() {
  const { cartnum, setCartNum } = useContext(CartValue);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const navigate = useNavigate();
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  // console.log(parseUserLocation);
  // console.log("userdata", parseUserDetails);

  const toHome = () => {
    navigate("/");
  };
  const toProfile = () => {
    navigate("/profile");
  };
  const toCart = () => {
    if (!parseUserDetails || !parseUserDetails.token) {
      // navigate("/login");
      setIsOpen(true);
      console.log("User details or token not found.");
      return;
    }
    navigate("/cart");
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const toUpdate = () => {
    navigate("/udateAddress");
  };
  const customIconStyle = {
    fontSize: "16px",
  };
  const getCartItemNumber = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "7dey245ji457",
            "Content-Type": "application/json",
          },
        }
      );
      const parseData = await responce.json();
      if (responce.status >= 400) {
        console.log(parseData.message || "Product not Found");
        return;
      }
      setCartNum(parseData?.data?.items.length);
    } catch (err) {
      console.log(err);
    }
    //ok
  };
  useEffect(() => {
    getCartItemNumber();
    //fetchingdata
  }, [cartnum]);

  return (
    <header className={style.navbar_container}>
      <div className={style.content}>
        <div className={style.left_part}>
          <div className={style.logoandMenu}>
            <img
              onClick={toHome}
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1695191182/Croma%20Assets/CMS/Header/Sept%202023/Croma_Logo_Animation_option2_jnj1bo.gif"
              alt="Logo"
            ></img>
            <Menu />
          </div>
          <div className={style.inputfield}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newSearchParams = new URLSearchParams(
                  document.location.search
                );
                newSearchParams.set("product_name", searchValue);
                navigate({
                  pathname: "/allProduct",
                  search: newSearchParams.toString(),
                });
              }}
            >
              <input
                placeholder="What are you looking for ?"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </form>
            <SearchIcon
              className={style.searchIcon}
              onClick={() => {
                const newSearchParams = new URLSearchParams(
                  document.location.search
                );
                newSearchParams.set("product_name", searchValue);
                navigate({
                  pathname: "/allProduct",
                  search: newSearchParams.toString(),
                });
              }}
            />
          </div>
        </div>
        <div className={style.right_part}>
          <div className={style.location} onClick={toUpdate}>
            <LocationOnIcon />
            {parseUserLocation ? parseUserLocation.Zipcode : "location"},
            {parseUserLocation ? parseUserLocation.City : ""}
            <EditIcon className={style.editIcon} style={customIconStyle} />
          </div>
          <div>
            <PersonIcon className={style.UserIcon} onClick={toProfile} />
          </div>
          <div className={style.cart}>
            <ShoppingCartIcon onClick={toCart} />
            <p className={style.cartnumber}>{cartnum}</p>
          </div>
        </div>

      </div>
      <Login isOpen={isOpen} onClose={handleCloseModal} />
      
    </header>
    
  );
}

export default Navbar;
