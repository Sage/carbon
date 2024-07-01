import React from "react";
import { mount, ReactWrapper } from "enzyme";

import { StyledFlatTableCell } from "./flat-table-cell.style";
import FlatTableCell, { FlatTableCellProps } from "./flat-table-cell.component";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/__internal__/test-utils";

describe("FlatTableCell", () => {
  it("renders with proper width style rule when width prop is passed", () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <FlatTableCell width={40} />
          </tr>
        </tbody>
      </table>
    );
    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableCell)
    );

    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableCell),
      { modifier: "&&&& > div" }
    );
  });

  describe("when a data prop is added", () => {
    it("should be added to the root element", () => {
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <FlatTableCell data-role="test">Foo</FlatTableCell>
            </tr>
          </tbody>
        </table>
      );

      expect(wrapper.find(StyledFlatTableCell).props()["data-role"]).toEqual(
        "test"
      );
    });
  });

  describe("when truncate prop is true", () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      wrapper = mount(
        <table>
          <tbody>
            <tr>
              <FlatTableCell truncate>Foo</FlatTableCell>
            </tr>
          </tbody>
        </table>
      );
    });

    it("should apply expected styling", () => {
      assertStyleMatch(
        {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        },
        wrapper.find(StyledFlatTableCell),
        { modifier: "&&&& > div" }
      );
    });

    it("should set the title if children is string", () => {
      expect(wrapper.find("div").props().title).toEqual("Foo");
    });

    describe("and title prop is set", () => {
      it("should override the default behaviour", () => {
        wrapper = mount(
          <table>
            <tbody>
              <tr>
                <FlatTableCell truncate title="Bar">
                  Foo
                </FlatTableCell>
              </tr>
            </tbody>
          </table>
        );
        expect(wrapper.find("div").props().title).toEqual("Bar");
      });
    });
  });

  describe.each([
    ["small", "1px solid var(--colorsUtilityMajor300)"],
    ["medium", "2px solid var(--colorsUtilityMajor300)"],
    ["large", "4px solid var(--colorsUtilityMajor300)"],
  ] as [FlatTableCellProps["verticalBorder"], string][])(
    "when the verticalBorder prop is set to %s",
    (verticalBorder, expectedValue) => {
      let wrapper;

      it("overrides the cell border-right size", () => {
        wrapper = mount(
          <table>
            <tbody>
              <tr>
                <FlatTableCell verticalBorder={verticalBorder}>
                  Foo
                </FlatTableCell>
              </tr>
            </tbody>
          </table>
        );
        assertStyleMatch(
          {
            borderRight: expectedValue,
          },
          wrapper,
          { modifier: "&&&&" }
        );
      });
    }
  );

  describe.each([
    ["goldTint10", "#FFBC1A"],
    ["#000", "#000"],
  ])(
    "when the verticalBorderColor prop is set to %s",
    (verticalBorderColor, expectedValue) => {
      let wrapper;

      it("overrides the cell border-right-color", () => {
        wrapper = mount(
          <table>
            <tbody>
              <tr>
                <FlatTableCell verticalBorderColor={verticalBorderColor}>
                  Foo
                </FlatTableCell>
              </tr>
            </tbody>
          </table>
        );
        assertStyleMatch(
          {
            borderRightColor: expectedValue,
          },
          wrapper,
          { modifier: "&&&&" }
        );
      });
    }
  );

  describe("styled system", () => {
    testStyledSystemPadding(
      (props) => (
        <table>
          <tbody>
            <tr>
              <FlatTableCell {...props} />
            </tr>
          </tbody>
        </table>
      ),
      {},
      undefined,
      { modifier: "&&&& > div" }
    );
  });
});
