import { createSlice } from "@reduxjs/toolkit";
import {
  logIn,
  //   register,
  clearAuthHeader,
  //   logout,
  //   sendEmail,
  //   resetPassword,
} from "./operations";
import { toast } from "react-hot-toast";
const authInitialState = {
  user: null,
  accessToken: localStorage.getItem("token") || null,
  isLoggedIn: false,
  isEmailSending: false,
  isRefreshing: false,
  emailSend: false,
  emailError: null,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.user = null;
      clearAuthHeader();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        toast.success("Logged in successfully!", {
          duration: 5000,
          position: "top-center",
          style: {
            textAlign: "center",
            boxShadow: "8px 11px 27px -8px rgba(66, 68, 90, 1)",
          },
        });
      })
      .addCase(logIn.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.error;
        state.isRefreshing = false;
        state.isLoggedIn = false;
        toast.error("Email or password is wrong.", {
          duration: 5000,
          position: "top-center",
          style: {
            textAlign: "center",
            boxShadow: "8px 11px 27px -8px rgba(66, 68, 90, 1)",
          },
        });
      });
  },
});
export const { setCredentials, clearCredentials, logoutAction } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
