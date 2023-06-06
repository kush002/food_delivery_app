import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShippingDetails from "./ShippingDetails";
import BillDetails from "../Checkout/BillingDetails";
import ShippingAddressContainer from "./ShippingAddressContainer";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

const Address = ({ addressData, className, changeFromAcc }) => {
  const navigate = useNavigate();
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [editState, setEditState] = useState(false);
  const showAddressHandler = () => {
    setShowAddressDetails(true);
    setEditState(false);
  };
  const hideAddressHandler = () => {
    setTimeout(() => {
      setShowAddressDetails(false);
      setEditState(false);

      navigate(`/${changeFromAcc ? "account" : "checkout"}/address`);
    }, 100);
  };
  const editChangeHandler = (data) => {
    setEditState(!editState);
    setShowAddressDetails(false);
    if (editState === false) {
      setEditFormData(null);
    }
    setEditFormData((prevData) => (prevData = data));
  };
  return (
    <div>
      {/* <div className={classes.emailAddress}>
          <h2>Contact information</h2>

          <div className={classes.emailContent}>
            <label htmlFor="email-address">Email address</label>
            <input
              type="email"
              id="email-address"
              name="email"
              defaultValue=""
            />
          </div>
        </div> */}
      <div className={className} onClick={showAddressHandler}>
        <h2>Add Delivery address</h2>
        {!showAddressDetails && (
          <FontAwesomeIcon
            icon={faAddressCard}
            size="2xl"
            beatFade
            style={{ color: "var(--mytext-color)", cursor: "pointer" }}
          />
        )}
      </div>
      {showAddressDetails && (
        <ShippingDetails onChange={hideAddressHandler} method={"POST"} />
      )}
      {editState && (
        <ShippingDetails
          onChange={hideAddressHandler}
          data={editFormData}
          method={"PUT"}
        />
      )}
      <ShippingAddressContainer
        addressData={addressData}
        onChange={editChangeHandler}
        account={changeFromAcc}
      />
    </div>
  );
};

export default Address;
