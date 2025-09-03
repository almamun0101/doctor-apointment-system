// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import doctorReducer from "./doctorSlice"; 


export const store = configureStore({
  reducer: {
    user: userReducer,
     doctor: doctorReducer,
  },
});
