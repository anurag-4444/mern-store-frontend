import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
    'user/login',
    async (args) => {
        const { googleResponse } = args || {};

        const token = googleResponse.credential;

        // Send token to backend for verification and further processing
        const response = await axios.post(`https://mern-store-backend-iaep.onrender.com/api/v1/auth/google`, { token }, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.data
    }
);

export const fetchProfileDetails = createAsyncThunk(
    'user/fetchDetails',
    async () => {
        try {
            
        } catch (error) {
            
        }
        const link = `https://mern-store-backend-iaep.onrender.com/api/v1/me`

        // const response = await axios.get(link);
        const response = await axios.get(link);
        return response.data;
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        const link = `https://mern-store-backend-iaep.onrender.com/api/v1/logout`
        const response = await axios.get(link);
        return response.data;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: { user: {}, status: 'idle', error: null, isAuthenticated: false },

    reducers: {

    },

    extraReducers(builder) {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user.avatar = action.payload.user.avatar.url
                state.user.name = action.payload.user.name
                state.user.email = action.payload.user.email
                state.isAuthenticated = true
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuthenticated = false
                state.error = action.error.message;
            })
            .addCase(fetchProfileDetails.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(fetchProfileDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload.user) {
                    state.user.avatar = action.payload.user.avatar.url
                    state.user.name = action.payload.user.name
                    state.user.email = action.payload.user.email
                    state.user.role = action.payload.user.role
                    state.isAuthenticated = true
                }
            })
            .addCase(fetchProfileDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.user = {}
                state.isAuthenticated = false
                state.error = action.error.message;
            })

            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = {}
                state.isAuthenticated = false
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuthenticated = false
                state.error = action.error.message;
            });
    },
});

// export const { priceChangeState, categoryChangeState, ratingChangeState, searchChangeState, resetFilter } = productSlice.actions;
export default userSlice.reducer;