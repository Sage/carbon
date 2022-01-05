import React from "react";
import TestRenderer from "react-test-renderer";
import StyledLoaderSquare from "./loader-square.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

function render(props) {
  return TestRenderer.create(<StyledLoaderSquare {...props} />);
}

describe("Loader square", () => {
  let wrapper;
  it("renders as expected", () => {
    wrapper = render();
    assertStyleMatch(
      {
        backgroundColor: "var(--colorsActionMajor500)",
        height: "12px",
        width: "12px",
        marginRight: "6px",
      },
      wrapper.toJSON()
    );
  });

  describe("when inside button", () => {
    it("applies white background", () => {
      wrapper = render({ isInsideButton: true });
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsYang100)",
        },
        wrapper.toJSON()
      );
    });

    describe("when is not active", () => {
      it("applies slate background", () => {
        wrapper = render({ isInsideButton: true, isActive: false });
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsSemanticNeutral500)",
          },
          wrapper.toJSON()
        );
      });
    });
  });

  describe("when size is set to large", () => {
    it("applies proper width, height and margin", () => {
      wrapper = render({ size: "large" });
      assertStyleMatch(
        {
          height: "20px",
          width: "20px",
          marginRight: "8px",
        },
        wrapper.toJSON()
      );
    });
  });

  describe("when size is set to medium", () => {
    it("applies proper width, height and margin", () => {
      wrapper = render({ size: "medium" });
      assertStyleMatch(
        {
          height: "16px",
          width: "16px",
          marginRight: "8px",
        },
        wrapper.toJSON()
      );
    });
  });
});
