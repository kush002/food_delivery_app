import { useNavigation, Form, useParams } from "react-router-dom";
import classes from "./AddCategory.module.css";
import Modal from "../Modal/Modal";

const AddCategory = (props) => {
  const params = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  let isNormalLoad =
    navigation.state === "loading" && navigation.formData == null;
  console.log(props.event, props.method, params);
  const onSubmitHandler = () => {
    setTimeout(() => {
      props.onChange(isNormalLoad);
    }, 1000);
  };

  return (
    <Modal
      style={{
        left: "35%",
        width: "35rem",
        paddingBottom: "4.5rem",
        background: "var(--main-color)",
      }}
      onClick={props.onChange}
    >
      <div className={classes.container}>
        <h1>{props.event ? "Edit Categories" : "Add Categories"} </h1>
        <Form method={props.method}>
          <div className={classes.inputContainer}>
            <label htmlFor="category_name">Category Name</label>

            <input
              type="text"
              id="category_name"
              defaultValue={props.event ? props.event.categoryName : ""}
              name="categoryName"
              //   required
            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="category_imageUrl">Image Url</label>
            <input
              type="text"
              id="category_imageUrl"
              defaultValue={props.event ? props.event.categoryImage : ""}
              //   required
              name="categoryImage"
            />
          </div>
          <div className={classes.button_wrapper}>
            <button onClick={props.onChange}>Cancel</button>
            <button disabled={isSubmitting} onClick={onSubmitHandler}>
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddCategory;
