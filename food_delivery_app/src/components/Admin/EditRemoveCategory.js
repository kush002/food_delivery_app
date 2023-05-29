import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import classes from "../Categories/CategoriesList.module.css";

const EditRemoveCategory = ({ catList }) => {
  const navigate = useNavigate();
  const deleteHandler = async (categoryId) => {
    const response = await fetch(
      "http://localhost:8080/admin/category/" + categoryId,
      {
        method: "DELETE",
      }
    );

    navigate("/admin-page");
  };
  return (
    <div className={classes.category_container}>
      <h1>Categories</h1>
      <ul className={classes.list}>
        {catList.map((cat) => {
          return (
            <li key={cat._id} className={classes.listChild}>
              <img src={cat.categoryImage} alt={cat.categoryName} />
              <p>{cat.categoryName}</p>
              <div className={classes.actions}>
                <Link to="/edit" className={classes.button}>
                  Edit
                </Link>
                <Link
                  to="/admin-page"
                  onClick={deleteHandler.bind(this, cat._id)}
                  className={classes.button}
                >
                  Detete
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EditRemoveCategory;
