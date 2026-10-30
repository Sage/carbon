import React from "react";
import { render, screen } from "@testing-library/react";
import useMediaQuery from "../../hooks/useMediaQuery";
import Skeleton from ".";

jest.mock("../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

beforeEach(() => {
  mockUseMediaQuery.mockReturnValue(true);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("applies the slider animation to every skeleton line", () => {
  render(<Skeleton lines={[{}, {}]} />);

  screen.getAllByTestId("skeleton-line").forEach((line) => {
    expect(line).toHaveStyleRule(
      "background",
      "linear-gradient(120deg,#ccd6db 35%,#668494 50%,#ccd6db 75%)",
    );
    expect(line).toHaveStyleRule(
      "animation",
      expect.stringContaining("4s ease-in-out infinite"),
    );
  });
});

test.each([
  ["the disableAnimation prop is set", true, true],
  ["reduced motion is preferred", undefined, false],
] as const)(
  "disables line animation when %s",
  (_, disableAnimation, hasMotion) => {
    mockUseMediaQuery.mockReturnValue(hasMotion);

    render(<Skeleton disableAnimation={disableAnimation} lines={[{}, {}]} />);

    screen.getAllByTestId("skeleton-line").forEach((line) => {
      expect(line).toHaveStyleRule("animation", "none");
    });
  },
);

test("aligns every line to the wrapper background coordinate system", () => {
  const linePositions = new WeakMap<HTMLElement, number>();
  let nextLinePosition = 10;

  jest
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(function mockBoundingClientRect(
      this: HTMLElement,
    ): DOMRect {
      const role = this.getAttribute("data-role");

      if (role === "skeleton-wrapper") {
        return {
          bottom: 120,
          height: 100,
          left: 10,
          right: 210,
          top: 20,
          width: 200,
          x: 10,
          y: 20,
          toJSON: () => ({}),
        };
      }

      let left = linePositions.get(this);

      if (left === undefined) {
        left = nextLinePosition;
        linePositions.set(this, left);
        nextLinePosition = 58;
      }

      return {
        bottom: 60,
        height: 40,
        left,
        right: left + 40,
        top: 20,
        width: 40,
        x: left,
        y: 20,
        toJSON: () => ({}),
      };
    });

  render(
    <Skeleton
      lines={[
        [
          { height: "40px", shape: "circle" },
          { height: "21px", shape: "rectangle-curved" },
        ],
      ]}
    />,
  );

  expect(screen.getByTestId("skeleton-wrapper")).toHaveStyle({
    "--skeleton-background-width": "600px",
    "--skeleton-background-height": "100px",
    "--skeleton-background-start-x": "-560px",
    "--skeleton-background-end-x": "80px",
  });
  expect(screen.getAllByTestId("skeleton-line")[0]).toHaveStyle({
    "--skeleton-line-offset-x": "0px",
    "--skeleton-line-offset-y": "0px",
  });
  expect(screen.getAllByTestId("skeleton-line")[1]).toHaveStyle({
    "--skeleton-line-offset-x": "48px",
    "--skeleton-line-offset-y": "0px",
  });
});
