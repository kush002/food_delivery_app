import { useState } from "react";
import classes from "./AdminActions.module.css";
import AddCategory from "./AddCategory";
import AddItem from "./AddItem";

const AdminActions = () => {
  const [showCategoryActions, setShowCategoryActions] = useState(false);
  const [showItemActions, setShowItemActions] = useState(false);

  const showAddCategoryFormHandler = () => {
    setShowCategoryActions(true);
  };

  const showAddItemHandler = () => {
    setShowItemActions(true);
  };

  const hideFormHandler = (action) => {
    setShowCategoryActions(false);
    setShowItemActions(false);
  };
  return (
    <div className={classes.actions_container}>
      {showCategoryActions && <AddCategory onChange={hideFormHandler} />}
      {showItemActions && <AddItem onChange={hideFormHandler} />}
      {!showCategoryActions && !showItemActions && (
        <button
          className={classes.showForm}
          onClick={showAddCategoryFormHandler}
        >
          Add Categories
        </button>
      )}
      {!showItemActions && !showCategoryActions && (
        <button className={classes.showForm} onClick={showAddItemHandler}>
          Add Item
        </button>
      )}
    </div>
  );
};

export default AdminActions;
