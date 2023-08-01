import React from "react";
import * as floatingUi from "@floating-ui/react-dom";

import {
  render as renderRTL,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import Tooltip, { TooltipProps, InputSizes } from "./tooltip.component";
import { TooltipPositions } from "./tooltip.config";
import guid from "../../__internal__/utils/helpers/guid";

const mockedGuid = "guid-12345";
jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

const positions: TooltipPositions[] = ["top", "bottom", "left", "right"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: Partial<TooltipProps> = {}) {
  const children = <div data-testid="tooltip-target">foo</div>;
  const message = "foo";

  return renderRTL(
    <Tooltip {...props} message={message || props.message}>
      {props.children || children}
    </Tooltip>
  );
}

describe("Tooltip", () => {
  describe("controlled", () => {
    it("matches snapshot when isVisible is true", () => {
      const { container } = render({ isVisible: true });

      expect(container).toMatchSnapshot();
    });

    it("matches snapshot when isVisible is false", () => {
      const { container } = render({ isVisible: false });

      expect(container).toMatchSnapshot();
    });
  });

  describe("uncontrolled", () => {
    it("shows tooltip with delay when tooltip target is hovered", async () => {
      render();
      const tooltipTarget = screen.getByTestId("tooltip-target");
      fireEvent.mouseEnter(tooltipTarget);

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("hides tooltip after mouse leaves the tooltip target", async () => {
      render();
      const tooltipTarget = screen.getByTestId("tooltip-target");
      fireEvent.mouseEnter(tooltipTarget);
      fireEvent.mouseLeave(tooltipTarget);

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("shows tooltip when tooltip target is focused", () => {
      render();
      const tooltipTarget = screen.getByTestId("tooltip-target");
      fireEvent.focus(tooltipTarget);

      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("hides tooltip when tooltip target is blurred", () => {
      render();
      const tooltipTarget = screen.getByTestId("tooltip-target");
      fireEvent.focus(tooltipTarget);
      fireEvent.blur(tooltipTarget);

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  describe("styles", () => {
    describe("TooltipWrapper", () => {
      describe("default", () => {
        it("applies the default styles", () => {
          render({ isVisible: true });

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
          render({ isVisible: true, size: "large" });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            fontSize: "16px",
          });
        });

        it("applies the correct styles  type === 'error'", () => {
          render({ isVisible: true, type: "error" });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            backgroundColor: "var(--colorsSemanticNegative500)",
          });
        });
      });

      describe("color props", () => {
        it("overrides default background when a valid css string is passed via 'bgColor'", () => {
          render({ isVisible: true, bgColor: "pink" });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            backgroundColor: "pink",
          });
          // eslint-disable-next-line testing-library/no-node-access
          expect(screen.getByRole("tooltip").firstChild).toHaveStyle({
            backgroundColor: "pink",
          });
        });

        it("overrides the type prop if background color passed via 'bgColor'", () => {
          render({ isVisible: true, type: "error", bgColor: "pink" });

          expect(screen.getByRole("tooltip")).toHaveStyle({
            backgroundColor: "pink",
          });
          // eslint-disable-next-line testing-library/no-node-access
          expect(screen.getByRole("tooltip").firstChild).toHaveStyle({
            backgroundColor: "pink",
          });
        });

        it("overrides default font color when a valid css string is passed via 'fontColor'", () => {
          render({ isVisible: true, fontColor: "pink" });

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
        position: TooltipPositions
      ): Record<InputSizes, number> => ({
        small: 5,
        medium: isTopOrBottom(position) ? 6 : 8,
        large: isTopOrBottom(position) ? 10 : 12,
      });

      describe.each(positions)("and position is %s", (position) => {
        it.each<InputSizes>(["small", "medium", "large"])(
          "sets the offset as expected when size is %s",
          (size) => {
            const useFloatingSpy = jest.spyOn(floatingUi, "useFloating");
            render({
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
              })
            ).toMatchObject({
              mainAxis: offsets(position)[size],
            });
            useFloatingSpy.mockRestore();
          }
        );
      });
    });

    describe("TooltipPointer", () => {
      it("applies the correct styles", () => {
        render({ isVisible: true });

        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByRole("tooltip").firstChild).toHaveStyle({
          zIndex: "6000",
          position: "absolute",
          width: "12px",
          height: "12px",
          transform: "rotate(45deg)",
        });
      });

      it("applies the correct styles when type === 'error'", () => {
        render({ isVisible: true, type: "error" });

        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByRole("tooltip").firstChild).toHaveStyle({
          background: "var(--colorsSemanticNegative500)",
        });
      });

      it.each([
        ["top", "bottom"],
        ["right", "left"],
        ["bottom", "top"],
        ["left", "right"],
      ])("applies correct position", (floatingUiPlacement, arrowPlacement) => {
        const originalUseFloating = jest.requireActual("@floating-ui/react-dom")
          .useFloating;
        const useFloatingSpy = jest
          .spyOn(floatingUi, "useFloating")
          .mockImplementation((props) => {
            return {
              ...originalUseFloating(props),
              placement: floatingUiPlacement,
            };
          });

        render({ isVisible: true });
        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByRole("tooltip").firstChild).toHaveStyle({
          [arrowPlacement]: "-6px",
        });

        useFloatingSpy.mockRestore();
      });
    });
  });

  describe("flipOverrides", () => {
    let mockGlobal: jest.SpyInstance;

    beforeEach(() => {
      mockGlobal = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => undefined);
    });

    afterEach(() => {
      mockGlobal.mockReset();
    });

    it("does not throw an error if a valid array is passed", () => {
      render({ flipOverrides: ["top", "bottom"] });

      // eslint-disable-next-line no-console
      expect(console.error).not.toHaveBeenCalled();
    });

    it("throws an error if a invalid array is passed", () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        render({ flipOverrides: ["foo", "bar"] });
      }).toThrow();
    });
  });

  describe("Ref forwarding", () => {
    it("should forward a ref object correctly", () => {
      const testRef = { current: null };
      renderRTL(
        <Tooltip message="foo" isVisible ref={testRef}>
          <span>Test tooltip</span>
        </Tooltip>
      );

      expect(testRef.current).toEqual(screen.getByRole("tooltip"));
    });

    it("should forward a callback ref correctly", () => {
      const testCallbackRef = jest.fn();
      renderRTL(
        <Tooltip message="foo" isVisible ref={testCallbackRef}>
          <span>Test tooltip</span>
        </Tooltip>
      );

      expect(testCallbackRef).toHaveBeenCalledWith(screen.getByRole("tooltip"));
    });
  });
});
