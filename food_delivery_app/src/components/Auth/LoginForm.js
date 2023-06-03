import {
  Form,
  useNavigation,
  Link,
  useRouteLoaderData,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classes from "./LoginForm.module.css";

const LoginForm = ({ method, event }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [toggle, setToggle] = useState(false);
  const [guest, setGuest] = useState(false);
  const [login, setLogin] = useState(false);
  const showPasswordHandler = () => {
    setToggle(!toggle);
  };

  const guestHandler = (event) => {
    setGuest(true);
  };

  return (
    <div className={classes.container}>
      <h1>Login</h1>
      <Form method="post">
        <div className={classes.inputContainer}>
          <label htmlFor="emailId">Email</label>

          <input
            type="email"
            id="emailId"
            defaultValue={
              guest ? "guest@welcome.com" : event ? event.email : ""
            }
            name="userEmail"
            required
          />
        </div>
        <div className={classes.passwordContainer}>
          <label htmlFor="user_password">Password</label>
          <input
            type={!toggle ? "password" : "text"}
            id="user_password"
            defaultValue={guest ? "welcome" : event ? event.password : ""}
            required
            name="loginPassword"
          />
          <div className={classes.icon} onClick={showPasswordHandler}>
            {!toggle && <FontAwesomeIcon icon={faEye} />}
            {toggle && <FontAwesomeIcon icon={faEyeSlash} />}
          </div>
        </div>
        <div className={classes.button_wrapper}>
          <button disabled={isSubmitting}>
            {!guest && isSubmitting ? "Logging..." : "Let's Get Inside"}
          </button>
          <button onClick={guestHandler} disabled={isSubmitting}>
            {guest && isSubmitting ? "Logging..." : "Login As Guest"}
          </button>
        </div>
        <div className={classes.linkWrapper}>
          <Link>Forgot Your Password?</Link>
          <p>Still don't have an account ?</p>
          <Link to="/signup">SIGN UP</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
