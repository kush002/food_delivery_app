import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import classes from "../Categories/CategoriesList.module.css";
import { getToken } from "../../util/user";
import AddCategory from "./AddCategory";

let items;
const EditRemoveCategory = ({ catList }) => {
  const [deleteState, setDeleteState] = useState(true);
  const [editState, setEditState] = useState(false);
  const navigate = useNavigate();
  const deleteHandler = async (categoryId, index, a) => {
    console.log(index, a);
    if (a.length <= 7) {
      setDeleteState(false);
      return;
    }
    const response = await fetch(
      "http://localhost:8080/admin/category/" + categoryId,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    setDeleteState(true);
    navigate("/admin-page");
  };
  const hideEditform = () => {
    setEditState(false);
  };

  const showEditForm = (cat) => {
    items = { ...cat };
    console.log(items);
    setEditState(true);
  };
  return (
    <Fragment>
      {editState && (
        <AddCategory event={items} method={"PUT"} onChange={hideEditform} />
      )}
      <div className={classes.category_container}>
        <h1>Categories</h1>
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            padding: "0 1rem",
            borderRadius: "8px",
            background: "var(--mytext-color)",
          }}
        >
          !!! To test the edit/delete buttons, please add a category/item first.
          The first 7 category buttons are currently disabled for display
          purposes. !!!
        </p>
        <ul className={classes.list}>
          {catList.reverse().map((cat, i, a) => {
            return (
              <li key={cat._id} className={classes.listChild}>
                <img src={cat.categoryImage} alt={cat.categoryName} />
                <p>{cat.categoryName}</p>
                <div className={classes.actions}>
                  <Link
                    to={`/${cat._id}`}
                    className={classes.button}
                    onClick={showEditForm.bind(this, cat)}
                  >
                    Edit
                  </Link>

                  <Link
                    to={"/admin-page"}
                    onClick={deleteHandler.bind(this, cat._id, i, a)}
                    className={classes.button}
                    disabled={!deleteState}
                  >
                    Detete
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default EditRemoveCategory;
