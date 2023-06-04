import { Fragment, Suspense } from "react";
import { json, useLoaderData, Await, defer } from "react-router-dom";
import CategoriesList from "../components/Categories/CategoriesList";
import Card from "../components/UI/Card";
import { getToken } from "../util/user";

const CategoriesPage = () => {
  const { categories } = useLoaderData();

  return (
    <Card>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={categories}>
          {(loadedCategories) => <CategoriesList catList={loadedCategories} />}
        </Await>
      </Suspense>
    </Card>
  );
};
export default CategoriesPage;

async function loadCategories() {
  const response = await fetch(
    "https://food-delivery-app-backend-h7d1.onrender.com/admin/category",
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );
  if (!response.ok) {
    throw json({ mesage: "Could not fetch categories" }, { status: 500 });
  } else {
    const data = await response.json();
    return data.categories;
  }
}

export async function loader() {
  return defer({
    categories: loadCategories(),
  });
}
