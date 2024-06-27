import React from "react";
import { mount } from "enzyme";
import { assertStyleMatch } from "../../../../../__spec_helper__/__internal__/test-utils";
import ToolbarButton from "./toolbar-button.component";

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
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "6px",
          backgroundColor: "inherit",
          border: "none",
          borderRadius: "var(--borderRadius100)",
          cursor: "pointer",
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
    });

    it("matches the expected `background-color` when `activated` prop is truthy", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsActionMinor600)",
        },
        render({ activated: true })
      );
    });
  });
});
