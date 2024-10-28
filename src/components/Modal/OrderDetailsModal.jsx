// OrderDetailsModal.js
import React, { useEffect, useState } from "react";
import Style from "./OrderDetailsModal.module.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const OrderDetailsModal = ({ product, isOpen, onClose }) => {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        if (isOpen) {
            setProductDetails(product.order.items);
        }
    }, [isOpen, product]);

    if (!isOpen) {
        return null;
    }
    // console.log(product)

    const date = new Date(product.createdAt);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    return (
        <div className={Style.modal}>
            <div className={Style.modalContent}>
                {productDetails.map((item, index) => (
                    <div className={Style.ProductContainer} key={index}>
                        <div className={Style.ProductDetail}>
                            <div className={Style.ProductImg}>
                                <img
                                    src={item?.product?.displayImage}
                                    alt="Product Image"
                                />
                            </div>
                            <div className={Style.ProductDetails}>
                                <p className={Style.ProductName}>
                                    {item?.product?.name}
                                </p>

                                <div className={Style.ProductPrice}>
                                    Price:<CurrencyRupeeIcon style={{ fontSize: "16px" }}/> {item?.product?.price}
                                </div>
                            </div>
                        </div>

                        

                    </div>
                ))}
                <div className={Style.shippingDetail}>Shipping Details</div>
                <div className={Style.home}>{product?.order?.shipmentDetails?.type}</div>
                <div className={Style.shippingAddress}>{product?.order?.shipmentDetails?.address?.street}</div>
                <div className={Style.shippingAddress}>{product?.order?.shipmentDetails?.address?.city}</div>
                <div className={Style.shippingAddress}>{product?.order?.shipmentDetails?.address?.state}, {product?.order?.shipmentDetails?.address?.zipCode}</div>
                <div className={Style.hr}></div>
                <div className={Style.details}>
                <div className={Style.totalPriceWithicon}>Total price:<CurrencyRupeeIcon style={{ fontSize: "16px" }}/>{product?.order?.totalPrice}</div>
                <div>Number of Product: {product?.order?.items.length}</div>
                </div>
                <div className={Style.button} onClick={onClose}>
                            Close
                        </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
