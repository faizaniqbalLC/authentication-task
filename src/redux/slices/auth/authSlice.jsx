import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticate: false,
  isNotRegistered: null,
  isRegistered: false,
  isLoggedOut: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    register: (state, action) => {
      const usersRegistered =
        JSON.parse(localStorage.getItem("usersRegistered")) || [];

      let filteredData = usersRegistered?.filter(
        (user) =>
          user.email === action?.payload?.email ||
          user.name === action?.payload?.name
      );

      if (filteredData?.length === 0) {
        state.user = action.payload;
        state.isRegistered = true;

        usersRegistered.push(action.payload);
        localStorage.setItem("authData", JSON.stringify(state));
        localStorage.setItem(
          "usersRegistered",
          JSON.stringify(usersRegistered)
        );
      }
      if (filteredData?.length === 1) {
        state.isNotRegistered = true;
        state.isAuthenticate = false;
        state.user = null;
        localStorage.removeItem("authData");
      }
    },

    login: (state, action) => {
      const usersRegistered =
        JSON.parse(localStorage.getItem("usersRegistered")) || [];

      let filteredData = usersRegistered?.filter(
        (user) =>
          user.email === action?.payload?.email &&
          user.password === action?.payload?.password
      );
      if (filteredData?.length === 1) {
        if (
          filteredData[0].password === action.payload?.password &&
          filteredData[0].email === action.payload?.email
        ) {
          state.isAuthenticate = true;
          state.isLoggedIn = true;
          state.user = filteredData[0]; // Store the user object in the state
          localStorage.setItem("authData", JSON.stringify(state));
        } else {
          state.isAuthenticate = false;
          state.isNotRegistered = true;
        }
      } else {
        state.isAuthenticate = false;
        state.isNotRegistered = true;
      }
    },

    logout: (state) => {
      state.isAuthenticate = false;
      state.user = null;
      state.isLoggedOut = true;
      localStorage.removeItem("authData");
    },
    reset: (state) => {
      state.isNotRegistered = null;
      state.isLoggedOut = false;
      state.isLoggedIn = false;
      state.isRegistered = false;
    },
  },
});

export const { register, login, logout, reset } = authSlice.actions;

export default authSlice.reducer;
