import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import classes from "./MenuBars.module.css";

const MenuBars = () => {
  const [toggle, setToggle] = useState(false);

  const showMenuHandler = () => {
    setToggle(!toggle);
  };
  return (
    <Fragment>
      <FontAwesomeIcon
        onClick={showMenuHandler}
        className={classes.showIcon}
        icon={faBars}
        size="lg"
        style={{ color: "#fbffdc" }}
      />
      {toggle && <h1>Hello</h1>}
    </Fragment>
  );
};

export default MenuBars;
