import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ICoin } from "../../models/models";

interface TableRowProps {
    item: ICoin
    setSelectedCoin: (selectedCoin: string | null | boolean) => void
}

const TableRow = ({ item, setSelectedCoin }: TableRowProps) => {
    const navigate = useNavigate();

    const openCoin = useCallback((): void => {
        navigate(`/assets/${item.id}`);
    }, [item.id, navigate]);


    const selectCoin = useCallback((): void => {
        setSelectedCoin(item.id)
    }, [item.id, setSelectedCoin]);

    const parsedChange = parseFloat(item.changePercent24Hr);

    return (
        <tr>
            <td>{item.rank}</td>
            <td onClick={openCoin}>
                <span className="coins-table__name">{item.name}</span>
            </td>
            <td>${parseFloat(item.priceUsd).toFixed(2)}</td>
            <td
                style={{
                    color:
                        parsedChange > 0
                            ? "rgb(14, 203, 129)"
                            : "red",
                    fontWeight: 500,
                }}
            >
                {parsedChange.toFixed(2)}%
            </td>
            <td>
                <button
                    className="coins-table__button"
                    onClick={selectCoin}
                >
                    +
                </button>
            </td>
        </tr >
    )


};

export default TableRow;