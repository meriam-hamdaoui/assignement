import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    id: uuidv4(),
    firstName: "user0",
    lastName: "user0",
    phone: "98765432",
    country: "Afghanistan",
    email: "user0@example.com",
    password: "123456",
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
    setUsers: (state, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return { ...state.user, ...action.payload };
        }
        return user;
      });
    },
  },
});

export const { login, logout, register, setUsers, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
