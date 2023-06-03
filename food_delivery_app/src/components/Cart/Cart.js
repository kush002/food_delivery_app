import classes from "./Cart.module.css";
import Card from "../UI/Card";
import Orders from "./Orders";
import BillInfo from "./BillInfo";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cart }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  // dispatch(cartActions.replaceCart({ ...cart }));
  // }, [cart]);

  const cartItems = useSelector((state) => state.cart.items);
  console.log("kumma:", cartItems);
  // const cartItems = cart.items;
  return (
    <Card style={{ background: "rgba(0,0,0,0)", boxShadow: "none" }}>
      <div className={classes.orderInfo_container}>
        {cartItems.length === 0 && (
          <div
            className={classes.iconContainer}
            style={{ width: "90%", zIndex: 30 }}
          >
            <div className={classes.cartText}>Empty cart !</div>
            <FontAwesomeIcon
              icon={faCartShopping}
              size="2xl"
              className={classes.icon}
            />
          </div>
        )}
        {cartItems.length > 0 && (
          <div className={classes.container_1}>
            <div className={classes.card}>
              {cartItems &&
                cartItems.map((item) => <Orders key={item._id} item={item} />)}
            </div>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className={classes.container_2}>
            <BillInfo className={classes.card} items={cartItems} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Cart;
