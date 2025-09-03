import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDoctor: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctor: (state, action) => {
      state.currentDoctor = action.payload;
      localStorage.setItem("doctor", JSON.stringify(action.payload)); // save to storage
    },
    clearDoctor: (state) => {
      state.currentDoctor = null;
      localStorage.removeItem("doctor"); // remove from storage
    },
    loadDoctorFromStorage: (state) => {
      const storedDoctor = localStorage.getItem("doctor");
      if (storedDoctor) {
        state.currentDoctor = JSON.parse(storedDoctor);
      }
    },
  },
});

export const { setDoctor, clearDoctor, loadDoctorFromStorage } = doctorSlice.actions;
export default doctorSlice.reducer;
