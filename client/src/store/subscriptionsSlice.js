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
  },
});

export const { addSubscription, removeSubscription } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
