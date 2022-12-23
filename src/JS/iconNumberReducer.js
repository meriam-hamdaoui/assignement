import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const numberSlice = createSlice({
  name: "number",
  initialState: {},
  reducer: {
    uploadNumber: (state, action) => {
      return action.payload;
    },
  },
});

export const { uploadNumber } = numberSlice.actions;

export default numberSlice.reducer;
