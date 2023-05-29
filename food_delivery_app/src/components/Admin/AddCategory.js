import { useNavigation, Form } from "react-router-dom";
import classes from "./AddCategory.module.css";
// import Card from "../UI/Card";

const AddCategory = (props, { method, event }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes.container}>
      <h1>Add Categories</h1>
      <Form method="post">
        <div className={classes.inputContainer}>
          <label htmlFor="category_name">Category Name</label>

          <input
            type="text"
            id="category_name"
            defaultValue={event ? event.categoryName : ""}
            name="categoryName"
            //   required
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="category_imageUrl">Image Url</label>
          <input
            type="text"
            id="category_imageUrl"
            defaultValue={event ? event.categoryImage : ""}
            //   required
            name="categoryImage"
          />
        </div>
        <div className={classes.button_wrapper}>
          <button onClick={props.onChange}>Cancel</button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddCategory;
