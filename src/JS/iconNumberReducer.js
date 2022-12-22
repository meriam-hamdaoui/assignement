import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const numberSlice = createSlice({
  name: "number",
  initialState: {
    id: uuidv4(),
    icon: "",
  },
  reducer: {
    upload: (state, action) => {
      return action.payload;
    },
  },
});

export const { upload } = numberSlice.actions;

export default numberSlice.reducer;
