import { AppDispatch } from "./index";
import axios from "../axios";
import { ICoin } from "../models/models";
import { coinSlice } from "./slices/coinSlice";
import { coinDetailSlice } from "./slices/coinDetailSlice";

export const fetchCoins = (limit = 15) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(coinSlice.actions.fetching());
      const response = await axios.get<ICoin>(`assets?limit=${limit}`);
      dispatch(
        coinSlice.actions.fetchingSuccess({
          coins: response.data.data,
        })
      );
    } catch (e) {
      dispatch(coinSlice.actions.fetchingError(e as Error));
    }
  };
};

export const fetchCoin = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(coinDetailSlice.actions.coinFetching());
      const response = await axios.get(`assets/${id}`);
      dispatch(coinDetailSlice.actions.coinFetchingSuccess(response.data.data));
    } catch (e) {
      dispatch(coinDetailSlice.actions.coinFetchingError(e as Error));
    }
  };
};
