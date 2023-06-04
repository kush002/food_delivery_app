import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CategoriesList.module.css";
import { filterActions } from "../../store/filter-slice";

const CategoriesList = ({ catList }) => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const showCategoryHandler = (catId, name, catitems) => {
    dispatch(
      filterActions.retainCategory({
        checkedIds: { [catId]: true },
        showSelectedCat: true,
        catName: name,
        items: [...catitems],
      })
    );
    console.log("jaggu", catitems);
    // dispatch(
    //   filterActions.addFilter({
    //
    //     // items:[...catList]
    //   })
    // );
  };
  return (
    <div className={classes.category_container}>
      <h1>Categories</h1>
      <ul className={classes.list}>
        {catList.map((cat) => {
          return (
            <li key={cat._id} className={classes.listChild}>
              <img src={cat.categoryImage} alt={cat.categoryName} />
              <p>{cat.categoryName}</p>
              <Link
                to={`/categories/${cat._id}`}
                className={classes.button}
                onClick={showCategoryHandler.bind(
                  this,
                  cat._id,
                  cat.categoryName,
                  cat.items
                )}
              >
                Order Now
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
