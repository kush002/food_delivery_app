import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../store/filter-slice";
import classes from "./FiltersCategories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
const FiltersCategories = ({ items, onClick }) => {
  const [show, setShow] = useState(false);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const priceSortHandler = (event) => {
    setShow(!show);

    dispatch(
      filterActions.priceSort({
        priceSorting: event.target.checked ? event.target.name : null,
      })
    );
  };
  const dietChangeHandler = () => {};
  const categoryHandler = (event) => {
    const catArray = items.filter(
      (item) => item.itemCategoryName === event.target.name
    );
    console.log(catArray);
    dispatch(
      filterActions.addFilter({
        showSelectedCat: event.target.checked,
        catName: event.target.name,
        items: [...catArray],
      })
    );
  };

  const allCategoryHandler = (event) => {
    const checkedBoxId = event.target.id;
    dispatch(
      filterActions.retainCategory({
        checkedIds: {
          ...filter.checkedIds,
          [checkedBoxId]: event.target.checked,
        },
      })
    );
  };

  const removeFilterCategoryHandler = (event) => {
    dispatch(
      filterActions.retainCategory({
        checkedIds: {},
      })
    );
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const map = new Map();
  return (
    <Modal style={{ width: "20rem" }} onClick={onClick}>
      <div onChange={allCategoryHandler}>
        <div className={classes.headContainer}>
          <h2>Filter</h2>
          <div className={classes.actionContainer}>
            <div onClick={removeFilterCategoryHandler}>
              <p>Clear All</p>
            </div>

            <div onClick={onClick} className={classes.icon}>
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
        </div>

        <div className={classes.selectCat} onChange={categoryHandler}>
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
              <div key={item.categoryId} className={classes.inputContainer}>
                <input
                  type="checkbox"
                  defaultChecked={!!filter.checkedIds[item.categoryId]}
                  id={item.categoryId}
                  name={item.itemCategoryName}
                />
                <label htmlFor={item._id}>{item.itemCategoryName}</label>
              </div>
            ))}
        </div>
        <div className={classes.selectCat} onChange={priceSortHandler}>
          <p>Price</p>
          <div className={classes.inputContainer}>
            <input
              type="checkbox"
              defaultChecked={!!filter.checkedIds["low-toohigh"]}
              //   defaultChecked={!show}
              id="low-to-high"
              name="lowToHigh"
              value="lowToHigh"
            />
            <label htmlFor="low-to-high">Low to High</label>
          </div>
          <div className={classes.inputContainer}>
            <input
              type="checkbox"
              defaultChecked={!!filter.checkedIds["high-to-low"]}
              //   defaultChecked={show}
              id="high-to-low"
              name="highToLow"
              value="highToLow"
            />
            <label htmlFor="high-to-low">High To Low</label>
          </div>
        </div>
        <div className={classes.selectCat} onChange={dietChangeHandler}>
          <p>Diet</p>
          <div className={classes.inputContainer}>
            <input
              type="checkbox"
              defaultChecked={!!filter.checkedIds["vegItem"]}
              id="vegItem"
              name="veg"
              value="veg"
            />
            <label htmlFor="vegItem">Veg</label>
          </div>
          <div className={classes.inputContainer}>
            <input
              type="checkbox"
              defaultChecked={!!filter.checkedIds["non-vegItem"]}
              id="non-vegItem"
              name="nonveg"
              value="nonveg"
            />
            <label htmlFor="non-vegItem">Non-Veg</label>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default FiltersCategories;
