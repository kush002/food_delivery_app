import { Fragment, Suspense } from "react";
import { json, useLoaderData, Await, defer } from "react-router-dom";
import CategoriesList from "../components/Categories/CategoriesList";
import Card from "../components/UI/Card";

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
  const response = await fetch("http://localhost:8080/admin/category");
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
