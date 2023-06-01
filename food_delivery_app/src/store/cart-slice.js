import { createSlice } from "@reduxjs/toolkit";
// import { getCartId } from "../util/cart";
import { v4 as uuidv4 } from "uuid";
const initialCartId = uuidv4();
console.log(initialCartId);
console.log(initialCartId.toString());

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    onLogoutCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state._id = action.payload._id;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      //   let updatedItem;
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === newItem._id
      );
      const existingItem = state.items[existingItemIndex];
      state.changed = true;
      if (!existingItem) {
        state.totalQuantity += newItem.quantity;

        state.items.push({
          ...newItem,

          totalPrice: newItem.price * newItem.quantity,
        });
        // updatedItem = state.items[existingItemIndex];
      } else {
        state.totalQuantity += newItem.quantity;
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += +newItem.price * newItem.quantity;
      }
      //   console.log("new :", newItem);
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === itemId
      );
      const existingItem = state.items[existingItemIndex];
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
