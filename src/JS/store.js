import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userReducer";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
