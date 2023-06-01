import classes from "./MenuSummary.module.css";
import FilterContainer from "../Filter1/FilterButton";
const MenuSummary = () => {
  return (
    <>
      <section className={classes.summary}>
        <h5>Our Menu</h5>
        <h1>All Menu</h1>

        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
      </section>
    </>
  );
};

export default MenuSummary;
