import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetail = createAsyncThunk(
  'product/fetchDetail',
  async (id) => {
    const response = await axios.get(`https://mern-store-backend-iaep.onrender.com/api/v1/product/${id}`);
    return response.data;
  }
);

export const postReviewOfProduct = createAsyncThunk(
  'product/postReivew',
  async (args) => {
    const response = await axios.put(`https://mern-store-backend-iaep.onrender.com/api/v1/review`, { ...args }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }
);

const productDetailSlice = createSlice({
  name: "Product",
  initialState: { product: {}, ratingCounts: {}, status: 'loading', error: null, isUpdated: false },
  reducers: {
    changeProductUpdate: (state, action) => {
      state.isUpdated = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.ratingCounts = action.payload.ratingCounts
        state.status = 'succeeded';
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postReviewOfProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postReviewOfProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ratingCounts = action.payload.ratingCounts
        state.isUpdated = true
      })
      .addCase(postReviewOfProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { changeProductUpdate } = productDetailSlice.actions
export default productDetailSlice.reducer;
