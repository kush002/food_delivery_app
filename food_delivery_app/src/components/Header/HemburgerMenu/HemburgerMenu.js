import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import Modal from "../../Modal/Modal";
import classes from "./HemburgerMenu.module.css";

import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";

const HemburgerMenu = ({ onClick }) => {
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    dispatch(
      cartActions.onLogoutCart({
        items: [],
        totalQuantity: 0,
      })
    );

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return redirect("/");
  };
  return (
    <Modal class={classes.modal} onClick={onClick}>
      <div className={classes.menu}>
        <ul className={classes.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/admin-page">Admin</Link>
          </li>
          <li>
            <Link to="/orders">Cart</Link>
          </li>
          <li>
            <Link to="/account/address">My Account</Link>
          </li>
          <li>
            <Link onClick={onLogoutHandler}>Logout</Link>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default HemburgerMenu;
