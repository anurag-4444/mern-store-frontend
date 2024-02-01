import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (args) => {
    const { keyword = "", currentPage = 1, minPrice = 0, maxPrice = 25000, category, ratings = 0 } = args || {};

    let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${minPrice}&price[lte]=${maxPrice}&ratings[gte]=${ratings}`

    if (category) link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${minPrice}&price[lte]=${maxPrice}&category=${category}&ratings[gte]=${ratings}`

    const response = await axios.get(link);
    return response.data;
  }
);


const productSlice = createSlice({
  name: "Products",
  initialState: { products: [], status: 'idle', error: null, productCount: 0, keyword: "", minPrice: 0, maxPrice: 25000, filteredProductCount: 0, activeFilters: {}, applyFilter: {} },

  reducers: {
    priceChangeState: (state, action) => {
      state.minPrice = action.payload.min
      state.maxPrice = action.payload.max
      state.activeFilters.price = true;
    },

    categoryChangeState: (state, action) => {
      if (state.applyFilter.category === action.payload.category) {
        state.applyFilter.category = '';
      } else {
        state.applyFilter.category = action.payload.category;
        state.activeFilters.category = true;
      }
    },

    ratingChangeState: (state, action) => {
      if (state.applyFilter.ratings === action.payload.ratings) {
        state.applyFilter.ratings = 0;
      } else {
        state.applyFilter.ratings = action.payload.ratings;
        state.activeFilters.ratings = true;
      }
    },

    searchChangeState: (state, action) => {
      state.keyword = action.payload
    },

    resetFilter: (state) => {
      // delete state.activeFilters[filterName];
      state.minPrice = 0
      state.maxPrice = 25000
      state.applyFilter = {}
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.filteredProductCount = action.payload.filteredProductCount;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { priceChangeState, categoryChangeState, ratingChangeState, searchChangeState, resetFilter } = productSlice.actions;
export default productSlice.reducer;