import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllUsers = createAsyncThunk("getAllUsers", async (thunkAPI) => {
    try {
        let data = await axios.get("http://localhost:5000/api/user/current", { withCredentials: true });
        return data
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
export const isCurrentUser = createAsyncThunk("isCurrentUser", async (thunkAPI) => {
    try {
        let res = await axios.get("http://localhost:5000/api/user/current")
        return res.data
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
export const addUser = createAsyncThunk("addUser", async (formdata, thunkAPI) => {
    try {
        let res = await axios.post("http://localhost:5000/api/auth/signup", formdata, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,

        });
        return res.data

    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }

});
export const userLogIn = createAsyncThunk("loginUser", async (data, thunkAPI) => {
    try {
        let res = await axios.post("http://localhost:5000/api/auth/signin", data, {
            // headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        return res.data
    }
    catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userList: [],
        user: {
            name: "",
            gender: "",
            age: "",
            dob: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: ""
        },
        image: "",
        isloading: false,
        show: false
    },
    reducers: {
        handleshow: (state, action) => {
            state.show = true
        },
        handleclose: (state, action) => {
            state.show = false
        },
        handleuser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isloading = true;
                state.userList = [];
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isloading = true;
                state.userList = [];
                state.error = action.payload;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isloading = false
                state.userList = action.payload;
                state.message = action.payload.message
            })
            .addCase(isCurrentUser.pending, (state) => {
                state.isloading = true;
            })
            .addCase(isCurrentUser.rejected, (state, action) => {
                state.isloading = true;
                state.user = action.payload;
                state.error = action.payload;
            })
            .addCase(isCurrentUser.fulfilled, (state, action) => {
                state.isloading = false
                state.user = action.payload;
                state.message = action.payload.message
            })
            .addCase(addUser.pending, (state, action) => {
                state.isloading = true;
            }).addCase(addUser.fulfilled, (state, action) => {
                state.isloading = false;
                state.userList = [...state.userList, action.payload];
                state.message = action.payload.message
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isloading = true;
                state.userList = [];
                state.error = action.payload
            })
            .addCase(userLogIn.pending, (state, action) => {
                state.isloading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(userLogIn.fulfilled, (state, action) => {
                state.isloading = false;
                state.userList = action.payload;
                state.message = action.payload.message;
            })
            .addCase(userLogIn.rejected, (state, action) => {
                state.isloading = true;
                state.userList = [];
                state.error = action.payload
            })
    },
});
export const { handleshow, handleclose, handleuser } = userSlice.actions;
export default userSlice.reducer;