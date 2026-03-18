import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth/authSlice";
import NotificationReducer from "./notification/notificationSlice";
import CommonReducer from "./commonSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    notification: NotificationReducer,
    common: CommonReducer,
  },
});

export default store;
