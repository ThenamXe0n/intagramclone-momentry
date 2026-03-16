import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserNotificationAPI } from "../../services/apicollections";

const initialState = {
  notificationList: [],
  count: 0,
  loading: true,
  error: null,
};

// =========== async thunk for loading user Notification=====
export const fetchUserNotificationAsync = createAsyncThunk(
  "notification/fetch",
  async (userId) => {
    try {
      const res = await fetchUserNotificationAPI(userId);
      return res;
    } catch (error) {
      return error;
    }
  },
);

const NotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNotificationAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserNotificationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationList = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchUserNotificationAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default NotificationSlice.reducer;
