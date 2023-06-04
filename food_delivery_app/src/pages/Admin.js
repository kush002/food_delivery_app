import { redirect, json, useLoaderData, Await, defer } from "react-router-dom";
import { Suspense } from "react";
import AdminActions from "../components/Admin/AdminActions";
import EditRemoveCategory from "../components/Admin/EditRemoveCategory";
import Card from "../components/UI/Card";
import { getToken } from "../util/user";
const AdminPage = () => {
  const { categories } = useLoaderData();
  return (
    <Card>
      <AdminActions />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={categories}>
          {(loadedCategories) => (
            <EditRemoveCategory catList={loadedCategories} />
          )}
        </Await>
      </Suspense>
    </Card>
  );
};

export default AdminPage;

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

export async function action({ request, params }) {
  const data = await request.formData();
  const catId = params.catId;
  console.log(catId, params);
  const category = {
    categoryName: data.get("categoryName"),
    categoryImage: data.get("categoryImage"),
  };

  const menuItem = {
    itemName: data.get("itemName"),
    itemCategoryName: data.get("itemCategoryName"),
    itemImage: data.get("itemImage"),
    price: data.get("itemPrice"),
    description: data.get("itemDesc"),
  };

  let response;

  if (request.method === "PUT") {
    response = await fetch(
      "https://food-delivery-app-backend-h7d1.onrender.com/admin/category/" +
        catId,
      {
        method: request.method,
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }
    );
  }
  if (category.categoryName !== null) {
    response = await fetch(
      "https://food-delivery-app-backend-h7d1.onrender.com/admin/category/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      }
    );
  }

  if (menuItem.itemName !== null) {
    response = await fetch(
      "https://food-delivery-app-backend-h7d1.onrender.com/menu/items",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuItem),
      }
    );
  }

  if (!response.ok) {
    throw json({ message: "Could not save data" }, { status: 500 });
  }

  return redirect(`/admin-page`);
}
