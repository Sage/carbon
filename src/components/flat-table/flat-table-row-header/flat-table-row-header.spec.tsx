import React from "react";
import { mount, ReactWrapper } from "enzyme";

import { render as rtlRender, screen } from "@testing-library/react";
import { StyledFlatTableRowHeader } from "./flat-table-row-header.style";
import FlatTableRowHeader, {
  FlatTableRowHeaderProps,
} from "./flat-table-row-header.component";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/__internal__/test-utils";
import StyledIcon from "../../icon/icon.style";
import FlatTableRowContext from "../flat-table-row/__internal__/flat-table-row.context";
import FlatTable from "../flat-table.component";
import FlatTableBody from "../flat-table-body/flat-table-body.component";
import FlatTableRow from "../flat-table-row/flat-table-row.component";
import FlatTableCell from "../flat-table-cell/flat-table-cell.component";
import Button from "../../button/button.component";

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
    undefined,
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

  describe("colspan", () => {
    it("sets expected value on DOM element", () => {
      const node = mount(
        <table>
          <thead>
            <tr>
              <FlatTableRowHeader colspan={2} />
            </tr>
          </thead>
        </table>
      )
        .find(StyledFlatTableRowHeader)
        .getDOMNode();

      expect(node.getAttribute("colspan")).toEqual("2");
    });
  });

  describe("rowspan", () => {
    it("sets expected value on DOM element", () => {
      const node = mount(
        <table>
          <thead>
            <tr>
              <FlatTableRowHeader rowspan={2} />
            </tr>
          </thead>
        </table>
      )
        .find(StyledFlatTableRowHeader)
        .getDOMNode();

      expect(node.getAttribute("rowspan")).toEqual("2");
    });
  });

  describe("when expandable", () => {
    it("should render an arrow icon", () => {
      const wrapper = mount(
        <table>
          <thead>
            <tr>
              <FlatTableRowContext.Provider
                value={{
                  expandable: true,
                  firstCellId: "foo",
                  leftPositions: {},
                  rightPositions: {},
                }}
              >
                <FlatTableRowHeader id="foo" />
              </FlatTableRowContext.Provider>
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
                <FlatTableRowContext.Provider
                  value={{
                    expandable: true,
                    firstColumnExpandable: true,
                    onClick: onClickFn,
                    firstCellId: "foo",
                    leftPositions: {},
                    rightPositions: {},
                  }}
                >
                  <FlatTableRowHeader id="foo" />
                </FlatTableRowContext.Provider>
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
                <FlatTableRowContext.Provider
                  value={{
                    expandable: true,
                    firstColumnExpandable: true,
                    onKeyDown: onKeyDownFn,
                    firstCellId: "foo",
                    leftPositions: {},
                    rightPositions: {},
                  }}
                >
                  <FlatTableRowHeader id="foo" />
                </FlatTableRowContext.Provider>
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
                <FlatTableRowContext.Provider
                  value={{
                    onClick: onClickFn,
                    firstCellId: "foo",
                    leftPositions: {},
                    rightPositions: {},
                  }}
                >
                  <FlatTableRowHeader id="foo" />
                </FlatTableRowContext.Provider>
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
                <FlatTableRowContext.Provider
                  value={{
                    onKeyDown: onKeyDownFn,
                    firstCellId: "foo",
                    leftPositions: {},
                    rightPositions: {},
                  }}
                >
                  <FlatTableRowHeader id="foo" />
                </FlatTableRowContext.Provider>
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
    let wrapper: ReactWrapper;
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

  describe("stickyAlignment", () => {
    it.each<FlatTableRowHeaderProps["stickyAlignment"]>(["left", "right"])(
      "sets the data-sticky-align attribute to %s",
      (stickyAlignment) => {
        const element = mount(
          <table>
            <thead>
              <tr>
                <FlatTableRowHeader stickyAlignment={stickyAlignment}>
                  Foo
                </FlatTableRowHeader>
              </tr>
            </thead>
          </table>
        )
          .find(StyledFlatTableRowHeader)
          .getDOMNode();

        expect(element.getAttribute("data-sticky-align")).toEqual(
          stickyAlignment
        );
      }
    );

    it("increases the z-index of the sticky TH or TD if content is focused and they are part of a FlatTableBody", () => {
      rtlRender(
        <FlatTable>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell data-role="cell">
                <Button>cell button</Button>
              </FlatTableCell>
              <FlatTableRowHeader
                data-role="header-one"
                stickyAlignment="left"
                p={0}
              >
                <Button>header one button</Button>
              </FlatTableRowHeader>
              <FlatTableCell>text content</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>text content</FlatTableCell>
              <FlatTableRowHeader
                data-role="header-two"
                stickyAlignment="left"
                p={0}
              >
                <Button>header two button</Button>
              </FlatTableRowHeader>
              <FlatTableCell>text content</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );

      const headerOne = screen.getByTestId("header-one");
      const headerOneButton = screen.getByRole("button", {
        name: "header one button",
      });

      const headerTwo = screen.getByTestId("header-two");
      const headerTwoButton = screen.getByRole("button", {
        name: "header two button",
      });

      const cell = screen.getByTestId("cell");
      const cellButton = screen.getByRole("button", { name: "cell button" });

      headerOneButton.focus();

      expect(cell).not.toHaveClass("bringToFront");
      expect(headerOne).toHaveClass("bringToFront");
      expect(headerTwo).not.toHaveClass("bringToFront");

      headerTwoButton.focus();

      expect(cell).not.toHaveClass("bringToFront");
      expect(headerOne).not.toHaveClass("bringToFront");
      expect(headerTwo).toHaveClass("bringToFront");

      cellButton.focus();

      expect(cell).toHaveClass("bringToFront");
      expect(headerOne).not.toHaveClass("bringToFront");
      expect(headerTwo).not.toHaveClass("bringToFront");
    });

    it("does not increase the z-index of the sticky TH or TD if they are not part of a FlatTableBody", () => {
      rtlRender(
        <FlatTableRow>
          <FlatTableCell data-role="cell">
            <Button>cell button</Button>
          </FlatTableCell>
          <FlatTableRowHeader
            data-role="header-one"
            stickyAlignment="left"
            p={0}
          >
            <Button>header one button</Button>
          </FlatTableRowHeader>
          <FlatTableCell>text content</FlatTableCell>
        </FlatTableRow>
      );

      const headerOne = screen.getByTestId("header-one");
      const headerOneButton = screen.getByRole("button", {
        name: "header one button",
      });

      headerOneButton.focus();

      expect(headerOne).not.toHaveClass("bringToFront");
    });
  });

  describe.each([
    ["small", "1px", "left"],
    ["small", "1px", "right"],
    ["medium", "2px", "left"],
    ["medium", "2px", "right"],
    ["large", "4px", "left"],
    ["large", "4px", "right"],
  ] as [FlatTableRowHeaderProps["verticalBorder"], string, FlatTableRowHeaderProps["stickyAlignment"]][])(
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
  ] as [FlatTableRowHeaderProps["verticalBorderColor"], FlatTableRowHeaderProps["stickyAlignment"]][])(
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
