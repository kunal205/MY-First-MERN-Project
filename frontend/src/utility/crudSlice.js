import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
    const res = await axios.get("http://localhost:5000/api/user/users", { withCredentials: true });
    console.log(res.data.users);
    return (res.data.users);
})
const crudSlice = createSlice({
    name: 'crudSlice',
    initialState: {
        userList: [],
        isloading: false,
        error: false,
    },
    reducers: {

    },
    extraReducers: (getUsers) => {
        getUsers.addCase(getAllUsers.fulfilled, (state, action) => {
            state.isloading = false
            state.userList = action.payload
            // console.log(action.payload)

        }).addCase(getAllUsers.rejected, (state, action) => {
            state.isloading = true
            state.userList = []
            console.log(userList)
        }).addCase(getAllUsers.pending, (state, action) => {
            state.isloading = true
            console.log(action.payload)
            // state.userList = []
        })
    }
})
export default crudSlice.reducer