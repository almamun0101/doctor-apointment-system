"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // always null at first (SSR safe)
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    clearUser: (state) => {
      state.currentUser = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    loadUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          state.currentUser = JSON.parse(storedUser);
        }
      }
    },
  },
});

export const { setUser, clearUser, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
