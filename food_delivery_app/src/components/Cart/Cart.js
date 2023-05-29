import classes from "./Cart.module.css";
import Card from "../UI/Card";
import Orders from "./Orders";
import BillInfo from "./BillInfo";
import { useSelector } from "react-redux";

const Cart = ({ cart }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  // dispatch(cartActions.replaceCart({ ...cart }));
  // }, [cart]);

  const cartItems = useSelector((state) => state.cart.items);
  console.log("kumma:", cartItems);
  // const cartItems = cart.items;
  return (
    <Card>
      <div className={classes.orderInfo_container}>
        <div className={classes.container_1}>
          <div className={classes.card}>
            {cartItems.map((item) => (
              <Orders key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div className={classes.container_2}>
          <BillInfo className={classes.card} />
        </div>
      </div>
    </Card>
  );
};

export default Cart;
