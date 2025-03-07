import React from "react";
import { render, screen } from "@testing-library/react";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import Loader from ".";
import useMediaQuery from "../../hooks/useMediaQuery";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

beforeEach(() => {
  jest.clearAllMocks();
  mockUseMediaQuery.mockReturnValue(false);
});

afterAll(() => {
  jest.restoreAllMocks();
});

testStyledSystemMargin(
  (props) => <Loader data-role="loader" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  () => screen.queryByTestId("loader")!,
);

test("throws a deprecation warning if the 'aria-label' prop is set", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  render(<Loader aria-label="Still loading" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The aria-label prop in Loader is deprecated and will soon be removed, please use the `loaderLabel` prop instead to provide an accessible label.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});

test.each([
  ["large", "20px", "8px"],
  ["medium", "12px", "6px"],
  ["small", "12px", "6px"],
  [undefined, "12px", "6px"],
] as const)(
  "applies correct styles when size is '%s'",
  (size, expectedWidth, expectedMarginRight) => {
    const props = size ? { size } : {};

    render(<Loader {...props} />);

    const squares = screen.getAllByTestId("loader-square");

    expect(squares[0]).toHaveStyle({
      width: expectedWidth,
      marginRight: expectedMarginRight,
    });
  },
);

test("does not render anything when `reduceMotion` is undefined", () => {
  mockUseMediaQuery.mockReturnValueOnce(undefined);

  render(<Loader />);

  expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
});

test("when the user disallows animations or their preference cannot be determined, alternative loading text is rendered", () => {
  render(<Loader />);

  expect(screen.getByText("Loading")).toBeVisible();
});

test("when the user disallows animations or their preference cannot be determined, the provided `aria-label` is rendered", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  render(<Loader aria-label="Still loading" />);

  expect(screen.getByText("Still loading")).toBeVisible();

  loggerSpy.mockRestore();
});

test("when the user disallows animations or their preference cannot be determined, the provided `loaderLabel` is rendered", () => {
  render(<Loader loaderLabel="Still loading" />);

  expect(screen.getByText("Still loading")).toBeVisible();
});

describe("when the user allows animations", () => {
  test("renders three square animation", () => {
    mockUseMediaQuery.mockReturnValue(true);
    render(<Loader />);
    const squares = screen.getAllByTestId("loader-square");
    expect(squares).toHaveLength(3);
  });

  test("visually hidden label is set to 'Loading' when neither `aria-label` nor `loaderLabel` are passed", () => {
    render(<Loader data-role="loader" />);

    expect(screen.getByTestId("loader")).toHaveTextContent("Loading");
  });

  test("should set visually hidden label to provided `aria-label`", () => {
    const loggerSpy = jest
      .spyOn(Logger, "deprecate")
      .mockImplementation(() => {});

    render(<Loader data-role="loader" aria-label="Still loading" />);

    expect(screen.getByTestId("loader")).toHaveTextContent("Still loading");

    loggerSpy.mockRestore();
  });

  test("should set visually hidden label to provided `loaderLabel`", () => {
    render(<Loader data-role="loader" loaderLabel="Still loading" />);

    expect(screen.getByTestId("loader")).toHaveTextContent("Still loading");
  });
});
