import { useDispatch } from "react-redux";
import classes from "./Orders.module.css";
import { cartActions } from "../../store/cart-slice";

const Orders = (props) => {
  const { item } = props;

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart({ ...item, quantity: 1 }));
  };

  const removeFromCartHandler = () => {
    dispatch(cartActions.removeFromCart(item._id));
  };

  return (
    <>
      <div key={item._id} className={classes.menuItem_container}>
        <div className={classes.image}>
          <img src={item.imageUrl} alt="Img.beer.jpg" />
        </div>
        <div className={classes.content}>
          <h1>{item.itemName}</h1>
          <h2>Rs. {item.price}</h2>
        </div>
        <div className={classes.button}>x {item.quantity}</div>
        <div className={classes.pricing}>
          <div className={classes.qty_mng}>
            <button type="button" onClick={removeFromCartHandler}>
              -
            </button>
            <button type="button" onClick={addToCartHandler}>
              +
            </button>
          </div>
          <div>
            <p>Subtotal</p>
            <h2>Rs. {item.totalPrice}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
