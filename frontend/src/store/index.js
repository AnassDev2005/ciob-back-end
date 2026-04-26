import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import recipeReducer from './slices/recipeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    recipes: recipeReducer,
  },
});
