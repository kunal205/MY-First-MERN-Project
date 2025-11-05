import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice.js";
import userRegisterSlice from "./UserSLice.js"
import crudSlice from "./crudSlice.js"
const store = configureStore({
  reducer: {
    products: ProductSlice,
    users: userRegisterSlice,
    crudApp: crudSlice
  },
});
export default store;
