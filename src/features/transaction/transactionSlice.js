import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addTransaction,
    editTransaction,
    getTransactions,
} from "./transactionApi";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {},
};

export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async () => await getTransactions()
);

export const createTransaction = createAsyncThunk(
    "transaction/createTransaction",
    async (data) => await addTransaction(data)
);

export const changeTransaction = createAsyncThunk(
    "transaction/changeTransaction",
    async ({ id, data }) => await editTransaction({ id, data })
);

export const removeTransaction = createAsyncThunk(
    "transaction/removeTransaction",
    async (id) => await editTransaction(id)
);

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInactive: (state) => {
            state.editing = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.transactions = [];
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.transactions = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.transactions.push(action.payload);
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(changeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                const index = state.transactions.findIndex(
                    (t) => t.id === action.payload.id
                );

                if (index) state.transactions[index] = action.payload;

                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                const index = state.transactions.findIndex(
                    (t) => action.payload.id
                );

                if (index)
                    state.transactions = state.transactions.filter(
                        (t) => action.payload !== t.id
                    );

                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            });
    },
});

export const transactionReducer = transactionSlice.reducer;
export const transactionActions = transactionSlice.actions;
