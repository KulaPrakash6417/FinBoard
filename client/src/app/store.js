import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactionsSlice";
import uiReducer from "../features/uiSlice";
import roleReducer from "../features/roleSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    ui: uiReducer,
    role: roleReducer,
  },
});