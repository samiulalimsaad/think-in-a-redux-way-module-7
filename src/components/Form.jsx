import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../features/transaction/transactionSlice";

export default function Form() {
    const { isLoading, isError, error } = useSelector(
        (state) => state.transaction
    );
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const resetForm = () => {
        setName("");
        setType("");
        setAmount("");
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

    return (
        <form className="form" onSubmit={handleCreate}>
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
                Add Transaction
            </button>

            <button className="btn cancel_edit" onClick={resetForm}>
                Cancel Edit
            </button>

            {!isLoading && isError && <p className="error">{error}</p>}
        </form>
    );
}
