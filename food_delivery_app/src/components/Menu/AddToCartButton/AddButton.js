import { useDispatch } from "react-redux";
import { useRef } from "react";
import classes from "./AddButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { cartActions } from "../../../store/cart-slice";

const AddButton = ({ item }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { itemName, imageUrl, price, _id } = item;
  const addToCartHandler = (event) => {
    event.preventDefault();
    dispatch(
      cartActions.addToCart({
        itemName,
        imageUrl,
        price,
        _id,
        quantity: inputRef.current.value > 1 ? +inputRef.current.value : 1,
      })
    );
    console.log(+inputRef.current.value);
  };

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
