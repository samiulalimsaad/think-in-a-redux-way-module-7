import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
    removeTransaction,
    transactionActions,
} from "../../features/transaction/transactionSlice";

export default function Transaction({ transaction }) {
    const { id, name, type, amount } = transaction;

    const dispatch = useDispatch();

    const handleEditAction = () => {
        dispatch(transactionActions.editActive(transaction));
    };

    const handleDelete = () => {
        dispatch(removeTransaction(id));
    };

    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button className="link" onClick={handleEditAction}>
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button className="link" onClick={handleDelete}>
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
