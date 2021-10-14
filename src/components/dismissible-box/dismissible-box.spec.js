import React from "react";
import { mount } from "enzyme";
import DismissibleBox from "./dismissible-box.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { baseTheme } from "../../style/themes";
import StyledIcon from "../icon/icon.style";
import IconButton from "../icon-button";

const onCloseMock = jest.fn();

const render = ({ children, ...rest }) =>
  mount(
    <DismissibleBox {...rest} onClose={onCloseMock}>
      {children}
    </DismissibleBox>
  );

describe("DismissibleBox", () => {
  describe("styling", () => {
    it("matches the expected as default for light variant", () => {
      const wrapper = render({});

      assertStyleMatch(
        {
          border: `1px solid ${baseTheme.palette.slateTint(80)}`,
          borderLeft: "none",
          wordBreak: "break-word",
          boxShadow: `-4px 0 0 0 ${baseTheme.palette.slateTint(20)}`,
          padding: "20px 24px 20px 20px",
          minWidth: "600px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
        },
        wrapper
      );

      assertStyleMatch(
        {
          color: baseTheme.palette.slate,
        },
        wrapper,
        { modifier: `${StyledIcon}:hover` }
      );
    });

    it("matches the expected as default for dark variant", () => {
      const wrapper = render({ variant: "dark" });

      assertStyleMatch(
        {
          border: `1px solid ${baseTheme.palette.slateTint(80)}`,
          borderLeft: "none",
          wordBreak: "break-word",
          boxShadow: `-4px 0 0 0 ${baseTheme.palette.slateTint(20)}`,
          padding: "20px 24px 20px 20px",
          minWidth: "600px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: baseTheme.palette.slateTint(90),
        },
        wrapper
      );
    });

    it("supports overriding the width", () => {
      assertStyleMatch(
        {
          width: "650px",
        },
        render({ width: "650px" })
      );
    });

    it("matches the expected styling when hasBorderLeftHighlight is false", () => {
      const wrapper = render({ hasBorderLeftHighlight: false });

      assertStyleMatch(
        {
          border: `1px solid ${baseTheme.palette.slateTint(80)}`,
          boxShadow: undefined,
        },
        wrapper
      );
    });
  });

  describe("close icon button", () => {
    it("calls the onClose callback when clicked", () => {
      render({}).find(IconButton).simulate("click");

      expect(onCloseMock).toHaveBeenCalledWith(
        expect.objectContaining({ type: "click" })
      );
    });
  });
});
