import classes from "./MyAccount.module.css";
import Address from "../Address/Address";
import Payment from "./Payment";
import Card from "../UI/Card";
import { getName } from "../../util/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
const MyAccount = ({ addressData }) => {
  let changeFromAcc = true;
  return (
    <Card className={classes.mainCardContainer}>
      <div className={classes.checkoutContainer}>
        <div className={classes.icon_container}>
          <FontAwesomeIcon
            className={classes.icon}
            icon={faUserSecret}
            size="2xl"
          />
          <h2>Welcome {getName()}</h2>
        </div>

        <div className={classes.detailsForm}>
          <Address
            addressData={addressData}
            className={classes.deliveryAddress}
            changeFromAcc={changeFromAcc}
          />
          <Payment />
        </div>
      </div>
    </Card>
  );
};

export default MyAccount;
