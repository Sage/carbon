import React from "react";
import { mount } from "enzyme";
import FlatTableHeader, {
  FlatTableHeaderProps,
} from "./flat-table-header.component";
import StyledFlatTableHeader from "./flat-table-header.style";
import { assertStyleMatch } from "../../../__spec_helper__/__internal__/test-utils";
import { FlatTableProps } from "../flat-table.component";
import getAlternativeBackgroundColor from "./flat-table-header-utils";
import FlatTableContext from "../__internal__/flat-table.context";

describe("FlatTableHeader", () => {
  it("renders with proper width style rule when width prop is passed", () => {
    const wrapper = mount(
      <table>
        <thead>
          <tr>
            <FlatTableHeader width={40} />
          </tr>
        </thead>
      </table>
    );
    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableHeader)
    );

    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableHeader),
      { modifier: "&&& > div" }
    );
  });

  describe("when a data prop is added", () => {
    it("should be added to the root element", () => {
      const wrapper = mount(
        <table>
          <thead>
            <tr>
              <FlatTableHeader data-role="test" />
            </tr>
          </thead>
        </table>
      );
      expect(wrapper.find(StyledFlatTableHeader).props()["data-role"]).toEqual(
        "test"
      );
    });
  });

  describe('with the "alternativeBgColor" prop set', () => {
    it.each<FlatTableProps["colorTheme"]>([
      "dark",
      "light",
      "transparent-white",
      "transparent-base",
    ])(
      'overrides the header "background-color" with correspond color for %s themeColor"',
      (colorTheme) => {
        const wrapper = mount(
          <FlatTableContext.Provider
            value={{ colorTheme, getTabStopElementId: () => "" }}
          >
            <table>
              <thead>
                <tr>
                  <FlatTableHeader alternativeBgColor>test 1</FlatTableHeader>
                </tr>
              </thead>
            </table>
          </FlatTableContext.Provider>
        );

        assertStyleMatch(
          {
            backgroundColor: getAlternativeBackgroundColor(colorTheme),
          },
          wrapper.find(StyledFlatTableHeader),
          { modifier: "&&&" }
        );
      }
    );
  });

  describe.each([
    ["small", "1px"],
    ["medium", "2px"],
    ["large", "4px"],
  ] as [FlatTableHeaderProps["verticalBorder"], string][])(
    "when the verticalBorder prop is set to %s",
    (verticalBorder, expectedValue) => {
      let wrapper;

      it("overrides the header border-right-width", () => {
        wrapper = mount(
          <table>
            <thead>
              <tr>
                <FlatTableHeader verticalBorder={verticalBorder} />
              </tr>
            </thead>
          </table>
        );
        assertStyleMatch(
          {
            borderRightWidth: expectedValue,
          },
          wrapper,
          { modifier: "&&&" }
        );
      });
    }
  );

  describe.each(["red", "#ffffff", "--colorsUtilityMajor550"])(
    "when the verticalBorderColor prop is set to %s",
    (verticalBorderColor) => {
      let wrapper;

      it("overrides the header border-right-color", () => {
        wrapper = mount(
          <table>
            <thead>
              <tr>
                <FlatTableHeader verticalBorderColor={verticalBorderColor} />
              </tr>
            </thead>
          </table>
        );
        assertStyleMatch(
          {
            borderRightColor: verticalBorderColor,
          },
          wrapper,
          { modifier: "&&&" }
        );
      });
    }
  );

  describe("when colspan and rowSpan are passed", () => {
    it("should be set on the underlying element", () => {
      const wrapper = mount(
        <table>
          <thead>
            <tr>
              <FlatTableHeader colspan={2}>Children</FlatTableHeader>
            </tr>
            <tr>
              <FlatTableHeader rowspan={2}>Children</FlatTableHeader>
            </tr>
          </thead>
        </table>
      );

      expect(wrapper.find(StyledFlatTableHeader).at(0).prop("colSpan")).toBe(2);
      expect(wrapper.find(StyledFlatTableHeader).at(1).prop("rowSpan")).toBe(2);
    });
  });
});
