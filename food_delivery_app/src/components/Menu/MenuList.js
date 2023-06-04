import { Fragment } from "react";
import { useSelector } from "react-redux";
import classes from "./MenuList.module.css";
import AddButton from "./AddToCartButton/AddButton";

const MenuList = (props) => {
  const filters = useSelector((state) => state.filter);

  let main;
  if (filters.filteredItem.length === 0) {
    main = [...props.items];
  } else {
    main = [...filters.filteredItem];
  }

  // const map = new Map();
  console.log("main:", main);
  // main = main.filter((item) => {
  //   if (map.get(item._id)) {
  //     return false;
  //   }
  //   map.set(item._id, item);
  //   return true;
  // });
  console.log(filters.checkedIds);

  if (filters.showSelectedCat && filters.filteredItem.length === 0) {
    console.log("true");
    main = props.items.filter((item) => filters.items.includes(item._id));
  }

  if (filters.priceSorting === "lowToHigh") {
    main.sort((a, b) => a.price - b.price);
  }
  if (filters.priceSorting === "highToLow") {
    main.sort((a, b) => b.price - a.price);
  }
  console.log("main:", filters, main);
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
