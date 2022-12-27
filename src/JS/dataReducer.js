import { createSlice } from "@reduxjs/toolkit";

const numberGBSlice = createSlice({
  name: "numberGB",
  initialState: 150,
  reducers: {
    setNumberGB: (state) => state + 1,
  },
});
const followerKSlice = createSlice({
  name: "followerK",
  initialState: 45,
  reducers: {
    setFollowerK: (state) => state + 1,
  },
});

export const { setNumberGB } = numberGBSlice.actions;
export const numberGBReducer = numberGBSlice.reducer;
export const { setFollowerK } = followerKSlice.actions;
export const followerKReducer = followerKSlice.reducer;
