import { useDispatch } from "react-redux";
import { useCallback, useRef } from "react";
import classes from "./AddButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { cartActions } from "../../../store/cart-slice";
import { getToken } from "../../../util/user";
import { useNavigate } from "react-router-dom";
const AddButton = ({ item }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const token = getToken();
  const navigate = useNavigate();
  const { itemName, imageUrl, price, _id } = item;
  const addToCartHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (token) {
        dispatch(
          cartActions.addToCart({
            itemName,
            imageUrl,
            price,
            _id,
            quantity: inputRef.current.value > 1 ? +inputRef.current.value : 1,
          })
        );
      } else {
        navigate("/login");
      }
    },
    [dispatch, itemName, imageUrl, price, _id, token, navigate]
  );

  return (
    <>
      <form className={classes.addToCart}>
        <div className={classes.addQuantity}>
          <label htmlFor="item_qty">Qty</label>
          <input
            ref={inputRef}
            type="number"
            id="item_qty"
            name="itemQty"
            min="1"
            max="5"
            defaultValue="1"
          />
        </div>
        <div className={classes.icon_container} onClick={addToCartHandler}>
          <FontAwesomeIcon
            className={classes.icon}
            icon={faCartPlus}
            size="2xl"
            // style={{ color: "#fbffdc" }}
          />
        </div>
      </form>
    </>
  );
};
export default AddButton;
