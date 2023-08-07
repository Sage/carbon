import React from "react";
import { mount } from "enzyme";
import StyledLoaderSquare, {
  StyledLoaderSquareProps,
} from "./loader-square.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

function render(props: StyledLoaderSquareProps = {}) {
  return mount(<StyledLoaderSquare {...props} />);
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
        borderRadius: "var(--borderRadiusCircle)",
      },
      wrapper
    );
  });

  describe("when inside button", () => {
    it("applies white background", () => {
      wrapper = render({ isInsideButton: true });
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityYang100)",
        },
        wrapper
      );
    });

    describe("when is not active", () => {
      it("applies slate background", () => {
        wrapper = render({ isInsideButton: true, isActive: false });
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsSemanticNeutral500)",
          },
          wrapper
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
        wrapper
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
        wrapper
      );
    });
  });

  describe("rounded corners opt out", () => {
    it("overrides the border radius on the loader square when flag is true", () => {
      assertStyleMatch(
        {
          borderRadius: undefined,
        },
        mount(
          <CarbonProvider roundedCornersOptOut>
            <StyledLoaderSquare />
          </CarbonProvider>
        ).find(StyledLoaderSquare)
      );
    });

    it("does not override the border radius on the loader square when flag is false", () => {
      assertStyleMatch(
        {
          borderRadius: "var(--borderRadiusCircle)",
        },
        mount(
          <CarbonProvider>
            <StyledLoaderSquare />
          </CarbonProvider>
        ).find(StyledLoaderSquare)
      );
    });
  });
});
