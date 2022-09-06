import { axiosInstance } from "../../utils/axiosInstance";

export const getTransactions = async () =>
    (await axiosInstance.get("/transactions")).data;

export const addTransaction = async (data) =>
    (await axiosInstance.post("/transactions", data)).data;

export const editTransaction = async ({ id, data }) =>
    (await axiosInstance.patch(`/transactions/${id}`, data)).data;

export const deleteTransaction = async (id) =>
    (await axiosInstance.delete(`/transactions/${id}`)).data;
