import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    id: uuidv4(),
    username: "user1",
    email: "user1@example.com",
    password: "azerty132",
  },
  {
    id: uuidv4(),
    username: "user2",
    email: "user2@example.com",
    password: "azerty132",
  },
  {
    id: uuidv4(),
    username: "user3",
    email: "user3@example.com",
    password: "azerty132",
  },
  {
    id: uuidv4(),
    username: "user4",
    email: "user4@example.com",
    password: "azerty132",
  },
];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      return action.payload;
    },
    register: (state, action) => {
      const newUser = {
        id: uuidv4(),
        ...action.payload,
      };
      return [...state, newUser];
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;
