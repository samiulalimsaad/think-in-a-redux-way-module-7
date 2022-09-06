import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeTransaction,
    createTransaction,
    transactionActions,
} from "../features/transaction/transactionSlice";

export default function Form() {
    const { isLoading, isError, error, editing } = useSelector(
        (state) => state.transaction
    );
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const [editMode, setEditMode] = useState(true);

    useEffect(() => {
        if (editing.id) {
            setEditMode(true);
            setName(editing.name);
            setType(editing.type);
            setAmount(editing.amount);
        } else {
            setEditMode(false);
            setName("");
            setType("");
            setAmount("");
        }
    }, [editing]);

    const resetForm = () => {
        dispatch(transactionActions.editInactive());
        setName("");
        setType("");
        setAmount("");
    };

    const cancelEditMode = () => {
        setEditMode(false);
        resetForm();
    };

    const handleCreate = (e) => {
        e.preventDefault();

        dispatch(
            createTransaction({
                name,
                type,
                amount: +amount,
            })
        );
        resetForm();
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        dispatch(
            changeTransaction({
                id: editing.id,
                data: { name, type, amount: +amount },
            })
        );
        resetForm();
    };

    return (
        <form
            className="form"
            onSubmit={editMode ? handleUpdate : handleCreate}
        >
            <h3>Add new transaction</h3>

            <div className="form-group">
                <label htmlFor="transaction_name">Name</label>
                <input
                    type="text"
                    name="transaction_name"
                    placeholder="My Salary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group radio">
                <label htmlFor="transaction_type">Type</label>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="income"
                        name="transaction_type"
                        checked={type === "income"}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                    <label htmlFor="transaction_type">Income</label>
                </div>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="expense"
                        name="transaction_type"
                        placeholder="Expense"
                        checked={type === "expense"}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                    <label htmlFor="transaction_type">Expense</label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="transaction_amount">Amount</label>
                <input
                    type="number"
                    placeholder="300"
                    name="transaction_amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            <button className="btn" disabled={isLoading}>
                {editMode ? "Edit" : "Add"} Transaction
            </button>

            {editMode && (
                <button
                    className="btn cancel_edit"
                    type="reset"
                    onClick={cancelEditMode}
                >
                    Cancel Edit
                </button>
            )}

            {!isLoading && isError && <p className="error">{error}</p>}
        </form>
    );
}
