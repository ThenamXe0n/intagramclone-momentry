import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth/authSlice";
import NotificationReducer from "./notification/notificationSlice"

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    notification:NotificationReducer,
  },
});

export default store;
