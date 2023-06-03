import classes from "./BillInfo.module.css";
import Card from "../UI/Card";

const BillInfo = (props) => {
  let price = 0;
  props.items.forEach((element) => {
    price += element.totalPrice;
  });
  return (
    <div className={props.className}>
      <div className={classes.container}>
        <div className={classes.tag}>Price Details</div>
        <div className={classes.cartTotal}>
          <span className={classes.left}>Price</span>
          <span className={classes.right}>Rs. {price}</span>
          <span className={classes.left}>Discount</span>
          <span className={classes.right}>-Rs. 100</span>
          <span className={classes.left}>Delivery Chanrges</span>
          <span className={classes.right}>Rs. 50</span>
          <span className={classes.left}>Coupon</span>
          <span className={classes.right}>Rs. 0</span>
        </div>
        <div className={classes.totalPrice}>
          <span>Total</span>
          <span>Rs. {price - 100 + 50}</span>
        </div>

        <div className={classes.containerInput}>
          <div className={classes.inputContainer}>
            <label htmlFor="category_name">Do you have Coupon Code !</label>

            <input
              type="text"
              id="category_name"
              // defaultValue={event ? event.categoryName : ""}
              name="categoryName"
              placeholder="Try Cafe-Bloom"
              //   required
            />
          </div>

          <div className={classes.button_wrapper}>
            <button onClick={props.onChange}>Apply Coupon</button>
          </div>
        </div>
        <div className={classes.order_button_wrapper}>
          <button onClick={props.onChange}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default BillInfo;
