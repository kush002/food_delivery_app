import { Link, NavLink, redirect, useRouteLoaderData } from "react-router-dom";
import { useState } from "react";
import MenuBars from "./MenuBars";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import LoginSignupButton from "../Auth/LoginSignupButton";

const Header = () => {
  // const [logout, setLogout] = useState(false);

  const token = useRouteLoaderData("root");
  const logoutHandler = () => {
    // setLogout(!logout);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    redirect("/login");
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Sunbloom Cafe</Link>
      </div>
      <nav className={classes.nav_menu}>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/menu"
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/categories"
              end
            >
              Categories
            </NavLink>
          </li>
        </ul>
        <div className={classes["account-details"]}>
          {token && (
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : classes.admin
                }
                to="/admin-page"
              >
                Admin
              </NavLink>
            </div>
          )}
          <div className={classes["account-details"]}>
            {token && (
              <HeaderCartButton className={classes["account-details"]} />
            )}
            {!token && <LoginSignupButton />}
          </div>
        </div>
      </nav>
      <MenuBars />
    </header>
  );
};

export default Header;
