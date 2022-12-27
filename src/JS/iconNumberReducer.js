import { createSlice } from "@reduxjs/toolkit";

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
