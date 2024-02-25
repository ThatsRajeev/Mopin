import { createSlice } from '@reduxjs/toolkit';

const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    bySeller: {}, // Structure: { sellerName: { dishName: qty, ... }, ...}
  },
  reducers: {
    addDish(state, action) {
      const { sellerName, dish } = action.payload;
      if(!state.bySeller[sellerName]) {
        state.bySeller[sellerName] = {};
      }
      if (Object.keys(dish).length >= 6) {
        state.bySeller[sellerName][dish.name] = { ...dish, qty: 1};
      } else {
        console.warn('Incomplete dish information received');
      }
    },
    updateDish(state, action) {
      const { sellerName, dishName, qtyChange } = action.payload;
      if (state.bySeller[sellerName] && state.bySeller[sellerName][dishName]) {
        state.bySeller[sellerName][dishName].qty += qtyChange;

        if(state.bySeller[sellerName][dishName].qty <= 0) {
          delete state.bySeller[sellerName][dishName];
        }

        if (Object.keys(state.bySeller[sellerName]).length === 0) {
          delete state.bySeller[sellerName];
        }
      }
    },
  },
});

export const { addDish, updateDish } = dishesSlice.actions;
export default dishesSlice.reducer;
