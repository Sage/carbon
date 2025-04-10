import React from "react";
import { render, screen, within } from "@testing-library/react";
import { LoaderSpinner } from ".";
import useMediaQuery from "../../hooks/useMediaQuery";
import {
  LOADER_SPINNER_SIZE_PARAMS,
  LoaderSpinnerSizes,
  LOADER_SPINNER_SIZES as sizes,
  LOADER_SPINNER_VARIANTS,
} from "./loader-spinner.config";

jest.mock("../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

beforeEach(() => {
  jest.clearAllMocks();
  mockUseMediaQuery.mockReturnValue(true);
});

afterAll(() => {
  jest.restoreAllMocks();
});

const outerArcStrokeValues: Record<
  (typeof LOADER_SPINNER_VARIANTS)[number],
  string
> = {
  action: "var(--colorsActionMajor150)",
  neutral: "var(--colorsSemanticNeutral200)",
  inverse: "var(--colorsActionMajorYang100)",
  "gradient-grey": "#0000001A",
  "gradient-white": "var(--colorsActionMajorYang100)",
};

test("the component wrapper renders with a role of status", () => {
  render(<LoaderSpinner />);
  const wrapperElement = screen.getByRole("status");

  expect(wrapperElement).toBeVisible();
});

test("should return null and render nothing when useMediaQuery returns undefined", () => {
  mockUseMediaQuery.mockReturnValueOnce(undefined);

  render(<LoaderSpinner />);

  const wrapperElement = screen.queryByRole("status");

  expect(wrapperElement).not.toBeInTheDocument();
});

test("the svg spinner circle wrapper renders", () => {
  render(<LoaderSpinner />);
  const svgCircleElement = screen.getByRole("presentation");

  expect(svgCircleElement).toBeVisible();
});

test("the inner arc renders", () => {
  render(<LoaderSpinner />);
  const innerArcSvgElement = screen.getByTestId("inner-arc");

  expect(innerArcSvgElement).toBeVisible();
});

test("the outer arc renders", () => {
  render(<LoaderSpinner />);
  const outerArcSvgElement = screen.getByTestId("outer-arc");

  expect(outerArcSvgElement).toBeVisible();
});

test("the spinner label renders", () => {
  render(<LoaderSpinner />);
  const wrapperElement = screen.getByRole("status");
  const visibleLabelElement = screen.getByTestId("visible-label");

  expect(wrapperElement).toHaveTextContent("Loading...");
  expect(visibleLabelElement).toBeVisible();
});

describe("when custom props are passed", () => {
  it("should be visible when the 'spinnerLabel' prop is passed a custom string value", () => {
    render(<LoaderSpinner spinnerLabel="foo" />);
    const visibleLabelElement = screen.getByText("foo");

    expect(visibleLabelElement).toBeVisible();
  });

  it("should override the visible label text when the 'spinnerLabel' prop is passed a custom string value", () => {
    render(<LoaderSpinner spinnerLabel="foo" />);
    const wrapperElement = screen.getByRole("status");

    expect(wrapperElement).toHaveTextContent("foo");
  });

  it("should override the visually hidden label text when the 'spinnerLabel' prop is passed a custom string value", () => {
    render(<LoaderSpinner spinnerLabel="bar" showSpinnerLabel={false} />);

    const status = screen.getByRole("status");
    const hiddenLabelElement = within(status).getByText("bar");
    const visibleLabelElement = screen.queryByTestId("visible-label");

    expect(hiddenLabelElement).toBeInTheDocument();
    expect(visibleLabelElement).not.toBeInTheDocument();
  });

  it("when the 'size' prop is passed as 'extra-small' the component wrapper has a flex-direction of row", () => {
    render(<LoaderSpinner size="extra-small" />);
    const wrapperElement = screen.getByRole("status");

    expect(wrapperElement).toHaveStyle("flex-direction: row");
  });

  it.each(["small", "medium", "large", "extra-large"] as LoaderSpinnerSizes[])(
    "when the 'size' prop is passed as `%s` the component wrapper has a flex-direction of column",
    (spinnerSizes) => {
      render(<LoaderSpinner size={spinnerSizes} />);
      const wrapperElement = screen.getByRole("status");

      expect(wrapperElement).toHaveStyle("flex-direction: column");
    },
  );

  it.each(sizes)(
    "when the 'size' prop is passed as `%s` the svg circle wrapper has the correct height",
    (spinnerSizes) => {
      render(<LoaderSpinner size={spinnerSizes} />);
      const svgCircleElement = screen.getByRole("presentation");

      expect(svgCircleElement).toHaveStyle(
        `height: ${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].wrapperDimensions}px`,
      );
    },
  );

  it.each(sizes)(
    "when the 'size' prop is passed as `%s` the svg circle wrapper has the correct minimum height",
    (spinnerSizes) => {
      render(<LoaderSpinner size={spinnerSizes} />);
      const svgCircleElement = screen.getByRole("presentation");

      expect(svgCircleElement).toHaveStyle(
        `min-height: ${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].wrapperDimensions}px`,
      );
    },
  );

  it.each(sizes)(
    "when the 'size' prop is passed as `%s` the inner arc has the correct stroke width",
    (spinnerSizes) => {
      render(<LoaderSpinner size={spinnerSizes} />);
      const innerArcSvgElement = screen.getByTestId("inner-arc");

      expect(innerArcSvgElement).toHaveStyle(
        `stroke-width: ${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].strokeWidth}px`,
      );
    },
  );

  it.each(sizes)(
    "when the 'size' prop is passed as `%s` the outer arc has the correct stroke width",
    (spinnerSizes) => {
      render(<LoaderSpinner size={spinnerSizes} />);
      const outerArcSvgElement = screen.getByTestId("outer-arc");

      expect(outerArcSvgElement).toHaveStyle(
        `stroke-width: ${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].strokeWidth}px`,
      );
    },
  );

  it("when the 'size' prop is passed as 'extra-small' the label has the correct margin-left", () => {
    render(<LoaderSpinner size="extra-small" />);
    const visibleLabelElement = screen.getByTestId("visible-label");

    expect(visibleLabelElement).toHaveStyle({
      marginLeft: "var(--spacing100)",
    });
  });

  it.each(["small", "medium", "large", "extra-large"] as LoaderSpinnerSizes[])(
    "when the 'size' prop is passed as `%s` the label has the correct margin-top",
    (spinnerSizes) => {
      render(<LoaderSpinner size={spinnerSizes} />);
      const visibleLabelElement = screen.getByTestId("visible-label");
      expect(visibleLabelElement).toHaveStyle({
        marginTop: `${LOADER_SPINNER_SIZE_PARAMS[spinnerSizes].labelMarginTop}px`,
      });
    },
  );

  it("when 'showSpinnerLabel' is `true` the visible label is rendered in the live region container", () => {
    render(<LoaderSpinner showSpinnerLabel />);
    const wrapperElement = screen.getByRole("status");
    const visibleLabelElement = screen.getByTestId("visible-label");

    expect(wrapperElement).toHaveTextContent("Loading...");
    expect(visibleLabelElement).toBeVisible();
  });

  it("when 'showSpinnerLabel' is `false` the visible label is not rendered in the live region container", () => {
    render(<LoaderSpinner showSpinnerLabel={false} />);
    const wrapperElement = screen.getByRole("status");
    const visibleLabelElement = screen.queryByTestId("visible-label");

    expect(wrapperElement).toHaveTextContent("Loading...");
    expect(visibleLabelElement).not.toBeInTheDocument();
  });

  it("when 'showSpinnerLabel' is `false`, a visually hidden alternative label is rendered in the live region container", () => {
    render(<LoaderSpinner showSpinnerLabel={false} />);

    const wrapperElement = screen.getByRole("status");
    const hiddenLabelElement = screen.getByTestId("hidden-label");
    const visibleLabelElement = screen.queryByTestId("visible-label");

    expect(wrapperElement).toHaveTextContent("Loading...");
    expect(hiddenLabelElement).toBeInTheDocument();
    expect(visibleLabelElement).not.toBeInTheDocument();
  });

  it.each(LOADER_SPINNER_VARIANTS)(
    "when the 'variant' prop is passed as '%s' the correct outer arc stroke (color) is rendered",
    (variant) => {
      render(<LoaderSpinner variant={variant} />);
      const outerArcSvgElement = screen.getByTestId("outer-arc");

      expect(outerArcSvgElement).toHaveStyle(
        `stroke: ${outerArcStrokeValues[variant]}`,
      );
    },
  );

  it("when the 'variant' prop is passed as `inverse` the outer arc stroke opacity is 0.3", () => {
    render(<LoaderSpinner variant="inverse" />);
    const outerArcSvgElement = screen.getByTestId("outer-arc");

    expect(outerArcSvgElement).toHaveStyle("stroke-opacity: 0.3");
  });

  it.each([
    ["action", "var(--colorsActionMajor500)"],
    ["neutral", "var(--colorsSemanticNeutral500)"],
    ["inverse", "var(--colorsActionMajorYang100)"],
    ["gradient-grey", "#00D639"],
    ["gradient-white", "#00D639"],
  ] as const)(
    "when the 'variant' prop is passed as `%s` the correct inner arc stroke (color) is rendered",
    (variants, strokeValues) => {
      render(<LoaderSpinner variant={variants} />);
      const innerArcSvgElement = screen.getByTestId("inner-arc");

      expect(innerArcSvgElement).toHaveStyle(`stroke: ${strokeValues}`);
    },
  );

  describe("LoaderSpinner inner arc stroke colors when isWheel is true", () => {
    const isWheelStrokeColors: Record<
      (typeof LOADER_SPINNER_VARIANTS)[number],
      string
    > = {
      action: "var(--colorsActionMajor500)",
      neutral: "var(--colorsSemanticNeutral500)",
      inverse: "var(--colorsActionMajorYang100)",
      "gradient-grey": "#00D639",
      "gradient-white": "#00D639",
    };

    it.each(LOADER_SPINNER_VARIANTS)(
      "renders correct stroke for variant='%s'",
      (variant) => {
        render(<LoaderSpinner variant={variant} />);
        const innerArc = screen.getByTestId("inner-arc");

        expect(innerArc).toHaveStyle(`stroke: ${isWheelStrokeColors[variant]}`);
      },
    );
  });

  it("when 'hasMotion' is `true` animation should be present on the inner arc", () => {
    render(<LoaderSpinner hasMotion />);
    const innerArcSvgElement = screen.getByTestId("inner-arc");

    expect(innerArcSvgElement).toHaveStyle(
      "animation-iteration-count: infinite",
    );
  });

  it("when 'hasMotion' is `false` no animation should be present on the inner arc", () => {
    render(<LoaderSpinner hasMotion={false} />);
    const innerArcSvgElement = screen.getByTestId("inner-arc");

    expect(innerArcSvgElement).toHaveStyle("animation-iteration-count: none");
  });

  it.each(["gradient-grey", "gradient-white"] as const)(
    "when the 'variant' prop is passed as `%s` the gradient keyframe animation should be present on the rendered component",
    (gradientVariants) => {
      render(<LoaderSpinner variant={gradientVariants} />);
      const innerArcSvgElement = screen.getByTestId("inner-arc");

      expect(innerArcSvgElement).toHaveStyle(
        "animation-name: untrackedAnimation, gradientAnimation",
      );
    },
  );

  it.each(["gradient-grey", "gradient-white"] as const)(
    "when the 'variant' prop is passed as `%s` and 'isTracked' is `true` only the untracked and gradient keyframe animation should be present on the rendered component",
    (gradientVariants) => {
      render(<LoaderSpinner variant={gradientVariants} isTracked />);
      const innerArcSvgElement = screen.getByTestId("inner-arc");

      expect(innerArcSvgElement).toHaveStyle(
        "animation-name: untrackedAnimation, gradientAnimation",
      );
    },
  );

  it("when 'isTracked' is `true` the tracked keyframe animation should be present on the rendered component", () => {
    render(<LoaderSpinner isTracked />);
    const innerArcSvgElement = screen.getByTestId("inner-arc");

    expect(innerArcSvgElement).toHaveStyle(
      "animation-name: trackedAnimation, none",
    );
  });

  it("when 'isTracked' is `false` the untracked keyframe animation should be present on the rendered component", () => {
    render(<LoaderSpinner isTracked={false} />);
    const innerArcSvgElement = screen.getByTestId("inner-arc");

    expect(innerArcSvgElement).toHaveStyle(
      "animation-name: untrackedAnimation, none",
    );
  });

  it.each([1, 2, 3, 5, 10])(
    "when 'animationTime' is passed as `%s`, the animation duration is correct",
    (animationTime) => {
      mockUseMediaQuery.mockReturnValueOnce(true);

      render(<LoaderSpinner animationTime={animationTime} hasMotion />);

      const innerArcSvgElement = screen.getByTestId("inner-arc");

      expect(innerArcSvgElement).toHaveStyle(
        `animation-duration: ${animationTime}s`,
      );
    },
  );
});

describe("when the component is rendered and the end user prefers reduced motion", () => {
  it("the spinner label renders", () => {
    mockUseMediaQuery.mockReturnValueOnce(false);

    render(<LoaderSpinner />);
    const wrapperElement = screen.getByRole("status");
    const visibleLabelElement = screen.getByTestId("visible-label");
    const hiddenLabelElement = screen.queryByTestId("hidden-label");

    expect(wrapperElement).toHaveTextContent("Loading...");
    expect(visibleLabelElement).toBeVisible();
    expect(hiddenLabelElement).not.toBeInTheDocument();
  });

  it("the svg spinner circle does not render", () => {
    mockUseMediaQuery.mockReturnValueOnce(false);

    render(<LoaderSpinner />);
    const svgCircleElement = screen.queryByRole("presentation");

    expect(svgCircleElement).not.toBeInTheDocument();
  });
});
