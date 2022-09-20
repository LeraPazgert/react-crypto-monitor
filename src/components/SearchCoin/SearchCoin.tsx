import "./SearchCoin.scss";
import { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface SearchCoinProps {
    setSearchText: (searchText: string) => void
}

const SearchCoin = ({ setSearchText }: SearchCoinProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
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
        </div>
    );
};

export default SearchCoin;