import { Fragment } from "react";
import { useSelector } from "react-redux";
import classes from "./MenuList.module.css";
import AddButton from "./AddToCartButton/AddButton";

const MenuList = (props) => {
  const filters = useSelector((state) => state.filter.filteredItem);

  let main;
  if (filters.length === 0) {
    main = props.items;
  } else {
    main = filters;
  }

  // const item = filter.activeCat.map((category) => category);

  // if (filter.showSelectedCat) {
  //   console.log("item:",filter;
  // }
  console.log("main:", filters);
  return (
    <Fragment>
      <div className={classes.menu_container}>
        {main.map((item) => {
          return (
            <div key={item._id} className={classes.menuItem_container}>
              <div className={classes.image}>
                <img src={item.imageUrl} alt={item.itemName} />
              </div>
              <div className={classes.content}>
                <h2>{item.itemName}</h2>
                <p>{item.description}</p>
              </div>
              <div className={classes.pricing}>
                <div className={classes.price}>Rs. {item.price}</div>
                <AddButton item={item} />
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default MenuList;
