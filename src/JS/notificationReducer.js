import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    setNotifications: (state, action) => {
      return [...state, ...action.payload];
    },
    deleteNotif: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setNotifications, deleteNotif } = notificationSlice.actions;

export default notificationSlice.reducer;
