import classes from "./ShippingAddressContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useState } from "react";
import { getToken } from "../../util/user";
import { json, redirect, useNavigate } from "react-router-dom";

const ShippingAddressContainer = ({ addressData }) => {
  const [firstadd, setFirstadd] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectAddressHandler = (addressID) => {
    setSelectedId(addressID);
  };
  const navigate = useNavigate();
  const deleteHandler = async (addressId) => {
    console.log(addressId);
    const response = await fetch(
      "http://localhost:8080/user/address/" + addressId,
      {
        method: "DELETE",
        headers: { Authorization: "Bearer " + getToken() },
      }
    );
    if (!response.ok) {
      throw json({ message: "Address does not exist" }, { status: 500 });
    }
    navigate("/checkout");
  };
  return (
    <Fragment>
      {addressData.map((address) => {
        const isSelected = address._id === selectedId;
        return (
          <div
            key={address._id}
            className={`${classes.addressContainer} ${
              isSelected ? classes.addressContainerSelect : ""
            }`}
            onClick={selectAddressHandler.bind(this, address._id)}
          >
            <div>
              <p>Address: {address.address}</p>
              <p>City: {address.city}</p>
              <p>State: {address.state}</p>
              <p>Country: {address.country}</p>
              <p>Postal Code: {address.postalCode}</p>
              <p>Phone: {address.phone}</p>
            </div>
            <div className={classes.icons}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faPenToSquare} size="lg" />
              </div>
              <div
                className={classes.icon}
                onClick={deleteHandler.bind(this, address._id)}
              >
                {" "}
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ShippingAddressContainer;
