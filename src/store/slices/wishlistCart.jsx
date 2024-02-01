import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductToWishlist = createAsyncThunk(
    'user/addToWishlist',
    async (args) => {
        // console.log('wishlist slice');
        const response = await axios.post(`http://localhost:5000/api/v1/me/add/product/wishlist`, { ...args }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
);

export const getProductFromWishlist = createAsyncThunk(
    'user/getFromWishlist',
    async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/me/product/wishlist`,{ withCredentials: true })
        return response.data
    }
);

export const deleteProductFromWishlist = createAsyncThunk(
    'user/deleteFromWishlist',
    async (args) => {
        // console.log(args);
        const response = await axios.delete(`http://localhost:5000/api/v1/me/delete/product/wishlist`, { data: args }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
);



const userWishlistSlice = createSlice({
    name: 'userWishlist',

    initialState: { wishlist: [], status: 'idle', error: null, isUpdated: false },

    reducers: {
        changeIsUpdatedState: (state, action) => {
            state.isUpdated = false
        }
    },

    extraReducers(builder) {
        builder
            .addCase(addProductToWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProductToWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true;
            })
            .addCase(addProductToWishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message
            })
            .addCase(getProductFromWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductFromWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishlist = action.payload.wishlistProducts
            })
            .addCase(getProductFromWishlist.rejected, (state, action) => {
                state.status = 'failed';
                // state.error = action.payload.message
            })
            .addCase(deleteProductFromWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true;
            })
            .addCase(deleteProductFromWishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message
            })
    }
})

export default userWishlistSlice.reducer
export const { changeIsUpdatedState } = userWishlistSlice.actions