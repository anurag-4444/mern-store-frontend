import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductCart = createAsyncThunk(
    'user/getFromCart',
    async () => {
        const response = await axios.get(`https://mern-store-backend-iaep.onrender.com/api/v1/me/product/cart`,{ withCredentials: true })
        return response.data
    }
);

export const addNewOrder = createAsyncThunk(
    'user/addOrder',
    async (args) => {
        const response = await axios.post(`https://mern-store-backend-iaep.onrender.com/api/v1/order/new`, { ...args }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
);

export const getOrder = createAsyncThunk(
    'user/getOrder',
    async () => {
        const response = await axios.get(`https://mern-store-backend-iaep.onrender.com/api/v1/orders/me`, { withCredentials: true })
        return response.data
    }
);

const userOrderSlice = createSlice({
    name: 'userOrder',
    initialState: { shippingInfo: {}, myOrders: [], cartOrder: [], discount: 60, order: [], shippingCost: 0, productPrice: 0, totalPrice: 0, status: 'idle', error: null, isUpdated: false },

    reducers: {
        changeProductPrice: (state, action) => {
            if (state.cartOrder.length !== 0) {
                state.productPrice = 0;
                for (let index = 0; index < state.cartOrder.length; index++) {
                    state.productPrice += state.cartOrder[index].product.price * state.cartOrder[index].quantity
                }

                for (let index = 0; index < state.cartOrder.length; index++) {
                    const currentProduct = state.cartOrder[index].product;
                
                    // Check if a product with the same ID already exists in the state.order array
                    const isDuplicate = state.order.some(orderItem => orderItem.product === currentProduct._id);
                
                    if (!isDuplicate) {
                        // If not a duplicate, push the new item
                        state.order.push({
                            name: currentProduct.name,
                            price: currentProduct.price,
                            quantity: state.cartOrder[index].quantity,
                            image: currentProduct.images[0].url,
                            product: currentProduct._id,
                        });
                    }
                }
                

                state.shippingCost = state.cartOrder.length * 14
                state.totalPrice = state.shippingCost + state.productPrice - state.discount
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addNewOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.shippingInfo = action.payload.order;
            })
            .addCase(addNewOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message
            })
            .addCase(getProductCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cartOrder = action.payload.cartProducts
            })
            .addCase(getProductCart.rejected, (state, action) => {
                state.status = 'failed';
                // state.error = action.payload.message
            })
            .addCase(getOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.myOrders = action.payload.orders;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message
            })
    }
})

export default userOrderSlice.reducer
export const { changeProductPrice } = userOrderSlice.actions