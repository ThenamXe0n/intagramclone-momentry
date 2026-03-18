import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewUser: {},
};

const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setViewUserDetails: (state, action) => {
      state.viewUser = action.payload;
    },
    resetViewUserDetails: (state) => {
      state.viewUser = {};
    },
  },
});

export const { setViewUserDetails,resetViewUserDetails } = CommonSlice.actions;

export default CommonSlice.reducer;
