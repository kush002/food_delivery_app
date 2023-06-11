import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import classes from "./MenuBars.module.css";
import HemburgerMenu from "./HemburgerMenu/HemburgerMenu";
import HeaderCartButton from "./HeaderCartButton";

const MenuBars = () => {
  const [toggle, setToggle] = useState(false);

  const showMenuHandler = () => {
    setToggle(true);
  };

  const hideMenuHandler = () => {
    setToggle(false);
  };
  return (
    <div className={classes.barCart}>
      <HeaderCartButton className={classes.showCart} />
      <FontAwesomeIcon
        onClick={showMenuHandler}
        className={classes.showIcon}
        icon={faBars}
        size="lg"
        style={{ color: "#fbffdc" }}
      />
      {toggle && <HemburgerMenu onClick={hideMenuHandler} />}
    </div>
  );
};

export default MenuBars;
