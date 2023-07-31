import React from "react";
import { mount } from "enzyme";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import Loader from ".";
import StyledLoader from "./loader.style";
import StyledLoaderSquare from "./loader-square.style";
import useMediaQuery from "../../hooks/useMediaQuery";

jest.mock("../../hooks/useMediaQuery", () => {
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue(false),
  };
});

describe("Loader", () => {
  // eslint-disable jest/valid-describe-callback
  describe("margins", () =>
    testStyledSystemMargin((props) => <Loader {...props} />));

  it("renders with correct styles", () =>
    assertStyleMatch({ textAlign: "center" }, mount(<Loader />)));

  it("if user disallows animations or their preference cannot be determined, render alternative loading text", () => {
    const wrapper = mount(<Loader />);
    expect(wrapper.text()).toBe("Loading");
  });

  describe("if user allows animations", () => {
    beforeEach(() => {
      const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
        typeof useMediaQuery
      >;
      mockUseMediaQuery.mockReturnValueOnce(true);
    });

    it("renders three square animation", () => {
      const wrapper = mount(<Loader />);
      expect(wrapper.find(StyledLoaderSquare).exists()).toBe(true);
      expect(wrapper.find(StyledLoaderSquare)).toHaveLength(3);
    });

    it("root element has accessible name", () => {
      const wrapper = mount(<Loader />);
      expect(wrapper.find(StyledLoader).prop("aria-label")).toBe("Loading");
    });

    it("when custom aria-label is passed, set accessible name to its value", () => {
      const wrapper = mount(<Loader aria-label="Still loading" />);
      expect(wrapper.find(StyledLoader).prop("aria-label")).toBe(
        "Still loading"
      );
    });
  });
});
