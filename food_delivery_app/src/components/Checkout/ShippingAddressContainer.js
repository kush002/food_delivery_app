import classes from "./ShippingAddressContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ShippingAddressContainer = () => {
  const [select, setSelect] = useState(false);
  const selectAddressHandler = () => {
    setSelect(!select);
  };

  const classContent = select
    ? `${classes.addressContainer} ${classes.addressContainerSelect}`
    : classes.addressContainer;
  return (
    <div className={classContent} onClick={selectAddressHandler}>
      <div>
        <p>Address: Flat no. 1103, xyz Colony</p>
        <p>City: Jaipur</p>
        <p>State: Rajasthan</p>
        <p>Country: India</p>
        <p>Postal Code: 302020</p>
        <p>Phone: 9999999999</p>
      </div>
      <div className={classes.icons}>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faPenToSquare} size="lg" />
        </div>
        <div className={classes.icon}>
          {" "}
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressContainer;
