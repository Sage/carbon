import React from "react";
import { mount } from "enzyme";
import StyledProgressBar, { InnerBar } from "./progress-bar.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import baseTheme from "../../style/themes/base";
import ProgressBar from "./progress-bar.component";

describe("ProgressBar", () => {
  let wrapper;
  it("renders component as expected", () => {
    wrapper = mount(<ProgressBar />);
    const innerBar = wrapper.find(InnerBar);
    expect(innerBar).toBeTruthy();
  });

  describe("when size is not specified", () => {
    beforeEach(() => {
      wrapper = mount(<ProgressBar progress={50} />);
    });
    it("renders outer bar as expected", () => {
      assertStyleMatch(
        {
          width: "256px",
        },
        wrapper.find(ProgressBar)
      );
    });
    it("renders inner bar as expected", () => {
      assertStyleMatch(
        {
          backgroundColor: baseTheme.progressBar.innerBackground,
          width: "calc(256px * 0.5)",
          height: "8px",
        },
        wrapper.find(InnerBar)
      );
    });
  });

  describe("when size is set to small", () => {
    beforeEach(() => {
      wrapper = mount(<ProgressBar size="small" progress={50} />);
    });
    it("applies proper width and height to outer bar", () => {
      assertStyleMatch({ width: "256px" }, wrapper.find(ProgressBar));
    });

    it("applies proper width and height to inner bar", () => {
      assertStyleMatch(
        { width: "calc(256px * 0.5)", height: "4px" },
        wrapper.find(InnerBar)
      );
    });
  });
  describe("when size is set to large", () => {
    beforeEach(() => {
      wrapper = mount(<ProgressBar size="large" progress={50} />);
    });
    it("applies proper width and height to outer bar", () => {
      assertStyleMatch(
        { width: "100%", height: "16px" },
        wrapper.find(StyledProgressBar)
      );
    });

    it("applies proper width and height to inner bar", () => {
      assertStyleMatch(
        { width: "calc(256px * 0.5)", height: "16px" },
        wrapper.find(InnerBar)
      );
    });
  });

  describe("default value and maxValue", () => {
    beforeEach(() => {
      wrapper = mount(
        <ProgressBar size="large" progress={50} value maxValue />
      );
    });
    it("shows value correctly", () => {
      expect(wrapper.text().includes("50%")).toBeTruthy();
    });

    it("shows maxValue correctly", () => {
      expect(wrapper.text().includes("100%")).toBeTruthy();
    });
  });

  describe("custom value and maxValue", () => {
    beforeEach(() => {
      wrapper = mount(
        <ProgressBar
          size="large"
          progress={50}
          value="current value"
          maxValue="max value"
        />
      );
    });
    it("shows value correctly", () => {
      expect(wrapper.text().includes("current value")).toBeTruthy();
    });

    it("shows maxValue correctly", () => {
      expect(wrapper.text().includes("max value")).toBeTruthy();
    });
  });

  describe("colour prop", () => {
    it("applies proper background color when progress < 20", () => {
      wrapper = mount(<ProgressBar progress={10} colour="traffic" />);
      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.error,
        },
        wrapper.find(InnerBar)
      );
    });
    it("applies proper background color when 20 < progress < 100", () => {
      wrapper = mount(<ProgressBar progress={50} colour="traffic" />);
      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.primary,
        },
        wrapper.find(InnerBar)
      );
    });
    it("applies proper background color when 20 < progress < 100", () => {
      wrapper = mount(<ProgressBar progress={100} colour="traffic" />);
      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.success,
        },
        wrapper.find(InnerBar)
      );
    });
  });
});
