import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICoinCart } from "../../models/models";

interface CoinCartState {
  purchasedCoins: ICoinCart[];
}

const initialState: CoinCartState = {
  purchasedCoins: JSON.parse(localStorage.getItem("coins") || "[]"),
};

export const coinCartSlice = createSlice({
  name: "coinsCart",
  initialState,
  reducers: {
    coinAdd: (state, action) => {
      const { symbol, quantity } = action.payload;
      const existingСoin = state.purchasedCoins.find(
        (item) => item.symbol === symbol
      );
      if (!existingСoin) {
        state.purchasedCoins?.push(action.payload);
      } else {
        existingСoin.quantity = +existingСoin.quantity + +quantity;
      }
      localStorage.setItem("coins", JSON.stringify(state.purchasedCoins));
    },
    coinDeleted: (state, action) => {
      state.purchasedCoins =
        state.purchasedCoins?.filter((item) => item.id !== action.payload) ||
        [];
      localStorage.setItem("coins", JSON.stringify(state.purchasedCoins));
    },
    coinSwap: (state, action: PayloadAction<ICoinCart[]>) => {
      const old = state.purchasedCoins.filter(
        (item) => !action.payload.find((coin) => coin.symbol === item.symbol)
      );
      state.purchasedCoins = [...old, ...action.payload];
      localStorage.setItem("coins", JSON.stringify(state.purchasedCoins));
    },
    coinPos: (state) => {
      state.purchasedCoins = state.purchasedCoins.filter(
        (item) => item.quantity > 0
      );
      localStorage.setItem("coins", JSON.stringify(state.purchasedCoins));
    },
  },
});

export default coinCartSlice.reducer;
const { actions } = coinCartSlice;

export const { coinAdd, coinDeleted, coinSwap, coinPos } = actions;
