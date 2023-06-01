import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../store/filter-slice";
import classes from "./FiltersCategories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
const FiltersCategories = ({ items }) => {
  const [show, setShow] = useState(false);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const categoryHandler = (event) => {
    // event.preventDefault();
    setShow(true);
    dispatch(
      filterActions.addFilter({
        showSelectedCat: event.target.checked,
        catName: event.target.name,
        items: [...items],
      })
    );
    //   filterActions.addFilter({
    //     showSelectedCat: show,
    //   })
    // console.log("clicked", filter);
  };
  const map = new Map();
  return (
    <Modal className={classes.modalFilter}>
      <div onChange={categoryHandler}>
        <div className={classes.headContainer}>
          {show && <h2>Filter</h2>}
          <div className={classes.actionContainer}>
            <p>Clear All</p>
            <div>
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
        </div>
        <div className={classes.selectCat}>
          <p>Diet</p>
          <div className={classes.inputContainer}>
            <input type="checkbox" id="vegItem" name="veg" value="veg" />
            <label htmlFor="vegItem">Veg</label>
          </div>
          <div className={classes.inputContainer}>
            <input
              type="checkbox"
              id="non-vegItem"
              name="nonveg"
              value="nonveg"
            />
            <label htmlFor="non-vegItem">Non-Veg</label>
          </div>
        </div>
        <div className={classes.selectCat}>
          <p>Categories</p>
          {items
            .filter((item) => {
              if (map.get(item.itemCategoryName)) {
                return false;
              }
              map.set(item.itemCategoryName, item);
              return true;
            })
            .map((item) => (
              <div key={item._id} className={classes.inputContainer}>
                <input
                  type="checkbox"
                  id={item._id}
                  name={item.itemCategoryName}
                />
                <label htmlFor={item._id}>{item.itemCategoryName}</label>
              </div>
            ))}
        </div>
        <div className={classes.selectCat}>
          <p>Price</p>
          <div className={classes.inputContainer}>
            <input
              type="checkbox"
              id="low-to-high"
              name="lowToHigh"
              value="lowToHigh"
            />
            <label htmlFor="low-to-high">Low to High</label>
          </div>
          <div className={classes.inputContainer}>
            <input
              type="checkbox"
              id="highr-to-low"
              name="highToLow"
              value="highToLow"
            />
            <label htmlFor="highr-to-low">High To Low</label>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default FiltersCategories;
