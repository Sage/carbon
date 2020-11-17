import React from "react";
import TestRenderer from "react-test-renderer";
import "jest-styled-components";
import { mount } from "enzyme";
import Tooltip from ".";
import { StyledTooltipInner, StyledTooltipWrapper } from "./tooltip.style";
import StyledTooltipPointer, {
  pointerSize,
  pointerSideMargin,
} from "./tooltip-pointer.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";

jest.mock("../../__experimental__/components/input/input-sizes.style", () => ({
  small: {
    tooltipVerticalOffset: 3,
    tooltipHorizontalOffset: 1,
  },
  medium: {
    tooltipVerticalOffset: 6,
    tooltipHorizontalOffset: 4,
  },
  large: {
    tooltipVerticalOffset: 10,
    tooltipHorizontalOffset: 6,
  },
}));

function render(props, renderer = TestRenderer.create) {
  return renderer(<Tooltip {...props} />);
}

function renderInner(props) {
  return TestRenderer.create(<StyledTooltipInner {...props} />).toJSON();
}

function renderPointer(props) {
  return TestRenderer.create(<StyledTooltipPointer {...props} />).toJSON();
}

function renderWrapper(props) {
  return TestRenderer.create(<StyledTooltipWrapper {...props} />).toJSON();
}

describe("Tooltip", () => {
  describe("default props", () => {
    it("matches snapshot", () => {
      const wrapper = render({ children: "Content" }, mount);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("visible and has children", () => {
    it("matches snapshot", () => {
      const wrapper = render({ children: "Content", isVisible: true }).toJSON();

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("not visible", () => {
    it("returns null", () => {
      const wrapper = render({
        children: "Content",
        isVisible: false,
      }).toJSON();

      expect(wrapper).toBe(null);
    });
  });

  describe("no children", () => {
    it("returns null", () => {
      const wrapper = render({ isVisible: true }).toJSON();

      expect(wrapper).toBe(null);
    });
  });

  describe("styles", () => {
    describe("TooltipInner", () => {
      describe("default", () => {
        it("sets the default styles", () => {
          assertStyleMatch(
            {
              backgroundColor: "#000000",
              color: "#FFFFFF",
              display: "inline-block",
              padding: "12px 16px",
              textAlign: "center",
              maxWidth: "300px",
              wordBreak: "normal",
              whiteSpace: "pre-wrap",
            },
            renderInner()
          );
        });
      });

      describe('type="error"', () => {
        it("applies the error backgroundColor", () => {
          assertStyleMatch(
            { backgroundColor: "#C7384F" },
            renderInner({ type: "error" })
          );
        });
      });
    });

    describe("TooltipWrapper", () => {
      describe("default", () => {
        it("applies the default styles", () => {
          assertStyleMatch(
            {
              position: "relative",
              maxWidth: "300px",
              zIndex: "2000",
            },
            renderWrapper()
          );
        });
      });

      describe.each(OptionsHelper.positions)(
        'position === "%s"',
        (position) => {
          const align = ["top", "bottom"].includes(position)
            ? "center"
            : position;

          it(`sets textAlign to "${align}"`, () => {
            assertStyleMatch({ textAlign: align }, renderWrapper({ position }));
          });
        }
      );

      describe.each(OptionsHelper.alignBinary)('align === "%s"', (align) => {
        it(`sets textAlign to "${align}"`, () => {
          assertStyleMatch({ textAlign: align }, renderWrapper({ align }));
        });
      });
    });

    describe("TooltipPointer", () => {
      const horizontalAlignments = ["left", "right", "center"];
      const verticalAlignments = ["top", "bottom", "center"];
      const verticalPositions = ["bottom", "top"];
      const horizontalPositions = ["left", "right"];

      describe("default", () => {
        describe("root", () => {
          it("applies the correct root styles", () => {
            assertStyleMatch({ position: "absolute" }, renderPointer());
          });
        });

        describe("&:before", () => {
          it("applies the correct &:before styles", () => {
            assertStyleMatch({ position: "absolute" }, renderPointer(), {
              modifier: "&:before",
            });
          });
        });
      });

      describe('position === "bottom"', () => {
        describe.each(horizontalAlignments)(
          'and align === "%s"',
          (alignment) => {
            describe("root", () => {
              it("applies the correct root styles", () => {
                assertStyleMatch(
                  { top: "-7.5px" },
                  renderPointer({ align: alignment, position: "bottom" })
                );
              });
            });

            describe("&:before", () => {
              it("applies the correct default &:before styles", () => {
                assertStyleMatch(
                  {
                    borderTop: "none",
                    borderRight: `${pointerSize}px solid transparent`,
                    borderBottom: `${pointerSize + 1}px solid #000000`,
                    borderLeft: `${pointerSize}px solid transparent`,
                    content: '""',
                    height: "0",
                    width: "0",
                  },
                  renderPointer({ align: alignment, position: "bottom" }),
                  { modifier: "&:before" }
                );
              });

              describe('when type === "error', () => {
                it("applies the correct error &:before styles", () => {
                  assertStyleMatch(
                    { borderBottomColor: "#C7384F" },
                    renderPointer({
                      align: alignment,
                      position: "bottom",
                      type: "error",
                    }),
                    { modifier: "&:before" }
                  );
                });
              });
            });
          }
        );
      });

      describe('position === "left"', () => {
        describe.each(verticalAlignments)('and align === "%s"', (alignment) => {
          describe("root", () => {
            it("applies the correct root styles", () => {
              assertStyleMatch(
                { right: "0" },
                renderPointer({ align: alignment, position: "left" })
              );
            });
          });

          describe("&:before", () => {
            it("applies the correct default &:before styles", () => {
              assertStyleMatch(
                {
                  borderTop: `${pointerSize}px solid transparent`,
                  borderRight: "none",
                  borderBottom: `${pointerSize}px solid transparent`,
                  borderLeft: `${pointerSize + 1}px solid #000000`,
                  content: '""',
                  height: "0",
                  width: "0",
                },
                renderPointer({ align: alignment, position: "left" }),
                { modifier: "&:before" }
              );
            });

            describe('when type === "error', () => {
              it("applies the correct error &:before styles", () => {
                assertStyleMatch(
                  { borderLeftColor: "#C7384F" },
                  renderPointer({
                    align: alignment,
                    position: "left",
                    type: "error",
                  }),
                  { modifier: "&:before" }
                );
              });
            });
          });
        });
      });

      describe('position === "right"', () => {
        describe.each(verticalAlignments)('and align === "%s"', (alignment) => {
          describe("root", () => {
            it("applies the correct root styles", () => {
              assertStyleMatch(
                { left: "-7.5px" },
                renderPointer({ align: alignment, position: "right" })
              );
            });
          });

          describe("&:before", () => {
            it("applies the correct default &:before styles", () => {
              assertStyleMatch(
                {
                  borderTop: `${pointerSize}px solid transparent`,
                  borderRight: `${pointerSize + 1}px solid #000000`,
                  borderBottom: `${pointerSize}px solid transparent`,
                  borderLeft: "none",
                  content: '""',
                  height: "0",
                  width: "0",
                },
                renderPointer({ align: alignment, position: "right" }),
                { modifier: "&:before" }
              );
            });

            describe('when type === "error', () => {
              it("applies the correct error &:before styles", () => {
                assertStyleMatch(
                  { borderRightColor: "#C7384F" },
                  renderPointer({
                    align: alignment,
                    position: "right",
                    type: "error",
                  }),
                  { modifier: "&:before" }
                );
              });
            });
          });
        });
      });

      describe('position === "top"', () => {
        describe.each(horizontalAlignments)(
          'and align === "%s"',
          (alignment) => {
            describe("root", () => {
              it("applies the correct root styles", () => {
                assertStyleMatch(
                  { bottom: "0" },
                  renderPointer({ align: alignment, position: "top" })
                );
              });
            });

            describe("&:before", () => {
              it("applies the correct default &:before styles", () => {
                assertStyleMatch(
                  {
                    borderTop: `${pointerSize + 1}px solid #000000`,
                    borderRight: `${pointerSize}px solid transparent`,
                    borderBottom: "none",
                    borderLeft: `${pointerSize}px solid transparent`,
                    content: '""',
                    height: "0",
                    width: "0",
                  },
                  renderPointer({ align: alignment, position: "top" }),
                  { modifier: "&:before" }
                );
              });

              describe('when type === "error', () => {
                it("applies the correct error &:before styles", () => {
                  assertStyleMatch(
                    { borderTopColor: "#C7384F" },
                    renderPointer({
                      align: alignment,
                      position: "top",
                      type: "error",
                    }),
                    { modifier: "&:before" }
                  );
                });
              });
            });
          }
        );
      });

      describe('align === "center"', () => {
        describe.each(verticalPositions)('and position = "%s"', (pos) => {
          it("applies the correct styles", () => {
            assertStyleMatch(
              { left: `calc(50% - ${pointerSize}px)` },
              renderPointer({ align: "center", position: pos })
            );
          });
        });

        describe.each(horizontalPositions)('and position = "%s"', (pos) => {
          it("applies the correct styles", () => {
            assertStyleMatch(
              { top: `calc(50% - ${pointerSize}px)` },
              renderPointer({ align: "center", position: pos })
            );
          });
        });
      });

      describe('align === "left"', () => {
        describe.each(verticalPositions)('and position = "%s"', (pos) => {
          it("applies the correct styles", () => {
            assertStyleMatch(
              { left: `${pointerSideMargin}px` },
              renderPointer({ align: "left", position: pos })
            );
          });
        });
      });

      describe('align === "right"', () => {
        describe.each(verticalPositions)('and position = "%s"', (pos) => {
          it("applies the correct styles", () => {
            assertStyleMatch(
              { right: `${2 * pointerSize + pointerSideMargin}px` },
              renderPointer({ align: "right", position: pos })
            );
          });
        });
      });

      describe('align === "top"', () => {
        describe.each(horizontalPositions)('and position = "%s"', (pos) => {
          it("applies the correct styles", () => {
            assertStyleMatch(
              { top: `${pointerSideMargin}px` },
              renderPointer({ align: "top", position: pos })
            );
          });
        });
      });

      describe('align === "bottom"', () => {
        describe.each(horizontalPositions)('and position = "%s"', (pos) => {
          it("applies the correct styles", () => {
            assertStyleMatch(
              { bottom: `${2 * pointerSize + pointerSideMargin}px` },
              renderPointer({ align: "bottom", position: pos })
            );
          });
        });
      });

      describe("when the tooltip is a part of the input", () => {
        const horizontalOffsets = {
          small: 1,
          medium: 4,
          large: 6,
        };

        describe.each(["small", "medium", "large"])(
          "and the size prop is set to %s",
          (size) => {
            describe("with the position prop set to top", () => {
              describe.each([
                ["left", `${8 + horizontalOffsets[size]}px`],
                ["right", `${22 + horizontalOffsets[size]}px`],
              ])("with the align prop set to %s", (align, expectedValue) => {
                it("applies the correct styles", () => {
                  assertStyleMatch(
                    { [align]: expectedValue },
                    renderPointer({
                      position: "top",
                      align,
                      size,
                      isPartOfInput: true,
                    })
                  );
                });
              });
            });
          }
        );
      });
    });
  });
});
