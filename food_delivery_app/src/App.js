// import Header from "./components/Header";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import MenuPage, { loader as menuLoader } from "./pages/Menu";
import RootLayout from "./pages/root";
import CategoriesPage, { loader as categoryLoader } from "./pages/Categories";
import OrdersPage from "./pages/Orders";
import AccountPage from "./pages/Account";
import Error404 from "./pages/404";
import CategoryDetailsPage from "./pages/CategoryDetails";
import AdminPage, {
  loader as adminLoader,
  action as adminAction,
} from "./pages/Admin";
import LoginPage, { action as loginAction } from "./pages/Login";
import SignUpPage, { action as signUpAction } from "./pages/SignUp";
import { sendCartData, fetchCartData, createCart } from "./store/cart-actions";
import { getToken, getUserId, tokenLoader } from "./util/user";
import { action as logoutAction } from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error404 />,
    loader: tokenLoader,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "menu", element: <MenuPage />, loader: menuLoader },
      {
        path: "categories",
        id: "catId",
        element: <CategoriesPage />,
        loader: categoryLoader,
      },
      { path: "categories/:categoryId", element: <CategoryDetailsPage /> },
      {
        path: "admin-page",
        element: <AdminPage />,
        action: adminAction,
        loader: adminLoader,
      },
      { path: "orders", element: <OrdersPage /> },
      { path: "account", element: <AccountPage /> },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "signup", element: <SignUpPage />, action: signUpAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);
let isInitial = true;
const App = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const userId = getUserId();

  // useEffect(() => {
  //   if (!cart._id) {
  //     dispatch(createCart());
  //   }
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [userId, dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return <RouterProvider router={router} />;
};

export default App;
