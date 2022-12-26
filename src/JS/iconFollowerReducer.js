import { createSlice } from "@reduxjs/toolkit";

const followerSlice = createSlice({
  name: "follower",
  initialState: {},
  reducers: {
    setFollower: (state, action) => {
      return action.payload;
    },
    uploadFollower: (state, action) => {
      return action.payload;
    },
  },
});

export const { uploadFollower, setFollower } = followerSlice.actions;

export default followerSlice.reducer;
