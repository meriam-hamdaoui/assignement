import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import userSlice from "./userReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore(
  {
    reducer: {
      user: userSlice,
    },
  },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
