export interface ICoin {
  data: [];
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  marketCapUsd: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  quantity: number;
}

export interface ICoinCart {
  id: string;
  symbol: string;
  quantity: number;
  price: string;
}