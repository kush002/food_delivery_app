import classes from "./CheckoutDetails.module.css";
import ShippingDetails from "./ShippingDetails";
import BillDetails from "./BillingDetails";
import ShippingAddressContainer from "./ShippingAddressContainer";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
const CheckoutDetails = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.mainCardContainer}>
      <div className={classes.checkoutContainer}>
        <div className={classes.detailsForm}>
          <div>
            {/* <div className={classes.emailAddress}>
              <h2>Contact information</h2>

              <div className={classes.emailContent}>
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  id="email-address"
                  name="email"
                  defaultValue=""
                />
              </div>
            </div> */}
            <ShippingDetails />
            <ShippingAddressContainer />
          </div>

          <div>
            <div className={classes.emailAddress}>
              <h2>Order summary</h2>
              <BillDetails items={cartItems} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CheckoutDetails;
