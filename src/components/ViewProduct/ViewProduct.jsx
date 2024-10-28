// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import Style from "./ViewProduct.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StoreIcon from "@mui/icons-material/Store";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartValue } from "../../App";
import { getRandomDecimal } from "../../utils/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewProduct = () => {
  const rating = getRandomDecimal();
  const { setCartNum } = useContext(CartValue);
  const [Product, setProduct] = useState();
  const [wishList, setWishList] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [ratting, setRatting] = useState(1); // Initial rating value
  const [Review, setReview] = useState("");
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  const navigate = useNavigate();

  const calculateDiscount = (price) => {
    if (price < 1000) {
      return 200;
    } else if (price >= 1000 && price <= 5000) {
      return 600;
    } else if (price > 5000 && price <= 50000) {
      return 2500;
    } else {
      return 5000;
    }
  };
  
  // const discount = calculateDiscount(Product.price);
  // const mrp = Product.price + discount;

  const { productID } = useParams();
  const url = `https://academics.newtonschool.co/api/v1/ecommerce/product/${productID}`;
  const handleProduct = async () => {
    const responce = await fetch(url, {
      method: "GET",
      headers: {
        projectId: "7dey245ji457",
      },
    });
    const parseData = await responce.json();
    console.log(parseData.data);
    if (responce.status >= 400) {
      console.log(parseData.message || "Product not Found");
      return;
    }
    setProduct(parseData.data);
    setReview(parseData.data.reviews);
  };
  const AddWishList = async (e) => {
    e.stopPropagation();
    try {
      if (!parseUserDetails || !parseUserDetails.token) {
        navigate("/login");
        console.log("User details or token not found.");
        return;
      }
      const responce = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "z9qnjrap5ytl",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: Product._id,
          }),
        }
      );
      const data = await responce.json();
      console.log(data);
      if (responce.status >= 400) {
        toast.error(`${data.message}`, {
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
        setWishList(true);
        toast.success("item added to wishList successfully!", {
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
  const AddtoCart = async () => {
    try {
      if (!parseUserDetails || !parseUserDetails.token) {
        navigate("/login");
        console.log("User details or token not found.");
        return;
      } else {
        const responce = await fetch(
          `https://academics.newtonschool.co/api/v1/ecommerce/cart/${Product._id} `,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${parseUserDetails.token}`,
              projectId: "z9qnjrap5ytl",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await responce.json();
        console.log(data);
        if (responce.status >= 400) {
          toast.error(`item already in cart`, {
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
          setCartNum((prev) => prev + 1);
          toast.success("item added to cart successfully!", {
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
      }
    } catch (err) {
      console.log(err);
    }
  };
  const BuyNow = async () => {
    try {
      if (!parseUserDetails || !parseUserDetails.token) {
        navigate("/login");
        console.log("User details or token not found.");
        return;
      } else {
        const responce = await fetch(
          `https://academics.newtonschool.co/api/v1/ecommerce/cart/${Product._id} `,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${parseUserDetails.token}`,
              projectId: "z9qnjrap5ytl",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await responce.json();
        console.log(data);
        if (responce.status >= 400) {
          navigate("/cart");
          return;
        } else {
          setCartNum((prev) => prev + 1);
          navigate("/cart");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmitReview = () => {
    if (Review.length > 0) {
      setRatting(1);
      setReview("");
      toast.success("Review added Successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Please Write a review", {
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
  };
  // const AddReview = async (e) => {
  //   // e.stopPropagation();
  //   try {
  //     if (!parseUserDetails || !parseUserDetails.token) {
  //       navigate("/login");
  //       console.log("User details or token not found.");
  //       return;
  //     } else {
  //       const responce = await fetch(
  //         `https://academics.newtonschool.co/api/v1/ecommerce/review/${Product._id} `,
  //         {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${parseUserDetails.token}`,
  //             projectId: "z9qnjrap5ytl",
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const data = await responce.json();
  //       console.log(data);
  //       if (responce.status >= 400) {
  //         alert(data.message);
  //         return;
  //       } else {
  //         alert("add Successfully!");
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (productID) {
      handleProduct();
    }
  }, [productID]);
  if (!Product) {
    return "Loading";
  }
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <div className={Style.ViewProductContainer}>
        <div className={Style.ProductDetailContainer}>
          <div className={Style.ProductImageContainer}>
            {/* <div className={Style.ProductImages}>
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1680264497/Croma%20Assets/Entertainment/Television/Images/255758_ndwfvq.png"
              alt="ProductImg1"
            />
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1669009608/Croma%20Assets/Entertainment/Television/Images/255758_2_jtwav6.png"
              alt="productImg2"
            />
          </div> */}
            <div className={Style.ProductImages}>
              <div className={Style.icons}>
                <div onClick={AddWishList}>
                  {wishList ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </div>
                <div>
                  <ShareOutlinedIcon style={{ cursor: "not-allowed" }} />
                </div>
              </div>
              <img src={Product.displayImage} alt="ProductImg" />
              <div className={Style.CampareProduct}>
                <div className={Style.disebleButton}>
                  <input type="checkbox" />
                  Compare
                </div>
                <div className={Style.disebleButton}>
                  <StoreIcon />
                  Connect To Store
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={Style.ProductName}>{Product.name}</div>
            {/* <Rating
              name="product-rating"
              value={rating}
              precision={0.5}
              onChange={(event, newRating) => setRating(newRating)}
              emptyIcon={<StarBorderIcon style={{ color: "white" }} />}
              icon={<StarIcon style={{ color: "yellow" }} />}
            /> */}
            <div className={Style.ExtraDiscount}>Extra Rs {calculateDiscount(Product.price)} Discount</div>
            <div className={Style.ProductRating}>
              <div>{rating}</div>
              <StarIcon style={{ fontSize: "16px" }} />
              {/* <div>({Product.reviews.length}Reviews)</div> */}
            </div>
            <div className={Style.ProductPrice}>
              <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
              <div> {Product.price}.00</div>
            </div>
            <div className={Style.tex}>(Incl. all Texes)</div>
            <div className={Style.hrline}></div>
            <div className={Style.mrp}>
              <div className={Style.total_price}>MRP: {calculateDiscount(Product.price) + Product.price}.00</div>
              <div className={Style.saveDiscount}>(Save <CurrencyRupeeIcon style={{ fontSize: "14px" }} />{calculateDiscount(Product.price)})</div>
            </div>
            <div className={Style.hrline}></div>

            <div className={Style.deliveryAddress}>
              <div className={Style.DeliveryAddress}>
                Delivery at: 
                {parseUserLocation?.Zipcode ? `${ parseUserLocation?.City}, ${parseUserLocation?.Zipcode}` : <Link to="/udateAddress" >Enter pincode</Link>}
              </div>
              {parseUserLocation?.Pincode ? (<div className={Style.StanderdDelivery}>
                Standard Delivery by Tomorrow
              </div>):(<div className={Style.StanderdDelivery}>
                Standard Delivery Will be Available
              </div>)}
              
            </div>
            <div className={Style.KeyFeatures}>
              <p>Key Features</p>
              <ul>
                {Product.features.map((item, idx) => {
                  return <li key={idx}>{item}</li>;
                })}
              </ul>
            </div>
            <div className={Style.careImg}></div>
            <div className={Style.button}>
              <button onClick={BuyNow}>Buy now</button>
              <button onClick={AddtoCart}>Add to cart</button>
            </div>
          </div>
        </div>
        <div className={Style.Description}>
          <h3>Overview</h3>
          <br></br>
          <div
            dangerouslySetInnerHTML={{
              __html: showMore
                ? Product.description
                : Product.description.slice(0, 500),
            }}
          />
          {!showMore && (
            <button onClick={toggleShowMore} className={Style.ShowMoreButton}>
              Show More
            </button>
          )}
          {showMore && (
            <button onClick={toggleShowMore} className={Style.ShowMoreButton}>
              Show Less
            </button>
          )}
        </div>
        <div className={Style.Review}>
          <h2>Review</h2>
          <div className={Style.AddReview}>
            <div>Review this product</div>
            <div>Help other customers make their decisions</div>
            <div>
              <label htmlFor="rating">Rating : </label>

              <select
                name="Rating"
                id="rating"
                value={ratting}
                onChange={(e) => setRatting(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <textarea
              placeholder="Write a Review"
              value={Review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              className={Style.SubmitReview}
              onClick={handleSubmitReview}
            // disabled={Review.length <= 0}
            >
              Submit
            </button>
          </div>
          <div className={Style.ConstomersReview}>
            <h3>Customer Reviews:</h3>
            {/* {Review &&
              Review.map((constomer, index) => (
                <div key={index}>
                  <div>constomer Name</div>
                  <div>Ratings in star</div>
                  <span>review Date</span>
                  <div>Review content</div>
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
