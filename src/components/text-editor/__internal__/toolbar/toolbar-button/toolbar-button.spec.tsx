import React from "react";
import { mount } from "enzyme";
import { assertStyleMatch } from "../../../../../__spec_helper__/test-utils";
import ToolbarButton from "./toolbar-button.component";
import StyledIcon from "../../../../icon/icon.style";

const onKeyDown = jest.fn();
const onMouseDown = jest.fn();
const onMouseOver = jest.fn();
const onMouseLeave = jest.fn();

const render = (props = {}, renderer = mount) => {
  const defaultProps = {
    onKeyDown,
    onMouseDown,
    onMouseOver,
    onMouseLeave,
    ariaLabel: "foo",
  };
  return renderer(
    <ToolbarButton {...defaultProps} {...props}>
      foo
    </ToolbarButton>
  );
};

describe("ToolbarButton", () => {
  describe("styling", () => {
    it("matches the expected as default", () => {
      const wrapper = render();

      assertStyleMatch(
        {
          backgroundColor: "inherit",
          border: "none",
          cursor: "pointer",
          width: "32px",
          fontSize: "14px",
          height: "32px",
          borderRadius: "var(--borderRadius050)",
        },
        wrapper
      );

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsActionMinor200)",
        },
        wrapper,
        { modifier: ":hover" }
      );

      assertStyleMatch(
        {
          outline: "2px solid var(--colorsSemanticFocus500)",
          outlineOffset: "-2px",
        },
        wrapper,
        { modifier: ":focus" }
      );

      assertStyleMatch(
        {
          width: "auto",
        },
        wrapper,
        { modifier: `${StyledIcon}` }
      );
    });

    it("matches the expected `background-color` when `activated` prop is truthy", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsActionMinor200)",
        },
        render({ activated: true })
      );
    });
  });
});
