import classes from "./ShippingDetails.module.css";
import { useState } from "react";
import { Form, useNavigate, useNavigation } from "react-router-dom";

const ShippingDetails = ({ onChange, data, method }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // let isNormalLoad = l;?
  console.log(data, method);
  return (
    <Form method={method} className={classes.addressContainer}>
      <div className={classes.inputContainer}>
        <label htmlFor="first-name">First name</label>
        <input
          type=""
          id="first-name"
          name="first-name"
          defaultValue={data ? data.firstName : ""}
        />
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="last-name">Last name</label>
        <input
          type=""
          id="last-name"
          name="last-name"
          defaultValue={data ? data.lastName : ""}
        />
      </div>
      <div className={`${classes.inputContainer} ${classes.address}`}>
        <label htmlFor="address">Address</label>
        <input
          type=""
          id="address"
          name="address"
          defaultValue={data ? data.address : ""}
        />
      </div>
      {/* <div className={`${classes.inputContainer} ${classes.apartment}`}>
          <label htmlFor="apartment">Apartment</label>
          <input type="" id="apartment" name="apartment" defaultValue="" />
        </div> */}
      <div className={classes.inputContainer}>
        <label htmlFor="city">City</label>
        <input
          type=""
          id="city"
          name="city"
          defaultValue={data ? data.city : ""}
        />
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="country">Country</label>
        <input
          type=""
          id="country"
          name="country"
          defaultValue={data ? data.country : ""}
        />
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="state">State</label>
        <input
          type=""
          id="state"
          name="state"
          defaultValue={data ? data.state : ""}
        />
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="postal-code">Postal Code</label>
        <input
          type=""
          id="postal-code"
          name="postal-code"
          defaultValue={data ? data.postalCode : ""}
        />
      </div>
      <div className={`${classes.inputContainer} ${classes.phone}`} id="phone">
        <label htmlFor="phone">Phone</label>
        <input
          type=""
          id="phone"
          name="phone"
          defaultValue={data ? data.phone : ""}
        />
      </div>
      <div className={classes.button_wrapper}>
        <button disabled={isSubmitting} onClick={onChange}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
};

export default ShippingDetails;
