// import Header from "./components/Header";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import MenuPage, { loader as menuLoader } from "./pages/Menu";
import RootLayout from "./pages/root";
import CategoriesPage, { loader as categoryLoader } from "./pages/Categories";
import OrdersPage from "./pages/Orders";
import AccountPage, {
  loader as accountLoader,
  action as accountAction,
} from "./pages/Account";
import Error404 from "./pages/404";
import CategoryDetailsPage from "./pages/CategoryDetails";
import AdminPage, {
  loader as adminLoader,
  action as adminAction,
} from "./pages/Admin";
import LoginPage, { action as loginAction } from "./pages/Login";
import SignUpPage, { action as signUpAction } from "./pages/SignUp";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import { getUserId, tokenLoader } from "./util/user";
import { action as logoutAction } from "./pages/Logout";
import CheckoutPage, {
  action as addressAction,
  loader as addressLoader,
} from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";

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
        children: [
          { path: "categories/:categoryId", element: <CategoryDetailsPage /> },
        ],
      },

      {
        path: "/:catId",
        element: <AdminPage />,
        id: "adminroot",
        action: adminAction,
        loader: adminLoader,
        // children: [{ path: ":catId", element: <CategoryDetailsPage /> }],
      },
      {
        path: "/checkout/:addressId",
        id: "addressId",
        element: <CheckoutPage />,
        action: addressAction,
        loader: addressLoader,
      },
      { path: "orders", element: <OrdersPage /> },
      {
        path: "account/:addressId",
        element: <AccountPage />,
        loader: accountLoader,
        action: accountAction,
      },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "signup", element: <SignUpPage />, action: signUpAction },
      { path: "logout", action: logoutAction },
      { path: "paymentsuccessful", element: <PaymentSuccess /> },
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
