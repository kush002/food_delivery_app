import { createSlice } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    showSelectedCat: false,
    catName: null,
    items: [],
    filteredItem: [],
    priceSorting: "",
    checkedIds: {},
  },
  reducers: {
    addFilter(state, action) {
      state.showSelectedCat = action.payload.showSelectedCat;
      state.catName = action.payload.catName;
      state.items = action.payload.items;

      //   state.filteredItem = [...state.items];
      if (state.showSelectedCat) {
        state.filteredItem = [...state.filteredItem, ...state.items];
      } else {
        const product = state.filteredItem.filter(
          (item) => item.itemCategoryName !== state.catName
        );

        state.filteredItem = [...product];
      }
    },
    priceSort(state, action) {
      state.priceSorting = action.payload.priceSorting;
      state.filteredItem = [...state.filteredItem];
    },
    retainCategory(state, action) {
      state.checkedIds = action.payload.checkedIds;
      state.showSelectedCat = action.payload.showSelectedCat;
      state.catName = action.payload.catName;
      state.items = action.payload.items;

      // if (state.showSelectedCat) {
      //   state.filteredItem = [...state.filteredItem, ...state.items];
      // }
      //   console.log("boblo");
      if (Object.keys(state.checkedIds).length === 0) {
        state.filteredItem = [];
      }
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
