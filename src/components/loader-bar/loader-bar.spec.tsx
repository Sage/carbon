import React from "react";
import { mount } from "enzyme";
import StyledLoaderBar, { StyledLoader, InnerBar } from "./loader-bar.style";
import { assertStyleMatch } from "../../__spec_helper__/__internal__/test-utils";
import LoaderBar from "./loader-bar.component";
import useMediaQuery from "../../hooks/useMediaQuery";

jest.mock("../../hooks/useMediaQuery", () => {
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue(false),
  };
});

describe("LoaderBar", () => {
  it("if user disallows animations or their preference cannot be determined, renders alternative loading text", () => {
    const wrapper = mount(<LoaderBar />);
    expect(wrapper.text()).toBe("Loading");
  });

  describe("if user allows animations", () => {
    beforeEach(() => {
      const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
        typeof useMediaQuery
      >;
      mockUseMediaQuery.mockReturnValueOnce(true);
    });

    it("renders inner bar and outer bar with correct styles", () => {
      const wrapper = mount(<LoaderBar />);

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsActionMajor150)",
          width: "100%",
          height: "8px",
          borderRadius: "var(--borderRadius400)",
        },
        wrapper.find(StyledLoaderBar)
      );

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsActionMajor500)",
          width: "128px",
          height: "8px",
        },
        wrapper.find(InnerBar)
      );
    });

    it.each([
      ["small", "4px"],
      ["large", "16px"],
    ] as const)(
      "when size is %s, both the inner and outer bars have the correct dimensions",
      (size, height) => {
        const wrapper = mount(<LoaderBar size={size} />);
        assertStyleMatch(
          { width: "100%", height },
          wrapper.find(StyledLoaderBar)
        );
        assertStyleMatch({ width: "128px", height }, wrapper.find(InnerBar));
      }
    );

    it("root element has accessible name", () => {
      const wrapper = mount(<LoaderBar />);
      expect(wrapper.find(StyledLoader).prop("aria-label")).toBe("Loading");
    });
  });
});
