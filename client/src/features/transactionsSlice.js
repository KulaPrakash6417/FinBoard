import { createSlice } from "@reduxjs/toolkit";
import seedData from "../data/seedData";

const loadFromLocalStorage = () => {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : seedData;
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: loadFromLocalStorage(),
    reducers: {
        addTransaction: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("transactions", JSON.stringify(state));
        },

        deleteTransaction: (state, action) => {
            const updated = state.filter((t) => t.id !== action.payload);
            localStorage.setItem("transactions", JSON.stringify(updated));
            return updated;
        },

        updateTransaction: (state, action) => {
            const index = state.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
            localStorage.setItem("transactions", JSON.stringify(state));
        },

        setTransactions: (state, action) => {
            localStorage.setItem("transactions", JSON.stringify(action.payload));
            return action.payload;
        },

        mergeTransactions: (state, action) => {
            const merged = [...state, ...action.payload];
            localStorage.setItem("transactions", JSON.stringify(merged));
            return merged;
        },
    },
});

export const { addTransaction, deleteTransaction, updateTransaction, setTransactions, mergeTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;