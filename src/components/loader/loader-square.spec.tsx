import React from "react";
import { mount } from "enzyme";
import StyledLoaderSquare, {
  StyledLoaderSquareProps,
} from "./loader-square.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Loader from ".";

jest.mock("../../hooks/useMediaQuery", () => {
  return jest.fn(() => true);
});

function render(props: StyledLoaderSquareProps = {}) {
  return mount(<StyledLoaderSquare {...props} />);
}

describe("Loader square", () => {
  let wrapper;

  it.each([0, 1, 2])("each loader square renders as expected", (index) => {
    wrapper = mount(<Loader />);
    assertStyleMatch(
      {
        backgroundColor: "var(--colorsActionMajor500)",
        height: "16px",
        width: "16px",
        marginRight: "8px",
        borderRadius: "var(--borderRadiusCircle)",
      },
      wrapper.find(StyledLoaderSquare).at(index)
    );
  });

  describe("when the variant prop is set to 'gradient'", () => {
    it("first loader square has Salem (#13A038) background color", () => {
      wrapper = mount(<Loader variant="gradient" />);

      assertStyleMatch(
        {
          backgroundColor: "#13A038",
        },
        wrapper.find(StyledLoaderSquare).at(0)
      );
    });

    it("second loader square has Cerulean (#0092DB) background color", () => {
      wrapper = mount(<Loader variant="gradient" />);

      assertStyleMatch(
        {
          backgroundColor: "#0092DB",
        },
        wrapper.find(StyledLoaderSquare).at(1)
      );
    });

    it("third loader square has Electric Violet (#8F49FE) background color", () => {
      wrapper = mount(<Loader variant="gradient" />);

      assertStyleMatch(
        {
          backgroundColor: "#8F49FE",
        },
        wrapper.find(StyledLoaderSquare).at(2)
      );
    });
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
