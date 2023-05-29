import { Link } from "react-router-dom";
// import { useState } from "react";
import classes from "./CategoriesList.module.css";

const CategoriesList = ({ catList }) => {
  return (
    <div className={classes.category_container}>
      <h1>Categories</h1>
      <ul className={classes.list}>
        {catList.map((cat) => {
          return (
            <li key={cat._id} className={classes.listChild}>
              <img src={cat.categoryImage} alt={cat.categoryName} />
              <p>{cat.categoryName}</p>
              <Link to={cat.categoryName} className={classes.button}>
                Order Now
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
