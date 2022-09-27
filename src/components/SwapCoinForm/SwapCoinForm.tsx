import "./SwapCoinForm.scss";
import { useState } from 'react';
import Box from '@mui/material/Box';
import { ChangeEvent, FormEvent } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { ICoinCart } from "../../models/models";
import { useAppDispatch } from "../../hooks/redux";
import { coinSwap, coinPos } from "../../store/slices/coinCartSlice";

interface SwapCoinFormProps {
    purchasedCoins: ICoinCart[]
}

const SwapCoinForm = ({ purchasedCoins }: SwapCoinFormProps) => {
    const dispatch = useAppDispatch();
    const [amount, setAmount] = useState<number | string>('');
    const inputsName = { from: '', to: '' }
    const [swap, setSwap] = useState(inputsName);
    const [error, setError] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSwap(prev => ({ ...prev, [event.target.name]: event.target.value }))
    };

    const availableQuantity =
        purchasedCoins
            .filter(item => item.symbol === swap.from)[0]?.quantity || 0;

    const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
        const regex = new RegExp("[a-zA-Z,_:$!%-,]");
        if (regex.test(event.target.value) || +event.target.value <= 0 || (availableQuantity < Number(event.target.value))) {
            setError("Invalid value");
        } else {
            setError("");
        }
    };

    const handleSwap = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const fromCoins =
            purchasedCoins
                .filter(item => item.symbol === swap.from)
                .map(item => {
                    const decreasedQuantity = +item.quantity - +amount;
                    return {
                        ...item,
                        quantity: decreasedQuantity,
                        price: decreasedQuantity * +item.priceUsd
                    }
                })

        const toCoins =
            purchasedCoins
                .filter(item => item.symbol === swap.to)
                .map(item => {
                    const increasedQuantity = ((+(purchasedCoins.find(c => c.symbol === swap.from)?.priceUsd || 0) * +amount) / +item.priceUsd) + +item.quantity
                    return {
                        ...item,
                        quantity: increasedQuantity,
                        price: increasedQuantity * +item.priceUsd
                    }

                })

        const swapped = fromCoins.concat(toCoins);
        dispatch(coinSwap(swapped));
        dispatch(coinPos())
        setSwap(inputsName);
        setAmount('');

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
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSwap}
                >
                    <AccordionDetails>
                        <span className="input-label">From</span>
                        <select
                            name='from'
                            className="input-select"
                            value={swap.from}
                            onChange={handleChange}
                        >
                            <option value="" disabled ></option>
                            {purchasedCoins.map(t => <option key={t.id}>{t.symbol}</option>)}
                        </select>
                        <span className="input-label">To</span>
                        <select
                            name='to'
                            className="input-select"
                            value={swap.to}
                            onChange={handleChange}
                        >
                            <option value="" disabled ></option>
                            {purchasedCoins.map(t => <option key={t.id}>{t.symbol}</option>)}
                        </select>
                        <span className="input-label">Amount</span>
                        <Box
                            sx={{ backgroundColor: 'white', border: '1px solid rgb(118, 116, 116)', marginTop: '15px' }}>
                            <FormControl variant="outlined" required fullWidth>
                                <OutlinedInput
                                    id="outlined-basic"
                                    name='amount'
                                    value={amount}
                                    onChange={handleChangeAmount}
                                />
                            </FormControl>
                        </Box>
                        {error && (
                            <div className="invalid">{error} </div>
                        )}
                        <Button variant="contained" style={{ margin: '20px 0 20px 0' }} type='submit' disabled={!!error}>
                            <span className="input-button">Swap</span>
                        </Button>
                    </AccordionDetails>
                </Box>
            </Accordion>
        </div>
    );
};

export default SwapCoinForm;