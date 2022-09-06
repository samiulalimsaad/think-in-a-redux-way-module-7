import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
    const { transactions, isLoading, error, isError } = useSelector(
        (state) => state.transaction
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactions());
    }, []);

    let content = null;

    if (isLoading) content = <p>Loading...</p>;
    if (!isLoading && isError) content = <p>{error}</p>;
    if (!isLoading && !isError && transactions.length === 0)
        content = <p>there is no transaction</p>;
    if (!isLoading && !isError && transactions.length > 0)
        content = transactions.map((t) => (
            <Transaction key={t.id} transaction={t} />
        ));

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
            </div>
        </>
    );
}
