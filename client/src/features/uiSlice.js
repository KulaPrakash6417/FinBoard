import { createSlice } from "@reduxjs/toolkit";

const loadDarkMode = () => {
  const stored = localStorage.getItem("darkMode");
  return stored === "true";
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: loadDarkMode(),
    currency: "₹",
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { toggleDarkMode, setCurrency } = uiSlice.actions;
export default uiSlice.reducer;
