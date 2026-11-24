import React from "react";
import { render, screen } from "@testing-library/react";
import useMediaQuery from "../../hooks/useMediaQuery";
import I18nProvider from "../i18n-provider";
import frFR from "../../locales/fr-fr";
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
      "background-image",
      expect.stringMatching(
        /linear-gradient\(\s*120deg,\s*var\(--mode-color-status-skeleton-stop-2\) 35%,\s*var\(--mode-color-status-skeleton-stop-1\) 50%,\s*var\(--mode-color-status-skeleton-stop-2\) 75%\s*\)/,
      ),
    );
    expect(line).toHaveStyleRule(
      "background-color",
      "var(--mode-color-status-skeleton-stop-2)",
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
      expect(line).toHaveStyleRule(
        "background-image",
        expect.stringContaining("--progress-loader-bg-skeleton"),
      );
      expect(line).toHaveStyleRule("background-size", "100% 100%");
      expect(line).toHaveStyleRule("background-position", "0 0");
    });
  },
);

test("communicates an accessible loading state", () => {
  render(<Skeleton aria-label="Loading account details" lines={[{}]} />);

  const skeleton = screen.getByRole("status", {
    name: "Loading account details",
  });

  expect(skeleton).not.toHaveAttribute("aria-live");
  expect(skeleton).not.toHaveAttribute("aria-busy");
  expect(screen.getByTestId("skeleton-line")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  expect(screen.getByTestId("skeleton-line").tagName).toBe("SPAN");
});

test("uses the localized loading message as its default accessible name", () => {
  render(
    <I18nProvider locale={frFR}>
      <Skeleton />
    </I18nProvider>,
  );

  expect(
    screen.getByRole("status", { name: "Chargement en cours" }),
  ).toBeVisible();
});

test("applies consumer tags only to the root element", () => {
  render(
    <Skeleton
      data-element="account-loading-state"
      data-role="account-skeleton"
      lines={[{}, {}]}
    />,
  );

  const skeleton = screen.getByTestId("account-skeleton");
  const lines = screen.getAllByTestId("skeleton-line");

  expect(skeleton).toHaveAttribute("data-component", "skeleton");
  expect(skeleton).toHaveAttribute("data-element", "account-loading-state");
  lines.forEach((line) => {
    expect(line).not.toHaveAttribute("data-component");
    expect(line).not.toHaveAttribute("data-element");
    expect(line).not.toHaveAttribute("data-role", "account-skeleton");
  });
});

test("renders a default line when lines are not provided", () => {
  render(<Skeleton />);

  expect(screen.getByTestId("skeleton-line")).toHaveStyleRule("height", "21px");
});

test("resolves preset heights and circle dimensions", () => {
  render(
    <Skeleton
      lines={[
        { preset: "h1" },
        { shape: "circle" },
        { height: "12px", preset: "h2" },
      ]}
    />,
  );

  const lines = screen.getAllByTestId("skeleton-line");

  expect(lines[0]).toHaveStyleRule("height", "38px");
  expect(lines[0]).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-m)",
  );
  expect(lines[1]).toHaveStyleRule("height", "21px");
  expect(lines[1]).toHaveStyleRule("width", "21px");
  expect(lines[1]).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-circle)",
  );
  expect(lines[2]).toHaveStyleRule("height", "12px");
});

test("uses design tokens for curved line radius and row spacing", () => {
  render(
    <Skeleton
      lines={[[{ shape: "rectangle-curved" }, { shape: "rectangle-moderate" }]]}
    />,
  );

  const lines = screen.getAllByTestId("skeleton-line");

  expect(lines[0]).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-circle)",
  );
  expect(lines[1]).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-container-m)",
  );
  expect(screen.getByTestId("skeleton-row")).toHaveStyleRule(
    "gap",
    "var(--global-space-comp-s)",
  );
});

test("does not forward styling props to skeleton lines", () => {
  render(
    <Skeleton
      disableAnimation
      lines={[
        {
          height: "16px",
          shape: "rectangle-curved",
          width: "50%",
        },
      ]}
    />,
  );

  const line = screen.getByTestId("skeleton-line");

  expect(line).not.toHaveAttribute("disableAnimation");
  expect(line).not.toHaveAttribute("height");
  expect(line).not.toHaveAttribute("shape");
  expect(line).not.toHaveAttribute("width");
});

test("renders without observing resizes when ResizeObserver is unavailable", () => {
  const resizeObserver = window.ResizeObserver;
  Reflect.deleteProperty(window, "ResizeObserver");

  try {
    render(<Skeleton />);

    expect(screen.getByTestId("skeleton-wrapper")).toBeVisible();
  } finally {
    window.ResizeObserver = resizeObserver;
  }
});

test("updates line alignment when the wrapper resizes and disconnects the observer", () => {
  const linePositions = new WeakMap<HTMLElement, number>();
  let nextLinePosition = 10;
  let wrapperWidth = 200;
  let wrapperHeight = 100;
  let resizeCallback: ResizeObserverCallback = () => undefined;
  const disconnect = jest.fn();
  const observe = jest.fn();
  const resizeObserver = {
    disconnect,
    observe,
    unobserve: jest.fn(),
  } as unknown as ResizeObserver;

  jest.spyOn(window, "ResizeObserver").mockImplementation((callback) => {
    resizeCallback = callback;
    return resizeObserver;
  });

  jest
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(function mockBoundingClientRect(
      this: HTMLElement,
    ): DOMRect {
      const role = this.getAttribute("data-role");

      if (role === "skeleton-wrapper") {
        return {
          bottom: 20 + wrapperHeight,
          height: wrapperHeight,
          left: 10,
          right: 10 + wrapperWidth,
          top: 20,
          width: wrapperWidth,
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

  const { unmount } = render(
    <Skeleton
      lines={[
        [
          { height: "40px", shape: "circle" },
          { height: "21px", shape: "rectangle-curved" },
        ],
      ]}
    />,
  );

  const wrapper = screen.getByTestId("skeleton-wrapper");
  const lines = screen.getAllByTestId("skeleton-line");

  expect(observe).toHaveBeenCalledWith(wrapper);
  expect(wrapper).toHaveStyle({
    "--skeleton-background-width": "600px",
    "--skeleton-background-height": "100px",
    "--skeleton-background-start-x": "-560px",
    "--skeleton-background-end-x": "80px",
  });
  expect(lines[0]).toHaveStyle({
    "--skeleton-line-offset-x": "0px",
    "--skeleton-line-offset-y": "0px",
  });
  expect(lines[1]).toHaveStyle({
    "--skeleton-line-offset-x": "48px",
    "--skeleton-line-offset-y": "0px",
  });

  wrapperWidth = 100;
  wrapperHeight = 80;
  linePositions.set(lines[1], 40);
  resizeCallback([], resizeObserver);

  expect(wrapper).toHaveStyle({
    "--skeleton-background-width": "300px",
    "--skeleton-background-height": "80px",
    "--skeleton-background-start-x": "-280px",
    "--skeleton-background-end-x": "40px",
  });
  expect(lines[1]).toHaveStyle({
    "--skeleton-line-offset-x": "30px",
    "--skeleton-line-offset-y": "0px",
  });

  unmount();
  resizeCallback([], resizeObserver);

  expect(disconnect).toHaveBeenCalledTimes(1);
});
