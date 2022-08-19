import { createSlice } from "@reduxjs/toolkit";
import { ICoinCart } from "../../models/models";

interface CoinCartState {
  purchasedCoins: ICoinCart[];
}

const initialState: CoinCartState = {
  purchasedCoins: JSON.parse(localStorage.getItem('coins') || '[]')
};

export const coinCartSlice = createSlice({
  name: "coinsCart",
  initialState,
  reducers: {
    coinAdd: (state, action) => {
      state.purchasedCoins?.push(action.payload);
      localStorage.setItem('coins', JSON.stringify(state.purchasedCoins))
    },
    coinDeleted: (state, action) => {
      state.purchasedCoins = state.purchasedCoins?.filter((item) => item.id !== action.payload) || [];
      localStorage.setItem('coins', JSON.stringify(state.purchasedCoins ))
    },
  },
});

export default coinCartSlice.reducer;
const { actions } = coinCartSlice;

export const { coinAdd, coinDeleted } = actions;
