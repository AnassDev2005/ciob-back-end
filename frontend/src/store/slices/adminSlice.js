import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// ── Stats ────────────────────────────────────────────────────────────────────
export const fetchAdminStats = createAsyncThunk('admin/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// ── Users ────────────────────────────────────────────────────────────────────
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// ── Messages ─────────────────────────────────────────────────────────────────
export const fetchMessages = createAsyncThunk('admin/fetchMessages', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/messages');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const markMessageRead = createAsyncThunk('admin/markMessageRead', async ({ id, is_read }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/admin/messages/${id}`, { is_read });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const deleteMessage = createAsyncThunk('admin/deleteMessage', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/messages/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// ── Catalogues ────────────────────────────────────────────────────────────────
export const fetchCatalogues = createAsyncThunk('admin/fetchCatalogues', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/admin/catalogues');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const createCatalogue = createAsyncThunk('admin/createCatalogue', async (formData, { rejectWithValue }) => {
  try {
    const response = await api.post('/admin/catalogues', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const toggleCatalogueActive = createAsyncThunk('admin/toggleCatalogueActive', async ({ id, is_active }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/admin/catalogues/${id}`, { is_active });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const deleteCatalogue = createAsyncThunk('admin/deleteCatalogue', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/catalogues/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// ── Slice ─────────────────────────────────────────────────────────────────────
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
      // Stats
      .addCase(fetchAdminStats.pending, (state) => { state.loading = true; })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Users
      .addCase(fetchUsers.fulfilled, (state, action) => { state.users = action.payload; })
      // Messages
      .addCase(fetchMessages.fulfilled, (state, action) => { state.messages = action.payload; })
      .addCase(markMessageRead.fulfilled, (state, action) => {
        const idx = state.messages.findIndex(m => m.id === action.payload.id);
        if (idx !== -1) state.messages[idx] = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(m => m.id !== action.payload);
      })
      // Catalogues
      .addCase(fetchCatalogues.fulfilled, (state, action) => { state.catalogues = action.payload; })
      .addCase(createCatalogue.fulfilled, (state, action) => { state.catalogues.unshift(action.payload); })
      .addCase(toggleCatalogueActive.fulfilled, (state, action) => {
        const idx = state.catalogues.findIndex(c => c.id === action.payload.id);
        if (idx !== -1) state.catalogues[idx] = action.payload;
      })
      .addCase(deleteCatalogue.fulfilled, (state, action) => {
        state.catalogues = state.catalogues.filter(c => c.id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
