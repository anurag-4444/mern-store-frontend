import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const adminFetchAllProducts = createAsyncThunk(
  'products/adminFetchAll',
  async (args) => {
    const { keyword = "", currentPage = 1, minPrice = 0, maxPrice = 25000, category, ratings = 0, all } = args || {};

    let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${minPrice}&price[lte]=${maxPrice}&ratings[gte]=${ratings}`

    // If category is present, include it in the link
    if (category) {
      link += `&category=${category}`;
    }

    // If 'all' is present, include it in the link
    if (all) {
      link += `&all=${all}`;
    }

    const response = await axios.get(link);
    return response.data;
  }
);

export const fetchProductDetail = createAsyncThunk(
  'product/fetchDetail',
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
    return response.data;
  }
);

export const adminCreateProduct = createAsyncThunk(
  'products/admin-create-product',
  async (formData) => {
    // console.log(formData);
    const response = await axios.post(`http://localhost:5000/api/v1/admin/product/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  }
);

export const adminUpdateProduct = createAsyncThunk(
  'products/admin-update-product',
  async ({ formData, id }) => {
    // console.log(formData);
    const response = await axios.put(`http://localhost:5000/api/v1/admin/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  }
);

export const adminDeleteProduct = createAsyncThunk(
  'products/admin-delete-product',
  async (id) => {
    // console.log('delte admi');
    const response = await axios.delete(`http://localhost:5000/api/v1/admin/product/${id}`)
    return response.data
  }
);

export const adminFetchAllOrders = createAsyncThunk(
  'orders/adminFetchAllOrders',
  async () => {
    let link = `http://localhost:5000/api/v1/admin/orders`
    const response = await axios.get(link);
    return response.data;
  }
);

export const adminDeleteOrder = createAsyncThunk(
  'order/admin-delete-order',
  async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/v1/admin/order/${id}`)
    return response.data
  }
);

export const adminGetOrder = createAsyncThunk(
  'order/admin-get-order',
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/v1/order/${id}`)
    return response.data
  }
);

export const adminUpdateOrder = createAsyncThunk(
  'order/admin-update-order',
  async ({ id, status }) => {
    // console.log(formData);
    const response = await axios.put(`http://localhost:5000/api/v1/admin/order/${id}`, { status }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  }
);

export const adminFetchAllUsers = createAsyncThunk(
  'users/admim-fetch-all-users',
  async () => {
    let link = `http://localhost:5000/api/v1/admin/users`
    const response = await axios.get(link);
    return response.data;
  }
);

export const adminUpdateUser = createAsyncThunk(
  'users/admim-update-user',
  async ({ id, role }) => {
    const response = await axios.put(`http://localhost:5000/api/v1/admin/user/${id}`, { role }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data;
  }
);

export const adminDeleteUser = createAsyncThunk(
  'users/admim-delete-user',
  async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/v1/admin/user/${id}`)
    return response.data;
  }
);

export const adminFetchAllReviews = createAsyncThunk(
  'users/admim-fetch-all-reviews',
  async (id) => {
    let link = `http://localhost:5000/api/v1/reviews?id=${id}`
    const response = await axios.get(link);
    return response.data;
  }
)

export const adminDeleteReview = createAsyncThunk(
  'users/admim-delete-review',
  async ({ reviewId, productId }) => {
    let link = `http://localhost:5000/api/v1/reviews?id=${reviewId}&productId=${productId}`
    const response = await axios.delete(link);
    return response.data;
  }
);

const adminProductSlice = createSlice({
  name: "Products",
  initialState: { products: [], product: {}, ratingCounts: {}, orders: [], reviews: [], users: [], order: {}, totalAmount: 0, status: 'idle', error: null, productCount: 0, keyword: "", minPrice: 0, maxPrice: 25000, filteredProductCount: 0, activeFilters: {}, applyFilter: {}, loading: false },

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
    },

    setProductLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(adminFetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminFetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.filteredProductCount = action.payload.filteredProductCount;
      })
      .addCase(adminFetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
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
      .addCase(adminCreateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminCreateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false
        // state.products = action.payload.products;
        // state.productCount = action.payload.productCount;
        // state.filteredProductCount = action.payload.filteredProductCount;
      })
      .addCase(adminCreateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false
        state.error = action.error.message;
      })
      .addCase(adminDeleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminDeleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(adminDeleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(adminUpdateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminUpdateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false
      })
      .addCase(adminUpdateProduct.rejected, (state, action) => {
        state.status = 'failed';
        // state.loading = false
        state.error = action.error.message;
      })
      .addCase(adminFetchAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminFetchAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload.orders
        state.totalAmount = action.payload.totalAmount
        // state.loading = false
      })
      .addCase(adminFetchAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        // state.loading = false
      })
      .addCase(adminDeleteOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminDeleteOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(adminDeleteOrder.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(adminGetOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminGetOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload.order
      })
      .addCase(adminGetOrder.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(adminFetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminFetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users
      })
      .addCase(adminFetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(adminUpdateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminUpdateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(adminUpdateUser.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(adminDeleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(adminDeleteUser.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(adminFetchAllReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminFetchAllReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload.reviews
        state.ratingCounts = action.payload.ratingCounts
      })
      .addCase(adminFetchAllReviews.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(adminDeleteReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminDeleteReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload.reviews
      })
      .addCase(adminDeleteReview.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { priceChangeState, categoryChangeState, ratingChangeState, searchChangeState, resetFilter, setProductLoading } = adminProductSlice.actions;
export default adminProductSlice.reducer;