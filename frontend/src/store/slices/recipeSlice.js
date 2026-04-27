import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchRecipes = createAsyncThunk('recipes/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/recipes');
    return response.data;
  } catch (error) {
    if (!error.response) {
      return rejectWithValue({ message: 'Network error or CORS issue' });
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchRecipeById = createAsyncThunk('recipes/fetchOne', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      return rejectWithValue({ message: 'Network error or CORS issue' });
    }
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  recipes: [],
  currentRecipe: null,
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch recipes';
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch recipe';
      });
  },
});

export const { clearCurrentRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
