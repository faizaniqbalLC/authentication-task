import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    authUser: authReducer,
  },
});

export default store;
