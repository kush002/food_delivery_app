import { Form, useNavigation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classes from "./LoginForm.module.css";

const LoginForm = ({ method, event }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [toggle, setToggle] = useState(false);
  const showPasswordHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div className={classes.container}>
      <h1>Create an account !</h1>
      <Form method="post">
        <div className={classes.inputContainer}>
          <label htmlFor="first_name">First Name</label>

          <input
            type="text"
            id="first_name"
            defaultValue={event ? event.firstName : ""}
            name="firstName"
            required
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            defaultValue={event ? event.lastName : ""}
            required
            name="lastName"
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="emailId">Email</label>

          <input
            type="email"
            id="emailId"
            defaultValue={event ? event.email : ""}
            name="email"
            required
          />
        </div>
        <div className={classes.passwordContainer}>
          <label htmlFor="user_password">Password</label>
          <input
            type={!toggle ? "password" : "text"}
            id="user_password"
            defaultValue={event ? event.password : ""}
            required
            name="password"
          />
          <div className={classes.icon} onClick={showPasswordHandler}>
            {!toggle && <FontAwesomeIcon icon={faEye} />}
            {toggle && <FontAwesomeIcon icon={faEyeSlash} />}
          </div>
        </div>
        <div className={classes.button_wrapper}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "SignningUp..." : "Create My Account !"}
          </button>
        </div>
        <div className={classes.linkWrapper}>
          <p>Already have an account? ?</p>
          <Link to="/login">LOGIN</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
