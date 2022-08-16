import {ICoin} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CoinDetailState {
  coin: ICoin | null
  loading: boolean
  error: string
}

const initialState: CoinDetailState = {
  coin: null,
  loading: false,
  error: ''
}

export const coinDetailSlice = createSlice({
  name: 'coinDetail',
  initialState,
  reducers: {
    coinFetching(state) {
      state.loading = true
    },
   coinFetchingSuccess(state, action: PayloadAction<ICoin>) {
      state.loading = false
      state.error = ''
      state.coin = action.payload
    },
    coinFetchingError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export default coinDetailSlice.reducer