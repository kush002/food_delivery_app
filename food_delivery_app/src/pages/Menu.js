import { json, useLoaderData, Await, defer } from "react-router-dom";
import { Fragment, Suspense, useState } from "react";
import Card from "../components/UI/Card";
import MenuSummary from "../components/Menu/MenuSummary";
import MenuList from "../components/Menu/MenuList";
import FilterContainer from "../components/Filter1/FilterButton";
import { getToken } from "../util/user";
import FiltersCategories from "../components/Filter1/FiltersCategories";

const MenuPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { items } = useLoaderData();
  // console.log(data.items);
  const showFilterHandler = () => {
    setShowFilter(true);
  };
  const hideFilterHandler = () => {
    setShowFilter(false);
  };
  return (
    <Card style={{ position: "relative" }}>
      <MenuSummary />
      <FilterContainer onClick={showFilterHandler} />
      <Suspense
        fallback={
          <p style={{ textAlign: "center", color: "var(--mytext-color)" }}>
            Loading...
          </p>
        }
      >
        <Await resolve={items}>
          {(loadedMenu) => {
            return (
              <Fragment>
                <MenuList items={loadedMenu} />
                {showFilter && (
                  <FiltersCategories
                    items={loadedMenu}
                    onClick={hideFilterHandler}
                  />
                )}
              </Fragment>
            );
          }}
        </Await>
      </Suspense>
    </Card>
  );
};

export default MenuPage;

async function loadMenu() {
  console.log(process.env.REACT_APP_URL);
  const response = await fetch(`${process.env.REACT_APP_URL}/menu/items`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

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
