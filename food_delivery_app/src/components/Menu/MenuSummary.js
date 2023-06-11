import classes from "./MenuSummary.module.css";
import { useSelector } from "react-redux";
const MenuSummary = () => {
  const filter = useSelector((state) => state.filter);
  return (
    <>
      <section className={classes.summary}>
        <h5>Our Menu</h5>
        <h1>{filter.showSelectedCat ? filter.catName : "All Menu"}</h1>

        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
      </section>
    </>
  );
};

export default MenuSummary;
