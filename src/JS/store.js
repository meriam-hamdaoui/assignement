import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import userSlice from "./userReducer";
import numberSlice from "./iconNumberReducer";
import thunk from "redux-thunk";
import followerSlice from "./iconFollowerReducer";
import { numberGBReducer, followerKReducer } from "./dataReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore(
  {
    reducer: {
      user: userSlice,
      number: numberSlice,
      follower: followerSlice,
      numberGB: numberGBReducer,
      followerK: followerKReducer,
    },
  },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
