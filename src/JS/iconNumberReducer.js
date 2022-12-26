import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const numberSlice = createSlice({
  name: "number",
  initialState: {},

  reducers: {
    setNumber: (state, action) => {
      return action.payload;
    },
    uploadNumber: (state, action) => {
      return action.payload;
    },
  },
});

export const { uploadNumber, setNumber } = numberSlice.actions;

export default numberSlice.reducer;
