// import { redirect } from "react-router-dom";
import { json } from "react-router-dom";
import { getToken, getUserId } from "../util/user";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const token = getToken();

      const response = await fetch(`${process.env.REACT_APP_URL}/user/cart`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw json({ message: "Could not fetch cart data!" }, { status: 500 });
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
      console.log("No user found");
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/user/cart/` + cart._id,
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
        throw json({ message: "Sending cart data failed." }, { status: 500 });
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("Sending cart data failed.");
    }
  };
};
