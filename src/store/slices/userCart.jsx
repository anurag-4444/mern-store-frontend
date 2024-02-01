import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductToCart = createAsyncThunk(
    'user/addToCart',
    async (args) => {

        const response = await axios.post(`http://localhost:5000/api/v1/me/add/product/cart`, { ...args }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
);

export const getProductToCart = createAsyncThunk(
    'user/getFromCart',
    async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/me/product/cart`,{ withCredentials: true })
        return response.data
    }
);

export const deleteProductToCart = createAsyncThunk(
    'user/deleteFromCart',
    async (args) => {
        console.log(args);
        const response = await axios.delete(`http://localhost:5000/api/v1/me/delete/product/cart`, { data: args }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
);

const userCartSlice = createSlice({
    name: 'userCart',
    initialState: { cart: [], status: 'idle', error: null, isUpdated: false },
    reducers: {
        changeIsUpdateState: (state, action) => {
            state.isUpdated = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addProductToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message
            })
            .addCase(getProductToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload.cartProducts
            })
            .addCase(getProductToCart.rejected, (state, action) => {
                state.status = 'failed';
                // state.error = action.payload.message
            })
            .addCase(deleteProductToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProductToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true;
            })
            .addCase(deleteProductToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message
            })
    }
})

export default userCartSlice.reducer
export const { changeIsUpdateState } = userCartSlice.actions