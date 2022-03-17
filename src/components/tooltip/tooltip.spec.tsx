import React from "react";
import { mount, shallow } from "enzyme";

import Tooltip, { TooltipProps, InputSizes } from "./tooltip.component";
import StyledTooltipWrapper from "./tooltip.style";
import StyledTooltipPointer from "./tooltip-pointer.style";
import { TooltipPositions } from "./tooltip.config";

import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";

const positions: TooltipPositions[] = ["top", "bottom", "left", "right"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: Partial<TooltipProps> = {}, renderer: any = mount) {
  const children = <div>foo</div>;
  const message = "foo";

  return renderer(
    <Tooltip {...props} message={message || props.message}>
      {props.children || children}
    </Tooltip>
  );
}

describe("Tooltip", () => {
  describe("default props", () => {
    it("matches snapshot", () => {
      const wrapper = render({}, shallow);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("controlled", () => {
    it("matches snapshot when isVisible is true", () => {
      const wrapper = render({ isVisible: true }, shallow);

      expect(wrapper).toMatchSnapshot();
    });

    it("matches snapshot when isVisible is false", () => {
      const wrapper = render({ isVisible: false }, shallow);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("styles", () => {
    describe("TooltipWrapper", () => {
      describe("default", () => {
        it("applies the default styles", () => {
          assertStyleMatch(
            {
              bottom: "auto",
              right: "auto",
              position: "relative",
              maxWidth: "300px",
              zIndex: "6000",
              textAlign: "left",
              font: "var(--typographyTooltipTextM)",
              color: "var(--colorsSemanticNeutralYang100)",
              display: "inline-block",
              padding: "8px 12px",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              backgroundColor: "var(--colorsSemanticNeutral500)",
            },
            render().find(StyledTooltipWrapper)
          );
        });

        it("applies the correct styles when size is 'large'", () => {
          assertStyleMatch(
            { font: "var(--typographyTooltipTextL)" },
            render({ size: "large" }).find(StyledTooltipWrapper)
          );
        });

        it("applies the correct styles  type === 'error'", () => {
          assertStyleMatch(
            { backgroundColor: "var(--colorsSemanticNegative500)" },
            render({ type: "error" }).find(StyledTooltipWrapper)
          );
        });

        it.each(positions)(
          "applies the offset when position is %s",
          (position) => {
            assertStyleMatch(
              { [position]: "1px" },
              render({ position }).find(StyledTooltipWrapper)
            );
          }
        );
      });

      describe("color props", () => {
        it("overrides default background when a valid css string is passed via 'bgColor'", () => {
          assertStyleMatch(
            { backgroundColor: "pink" },
            render({ bgColor: "pink" }).find(StyledTooltipWrapper)
          );

          assertStyleMatch(
            { borderTop: "8px solid pink" },
            render({ bgColor: "pink" }).find(StyledTooltipPointer)
          );
        });

        it("overrides the type prop if background color passed via 'bgColor'", () => {
          assertStyleMatch(
            { backgroundColor: "pink" },
            render({ type: "error", bgColor: "pink" }).find(
              StyledTooltipWrapper
            )
          );

          assertStyleMatch(
            { borderTop: "8px solid pink" },
            render({ type: "error", bgColor: "pink" }).find(
              StyledTooltipPointer
            )
          );
        });

        it("overrides default font color when a valid css string is passed via 'fontColor'", () => {
          assertStyleMatch(
            { color: "pink" },
            render({ fontColor: "pink" }).find(StyledTooltipWrapper)
          );
        });
      });
    });

    describe("when the tooltip targets a component that is a part of an input", () => {
      const isTopOrBottom = (position: TooltipPositions) =>
        ["top", "bottom"].includes(position);
      const offsets = (
        position: TooltipPositions
      ): Record<InputSizes, string> => ({
        small: "5px",
        medium: isTopOrBottom(position) ? "4px" : "2px",
        large: isTopOrBottom(position) ? "0px" : "-2px",
      });

      describe.each(positions)("and position is %s", (position) => {
        it.each<InputSizes>(["small", "medium", "large"])(
          "sets the offset as expected when size is %s",
          (size) => {
            assertStyleMatch(
              {
                [position]: offsets(position)[size],
              },
              render({ position, isPartOfInput: true, inputSize: size }).find(
                StyledTooltipWrapper
              )
            );
          }
        );
      });
    });

    describe("TooltipPointer", () => {
      describe("when position === 'top' / default", () => {
        it("applies the correct styles", () => {
          assertStyleMatch(
            {
              position: "absolute",
              width: "0",
              height: "0",
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid var(--colorsSemanticNeutral500)",
              bottom: "calc(-1 * var(--spacing100))",
            },
            render().find(StyledTooltipPointer)
          );
        });
      });

      it("applies the correct styles when type === 'error'", () => {
        assertStyleMatch(
          { borderTop: "8px solid var(--colorsSemanticNegative500)" },
          render({ type: "error" }).find(StyledTooltipPointer)
        );
      });

      describe('when position === "bottom"', () => {
        it("applies the correct styles", () => {
          assertStyleMatch(
            {
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: "8px solid var(--colorsSemanticNeutral500)",
              top: "calc(-1 * var(--spacing100))",
            },
            render({ position: "bottom" }).find(StyledTooltipPointer)
          );
        });

        it("applies the correct styles when type === 'error'", () => {
          assertStyleMatch(
            { borderBottom: "8px solid var(--colorsSemanticNegative500)" },
            render({ position: "bottom", type: "error" }).find(
              StyledTooltipPointer
            )
          );
        });
      });

      describe('when position === "left"', () => {
        it("applies the correct styles", () => {
          assertStyleMatch(
            {
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: "8px solid var(--colorsSemanticNeutral500)",
              right: "calc(-1 * var(--spacing100))",
            },
            render({ position: "left" }).find(StyledTooltipPointer)
          );
        });

        it("applies the correct styles when type === 'error'", () => {
          assertStyleMatch(
            { borderLeft: "8px solid var(--colorsSemanticNegative500)" },
            render({ position: "left", type: "error" }).find(
              StyledTooltipPointer
            )
          );
        });
      });

      describe('when position === "right"', () => {
        it("applies the correct styles", () => {
          assertStyleMatch(
            {
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "8px solid var(--colorsSemanticNeutral500)",
              left: "calc(-1 * var(--spacing100))",
            },
            render({ position: "right" }).find(StyledTooltipPointer)
          );
        });

        it("applies the correct styles when type === 'error'", () => {
          assertStyleMatch(
            { borderRight: "8px solid var(--colorsSemanticNegative500)" },
            render({ position: "right", type: "error" }).find(
              StyledTooltipPointer
            )
          );
        });
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

  describe("Design tokens", () => {
    it("wraps content with CarbonScopedTokensProvider", () => {
      const wrapper = render();

      const carbonScopedTokensProvider = wrapper.find(
        CarbonScopedTokensProvider
      );

      expect(
        carbonScopedTokensProvider.find(StyledTooltipWrapper).exists()
      ).toBe(true);
    });
  });

  describe("Ref forwarding", () => {
    it("should forward a ref object correctly", () => {
      const testRef = { current: null };

      const wrapper = mount(
        <Tooltip message="foo" isVisible ref={testRef}>
          <span>Test tooltip</span>
        </Tooltip>
      );

      wrapper.update();

      expect(testRef.current).toEqual(
        wrapper.find(StyledTooltipWrapper).getDOMNode()
      );
    });

    it("should forward a callback ref correctly", () => {
      const testCallbackRef = jest.fn();

      const wrapper = mount(
        <Tooltip message="foo" isVisible ref={testCallbackRef}>
          <span>Test tooltip</span>
        </Tooltip>
      );

      wrapper.update();

      expect(testCallbackRef).toHaveBeenCalledWith(
        wrapper.find(StyledTooltipWrapper).getDOMNode()
      );
    });
  });
});
