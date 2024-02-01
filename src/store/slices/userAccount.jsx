import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserName = createAsyncThunk(
    'user/updateName',
    async (args) => {
        const { userName } = args || {};

        const response = await axios.put(`https://mern-store-backend-iaep.onrender.com/api/v1/me/update`, { name: userName }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
);

export const updateUserAvatar = createAsyncThunk(
    'user/updateAvatar',
    async (args) => {
        const { avatar } = args || {};

        const response = await axios.put(`https://mern-store-backend-iaep.onrender.com/api/v1/me/update/avatar`, avatar, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        return response.data
    }
);

const userAccountSlice = createSlice({
    name: "user",
    initialState: { isUpdated: false, status: 'idle', error: null },

    reducers: {
        changeIsUpdated: (state, action) => {
            state.isUpdated = false
        }
    },

    extraReducers(builder) {
        builder
            .addCase(updateUserName.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = action.payload.success
            })
            .addCase(updateUserName.rejected, (state, action) => {
                state.status = 'failed';
                state.isUpdated = false
                console.log(action.payload);
                state.error = action.error.message;
            })
            .addCase(updateUserAvatar.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true
            })
            .addCase(updateUserAvatar.rejected, (state, action) => {
                state.status = 'failed';
                state.isUpdated = false
                state.error = action.error.message;
            })
    },
});

export const { changeIsUpdated } = userAccountSlice.actions
export default userAccountSlice.reducer;