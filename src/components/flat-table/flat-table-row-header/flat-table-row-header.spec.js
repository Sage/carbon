import React from "react";
import { mount } from "enzyme";

import { StyledFlatTableRowHeader } from "./flat-table-row-header.style";
import FlatTableRowHeader from "./flat-table-row-header.component";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import StyledIcon from "../../icon/icon.style";

describe("FlatTableRowHeader", () => {
  testStyledSystemPadding(
    (props) => (
      <table>
        <thead>
          <tr>
            <FlatTableRowHeader {...props} />
          </tr>
        </thead>
      </table>
    ),
    { py: "10px", px: 3 },
    null,
    { modifier: "&&&& > div" }
  );

  describe("when a data prop is added", () => {
    it("should be added to the root element", () => {
      const wrapper = mount(
        <table>
          <thead>
            <tr>
              <FlatTableRowHeader data-role="test" />
            </tr>
          </thead>
        </table>
      );
      expect(
        wrapper.find(StyledFlatTableRowHeader).props()["data-role"]
      ).toEqual("test");
    });
  });

  it("renders with proper width style rule when width prop is passed", () => {
    const wrapper = mount(
      <table>
        <thead>
          <tr>
            <FlatTableRowHeader width={40} />
          </tr>
        </thead>
      </table>
    );
    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableRowHeader)
    );

    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableRowHeader),
      { modifier: "&&&& > div" }
    );
  });

  describe("when expandable prop is true", () => {
    it("should render an arrow icon", () => {
      const wrapper = mount(
        <table>
          <thead>
            <tr>
              <FlatTableRowHeader expandable />
            </tr>
          </thead>
        </table>
      );

      expect(wrapper.find(StyledIcon).exists()).toEqual(true);
    });

    describe("and onClick prop is set", () => {
      it("should call the onClick function when it is clicked", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <table>
            <thead>
              <tr>
                <FlatTableRowHeader expandable onClick={onClickFn} />
              </tr>
            </thead>
          </table>
        );

        wrapper.find(StyledFlatTableRowHeader).props().onClick();

        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("and onKeyDown prop is set", () => {
      it("should call the onKeyDown function when a key is pressed", () => {
        const onKeyDownFn = jest.fn();
        const wrapper = mount(
          <table>
            <thead>
              <tr>
                <FlatTableRowHeader expandable onKeyDown={onKeyDownFn} />
              </tr>
            </thead>
          </table>
        );

        wrapper.find(StyledFlatTableRowHeader).props().onKeyDown();

        expect(onKeyDownFn).toHaveBeenCalled();
      });
    });
  });

  describe("when expandable prop is not set", () => {
    describe("and onClick prop is set", () => {
      it("should not call the onClick function when it is clicked", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <table>
            <thead>
              <tr>
                <FlatTableRowHeader onClick={onClickFn} />
              </tr>
            </thead>
          </table>
        );

        wrapper.find(StyledFlatTableRowHeader).props().onClick();

        expect(onClickFn).not.toHaveBeenCalled();
      });
    });

    describe("and onKeyDown prop is set", () => {
      it("should not call the onKeyDown function when a key is pressed", () => {
        const onKeyDownFn = jest.fn();
        const wrapper = mount(
          <table>
            <thead>
              <tr>
                <FlatTableRowHeader onKeyDown={onKeyDownFn} />
              </tr>
            </thead>
          </table>
        );

        wrapper.find(StyledFlatTableRowHeader).props().onKeyDown();

        expect(onKeyDownFn).not.toHaveBeenCalled();
      });
    });
  });

  describe("when truncate prop is true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <table>
          <thead>
            <tr>
              <FlatTableRowHeader truncate>Foo</FlatTableRowHeader>
            </tr>
          </thead>
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
        wrapper.find(StyledFlatTableRowHeader),
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
            <thead>
              <tr>
                <FlatTableRowHeader truncate title="Bar">
                  Foo
                </FlatTableRowHeader>
              </tr>
            </thead>
          </table>
        );
        expect(wrapper.find("div").props().title).toEqual("Bar");
      });
    });
  });

  describe.each([
    ["small", "1px", "left"],
    ["small", "1px", "right"],
    ["medium", "2px", "left"],
    ["medium", "2px", "right"],
    ["large", "4px", "left"],
    ["large", "4px", "right"],
  ])(
    "when the verticalBorder prop is set to %s",
    (verticalBorder, expectedValue, stickyAlignment) => {
      let wrapper;

      const targetedBorder = `border${
        stickyAlignment === "left" ? "Right" : "Left"
      }Width`;

      it(`it overrides the cell ${targetedBorder}`, () => {
        wrapper = mount(
          <table>
            <thead>
              <tr>
                <FlatTableRowHeader
                  stickyAlignment={stickyAlignment}
                  verticalBorder={verticalBorder}
                >
                  Foo
                </FlatTableRowHeader>
              </tr>
            </thead>
          </table>
        );
        assertStyleMatch(
          {
            [targetedBorder]: expectedValue,
          },
          wrapper,
          { modifier: "&&&&" }
        );
      });
    }
  );

  describe.each([
    ["red", "left"],
    ["red", "right"],
    ["#ffffff", "left"],
    ["#ffffff", "right"],
    ["--colorsUtilityMajor550", "left"],
    ["--colorsUtilityMajor550", "right"],
  ])(
    "when the verticalBorderColor prop is set to %s and stickyAlignment is %s",
    (verticalBorderColor, stickyAlignment) => {
      let wrapper;

      const targetedBorder = `border${
        stickyAlignment === "left" ? "Right" : "Left"
      }Color`;

      it(`it overrides the cell ${targetedBorder}`, () => {
        wrapper = mount(
          <table>
            <thead>
              <tr>
                <FlatTableRowHeader
                  stickyAlignment={stickyAlignment}
                  verticalBorderColor={verticalBorderColor}
                >
                  Foo
                </FlatTableRowHeader>
              </tr>
            </thead>
          </table>
        );
        assertStyleMatch(
          {
            [targetedBorder]: verticalBorderColor,
          },
          wrapper,
          { modifier: "&&&&" }
        );
      });
    }
  );
});
