import classes from "./ShippingAddressContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useState } from "react";
import { getToken } from "../../util/user";
import { json, useNavigate, Link } from "react-router-dom";

const ShippingAddressContainer = ({ addressData, onChange, account }) => {
  // const [firstadd, setFirstadd] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectAddressHandler = (addressID) => {
    setSelectedId(addressID);
  };
  const navigate = useNavigate();

  const editHandler = async (a) => {
    console.log(a);
    onChange(a);
  };
  const deleteHandler = async (addressId) => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/user/address/` + addressId,
      {
        method: "DELETE",
        headers: { Authorization: "Bearer " + getToken() },
      }
    );
    if (!response.ok) {
      throw json({ message: "Address does not exist" }, { status: 500 });
    }
    navigate(`/${account ? "account" : "checkout"}/addressId`);
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
              <p
                style={{ fontWeight: "bold" }}
              >{`${address.firstName} ${address.lastName}`}</p>
              <p>{address.address},</p>
              <p>
                {address.city}, {address.state} ({address.postalCode}),
              </p>
              <p>{address.country}</p>

              <p>Phone number: {address.phone}</p>
            </div>
            <div className={classes.icons}>
              <Link
                to={`/${account ? "account" : "checkout"}/${address._id}`}
                className={classes.icon}
                onClick={editHandler.bind(this, address)}
              >
                <FontAwesomeIcon icon={faPenToSquare} size="lg" />
              </Link>
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
