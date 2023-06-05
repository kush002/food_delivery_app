import { useParams, useRouteLoaderData } from "react-router-dom";
import MenuList from "../components/Menu/MenuList";
import EditRemoveCategory from "../components/Categories/CategoriesList";
import AddCategory from "../components/Admin/AddCategory";
const CategoryDetailsPage = () => {
  // const { categories } = useRouteLoaderData("catId");
  const params = useParams();
  return (
    <>
      <h1>jjhkvjhsdkhfkj</h1>
      {/* <AddCategory event={categories} method={"POST"} /> */}
      {/* <EditRemoveCategory items={categories} /> */}
    </>
  );
};
export default CategoryDetailsPage;
