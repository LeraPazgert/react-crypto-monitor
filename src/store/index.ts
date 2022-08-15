import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coinReducer from "./slices/coinSlice";

const rootReducer = combineReducers({
  coin: coinReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
