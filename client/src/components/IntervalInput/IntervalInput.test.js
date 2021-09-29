import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "../../testUtils/renderWithRedux";
import { IntervalInput } from "./IntervalInput";

const initialState = {
  socket: null,
  userSettings: {
    updateInterval: 5000,
  },
};

describe("Interval input element", () => {
  it("renders with loader", () => {
    const { asFragment, getByText } = renderWithRedux(<IntervalInput />);

    expect(getByText("Loading...")).toBeInTheDocument();
    expect(asFragment(<IntervalInput />)).toMatchSnapshot();
  });

  it("renders", () => {
    const { asFragment, getByRole } = renderWithRedux(<IntervalInput />, {
      initialState: {
        ...initialState,
        socket: {},
      },
    });
    expect(getByRole("button", { name: /set/i })).toBeInTheDocument();
    expect(getByRole("textbox")).toHaveAttribute(
      "value",
      initialState.updateInterval
    );
    expect(asFragment(<IntervalInput />)).toMatchSnapshot();
  });

  it("insert new update interval", () => {
    const { getByRole } = renderWithRedux(<IntervalInput />, {
      initialState: {
        ...initialState,
        socket: {},
      },
    });
    expect(getByRole("textbox")).toHaveAttribute(
      "value",
      initialState.updateInterval
    );
    userEvent.type(
      getByRole("textbox"),
      "{backspace}{backspace}{backspace}{backspace}8000"
    );
    expect(getByRole("textbox")).toHaveAttribute("value", "8000");
  });

  // it("on click button updating interval value in user settings", async () => {
  //   const { getByRole } = renderWithRedux(<IntervalInput />, {
  //     initialState: {
  //       ...initialState,
  //     },
  //   });
  //   userEvent.click(getByRole("button", { name: /set/ }));
  // });
});
