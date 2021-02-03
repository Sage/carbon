import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import { assertStyleMatch } from "../../../../../__spec_helper__/test-utils";
import mintTheme from "../../../../../style/themes/mint";
import ToolbarButton from "./toolbar-button.component";
import StyledIcon from "../../../../icon/icon.style";

const onKeyDown = jest.fn();
const onMouseDown = jest.fn();
const onMouseOver = jest.fn();
const onMouseLeave = jest.fn();

const render = (props = {}, theme = mintTheme, renderer = mount) => {
  const defaultProps = {
    onKeyDown,
    onMouseDown,
    onMouseOver,
    onMouseLeave,
    ariaLabel: "foo",
  };
  return renderer(
    <ThemeProvider theme={theme}>
      <ToolbarButton {...defaultProps} {...props}>
        foo
      </ToolbarButton>
    </ThemeProvider>
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
        },
        wrapper
      );

      assertStyleMatch(
        {
          backgroundColor: mintTheme.editor.button.hover,
        },
        wrapper,
        { modifier: ":hover" }
      );

      assertStyleMatch(
        {
          outline: `2px solid ${mintTheme.colors.focus}`,
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
          backgroundColor: mintTheme.editor.button.hover,
        },
        render({ activated: true })
      );
    });
  });
});
