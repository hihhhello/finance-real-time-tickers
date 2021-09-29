import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ticker from ".";
import { renderWithRedux } from "../../testUtils/renderWithRedux";
import { formatNumSybmol } from "../../utils/formatNumSybmol";

const tickerData = {
  ticker: "TSL",
  price: 234.7,
  change: 48.9,
  changePercent: 0.34,
};

const initialState = {
  userSettings: {
    isWatching: true,
  },
};

const onClick = jest.fn();

describe("Ticker", () => {
  it("Skeleton snapshot", () => {
    const { asFragment, container } = renderWithRedux(<Ticker skeleton />);
    expect(container.firstChild).toHaveClass("wrapperSkeleton");
    expect(asFragment(<Ticker skeleton />)).toMatchSnapshot();
  });

  it("empty snapshot", () => {
    const { asFragment } = renderWithRedux(<Ticker />);

    expect(asFragment(<Ticker />)).toMatchSnapshot();
  });

  it("renders", () => {
    const { getByText, asFragment } = renderWithRedux(
      <Ticker {...tickerData} />,
      {
        initialState,
      }
    );

    expect(getByText(tickerData.ticker)).toBeInTheDocument();
    expect(
      getByText(Intl.NumberFormat("ru-RU").format(tickerData.price))
    ).toBeInTheDocument();
    expect(getByText(formatNumSybmol(tickerData.change))).toBeInTheDocument();
    expect(
      getByText(formatNumSybmol(tickerData.changePercent))
    ).toBeInTheDocument();
    expect(asFragment(<Ticker />)).toMatchSnapshot();
  });

  it("paused on toggle click", () => {
    const { container, asFragment } = renderWithRedux(
      <Ticker {...tickerData} />,
      {
        initialState: {
          userSettings: {
            isWatching: false,
          },
        },
      }
    );
    expect(asFragment(<Ticker />)).toMatchSnapshot();
    expect(container.firstChild).toHaveClass("wrapperPaused");
  });

  it("onClick works", () => {
    const { container } = renderWithRedux(
      <Ticker {...tickerData} onClickHandler={onClick} />,
      {
        initialState,
      }
    );
    userEvent.click(container.firstChild);
    expect(onClick).toHaveBeenCalled();
  });

  it("changed styles for negative numbers", () => {
    const negativeTickerData = {
      ...tickerData,
      price: -234.7,
      change: -48.9,
      changePercent: -0.34,
    };
    const { container } = renderWithRedux(<Ticker {...negativeTickerData} />, {
      initialState,
    });
    expect(container.firstChild).toHaveClass("wrapperLoss");
  });
});
