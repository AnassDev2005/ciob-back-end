import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchAdminStats = createAsyncThunk('admin/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const fetchMessages = createAsyncThunk('admin/fetchMessages', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/messages');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const fetchCatalogues = createAsyncThunk('admin/fetchCatalogues', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/catalogues');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

const initialState = {
  stats: null,
  users: [],
  messages: [],
  catalogues: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => { state.loading = true; })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.users = action.payload; })
      .addCase(fetchMessages.fulfilled, (state, action) => { state.messages = action.payload; })
      .addCase(fetchCatalogues.fulfilled, (state, action) => { state.catalogues = action.payload; });
  },
});

export default adminSlice.reducer;
