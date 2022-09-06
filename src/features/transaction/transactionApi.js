import { axiosInstance } from "../../utils/axiosInstance";

const getTransaction = async () =>
    (await axiosInstance.get("/transactions")).data;

const addTransaction = async (data) =>
    (await axiosInstance.post("/transactions", data)).data;

const editTransaction = async ({ id, data }) =>
    (await axiosInstance.patch(`/transactions/${id}`, data)).data;

const deleteTransaction = async (id) =>
    (await axiosInstance.delete(`/transactions/${id}`)).data;
