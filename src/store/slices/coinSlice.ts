import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICoin } from "../../models/models";

interface CoinState {
  loading: boolean;
  error: string;
  coins: ICoin[];
}

const initialState: CoinState = {
  loading: false,
  error: "",
  coins: [],
};

interface CoinPayload {
    coins: ICoin[]
  }

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchingSuccess(state, action: PayloadAction<CoinPayload>) {
      state.coins = action.payload.coins;
      state.loading = false;
    },
    fetchingError(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default coinSlice.reducer;