import "./SearchCoin.scss";
import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

interface SearchCoinProps {
    setSearchText: (searchText: string) => void
}

const SearchCoin = ({ setSearchText }: SearchCoinProps) => {
    const [error, setError] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        const regex = new RegExp("[0-9,_:$!%-]");
        if (regex.test(event.target.value)) {
            setError("Invalid value");
        } else {
            setError("");
        }
    };
    return (
        <div className="search-main">
            <h1>Search coin</h1>
            <div className="search__input">
                <TextField
                    id="outlined-basic"
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
            </div>
            {error && (<div className="invalid">{error} </div>)}
        </div>
    );
};

export default SearchCoin;