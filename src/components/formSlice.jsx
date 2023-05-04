import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    arr: [],
    loading: false,
    error: false
}

export const getUsers = createAsyncThunk(
    'users/getusers',
    async (data, { rejectWithValue }) => {
        const res = await axios.get("http://localhost:8080/users/getusers")
        try {
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addUser = createAsyncThunk(
    'users/adduser',
    async (data, { rejectWithValue }) => {
        const res = await axios.post("http://localhost:8080/users/adduser", data)
        try {
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteuser',
    async (id, { rejectWithValue }) => {
        const res = await axios.delete(`http://localhost:8080/users/deleteuser/${id}`)
        return res.data
    }
)

export const editUser = createAsyncThunk(
    'users/edituser',
    async ({ id, name }, { rejectWithValue }) => {
        const obj = {
            name: name
        }
        const res = await axios.patch(`http://localhost:8080/users/edituser/${id}`, obj)
        return res.data
    }
)

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, { payload }) => {
                state.loading = false
                state.arr = payload
            })
            .addCase(getUsers.rejected, (state) => {
                state.error = true
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true
            })
            .addCase(addUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.arr.push(payload)
            })
            .addCase(addUser.rejected, (state) => {
                state.error = true
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, { payload }) => {
                state.arr = state.arr.filter(e => e._id !== payload.user._id)
                state.loading = false
            })
            .addCase(deleteUser.rejected, (state) => {
                state.error = true
            })
            .addCase(editUser.pending, (state) => {
                state.loading = true
            })
            .addCase(editUser.fulfilled, (state, { payload }) => {
                for (var i = 0; i < state.arr.length; i++) {
                    if (state.arr[i]._id === payload._id) {
                        state.arr[i] = payload
                        break
                    }
                }
                state.loading = false
            })
            .addCase(editUser.rejected, (state) => {
                state.error = true
            })
    }
})

export default formSlice.reducer

