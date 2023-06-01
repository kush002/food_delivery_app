import { Form, useNavigation } from "react-router-dom";
import classes from "./AddItem.module.css";

const AddItem = (props, { method, event }) => {
  // console.log("events:", event.itemName);
  const navigation = useNavigation();
  const isSubmit = navigation.state === "submitting";

  const onSubmitHandler = () => {
    setTimeout(() => {
      props.onChange(isSubmit);
    }, 100);
  };

  return (
    <div className={classes.container}>
      <h1>Add Food Item</h1>
      <Form method="post">
        <div className={classes.inputContainer}>
          <label htmlFor="item_name">Item Name</label>

          <input
            type="text"
            id="item_name"
            defaultValue={event ? event.ItemName : ""}
            name="itemName"
            //   required
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="category_name">Category Name</label>

          <input
            type="text"
            id="category_name"
            defaultValue={event ? event.ItemCategoryName : ""}
            name="itemCategoryName"
            //   required
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="item_imageUrl">Image Url</label>
          <input
            type="text"
            id="item_imageUrl"
            defaultValue={event ? event.itemImage : ""}
            //   required
            name="itemImage"
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="item_price">Price</label>
          <input
            type="number"
            id="item_price"
            defaultValue={event ? event.ItemPrice : ""}
            //   required
            name="itemPrice"
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="item_description">Description</label>
          <textarea
            id="item_desc"
            defaultValue={event ? event.ItemDesc : ""}
            //   required
            name="itemDesc"
            rows="4"
            cols="41"
          />
        </div>
        <div className={classes.button_wrapper}>
          <button onClick={props.onChange}>Cancel</button>
          <button disabled={isSubmit} onClick={onSubmitHandler}>
            {isSubmit ? "Submitting..." : "Save"}
          </button>
          {/* <button>Saveing</button> */}
        </div>
      </Form>
    </div>
  );
};

export default AddItem;
