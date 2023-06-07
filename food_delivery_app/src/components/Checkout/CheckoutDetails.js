import classes from "./CheckoutDetails.module.css";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import ShippingDetails from "./ShippingDetails";
import BillDetails from "./BillingDetails";
// import ShippingAddressContainer from "./ShippingAddressContainer";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Address from "../Address/Address";
import { useState } from "react";
const CheckoutDetails = ({ addressData }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const [ordering, setOrdering] = useState(false);

  const paymentLoadingHandler = (data) => {
    setOrdering(data);
  };
  return (
    <Card className={classes.mainCardContainer}>
      <div className={classes.checkoutContainer}>
        {ordering && (
          <Card className={classes.paymentLoading}>
            Waiting for payment Confirmation...
          </Card>
        )}
        {!ordering && (
          <div className={classes.detailsForm}>
            <Address
              addressData={addressData}
              className={classes.deliveryAddress}
            />

            <div>
              <div className={classes.emailAddress}>
                <h2>Order summary</h2>
                <BillDetails
                  items={cartItems}
                  onChange={paymentLoadingHandler}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CheckoutDetails;
