import classes from "./Payment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
const Payment = () => {
  return (
    <div className={classes.payment}>
      <h2>Credit Card Payment Integration</h2>
      <div className={classes.icon_container}>
        <FontAwesomeIcon
          className={classes.icon}
          icon={faCreditCard}
          size="2xl"
        />
      </div>
      <h2 className={classes.footer}>Coming Soon</h2>
    </div>
  );
};

export default Payment;
