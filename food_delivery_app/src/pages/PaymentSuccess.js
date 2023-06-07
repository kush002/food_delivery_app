import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import Card from "../components/UI/Card";
import { Modal } from "../components/Modal/Modal";
import PaymentId from "../components/PaymentSuccess/PaymentId";
const PaymentSuccess = () => {
  return <PaymentId />;
};

export default PaymentSuccess;
