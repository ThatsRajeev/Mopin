import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    try {
      const response = await fetch('https://mopin-server.vercel.app/api/ordersdata');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in fetchOrders:', error);
      throw error;
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
