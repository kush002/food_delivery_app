import { json, useLoaderData, Await, defer } from "react-router-dom";
import { Suspense } from "react";
import Card from "../components/UI/Card";
import MenuSummary from "../components/Menu/MenuSummary";
import MenuList from "../components/Menu/MenuList";

const MenuPage = () => {
  const { items } = useLoaderData();
  // console.log(data.items);
  return (
    <Card>
      <MenuSummary />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={items}>
          {(loadedMenu) => <MenuList items={loadedMenu} />}
        </Await>
      </Suspense>
    </Card>
  );
};

export default MenuPage;

async function loadMenu() {
  const response = await fetch(
    "https://food-delivery-app-backend-h7d1.onrender.com/menu/items"
  );

  if (!response.ok) {
    throw json({ mesage: "Could not fetch items" }, { status: 500 });
  } else {
    const data = await response.json();
    return data.items;
  }
}

export async function loader() {
  return defer({
    items: loadMenu(),
  });
}
