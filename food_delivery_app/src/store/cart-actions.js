// import { redirect } from "react-router-dom";
import { getToken, getUserId } from "../util/user";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const token = getToken();

      const response = await fetch(
        "https://food-delivery-app-backend-h7d1.onrender.com/user/cart",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const resData = await response.json();

      return resData.cart;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://food-delivery-app-backend-h7d1.onrender.com/user/cart/" +
          cart._id,
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
          headers: {
            Authorization: "Bearer " + getToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
