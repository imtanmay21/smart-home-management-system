import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./UserReducer/UserReducer";
import { LocationReducer } from "./LocationReducer/LocationReducer";
const reducers = combineReducers({ UserReducer, LocationReducer });

export const store = configureStore({
  reducer: reducers,
});
