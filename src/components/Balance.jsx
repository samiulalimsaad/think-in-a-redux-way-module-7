import { useSelector } from "react-redux";

export default function Balance() {
    const { transactions } = useSelector((state) => state.transaction);

    let balance = 0;

    transactions.map((t) => {
        if (t.type === "income") {
            balance += t.amount;
        }
        if (t.type === "expense") {
            balance -= t.amount;
        }
    });

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>
                <span>{balance.toLocaleString()}</span>
            </h3>
        </div>
    );
}
