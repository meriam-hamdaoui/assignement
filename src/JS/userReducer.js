import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    id: uuidv4(),
    isAuth: false,
    firstName: "ali",
    lastName: "ali",
    phone: "0021655123456",
    country: "Afghanistan",
    email: "ali_ali@example.com",
    password: "azerty132",
  },
  {
    id: uuidv4(),
    isAuth: false,
    firstName: "kahled",
    lastName: "kahled",
    phone: "0021655234567",
    country: "Aruba",
    email: "kahled_kahled@example.com",
    password: "azerty132",
  },
  {
    id: uuidv4(),
    isAuth: false,
    firstName: "dhekra",
    lastName: "dhekra",
    phone: "0021655345678",
    country: "Belarus",
    email: "dhekra_dhekra@example.com",
    password: "azerty132",
  },
  {
    id: uuidv4(),
    isAuth: false,
    firstName: "amal",
    lastName: "amal",
    phone: "0021655456789",
    country: "Brazil",
    email: "amal_amal@example.com",
    password: "azerty132",
  },
  {
    id: uuidv4(),
    isAuth: false,
    firstName: "omar",
    lastName: "omar",
    phone: "0021655567891",
    country: "China",
    email: "omar_omar@example.com",
    password: "azerty132",
  },
  {
    id: uuidv4(),
    isAuth: false,
    firstName: "insaf",
    lastName: "insaf",
    phone: "0021655678912",
    country: "Cook Islands",
    email: "insaf_insaf@example.com",
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
