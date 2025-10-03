import React from "react";
import * as floatingUi from "@floating-ui/react-dom";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Tooltip, { TooltipProps, InputSizes } from "./tooltip.component";
import { TooltipPositions } from "./tooltip.config";
import guid from "../../__internal__/utils/helpers/guid";
import { assertDeprecationWarning } from "../../__spec_helper__/__internal__/test-utils";

const mockedGuid = "guid-12345";
jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

function renderTooltip(props: Partial<TooltipProps> = {}) {
  return render(
    <Tooltip {...props} message={props.message || "foo"}>
      {props.children || <div data-role="tooltip-target">Target</div>}
    </Tooltip>,
  );
}

describe("Tooltip", () => {
  test("displays a deprecation warning when used", () => {
    assertDeprecationWarning({
      component: (
        <Tooltip message={"foo"}>
          <div data-role="tooltip-target">Target</div>
        </Tooltip>
      ),
      deprecationMessage: `The Tooltip component is deprecated and will soon be removed.`,
    });
  });

  describe("controlled", () => {
    it("matches snapshot when isVisible is true", () => {
      const { container } = renderTooltip({ isVisible: true });

      expect(container).toMatchSnapshot();
    });

    it("matches snapshot when isVisible is false", () => {
      const { container } = renderTooltip({ isVisible: false });

      expect(container).toMatchSnapshot();
    });
  });

  describe("uncontrolled", () => {
    it("shows tooltip with delay when tooltip target is hovered", async () => {
      renderTooltip();
      const tooltipTarget = screen.getByText("Target");
      fireEvent.mouseEnter(tooltipTarget);

      expect(await screen.findByRole("tooltip")).toBeVisible();
    });

    it("hides tooltip after mouse leaves the tooltip target", async () => {
      renderTooltip();
      const tooltipTarget = screen.getByText("Target");
      fireEvent.mouseEnter(tooltipTarget);
      fireEvent.mouseLeave(tooltipTarget);

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("shows tooltip when tooltip target is focused", async () => {
      renderTooltip();
      const tooltipTarget = screen.getByText("Target");
      fireEvent.focus(tooltipTarget);

      expect(await screen.findByRole("tooltip")).toBeVisible();
    });

    it("hides tooltip when tooltip target is blurred", async () => {
      renderTooltip();
      const tooltipTarget = screen.getByText("Target");
      fireEvent.focus(tooltipTarget);
      fireEvent.blur(tooltipTarget);

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });
  });

  describe("styles", () => {
    describe("TooltipWrapper", () => {
      describe("default", () => {
        it("applies the default styles", () => {
          renderTooltip({ isVisible: true });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            bottom: "auto",
            right: "auto",
            position: "absolute",
            maxWidth: "300px",
            zIndex: "6000",
            textAlign: "left",
            color: "var(--colorsSemanticNeutralYang100)",
            display: "inline-block",
            padding: "8px 12px",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            lineHeight: "1.5rem",
            fontWeight: "400",
            backgroundColor: "var(--colorsSemanticNeutral500)",
            borderRadius: "var(--borderRadius050)",
          });
        });

        it("applies the correct styles when size is 'large'", () => {
          renderTooltip({ isVisible: true, size: "large" });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            fontSize: "16px",
          });
        });

        it("applies the correct styles  type === 'error'", () => {
          renderTooltip({ isVisible: true, type: "error" });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            backgroundColor: "var(--colorsSemanticNegative500)",
          });
        });
      });

      describe("color props", () => {
        it("overrides default background when a valid css string is passed via 'bgColor'", () => {
          renderTooltip({ isVisible: true, bgColor: "pink" });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            backgroundColor: "pink",
          });

          expect(screen.getByTestId("tooltip-pointer")).toHaveStyle({
            backgroundColor: "pink",
          });
        });

        it("overrides the type prop if background color passed via 'bgColor'", () => {
          renderTooltip({ isVisible: true, type: "error", bgColor: "pink" });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            backgroundColor: "pink",
          });

          expect(screen.getByTestId("tooltip-pointer")).toHaveStyle({
            backgroundColor: "pink",
          });
        });

        it("overrides default font color when a valid css string is passed via 'fontColor'", () => {
          renderTooltip({ isVisible: true, fontColor: "pink" });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            color: "pink",
          });
        });
      });
    });

    describe("when the tooltip targets a component that is a part of an input", () => {
      const isTopOrBottom = (position: TooltipPositions) =>
        ["top", "bottom"].includes(position);
      const offsets = (
        position: TooltipPositions,
      ): Record<InputSizes, number> => ({
        small: 5,
        medium: isTopOrBottom(position) ? 6 : 8,
        large: isTopOrBottom(position) ? 10 : 12,
      });

      describe.each(["top", "bottom", "left", "right"] as const)(
        "and position is %s",
        (position) => {
          it.each<InputSizes>(["small", "medium", "large"])(
            "sets the offset as expected when size is %s",
            (size) => {
              const useFloatingSpy = jest.spyOn(floatingUi, "useFloating");
              renderTooltip({
                isVisible: true,
                position,
                isPartOfInput: true,
                inputSize: size,
              });

              let middleware;
              if (useFloatingSpy.mock.calls[0][0]?.middleware?.[0]) {
                middleware = useFloatingSpy.mock.calls[0][0]?.middleware?.[0];
              }

              expect(
                middleware?.options({
                  placement: position,
                }),
              ).toMatchObject({
                mainAxis: offsets(position)[size],
              });
              useFloatingSpy.mockRestore();
            },
          );
        },
      );
    });

    describe("TooltipPointer", () => {
      it("applies the correct styles", () => {
        renderTooltip({ isVisible: true });

        expect(screen.getByTestId("tooltip-pointer")).toHaveStyle({
          zIndex: "6000",
          position: "absolute",
          width: "12px",
          height: "12px",
          transform: "rotate(45deg)",
        });
      });

      it("applies the correct styles when type === 'error'", () => {
        renderTooltip({ isVisible: true, type: "error" });

        expect(screen.getByTestId("tooltip-pointer")).toHaveStyle({
          background: "var(--colorsSemanticNegative500)",
        });
      });

      it.each([
        ["top", "bottom"],
        ["right", "left"],
        ["bottom", "top"],
        ["left", "right"],
      ])("applies correct position", (floatingUiPlacement, arrowPlacement) => {
        const originalUseFloating = jest.requireActual(
          "@floating-ui/react-dom",
        ).useFloating;
        const useFloatingSpy = jest
          .spyOn(floatingUi, "useFloating")
          .mockImplementation((props) => {
            return {
              ...originalUseFloating(props),
              placement: floatingUiPlacement,
            };
          });

        renderTooltip({ isVisible: true });

        expect(screen.getByTestId("tooltip-pointer")).toHaveStyle({
          [arrowPlacement]: "-6px",
        });

        useFloatingSpy.mockRestore();
      });
    });
  });

  describe("flipOverrides", () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => undefined);
    });

    afterEach(() => {
      consoleSpy.mockReset();
    });

    it("does not throw an error if a valid array is passed", () => {
      renderTooltip({ flipOverrides: ["top", "bottom"] });

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it("throws an error if a invalid array is passed", () => {
      expect(() => {
        // @ts-expect-error checking error when invalid prop passed
        renderTooltip({ flipOverrides: ["foo", "bar"] });
      }).toThrow();
    });
  });

  describe("Ref forwarding", () => {
    it("should forward a ref object correctly", async () => {
      const testRef = { current: null };
      render(
        <Tooltip message="foo" isVisible ref={testRef}>
          <span>Test tooltip</span>
        </Tooltip>,
      );

      expect(testRef.current).toEqual(screen.getByRole("tooltip"));
    });

    it("should forward a callback ref correctly", () => {
      const testCallbackRef = jest.fn();
      render(
        <Tooltip message="foo" isVisible ref={testCallbackRef}>
          <span>Test tooltip</span>
        </Tooltip>,
      );

      expect(testCallbackRef).toHaveBeenCalledWith(screen.getByRole("tooltip"));
    });
  });
});
