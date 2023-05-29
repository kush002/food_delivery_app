import { Fragment } from "react";
import classes from "./MenuList.module.css";
import AddButton from "./AddToCartButton/AddButton";

const MenuList = (props) => {
  return (
    <Fragment>
      <div className={classes.menu_container}>
        {props.items.map((item) => {
          return (
            <div key={item._id} className={classes.menuItem_container}>
              <div className={classes.image}>
                <img src={item.imageUrl} alt="Img.beer.jpg" />
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
