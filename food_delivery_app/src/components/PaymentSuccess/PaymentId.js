import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./PaymentId.module.css";
import Modal from "../Modal/Modal";
const PaymentId = () => {
  const searchQuery = useSearchParams()[0];
  const paymentId = searchQuery.get("reference");
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/");
  };
  return (
    <Modal class={classes.modal}>
      <div className={classes.orderDetail}>
        <h2>Your order will be delivered in next 45 min!</h2>

        <p>{`Your Payment Id: ${paymentId}`}</p>
        <button onClick={navigateHandler}>Okay</button>
      </div>
    </Modal>
  );
};

export default PaymentId;
