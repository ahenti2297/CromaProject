// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import Style from "./CheckOut.module.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CheckOutProductCard from "../Cards/CheckOutProductCard";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { CartValue } from "../../App";

const CheckOut = () => {
  const [cartList, SetCartList] = useState("");
  const [allData, setAllData] = useState({});
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const { setCartNum } = useContext(CartValue);

  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const UserLocation = localStorage.getItem("locationDetails");
  const parseUserLocation = JSON.parse(UserLocation);
  const navigate = useNavigate();
  const getAllProduct = async () => {
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
      // console.log(parseData.data);
      if (responce.status >= 400) {
        console.log(parseData.message || "Product not Found");
        return;
      }
      SetCartList(parseData?.data?.items);
      // console.log(parseData?.data?.items);
      setAllData(parseData);
      console.log(parseData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  const MaltipalProductPaynow = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/order/convertCartToOrder`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "7dey245ji457",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressType: "HOME",
            address: {
              street: parseUserLocation?.Street,
              city: parseUserLocation?.City,
              state: parseUserLocation?.State,
              country: parseUserLocation?.Country,
              zipCode: parseUserLocation?.Zipcode,
            },
          }),
        }
      );
      const data = await responce.json();
      // console.log(data);
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
        toast.success("Order Place Successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setCartNum(0);
        SetCartList("");
        setCardNumber("");
        setCardExpiry("");
        setCvv("");
        setTimeout(() => {
          navigate("/MyOrder");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const gotofeatureUpdate = () => {
    navigate("/UpdateSoon");
  };
  return (
    <div className={Style.ContentWrraper}>
      <div className={Style.leftSection}>
        <div className={Style.totalPay}>
          <div className={Style.PaybleAmount}>
            Payable amount: <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
            {allData?.data?.totalPrice}.00
          </div>
        </div>
        <div className={Style.cardScreen}>
          <div className={Style.Heading}>Payment</div>
          <div className={Style.PaymentContainer}>
            <div className={Style.PaymentOption}>
              <div className={Style.creditOption}>
                <AddCardIcon style={{ color: "aqua" }} />
                Credit/Debit Cards
              </div>
              <div className={Style.creditOptions} onClick={gotofeatureUpdate}>
                <span>%</span>
                Pay in EMI
              </div>
              <div className={Style.creditOptions} onClick={gotofeatureUpdate}>
                <AccountBalanceTwoToneIcon style={{ color: "aqua" }} />
                NetBanking
              </div>
            </div>
            <div className={Style.paymentOptionDetails}>
              <div className={Style.optionHeading}>
                Enter Debit/ Credit Card Details
              </div>
              <form
                className={Style.CardContainer}
                onSubmit={MaltipalProductPaynow}
              >
                <div className={Style.cardInputHeading}>Card Number</div>
                <input
                  type="number"
                  className={Style.CardNumber}
                  placeholder="Enter card number hear"
                  pattern="[0-9]{16}"
                  required
                  onChange={setCardNumber}
                />
                <div className={Style.CardDetails}>
                  <div>
                    <label>Expiry</label>
                    <input
                      type="text"
                      className={Style.detailInput}
                      placeholder="MM/YY"
                      pattern="\d{2}\/\d{4}"
                      required
                      onChange={setCardExpiry}
                    />
                  </div>
                  <div>
                    <label>CVV</label>
                    <input
                      type="number"
                      className={Style.detailInput}
                      placeholder="CVV"
                      pattern="[0-9]{3}"
                      required
                      onChange={setCvv}
                    />
                  </div>
                </div>
                <button type="submit" className={Style.PlaceOrderButton}>
                  Place Order & Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.rightSection}>
        <div className={Style.orderDetails}>
          <div className={Style.OrderSummary}>
            <h3>Order Summary</h3>
            <div>
              {cartList &&
                cartList?.map((product, index) => (
                  <CheckOutProductCard
                    product={product}
                    key={index}
                    SetCartList={SetCartList}
                  />
                ))}
            </div>
            <div>
              <div className={Style.addressHeading}>
                Shipping Address <span className={Style.AddressType}>Home</span>
              </div>
              <div className={Style.address}>
                {parseUserLocation?.Street}
              </div>
              <div className={Style.address}>{parseUserLocation?.City},
                {parseUserLocation?.State}</div>
              <div className={Style.address}>{parseUserLocation?.Zipcode}</div>

            </div>
          </div>
          <div className={Style.AmountDetails}>
            <div className={Style.Detail}>
              <h4>Amount Payable</h4>
              <div className={Style.Price}>
                <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                {allData?.data?.totalPrice}.00
              </div>
            </div>
            <div className={Style.Detail}>
              <h4>Delivery charges</h4>
              <div>Free</div>
            </div>
            <hr></hr>
            <div className={Style.Detail}>
              <h4>Net Amount</h4>
              <div className={Style.Price}>
                <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                {allData?.data?.totalPrice}.00
              </div>
            </div>
          </div>
        </div>
        <div>
          Instant discount offers on Apple, Oneplus and Samsung mobiles and
          devices will be applied on the verification page (OTP)
        </div>
        <div>
          By placing the order you have read & agreed to{" "}
          <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
