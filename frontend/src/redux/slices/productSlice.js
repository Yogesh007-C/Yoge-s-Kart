import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  total: 0,
  pages: 0,
  currentPage: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.pages = action.payload.pages;
      state.currentPage = action.payload.currentPage;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload._id);
      if (product) {
        Object.assign(product, action.payload);
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  setCurrentProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;
