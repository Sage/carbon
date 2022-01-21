import React from "react";
import { mount, shallow } from "enzyme";
import Tooltip from ".";
import StyledTooltipWrapper from "./tooltip.style";
import StyledTooltipPointer from "./tooltip-pointer.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

const positions = ["top", "bottom", "left", "right"];

function render(props = {}, renderer = mount) {
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
              zIndex: "2000",
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
            },
            render().find(StyledTooltipWrapper)
          );
        });

        it("applies the correct styles when size is 'large'", () => {
          assertStyleMatch(
            { fontSize: "16px" },
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
      const isTopOrBottom = (position) => ["top", "bottom"].includes(position);
      const offsets = (position) => ({
        small: "5px",
        medium: isTopOrBottom(position) ? "4px" : "2px",
        large: isTopOrBottom(position) ? "0px" : "-2px",
      });

      describe.each(positions)("and position is %s", (position) => {
        it.each(["small", "medium", "large"])(
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
    it("does not throw an error if a valid array is passed", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});
      render({ flipOverrides: ["top", "bottom"] });

      // eslint-disable-next-line no-console
      expect(console.error).not.toHaveBeenCalled();
      global.console.error.mockReset();
    });

    it("throws an error if a invalid array is passed", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});
      render({ flipOverrides: ["foo", "bar"] });

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalled();
      global.console.error.mockReset();
    });
  });
});
