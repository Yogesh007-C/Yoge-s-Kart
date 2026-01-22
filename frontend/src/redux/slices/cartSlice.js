import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.productId === item.productId);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    updateItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.productId === productId);

      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCart, addItem, updateItem, removeItem, clearCart, setLoading, setError } =
  cartSlice.actions;
export default cartSlice.reducer;
