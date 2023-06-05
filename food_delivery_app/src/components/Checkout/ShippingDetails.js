import classes from "./ShippingDetails.module.css";
import { useState } from "react";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
const ShippingDetails = () => {
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // let isNormalLoad = l;?
  const navigate = useNavigate();
  const showAddressHandler = () => {
    setShowAddressDetails(true);
  };
  const hideAddressHandler = () => {
    setTimeout(() => {
      setShowAddressDetails(false);
      console.log(showAddressDetails);
      navigate("/checkout");
    }, 100);
  };
  return (
    <div className={classes.deliveryAddress} onClick={showAddressHandler}>
      <h2>Add Delivery address</h2>
      {!showAddressDetails && (
        <FontAwesomeIcon
          icon={faAddressCard}
          size="2xl"
          beatFade
          style={{ color: "var(--mytext-color)", cursor: "pointer" }}
        />
      )}
      {showAddressDetails && (
        <Form method="post" className={classes.addressContainer}>
          <div className={classes.inputContainer}>
            <label htmlFor="first-name">First name</label>
            <input type="" id="first-name" name="first-name" defaultValue="" />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="last-name">Last name</label>
            <input type="" id="last-name" name="last-name" defaultValue="" />
          </div>
          <div className={`${classes.inputContainer} ${classes.address}`}>
            <label htmlFor="address">Address</label>
            <input type="" id="address" name="address" defaultValue="" />
          </div>
          {/* <div className={`${classes.inputContainer} ${classes.apartment}`}>
          <label htmlFor="apartment">Apartment</label>
          <input type="" id="apartment" name="apartment" defaultValue="" />
        </div> */}
          <div className={classes.inputContainer}>
            <label htmlFor="city">City</label>
            <input type="" id="city" name="city" defaultValue="" />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="country">Country</label>
            <input type="" id="country" name="country" defaultValue="" />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="state">State</label>
            <input type="" id="state" name="state" defaultValue="" />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="postal-code">Postal Code</label>
            <input
              type=""
              id="postal-code"
              name="postal-code"
              defaultValue=""
            />
          </div>
          <div
            className={`${classes.inputContainer} ${classes.phone}`}
            id="phone"
          >
            <label htmlFor="phone">Phone</label>
            <input type="" id="phone" name="phone" defaultValue="" />
          </div>
          <div className={classes.button_wrapper}>
            <button disabled={isSubmitting} onClick={hideAddressHandler}>
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ShippingDetails;
