import { NavLink, useRouteLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classes from "./LoginSignupButton.module.css";

const LoginSignupButton = () => {
  const [toggle, setToogle] = useState(false);
  const token = useRouteLoaderData("root");
  const showButtonHandler = () => {
    setToogle(!toggle);
  };

  return (
    <div className={classes.container} onClick={showButtonHandler}>
      <div>
        {!toggle && (
          <NavLink to="/login">
            <span>Login</span> <FontAwesomeIcon icon={faRightToBracket} />
          </NavLink>
        )}
      </div>
      <div>
        {toggle && (
          <NavLink to="/signup">
            <span>SignUp</span>
            <FontAwesomeIcon icon={faRightToBracket} />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default LoginSignupButton;
