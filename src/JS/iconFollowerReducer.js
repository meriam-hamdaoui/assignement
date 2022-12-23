import { createSlice } from "@reduxjs/toolkit";

const followerSlice = createSlice({
  name: "follower",
  initialState: {},
  reducer: {
    uploadFollower: (state, action) => {
      return action.payload;
    },
  },
});

export const { uploadFollower } = followerSlice.actions;

export default followerSlice.reducer;
