import { AppDispatch } from "./index";
import axios from "../axios";
import { ICoin } from "../models/models";
import { coinSlice } from "./slices/coinSlice";

export const fetchCoins = (limit=5) => {
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
