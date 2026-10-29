import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx';

const savedCart = (() => {
  try {
    return JSON.parse(localStorage.getItem('paradise-cart') || '[]');
  } catch {
    return [];
  }
})();

const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: { cart: { items: savedCart } },
});

store.subscribe(() => {
  try {
    localStorage.setItem('paradise-cart', JSON.stringify(store.getState().cart.items));
  } catch {
    // The in-memory cart still works when browser storage is unavailable.
  }
});

export default store;
