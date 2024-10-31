import React from "react";
import { render, screen } from "@testing-library/react";
import { testStyledSystemMarginRTL } from "../../__spec_helper__/__internal__/test-utils";
import Loader from ".";
import useMediaQuery from "../../hooks/useMediaQuery";

jest.mock("../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(false),
}));

testStyledSystemMarginRTL(
  (props) => <Loader {...props} />,
  () => screen.getByRole("progressbar"),
);

test("when the user disallows animations or their preference cannot be determined, alternative loading text is rendered", () => {
  render(<Loader />);

  expect(screen.getByText("Loading")).toBeInTheDocument();
});

describe("when the user allows animations", () => {
  beforeEach(() => {
    const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
      typeof useMediaQuery
    >;
    mockUseMediaQuery.mockReturnValueOnce(true);
  });

  test("renders three square animation", () => {
    render(<Loader />);

    const squares = screen.getAllByTestId("loader-square");

    expect(squares).toHaveLength(3);
  });

  test("root element has accessible name", () => {
    render(<Loader />);

    expect(screen.getByRole("progressbar")).toHaveAccessibleName("Loading");
  });

  test("when custom `aria-label` is passed, set accessible name to its value", () => {
    render(<Loader aria-label="Still loading" />);

    expect(screen.getByRole("progressbar")).toHaveAccessibleName(
      "Still loading",
    );
  });
});
