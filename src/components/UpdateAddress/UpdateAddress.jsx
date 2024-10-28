import React, { useState } from "react";
import Style from "./UpdateAddress.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateAddress = () => {
  const [Street, setStreet] = useState("");
  const [city, Setcity] = useState("");
  const [State, SetState] = useState("");
  const [Country, SetCountry] = useState("");
  const [Zipcode, setZipcode] = useState("");
  const navigate = useNavigate();
  const LocationDetails = {
    Street: Street,
    City: city,
    State: State,
    Country: Country,
    Zipcode: Zipcode

  };

  const handleContinue = () => {
    setStreet("");
    SetState("");
    setZipcode("");
    Setcity("");
    SetCountry("");
    localStorage.setItem("locationDetails", JSON.stringify(LocationDetails));
    navigate(-1);
    toast.success("Address Update Successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className={Style.mainWrapper}>

      <div className={Style.mainContainer}>
        <div
          className={Style.crossButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          X
        </div>
        <div className={Style.contentSection}>
          <h2 className={Style.heading}>SELECT YOUR LOCATION</h2>
          <div className={Style.details}>
            To Check Products & Delivery Options available at your location
          </div>
          <div className={Style.street}>
            <label for="street">Street:</label>
            <input
              placeholder="Enter Your Street"
              id="street"
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className={Style.street}>

            <label for="city">City:</label>
            <input
              placeholder="Write City Name"
              id="city"
              onChange={(e) => Setcity(e.target.value)}
            />
          </div>
          <div className={Style.street}>

            <label for="state">State:</label>
            <input
              placeholder="Write complete Address" id="state"
              onChange={(e) => SetState(e.target.value)}
            ></input>
          </div>
          <div className={Style.street}>

            <label for="country">Country:</label>
            <input
              placeholder="Write complete Address" id="country"
              onChange={(e) => SetCountry(e.target.value)}
            ></input>
          </div>
          <div className={Style.street}>

            <label for="zipcode">Zipcode:</label>
            <input
              placeholder="Write complete Address" id="zipcode"
              onChange={(e) => setZipcode(e.target.value)}
            ></input>
          </div>
          <button onClick={handleContinue}>Save Address</button>

        </div>

      </div>
    </div>
  );
};

export default UpdateAddress;
