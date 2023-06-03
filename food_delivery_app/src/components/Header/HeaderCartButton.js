import classes from "./HeaderCartButton.module.css";
import { useState } from "react";
import {} from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { NavLink, Link, Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
const HeaderCartButton = (props) => {
  const [toggle, setToggle] = useState(false);
  const qty = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const showOptionHandler = () => {
    setToggle(true);
  };
  const hideOptionHandler = () => {
    setToggle(false);
  };

  const onLogoutHandler = () => {
    dispatch(
      cartActions.onLogoutCart({
        items: [],
        totalQuantity: 0,
      })
    );
  };

  return (
    <Form action="/logout" method="post" className={props.className}>
      <div className={classes.button}>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/orders"
        >
          <span className={classes.icon}>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>{" "}
          <span>Your Cart</span>
          <span className={classes.badge}>{qty}</span>
        </NavLink>
      </div>
      {props.hideAccount && (
        <div
          className={classes.accountButton}
          onMouseOver={showOptionHandler}
          onMouseLeave={hideOptionHandler}
        >
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? classes.active : classes.accountButtonNav
            }
          >
            <FontAwesomeIcon icon={faCircleUser} size="2xl" />
          </NavLink>
          {toggle && (
            <div className={classes.dropDown}>
              <Link to="/account">My Account</Link>

              <button className={classes.btn} onClick={onLogoutHandler}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </Form>
  );
};

export default HeaderCartButton;
