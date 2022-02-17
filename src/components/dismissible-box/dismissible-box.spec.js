import React from "react";
import { mount } from "enzyme";
import DismissibleBox from "./dismissible-box.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
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
          border: "1px solid var(--colorsUtilityMajor100)",
          borderLeft: "none",
          wordBreak: "break-word",
          boxShadow: "-4px 0 0 0 var(--colorsUtilityMajor400)",
          padding: "20px 24px 20px 20px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
        },
        wrapper
      );

      assertStyleMatch(
        {
          color: "var(--colorsActionMinor600)",
        },
        wrapper,
        { modifier: `${StyledIcon}:hover` }
      );
    });

    it("matches the expected as default for dark variant", () => {
      const wrapper = render({ variant: "dark" });

      assertStyleMatch(
        {
          border: "1px solid var(--colorsUtilityMajor100)",
          borderLeft: "none",
          wordBreak: "break-word",
          boxShadow: "-4px 0 0 0 var(--colorsUtilityMajor400)",
          padding: "20px 24px 20px 20px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "var(--colorsUtilityMajor050)",
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
          border: "1px solid var(--colorsUtilityMajor100)",
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
