export const DEFAULT = {
  isWatching: true,
  avalTickers: null,
  watchingTickers: [
    "AAPL", // Apple
    "GOOGL", // Alphabet
    "MSFT", // Microsoft
    "AMZN", // Amazon
    "FB", // Facebook
    "TSLA", // Tesla
  ],
  updateInterval: 5000,
};

export const GET_EXPIRES_DATE = (days) =>
  new Date(new Date().setDate(new Date().getDate() + days));
