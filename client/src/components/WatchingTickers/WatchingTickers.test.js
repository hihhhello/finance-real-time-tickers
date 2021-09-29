import WatchingTickers from ".";
import { renderWithRedux } from "../../testUtils/renderWithRedux";

const initialState = {
  socket: {
    socket: {},
  },
  tickers: {
    tickers: null,
  },
};

describe("<WatchingTickers />", () => {
  it("loading", () => {
    const { asFragment } = renderWithRedux(<WatchingTickers />);

    expect(asFragment(<WatchingTickers />)).toMatchSnapshot();
  });

  it("renders w/o watching tickers", () => {
    const { asFragment, getByText } = renderWithRedux(<WatchingTickers />, {
      initialState: {
        ...initialState,
        tickers: {
          tickers: {},
        },
      },
    });
    expect(getByText(/No watching tickers/)).toBeInTheDocument();
    expect(asFragment(<WatchingTickers />)).toMatchSnapshot();
  });

  it("renders with tickers", () => {
    const tickers = {
      TSLA: [
        {
          exchange: "NASDAQ",
          price: "276.43",
          change: "-105.18",
          changePercent: "-0.90",
          dividend: "0.11",
          yield: "1.23",
          lastTradeTime: "2021-09-28T12:47:55.000Z",
        },
      ],
      GOOGL: [
        {
          exchange: "NASDAQ",
          price: "173.29",
          change: "-52.05",
          changePercent: "-0.67",
          dividend: "0.86",
          yield: "1.70",
          lastTradeTime: "2021-09-28T12:48:25.000Z",
        },
      ],
    };

    const { asFragment, getByText } = renderWithRedux(<WatchingTickers />, {
      initialState: {
        ...initialState,
        tickers: {
          tickers: {
            ...tickers,
          },
        },
      },
    });
    expect(getByText("TSLA")).toBeInTheDocument();
    expect(getByText("GOOGL")).toBeInTheDocument();
    expect(asFragment(<WatchingTickers />)).toMatchSnapshot();
  });
});
