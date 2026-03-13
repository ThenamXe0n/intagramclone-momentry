import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "../../services/apicollections";

const initialState = {
  loggedInUser:  JSON.parse(localStorage.getItem("loggedInUser")) || false,
  isLoggedIn:  localStorage.getItem("loginStatus") === "momentryLoggedIn" || false,
  isLoading: false,
};

export const loginUserAsync = createAsyncThunk("handleLoginAsync", async (payload) => {
  try {
    const response = await loginUserAPI(payload);
    return response;
  } catch (error) {
    console.log(error);
  }
});

const AuthSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      console.log("this is state", state);
      console.log("this is action", action);
      state.isLoggedIn = action.payload.loginStatus;
      state.loggedInUser = action.payload.userDetails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.loginStatus;
        state.loggedInUser = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { handleLogin,fetchDetails } = AuthSlice.actions;

export default AuthSlice.reducer;
