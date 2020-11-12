import React from "react";
import { mount } from "enzyme";

import {
  assertStyleMatch,
  mockMatchMedia,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import Hr from "./hr.component";
import StyledHr from "./hr.style";

function render(props, renderer = mount) {
  return renderer(<Hr {...props} />);
}

describe("Hr", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render();
  });

  testStyledSystemSpacing((props) => <Hr {...props} />, {
    mt: "24px",
    mb: "24px",
  });

  describe("margin props", () => {
    it("should apply the correct top margin", () => {
      wrapper = render({ mt: 7 });

      assertStyleMatch(
        {
          marginTop: "56px",
        },
        wrapper.find(StyledHr)
      );
    });

    it("should apply the correct bottom margin", () => {
      wrapper = render({ mb: 7 });

      assertStyleMatch(
        {
          marginBottom: "56px",
        },
        wrapper.find(StyledHr)
      );
    });

    it("should apply the correct left margin", () => {
      wrapper = render({ ml: "100px" });

      assertStyleMatch(
        {
          marginLeft: "100px",
        },
        wrapper.find(StyledHr)
      );
    });

    it("should apply the correct right margin", () => {
      wrapper = render({ mr: "100px" });

      assertStyleMatch(
        {
          marginRight: "100px",
        },
        wrapper.find(StyledHr)
      );
    });
  });

  describe("when adaptiveMxBreakpoint prop is set", () => {
    describe("when screen bigger than breakpoint", () => {
      beforeEach(() => {
        mockMatchMedia(true);
      });

      it("should pass the correct margins to its children", () => {
        wrapper = render({
          ml: "10%",
          mr: "20%",
          adaptiveMxBreakpoint: 1000,
        });

        expect(wrapper.find(StyledHr).props().ml).toEqual("10%");
        expect(wrapper.find(StyledHr).props().mr).toEqual("20%");
      });
    });

    describe("when screen smaller than breakpoint", () => {
      beforeEach(() => {
        mockMatchMedia(false);
      });

      it("should pass labelInline to its children", () => {
        wrapper = render({
          ml: "10%",
          mr: "20%",
          adaptiveMxBreakpoint: 1000,
        });

        expect(wrapper.find(StyledHr).props().ml).toEqual(0);
        expect(wrapper.find(StyledHr).props().mr).toEqual(0);
      });
    });
  });
});
