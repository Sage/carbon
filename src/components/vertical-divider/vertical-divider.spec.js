import React from "react";
import { mount } from "enzyme";
import VerticalDivider from ".";
import { StyledVerticalWrapper, StyledDivider } from "./vertical-divider.style";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import { baseTheme } from "../../style/themes";

function render(props = {}) {
  return mount(<VerticalDivider {...props} />);
}

describe("VerticalDivider", () => {
  describe("styles", () => {
    testStyledSystemSpacing((props) => <VerticalDivider {...props} />, {
      p: 3,
    });

    describe("with default values", () => {
      it("matches expected", () => {
        assertStyleMatch(
          {
            height: "100%",
            borderLeft: `1px solid ${baseTheme.palette.slateTint(80)}`,
            display: "inherit",
          },
          render().find(StyledDivider)
        );
      });
    });

    describe("with prop values set", () => {
      it("matches expected when h prop is passed a number value", () => {
        const wrapper = render({ h: 100 });
        assertStyleMatch(
          {
            height: "100px",
          },
          wrapper.find(StyledVerticalWrapper)
        );
      });

      it("matches expected when h prop is passed a string value", () => {
        const wrapper = render({ h: "100%" });
        assertStyleMatch(
          {
            height: "100%",
          },
          wrapper.find(StyledVerticalWrapper)
        );
      });

      it("matches expected when displayInline prop is true", () => {
        const wrapper = render({ displayInline: true });
        assertStyleMatch(
          {
            display: "inline",
          },
          wrapper.find(StyledVerticalWrapper)
        );
      });

      it.each([20, 75, 80, 90])(
        "matches expected when color prop is passed %s",
        (tint) => {
          const wrapper = render({ tint });
          assertStyleMatch(
            {
              borderLeft: `1px solid ${baseTheme.palette.slateTint(tint)}`,
            },
            wrapper.find(StyledDivider)
          );
        }
      );
    });
  });

  describe("tags", () => {
    it("root has the expected data-component", () => {
      expect(
        render().find(StyledVerticalWrapper).prop("data-component")
      ).toEqual("vertical-divider");
    });
  });
});
