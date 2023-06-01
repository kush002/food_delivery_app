import { createSlice } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    showSelectedCat: false,
    catName: null,
    items: [],
    filteredItem: [],
  },
  reducers: {
    addFilter(state, action) {
      state.showSelectedCat = action.payload.showSelectedCat;
      state.catName = action.payload.catName;
      state.items = action.payload.items;
      //   state.filteredItem = [...state.items];
      if (state.showSelectedCat) {
        const product = state.items.filter(
          (item) => item.itemCategoryName === state.catName
        );
        state.filteredItem = [...state.filteredItem, ...product];
      } else {
        const product = state.filteredItem.filter(
          (item) => item.itemCategoryName !== state.catName
        );

        state.filteredItem = [...product];
      }
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
