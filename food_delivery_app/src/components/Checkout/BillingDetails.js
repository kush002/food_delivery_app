import classes from "./BillingDetails.module.css";
// import Card from "../UI/Card";
import { Link, json } from "react-router-dom";
import { getToken } from "../../util/user";

const BillingDetails = (props) => {
  let price = 0;
  props.items.forEach((element) => {
    price += element.totalPrice;
  });

  let amount = price - 50;

  const paymentHandler = async () => {
    const keyRes = await fetch("http://localhost:8080/payment/getKey", {
      headers: { Authorization: "Bearer " + getToken() },
    });

    const reskey = await keyRes.json();

    const key = reskey.key;

    const response = await fetch("http://localhost:8080/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify({
        amount: amount,
        currency: "INR",
      }),
    });

    if (!response.ok) {
      throw json({ message: "payment unsuccessful" }, { status: 500 });
    }

    const resData = await response.json();

    const data = resData.data;
    console.log(data);

    const options = {
      key,
      amount: data.amount,
      currency: "INR",
      name: "Sunbloom Cafe",
      description: "Test Transaction",
      image:
        "https://lh4.googleusercontent.com/-9TroxpcbMsI/AAAAAAAAAAI/AAAAAAAAAAA/GGdMky5-bl8/s44-p-k-no-ns-nd/photo.jpg",
      order_id: data.id,
      callback_url: "http://localhost:8080/payment/verify",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      // customer_id: data.cartId.toString(),
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#0062ff",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
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
            <button>Apply Coupon</button>
          </div>
        </div>
        <Link to="">
          <div className={classes.order_button_wrapper}>
            <button type="button" onClick={paymentHandler}>
              Place Order
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BillingDetails;
