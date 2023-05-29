// import { redirect } from "react-router-dom";
import { cartActions } from "./cart-slice";

export const createCart = () => {
  return async (dispatch) => {
    const postEmptyCart = async () => {
      // console.log("kya yahi h:", cart._id);
      const response = await fetch(
        "https://food-delivery-app-backend-h7d1.onrender.com/user/cart/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [],
            totalQuantity: 0,
          }),
        }
      );

      const resData = await response.json();
      console.log("bummabumma:", resData);
      // const cartId = resData.cart._id;

      // localStorage.setItem("cartId", cartId);

      return resData.cart;
    };

    try {
      const cartData = await postEmptyCart();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          _id: cartData._id,
        })
      );
      console.log("nahi aayi");
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCartData = (cart) => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log("ye hai wo:", cart);
      console.log("kya yahi h:", cart._id);
      const response = await fetch(
        "https://food-delivery-app-backend-h7d1.onrender.com/user/cart/" +
          cart._id
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      console.log("kya get ja rahi h");
      const resData = await response.json();
      console.log("beforfmb:", resData);
      return resData.carts.cart;
    };

    try {
      const cartData = await fetchData();

      console.log("okokkok:", cartData);
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          _id: cartData._id,
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
          headers: { "Content-Type": "application/json" },
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
