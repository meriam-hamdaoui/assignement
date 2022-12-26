import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const numberSlice = createSlice({
  name: "number",
  initialState: {},

  reducers: {
    uploadNumber: (state, action) => {
      return [{ id: action.payload.id, icon: action.payload.icon }];
    },
  },
});

export const { uploadNumber } = numberSlice.actions;

export default numberSlice.reducer;
