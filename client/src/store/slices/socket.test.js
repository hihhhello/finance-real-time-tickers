import reducer, { socketActions } from "./socket";

describe("socketSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      socket: null,
    });
  });

  it("should set socket", () => {
    const prevState = { socket: null };
    const action = {
      type: "socket/setUserSettings/fulfilled",
      payload: { socket: "data", manager: "manager" },
    };
    expect(reducer(prevState, action)).toEqual({
      socket: {
        socket: "data",
        manager: "manager",
      },
    });
  });
});
