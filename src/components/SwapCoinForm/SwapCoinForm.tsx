import "./SwapCoinForm.scss";
import { useState, useEffect } from 'react';
import { ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ICoinCart } from "../../models/models";
import { useAppDispatch } from "../../hooks/redux";
import { coinSwap, coinPos } from "../../store/slices/coinCartSlice";

interface SwapCoinFormProps {
    purchasedCoins: ICoinCart[]
}

const SwapCoinForm = ({ purchasedCoins }: SwapCoinFormProps) => {
    const dispatch = useAppDispatch();
    const [amount, setAmount] = useState<number>(0);
    const [swap, setSwap] = useState({
        from: '',
        to: '',
    });
    const [error, setError] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSwap(prev => ({ ...prev, [event.target.name]: event.target.value }))
    };

    const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
        const regex = new RegExp("[a-zA-Z,_:$!%-]");
        if (regex.test(event.target.value) || +event.target.value <= 0) {
            setError("Invalid value");
            setAmount(+event.target.value);
        } else {
            setError("");
            setAmount(+event.target.value);
        }
    };

    const handleSwap = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const fromCoins =
            purchasedCoins
                .filter(item => item.symbol === swap.from)
                .map(item => ({ ...item, quantity: +item.quantity - amount }))

        const toCoins =
            purchasedCoins
                .filter(item => item.symbol === swap.to)
                .map(item => ({ ...item, quantity: +item.quantity + amount }))

        const swapped = fromCoins.concat(toCoins)
        dispatch(coinSwap(swapped));
        dispatch(coinPos())
        setSwap({
            from: '',
            to: ''
        })
    };

    return (
        <div className="search-main">
            <Accordion style={{ backgroundColor: 'rgb(234, 234, 234)', marginTop: '20px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h1>Swap your crypto</h1>
                </AccordionSummary>
                <form onSubmit={handleSwap}>
                    <AccordionDetails>
                        <span className="input-label">From</span>
                        <select
                            name='from'
                            className="input-select"
                            value={swap.from}
                            onChange={handleChange}
                        >
                            <option value="" disabled >BTC</option>
                            {purchasedCoins.map(t => <option key={t.id}>{t.symbol}</option>)}
                        </select>
                        <span className="input-label">To</span>
                        <select
                            name='to'
                            className="input-select"
                            value={swap.to}
                            onChange={handleChange}
                        >
                            <option value="" disabled >EUT</option>
                            {purchasedCoins.map(t => <option key={t.id}>{t.symbol}</option>)}
                        </select>
                        <span className="input-label">Amount</span>
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            name='amount'
                            required
                            onChange={handleChangeAmount}
                            style={{ backgroundColor: 'white', border: '1px solid rgb(118, 116, 116)' }}
                        />
                        {error && (
                            <div
                                style={{
                                    color: "red",
                                    fontSize: "25px",
                                    marginLeft: "7px",
                                    marginRight: "10px",
                                    marginTop: "30px",
                                }}
                            >
                                {error}
                            </div>
                        )}
                        <Button variant="contained" style={{ margin: '20px 0 20px 0' }} type='submit' disabled={!!error}>
                            <span className="input-button">Swap</span>
                        </Button>
                    </AccordionDetails>
                </form>
            </Accordion>
        </div>
    );
};

export default SwapCoinForm;