import { createSlice } from '@reduxjs/toolkit';

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    bySeller: {},
  },
  reducers: {
    addSubscription(state, action) {
      const { sellerName, subscriptionDetails } = action.payload;
      state.bySeller[sellerName] = {...subscriptionDetails};
    },
    removeSubscription(state, action) {
      const { sellerName } = action.payload;
      delete state.bySeller[sellerName];
    },
    emptySubscription(state) {
      state.bySeller = {};
   },
  },
});

export const { addSubscription, removeSubscription, emptySubscription } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
