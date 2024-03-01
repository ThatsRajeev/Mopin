import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import dishesReducer from './dishesSlice';
import subscriptionsReducer from './subscriptionsSlice';
import ordersReducer from "./ordersSlice";

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) return undefined;
    const loadedState = JSON.parse(serializedState);
    return loadedState;
  } catch (err) {
    return undefined;
  }
};

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify({
      dishes: state.dishes,
      subscriptions: state.subscriptions
    });
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    console.error(err);
  }
};

const localStorageMiddleware = (store) => (next) => (action) => {
  next(action);
  const state = store.getState();
  saveStateToLocalStorage(state);
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    dishes: dishesReducer,
    subscriptions: subscriptionsReducer,
    orders: ordersReducer,
  },
  preloadedState: loadStateFromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware().concat(localStorageMiddleware),
});
