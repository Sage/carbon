import React from "react";
import { mount } from "enzyme";
import StyledLoaderBar, { InnerBar } from "./loader-bar.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import LoaderBar from "./loader-bar.component";

describe("LoaderBar", () => {
  let wrapper;
  it("renders component as expected", () => {
    wrapper = mount(<LoaderBar />);
    const innerBar = wrapper.find(InnerBar);
    expect(innerBar).toBeTruthy();
  });

  describe("when size is not specified", () => {
    beforeEach(() => {
      wrapper = mount(<LoaderBar />);
    });
    it("renders outer bar as expected", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsActionMajor150)",
          width: "100%",
          height: "8px",
        },
        wrapper.find(StyledLoaderBar)
      );
    });
    it("renders inner bar as expected", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsActionMajor500)",
          width: "128px",
          height: "8px",
        },
        wrapper.find(InnerBar)
      );
    });
  });

  describe("when size is set to small", () => {
    beforeEach(() => {
      wrapper = mount(<LoaderBar size="small" />);
    });
    it("applies proper width and height to outer bar", () => {
      assertStyleMatch(
        { width: "100%", height: "4px" },
        wrapper.find(StyledLoaderBar)
      );
    });

    it("applies proper width and height to inner bar", () => {
      assertStyleMatch(
        { width: "128px", height: "4px" },
        wrapper.find(InnerBar)
      );
    });
  });
  describe("when size is set to large", () => {
    beforeEach(() => {
      wrapper = mount(<LoaderBar size="large" />);
    });
    it("applies proper width and height to outer bar", () => {
      assertStyleMatch(
        { width: "100%", height: "16px" },
        wrapper.find(StyledLoaderBar)
      );
    });

    it("applies proper width and height to inner bar", () => {
      assertStyleMatch(
        { width: "128px", height: "16px" },
        wrapper.find(InnerBar)
      );
    });
  });
});
