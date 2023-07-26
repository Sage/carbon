import React, { useRef } from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

import FlatTableRow, { FlatTableRowProps } from "./flat-table-row.component";
import FlatTableCell from "../flat-table-cell/flat-table-cell.component";
import StyledFlatTableRow from "./flat-table-row.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import { StyledFlatTableRowHeader } from "../flat-table-row-header/flat-table-row-header.style";
import { StyledFlatTableCell } from "../flat-table-cell/flat-table-cell.style";
import StyledFlatTableHeader from "../flat-table-header/flat-table-header.style";
import StyledFlatTableCheckbox from "../flat-table-checkbox/flat-table-checkbox.style";
import { DrawerSidebarContext } from "../../drawer";
import FlatTableCheckbox from "../flat-table-checkbox";
import StyledIcon from "../../icon/icon.style";
import FlatTableRowHeader from "../flat-table-row-header/flat-table-row-header.component";
import FlatTableHeader from "../flat-table-header/flat-table-header.component";
import { FlatTableBodyDraggable } from "..";
import { FlatTableThemeContext } from "../flat-table.component";
import guid from "../../../__internal__/utils/helpers/guid";

const mockedGuid = "guid-12345";
jest.mock("../../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

const events = {
  enter: {
    key: "Enter",
    preventDefault: jest.fn(),
  },
  space: {
    key: " ",
    preventDefault: jest.fn(),
  },
  c: {
    key: "c",
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
};

function renderFlatTableRow(props = {}) {
  return mount(
    <table>
      <tbody>
        <FlatTableRow {...props}>
          <FlatTableCell>cell1</FlatTableCell>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </tbody>
    </table>
  );
}

function renderRowWithContext(props = {}) {
  return mount(
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <table>
        <tbody>
          <FlatTableRow {...props}>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
          </FlatTableRow>
        </tbody>
      </table>
    </DrawerSidebarContext.Provider>
  );
}

describe("FlatTableRow", () => {
  describe("when a data prop is added", () => {
    it("should be added to the root element", () => {
      const wrapper = renderFlatTableRow({ "data-role": "test" });

      expect(wrapper.find(StyledFlatTableRow).props()["data-role"]).toEqual(
        "test"
      );
    });
  });

  describe('when the "onClick" prop is passed', () => {
    let wrapper: ReactWrapper;
    let onClickFn: jest.Mock;

    beforeEach(() => {
      onClickFn = jest.fn();
      wrapper = renderFlatTableRow({
        onClick: onClickFn,
      });
      wrapper.find(FlatTableRow).at(0).simulate("focus");
    });

    it("then the component should have tabIndex set to -1", () => {
      expect(wrapper.find(StyledFlatTableRow).prop("tabIndex")).toBe(-1);
    });

    it("then the component should have isRowInteractive prop set to true", () => {
      expect(wrapper.find(StyledFlatTableRow).prop("isRowInteractive")).toBe(
        true
      );
    });

    it("then the cursor over the element should be set to pointer", () => {
      assertStyleMatch({ cursor: "pointer" }, wrapper);
    });

    it("then all Cells of the Row should have proper hover color", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor025)",
        },
        wrapper,
        { modifier: `:hover ${StyledFlatTableCell}` }
      );
    });

    it("then the Row Header of the Row should have proper hover color", () => {
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor025)",
        },
        wrapper,
        { modifier: `:hover ${StyledFlatTableRowHeader}` }
      );
    });

    describe("and space key is pressed", () => {
      it("then the onClick prop should be called", () => {
        wrapper.find(FlatTableRow).simulate("keydown", { key: "Enter" });
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("and enter key is pressed", () => {
      it("then the onClick prop should be called", () => {
        wrapper.find(FlatTableRow).simulate("keydown", { key: " " });
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("and a key other than space or enter is pressed", () => {
      it("then the onClick prop should not be called", () => {
        wrapper.find(FlatTableRow).simulate("keydown", { key: "a" });
        expect(onClickFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the "onClick" prop is not passed', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = renderFlatTableRow();
    });

    it("then the component should have tabIndex undefined", () => {
      expect(wrapper.find(StyledFlatTableRow).prop("tabIndex")).toBe(undefined);
    });

    it("then the component should have isRowInteractive prop undefined", () => {
      expect(wrapper.find(StyledFlatTableRow).prop("isRowInteractive")).toBe(
        undefined
      );
    });
  });

  describe('when the "selected" prop is passed as true', () => {
    let wrapper;
    it('applies a "background-color" to the "TableCell"', () => {
      wrapper = renderFlatTableRow({
        selected: true,
      });
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor075)",
        },
        wrapper,
        { modifier: `${StyledFlatTableCell}` }
      );
    });

    describe('when the "onClick" is also provided', () => {
      it('applies the correct "background-color" on hover', () => {
        wrapper = renderFlatTableRow({
          selected: true,
          onClick: jest.fn(),
        });
        wrapper.find(FlatTableRow).at(0).simulate("focus");
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityMajor075)",
          },
          wrapper,
          { modifier: `:hover ${StyledFlatTableCell}` }
        );
      });
    });

    describe.each([
      StyledFlatTableCell,
      StyledFlatTableRowHeader,
      StyledFlatTableCheckbox,
    ])('with the "bgColor" also provided', (element) => {
      it(`it overrides the ${element} "background-color"`, () => {
        const customColor = "#CCCCCC";

        wrapper = renderFlatTableRow({
          selected: true,
          bgColor: customColor,
        });
        wrapper.find(FlatTableRow).at(0).simulate("focus");
        assertStyleMatch(
          {
            backgroundColor: customColor,
          },
          wrapper,
          { modifier: `${element}` }
        );
      });

      it('overrides the cell "background-color" on hover', () => {
        const customColor = "#CCCCCC";

        wrapper = renderFlatTableRow({
          selected: true,
          bgColor: customColor,
        });
        wrapper.find(FlatTableRow).at(0).simulate("focus");
        assertStyleMatch(
          {
            backgroundColor: customColor,
          },
          wrapper,
          { modifier: `:hover ${StyledFlatTableCell}` }
        );
      });
    });
  });

  describe('when the "highlighted" prop is passed as true', () => {
    let wrapper;
    it('applies a "background-color" to the "TableCell"', () => {
      wrapper = renderFlatTableRow({
        highlighted: true,
        onClick: jest.fn(),
      });
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor050)",
        },
        wrapper,
        { modifier: `${StyledFlatTableCell}` }
      );
    });

    it('applies a "background-color" to the "FlatTableRowHeader"', () => {
      wrapper = renderFlatTableRow({
        highlighted: true,
        onClick: jest.fn(),
      });
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor050)",
        },
        wrapper,
        { modifier: `${StyledFlatTableRowHeader}` }
      );
    });

    describe('with the "bgColor" also provided', () => {
      it('overrides the cell "background-color"', () => {
        const customColor = "#CCCCCC";

        wrapper = renderFlatTableRow({
          highlighted: true,
          bgColor: customColor,
        });
        wrapper.find(FlatTableRow).at(0).simulate("focus");
        assertStyleMatch(
          {
            backgroundColor: customColor,
          },
          wrapper,
          { modifier: `${StyledFlatTableCell}` }
        );
      });

      it('overrides the cell "background-color" on hover', () => {
        const customColor = "#CCCCCC";

        wrapper = renderFlatTableRow({
          highlighted: true,
          bgColor: customColor,
        });
        wrapper.find(FlatTableRow).at(0).simulate("focus");
        assertStyleMatch(
          {
            backgroundColor: customColor,
          },
          wrapper,
          { modifier: `:hover ${StyledFlatTableCell}` }
        );
      });
    });

    describe('when the "selected" prop is also passed as true', () => {
      it('applies the correct "background-color"', () => {
        wrapper = renderFlatTableRow({
          selected: true,
          highlighted: true,
          onClick: jest.fn(),
        });
        wrapper.find(FlatTableRow).at(0).simulate("focus");
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityMajor075)",
          },
          wrapper,
          { modifier: `:hover ${StyledFlatTableCell}` }
        );
      });

      describe('with the "bgColor" also provided', () => {
        it('overrides the cell "background-color"', () => {
          const customColor = "#CCCCCC";

          wrapper = renderFlatTableRow({
            selected: true,
            highlighted: true,
            bgColor: customColor,
          });
          wrapper.find(FlatTableRow).at(0).simulate("focus");
          assertStyleMatch(
            {
              backgroundColor: customColor,
            },
            wrapper,
            { modifier: `${StyledFlatTableCell}` }
          );
        });
      });
    });
  });

  describe("when a child of Sidebar", () => {
    let wrapper;
    it.each([
      ["StyledFlatTableHeader", StyledFlatTableHeader],
      ["StyledFlatTableRowHeader", StyledFlatTableRowHeader],
      ["StyledFlatTableCell", StyledFlatTableCell],
      ["StyledFlatTableCheckbox", StyledFlatTableCheckbox],
    ])("applies the expected styling to %s", (id, el) => {
      wrapper = renderRowWithContext({ onClick: () => {} });
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor040)",
        },
        wrapper,
        { modifier: `${el}` }
      );

      const modifierString =
        id === "StyledFlatTableCheckbox" ? `${el}:not(th)` : el;

      if (!["StyledFlatTableHeader", "StyledFlatTableRowHeader"].includes(id)) {
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityMajor075)",
          },
          wrapper,
          { modifier: `:hover ${modifierString}` }
        );
      }

      if (id === "StyledFlatTableCheckbox") {
        assertStyleMatch(
          {
            borderRight: "1px solid var(--colorsUtilityMajor100)",
          },
          wrapper,
          { modifier: `${el}` }
        );
      }
    });

    it('applies an additional "padding-left" to the "FlatTableRow" and removes "border-left" from first child', () => {
      wrapper = renderRowWithContext();
      assertStyleMatch(
        {
          borderLeft: "none",
        },
        wrapper,
        { modifier: "td:first-of-type" }
      );
    });

    it('removes "border-right" from "FlatTableRow" first child', () => {
      wrapper = renderRowWithContext();
      assertStyleMatch(
        {
          borderRight: "none",
        },
        wrapper,
        { modifier: "td:last-of-type" }
      );
    });

    describe('and the "selected" prop is passed as true', () => {
      it.each([
        ["StyledFlatTableRowHeader", StyledFlatTableRowHeader],
        ["StyledFlatTableCell", StyledFlatTableCell],
        ["StyledFlatTableCheckbox", StyledFlatTableCheckbox],
      ])('applies the correct "background-color" to %s', (id, el) => {
        wrapper = renderRowWithContext({
          selected: true,
        });

        if (id !== "StyledFlatTableRowHeader") {
          assertStyleMatch(
            {
              backgroundColor: "var(--colorsUtilityMajor150)",
            },
            wrapper,
            { modifier: `${el}` }
          );
        }

        const modifierString =
          id === "StyledFlatTableCheckbox" ? `${el}:not(th)` : el;

        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityMajor150)",
          },
          wrapper,
          { modifier: `:hover ${modifierString}` }
        );
      });
    });

    describe('and the "highlighted" prop is passed as true', () => {
      it.each([
        ["StyledFlatTableRowHeader", StyledFlatTableRowHeader],
        ["StyledFlatTableCell", StyledFlatTableCell],
        ["StyledFlatTableCheckbox", StyledFlatTableCheckbox],
      ])('applies the correct "background-color" to %s', (id, el) => {
        wrapper = renderRowWithContext({
          highlighted: true,
          onClick: jest.fn(),
        });

        if (id !== "StyledFlatTableRowHeader") {
          assertStyleMatch(
            {
              backgroundColor: "var(--colorsUtilityMajor100)",
            },
            wrapper,
            { modifier: `${el}` }
          );
        }

        const modifierString =
          id === "StyledFlatTableCheckbox" ? `${el}:not(th)` : el;

        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityMajor100)",
          },
          wrapper,
          { modifier: `:hover ${modifierString}` }
        );
      });

      describe('and the "selected" prop is also passed as true', () => {
        it.each([
          ["StyledFlatTableRowHeader", StyledFlatTableRowHeader],
          ["StyledFlatTableCell", StyledFlatTableCell],
          ["StyledFlatTableCheckbox", StyledFlatTableCheckbox],
        ])('applies the correct "background-color" to %s', (id, el) => {
          wrapper = renderRowWithContext({
            selected: true,
            highlighted: true,
            onClick: jest.fn(),
          });
          wrapper.find(FlatTableRow).at(0).simulate("focus");

          if (id !== "StyledFlatTableRowHeader") {
            assertStyleMatch(
              {
                backgroundColor: "var(--colorsUtilityMajor150)",
              },
              wrapper,
              { modifier: `${el}` }
            );
          }

          const modifierString =
            id === "StyledFlatTableCheckbox" ? `${el}:not(th)` : el;

          assertStyleMatch(
            {
              backgroundColor: "var(--colorsUtilityMajor150)",
            },
            wrapper,
            { modifier: `:hover ${modifierString}` }
          );
        });
      });
    });
  });

  describe("with conditionally rendered children", () => {
    describe("when child is null", () => {
      it("should not render that child", () => {
        const wrapper = mount(
          <table>
            <tbody>
              <FlatTableRow>
                <FlatTableCell>cell1</FlatTableCell>
                {false && <FlatTableCell>cell2</FlatTableCell>}
              </FlatTableRow>
            </tbody>
          </table>
        );

        expect(wrapper.find(FlatTableCell).length).toEqual(1);
      });
    });

    describe("when child is not null", () => {
      it("should render that child", () => {
        const wrapper = mount(
          <table>
            <tbody>
              <FlatTableRow>
                <FlatTableCell>cell1</FlatTableCell>
                {true && <FlatTableCell>cell2</FlatTableCell>}
              </FlatTableRow>
            </tbody>
          </table>
        );

        expect(wrapper.find(FlatTableCell).length).toEqual(2);
      });
    });
  });

  describe("when FlatTableRowHeader is used", () => {
    describe("and is null", () => {
      it("should not make any preceding children sticky", () => {
        const wrapper = mount(
          <table>
            <tbody>
              <FlatTableRow>
                <FlatTableCell>cell1</FlatTableCell>
                {false && <FlatTableCell>cell2</FlatTableCell>}
                {false && <FlatTableRowHeader>test 3</FlatTableRowHeader>}
              </FlatTableRow>
            </tbody>
          </table>
        );

        assertStyleMatch(
          {
            position: undefined,
          },
          wrapper.find(StyledFlatTableCell).at(0)
        );
      });
    });

    it("sets any preceding columns to sticky as well", () => {
      const wrapper = mount(
        <table>
          <thead>
            <FlatTableRow>
              <FlatTableHeader id="test 1">test 1</FlatTableHeader>
              <FlatTableCell id="test 2">test 2</FlatTableCell>
              <FlatTableCheckbox id="checkbox" />
              <FlatTableRowHeader id="test 3">test 3</FlatTableRowHeader>
              <FlatTableHeader id="test 4">test 4</FlatTableHeader>
              <FlatTableCell id="test 5">test 5</FlatTableCell>
            </FlatTableRow>
          </thead>
        </table>
      );

      assertStyleMatch(
        {
          position: "sticky",
        },
        wrapper.find(StyledFlatTableHeader).at(0)
      );

      assertStyleMatch(
        {
          position: "sticky",
        },
        wrapper.find(StyledFlatTableCell).at(0)
      );

      assertStyleMatch(
        {
          position: "sticky",
        },
        wrapper.find(StyledFlatTableCheckbox)
      );

      assertStyleMatch(
        {
          position: undefined,
        },
        wrapper.find(StyledFlatTableHeader).at(1)
      );

      assertStyleMatch(
        {
          position: undefined,
        },
        wrapper.find(StyledFlatTableCell).at(1)
      );
    });

    describe("and stickyAlignment is 'right'", () => {
      it("sets any preceding columns to sticky as well", () => {
        const wrapper = mount(
          <table>
            <thead>
              <FlatTableRow>
                <FlatTableHeader id="test 1">test 1</FlatTableHeader>
                <FlatTableCell id="test 2">test 2</FlatTableCell>
                <FlatTableRowHeader id="test 3" stickyAlignment="right">
                  test 3
                </FlatTableRowHeader>
                <FlatTableCheckbox id="checkbox" />
                <FlatTableHeader id="test 4">test 4</FlatTableHeader>
                <FlatTableCell id="test 5">test 5</FlatTableCell>
              </FlatTableRow>
            </thead>
          </table>
        );

        assertStyleMatch(
          {
            position: undefined,
          },
          wrapper.find(StyledFlatTableHeader).at(0)
        );

        assertStyleMatch(
          {
            position: undefined,
          },
          wrapper.find(StyledFlatTableCell).at(0)
        );

        assertStyleMatch(
          {
            position: "sticky",
          },
          wrapper.find(StyledFlatTableCheckbox)
        );

        assertStyleMatch(
          {
            position: "sticky",
          },
          wrapper.find(StyledFlatTableHeader).at(1)
        );

        assertStyleMatch(
          {
            position: "sticky",
          },
          wrapper.find(StyledFlatTableCell).at(1)
        );
      });
    });

    it("throws an error when rhsRowHeaderIndex is less than lhsRowHeaderIndex", () => {
      const mockGlobal = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => undefined);
      const errorMessage = `Do not render a right hand side \`FlatTableRowHeader\` before left hand side \`FlatTableRowHeader\``;

      expect(() => {
        mount(
          <table>
            <thead>
              <FlatTableRow>
                <FlatTableHeader>test 1</FlatTableHeader>
                <FlatTableCell>test 2</FlatTableCell>
                <FlatTableCheckbox />
                <FlatTableRowHeader stickyAlignment="right">
                  test 3
                </FlatTableRowHeader>
                <FlatTableRowHeader stickyAlignment="left">
                  test 3
                </FlatTableRowHeader>
                <FlatTableHeader>test 4</FlatTableHeader>
                <FlatTableCell>test 5</FlatTableCell>
              </FlatTableRow>
            </thead>
          </table>
        );
      }).toThrow(errorMessage);

      mockGlobal.mockReset();
    });

    it("applies the correct styling when the row is interactive", () => {
      const wrapper = mount(
        <table>
          <thead>
            <FlatTableRow onClick={() => {}}>
              <FlatTableHeader>test 1</FlatTableHeader>
              <FlatTableCell>test 2</FlatTableCell>
              <FlatTableCheckbox />
              <FlatTableRowHeader>test 3</FlatTableRowHeader>
              <FlatTableHeader>test 4</FlatTableHeader>
              <FlatTableCell>test 5</FlatTableCell>
            </FlatTableRow>
          </thead>
        </table>
      );

      assertStyleMatch(
        {
          borderRight: "2px solid var(--colorsUtilityMajor100)",
        },
        wrapper,
        { modifier: `${StyledFlatTableRowHeader}:nth-child(4)` }
      );
    });
  });

  describe("when the row is expandable", () => {
    const SubRows = [
      <FlatTableRow key="sub-row-1">
        <FlatTableCell>sub1cell1</FlatTableCell>
        <FlatTableCell>sub1cell2</FlatTableCell>
      </FlatTableRow>,
      <FlatTableRow key="sub-row-2">
        <FlatTableCell>sub2cell1</FlatTableCell>
        <FlatTableCell>sub2cell2</FlatTableCell>
      </FlatTableRow>,
    ];

    it("applies the expected styling to the Icons", () => {
      const wrapper = renderFlatTableRow({
        expandable: true,
        subRows: SubRows,
      });

      assertStyleMatch(
        {
          transition: "transform 0.3s",
          transform: "rotate(-90deg)",
        },
        wrapper.find(FlatTableRow),
        {
          modifier: `${StyledFlatTableCell}:first-child > div ${StyledIcon}[type="chevron_down_thick"]:first-of-type`,
        }
      );
    });

    it("should have the sub rows closed by default", () => {
      const wrapper = renderFlatTableRow({
        expandable: true,
        subRows: SubRows,
      });

      expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
    });

    it("then the component should have tabIndex of undefined if no onClick is passed and firstColumnExpandable", () => {
      const wrapper = renderFlatTableRow({
        expandable: true,
        subRows: SubRows,
        expandableArea: "firstColumn",
      });

      expect(wrapper.find(StyledFlatTableRow).prop("tabIndex")).toBe(undefined);
    });

    describe("when clicked", () => {
      it("should expand the sub rows", () => {
        const wrapper = renderFlatTableRow({
          expandable: true,
          subRows: SubRows,
        });

        act(() => {
          wrapper.find(StyledFlatTableRow).at(0).props().onClick();
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);
      });

      describe("when onClick prop set", () => {
        it("should call the onClick function", () => {
          const onClickFn = jest.fn();
          const wrapper = renderFlatTableRow({
            expandable: true,
            subRows: SubRows,
            onClick: onClickFn,
          });

          act(() => {
            wrapper.find(StyledFlatTableRow).at(0).props().onClick();
          });

          wrapper.update();

          expect(onClickFn).toHaveBeenCalled();
        });

        it("then the component should have tabIndex of undefined if firstColumnExpandable", () => {
          const onClickFn = jest.fn();
          const wrapper = renderFlatTableRow({
            expandable: true,
            subRows: SubRows,
            onClick: onClickFn,
            expandableArea: "firstColumn",
          });

          expect(wrapper.find(StyledFlatTableRow).prop("tabIndex")).toBe(
            undefined
          );
        });
      });

      describe("when used as a controlled component", () => {
        it("should update the expanded state of the rows", () => {
          const MockComponent = (props: Partial<FlatTableRowProps> = {}) => {
            const [expanded, setExpanded] = React.useState(false);
            return (
              <>
                <button type="button" onClick={() => setExpanded((p) => !p)}>
                  Change Expanded State
                </button>
                <table>
                  <tbody>
                    <FlatTableRow {...props} expanded={expanded}>
                      <FlatTableCell>cell1</FlatTableCell>
                      <FlatTableCell>cell2</FlatTableCell>
                    </FlatTableRow>
                  </tbody>
                </table>
              </>
            );
          };

          const wrapper = mount(<MockComponent expandable subRows={SubRows} />);
          const button = wrapper?.find("button");
          act(() => {
            button
              ?.props?.()
              .onClick?.({} as React.MouseEvent<HTMLButtonElement>);
          });
          wrapper.update();

          expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

          act(() => {
            button
              ?.props?.()
              .onClick?.({} as React.MouseEvent<HTMLButtonElement>);
          });
          wrapper.update();

          expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
        });
      });
    });

    describe("when focused and enter/space is pressed", () => {
      let wrapper: ReactWrapper;
      const element = document.createElement("div");
      const htmlElement = document.body.appendChild(element);

      beforeEach(() => {
        wrapper = mount(
          <table>
            <tbody>
              <FlatTableRow expandable subRows={SubRows}>
                <FlatTableCell>cell1</FlatTableCell>
                <FlatTableCell>cell2</FlatTableCell>
              </FlatTableRow>
            </tbody>
          </table>,
          { attachTo: htmlElement }
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it("should toggle the open/close state of the row", () => {
        expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);

        document.querySelectorAll("tr")[0].focus();

        act(() => {
          wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .props()
            .onKeyDown(events.enter);
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

        act(() => {
          wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .props()
            .onKeyDown(events.space);
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
      });
    });

    describe("when expanded prop set to true", () => {
      it("should render the sub rows open", () => {
        const wrapper = renderFlatTableRow({
          expandable: true,
          subRows: SubRows,
          expanded: true,
        });

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);
      });
    });

    describe("when first child of sub row is a checkbox", () => {
      it("should add the expandable icon to the second child", () => {
        const CheckboxSubRows = [
          <FlatTableRow key="sub-row-1">
            <FlatTableCheckbox />
            <FlatTableCell>sub1cell2</FlatTableCell>
          </FlatTableRow>,
          <FlatTableRow key="sub-row-2">
            <FlatTableCheckbox />
            <FlatTableCell>sub2cell2</FlatTableCell>
          </FlatTableRow>,
        ];

        const wrapper = mount(
          <table>
            <tbody>
              <FlatTableRow expandable subRows={CheckboxSubRows} expanded>
                <FlatTableCheckbox />
                <FlatTableCell>cell2</FlatTableCell>
              </FlatTableRow>
            </tbody>
          </table>
        );

        expect(
          wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .find(StyledFlatTableCell)
            .find(StyledIcon)
            .exists()
        ).toEqual(true);
      });
    });

    describe("when expandableArea prop is set to 'firstColumn'", () => {
      let wrapper: ReactWrapper;

      beforeEach(() => {
        wrapper = renderFlatTableRow({
          expandable: true,
          subRows: SubRows,
          expandableArea: "firstColumn",
        });
      });

      it("should set the cursor to pointer for the first column", () => {
        assertStyleMatch({ cursor: "pointer" }, wrapper, {
          modifier: `td:nth-child(1)`,
        });
      });

      it("should expand the sub rows when first column clicked", () => {
        act(() => {
          wrapper
            .find(StyledFlatTableRow)
            .find(StyledFlatTableCell)
            .at(0)
            .props()
            .onClick();
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);
      });

      it("should not expand the sub rows when other column clicked", () => {
        act(() => {
          wrapper.find(StyledFlatTableRow).at(0).props().onClick();
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
      });

      describe("when a key is pressed", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        beforeEach(() => {
          wrapper = mount(
            <table>
              <tbody>
                <FlatTableRow
                  expandable
                  subRows={SubRows}
                  expandableArea="firstColumn"
                >
                  <FlatTableCell>cell1</FlatTableCell>
                  <FlatTableCell>cell2</FlatTableCell>
                </FlatTableRow>
              </tbody>
            </table>,
            { attachTo: htmlElement }
          );
        });

        afterEach(() => {
          wrapper.unmount();
        });

        describe("when the key is enter/space", () => {
          it("should toggle the open/close state of the row", () => {
            expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);

            (wrapper
              .find(StyledFlatTableRow)
              .at(0)
              .find("td")
              .at(0)
              .getDOMNode() as HTMLElement).focus();

            act(() => {
              wrapper
                .find(StyledFlatTableRow)
                .at(0)
                .find(StyledFlatTableCell)
                .at(0)
                .props()
                .onKeyDown(events.enter);
            });

            wrapper.update();

            expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

            act(() => {
              wrapper
                .find(StyledFlatTableRow)
                .at(0)
                .find(StyledFlatTableCell)
                .at(0)
                .props()
                .onKeyDown(events.space);
            });

            wrapper.update();

            expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
          });
        });

        describe("when the key is not enter/space", () => {
          it("should toggle not the open/close state of the row", () => {
            expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);

            (wrapper
              .find(StyledFlatTableRow)
              .at(0)
              .find("td")
              .at(0)
              .getDOMNode() as HTMLElement).focus();

            act(() => {
              wrapper
                .find(StyledFlatTableRow)
                .at(0)
                .find(StyledFlatTableCell)
                .at(0)
                .props()
                .onKeyDown(events.c);
            });

            wrapper.update();

            expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
          });
        });
      });
    });

    describe("when passing sub rows as a component", () => {
      const SubRowsComponent = () => (
        <>
          <FlatTableRow>
            <FlatTableCell>sub1cell1</FlatTableCell>
            <FlatTableCell>sub1cell2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>sub2cell1</FlatTableCell>
            <FlatTableCell>sub2cell2</FlatTableCell>
          </FlatTableRow>
        </>
      );

      it("should expand the sub rows when row is clicked", () => {
        const wrapper = renderFlatTableRow({
          expandable: true,
          subRows: <SubRowsComponent />,
        });

        act(() => {
          wrapper.find(StyledFlatTableRow).at(0).props().onClick();
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

        act(() => {
          wrapper.find(StyledFlatTableRow).at(0).props().onClick();
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
      });

      it("should expand the sub rows when first column clicked and expandable area is first column", () => {
        const wrapper = renderFlatTableRow({
          expandable: true,
          subRows: <SubRowsComponent />,
          expandableArea: "firstColumn",
        });

        act(() => {
          wrapper
            .find(StyledFlatTableRow)
            .find(StyledFlatTableCell)
            .at(0)
            .props()
            .onClick();
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

        act(() => {
          wrapper
            .find(StyledFlatTableRow)
            .find(StyledFlatTableCell)
            .at(0)
            .props()
            .onClick();
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
      });

      it("should toggle the open/close state of the row when enter/space pressed", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
          <table>
            <tbody>
              <FlatTableRow expandable subRows={<SubRowsComponent />}>
                <FlatTableCell>cell1</FlatTableCell>
                <FlatTableCell>cell2</FlatTableCell>
              </FlatTableRow>
            </tbody>
          </table>,
          { attachTo: htmlElement }
        );

        (wrapper
          .find(StyledFlatTableRow)
          .at(0)
          .getDOMNode() as HTMLElement).focus();

        act(() => {
          wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .props()
            .onKeyDown(events.enter);
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

        act(() => {
          wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .props()
            .onKeyDown(events.space);
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
      });

      it("should toggle the open/close state of the row when enter/space pressed and expandable area is first column", () => {
        const wrapper = renderFlatTableRow({
          expandable: true,
          subRows: <SubRowsComponent />,
          expandableArea: "firstColumn",
        });

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);

        (wrapper
          .find(StyledFlatTableRow)
          .at(0)
          .find("td")
          .at(0)
          .getDOMNode() as HTMLElement).focus();

        act(() => {
          wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .find(StyledFlatTableCell)
            .at(0)
            .props()
            .onKeyDown(events.enter);
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

        act(() => {
          wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .find(StyledFlatTableCell)
            .at(0)
            .props()
            .onKeyDown(events.space);
        });

        wrapper.update();

        expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
      });
    });

    describe.each([
      ["medium", "2px solid var(--colorsUtilityMajor100)"],
      ["large", "4px solid var(--colorsUtilityMajor100)"],
    ])(
      "when the horizontalBorderSize prop is set to %s",
      (horizontalBorderSize, expectedValue) => {
        let wrapper;

        it("overrides the cell bottom-border size", () => {
          wrapper = renderFlatTableRow({
            highlighted: true,
            horizontalBorderSize,
          });
          wrapper.find(FlatTableRow).at(0).simulate("focus");
          assertStyleMatch(
            {
              borderBottom: expectedValue,
            },
            wrapper,
            { modifier: `${StyledFlatTableCell}` }
          );
        });
      }
    );

    describe.each([
      ["goldTint10", "#FFBC1A"],
      ["#000", "#000"],
    ])(
      "when the horizontalBorderColor prop is set to %s",
      (horizontalBorderColor, expectedValue) => {
        let wrapper;

        it("overrides the cell bottom-border color", () => {
          wrapper = renderFlatTableRow({
            highlighted: true,
            horizontalBorderColor,
          });
          wrapper.find(FlatTableRow).at(0).simulate("focus");
          assertStyleMatch(
            {
              borderBottomColor: expectedValue,
            },
            wrapper,
            { modifier: `${StyledFlatTableCell}` }
          );
        });
      }
    );

    describe("when a right sticky column is rendered with no left sticky column", () => {
      it("applies the expected styling to the row header cell", () => {
        const wrapper = mount(
          <table>
            <thead>
              <FlatTableRow>
                <FlatTableHeader>test 1</FlatTableHeader>
                <FlatTableCell>test 2</FlatTableCell>
                <FlatTableRowHeader stickyAlignment="right">
                  test 3
                </FlatTableRowHeader>
              </FlatTableRow>
            </thead>
          </table>
        );
        assertStyleMatch(
          {
            borderLeft: "2px solid var(--colorsUtilityMajor100)",
          },
          wrapper,
          { modifier: `${StyledFlatTableRowHeader}:nth-child(3)` }
        );
      });
    });

    describe("when the size of the table is 'compact'", () => {
      it("should add the correct padding to child row cells", () => {
        const wrapper = mount(
          <FlatTableThemeContext.Provider
            value={{ size: "compact", setSelectedId: jest.fn }}
          >
            <table>
              <tbody>
                <FlatTableRow expandable expanded subRows={SubRows}>
                  <FlatTableCell>cell1</FlatTableCell>
                  <FlatTableCell>cell2</FlatTableCell>
                </FlatTableRow>
              </tbody>
            </table>
          </FlatTableThemeContext.Provider>
        );

        assertStyleMatch(
          {
            paddingLeft: "32px",
          },
          wrapper.find(StyledFlatTableRow).at(1),
          {
            modifier: `${StyledFlatTableCheckbox} + ${StyledFlatTableCell} > div`,
          }
        );
      });
    });
  });

  describe("Draggable Table with subRows", () => {
    it("should expand the sub rows", () => {
      const subRows = (str: string) => [
        <FlatTableRow key={`${str}-sub-row-1`}>
          <FlatTableCell>York</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow key={`${str}-sub-row-2`}>
          <FlatTableCell>Edinburgh</FlatTableCell>
        </FlatTableRow>,
      ];
      const component = (
        <table>
          <FlatTableBodyDraggable>
            <FlatTableRow expandable subRows={subRows("first")} key={0} id={0}>
              <FlatTableCell>UK</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow
              expandable
              expanded
              subRows={subRows("second")}
              key={1}
              id={1}
            >
              <FlatTableCell>Germany</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow expandable subRows={subRows("third")} key={2} id={2}>
              <FlatTableCell>Finland</FlatTableCell>
            </FlatTableRow>
          </FlatTableBodyDraggable>
        </table>
      );

      const wrapper = mount(component);

      act(() => {
        wrapper.find(StyledFlatTableRow).at(0).props().onClick();
      });

      wrapper.update();

      expect(wrapper.find(StyledFlatTableRow).length).toEqual(7);
    });

    it("sets any preceding columns to sticky as well", () => {
      const subRows = [
        <FlatTableRow key="sub-row-1">
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow key="sub-row-2">
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
      ];
      const wrapper = mount(
        <table>
          <FlatTableBodyDraggable>
            <FlatTableRow
              expandable
              subRows={subRows}
              expandableArea="firstColumn"
              id={0}
            >
              <FlatTableHeader id="test 1">test 1</FlatTableHeader>
              <FlatTableCell id="test 2">test 2</FlatTableCell>
              <FlatTableCheckbox id="checkbox" />
              <FlatTableRowHeader id="test 3">test 3</FlatTableRowHeader>
              <FlatTableHeader id="test 4">test 4</FlatTableHeader>
              <FlatTableCell id="test 5">test 5</FlatTableCell>
            </FlatTableRow>
          </FlatTableBodyDraggable>
        </table>
      );

      wrapper.update();

      assertStyleMatch(
        {
          position: "sticky",
        },
        wrapper.find(StyledFlatTableHeader).at(0)
      );

      assertStyleMatch(
        {
          position: "sticky",
        },
        wrapper.find(StyledFlatTableCell).at(0)
      );

      assertStyleMatch(
        {
          position: "sticky",
        },
        wrapper.find(StyledFlatTableCheckbox)
      );

      assertStyleMatch(
        {
          position: undefined,
        },
        wrapper.find(StyledFlatTableHeader).at(1)
      );
    });

    it("should update the expanded state of the rows", () => {
      const subRows = [
        <FlatTableRow key="sub-row-1">
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow key="sub-row-2">
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
      ];
      const MockComponent = (props: Partial<FlatTableRowProps> = {}) => {
        const [expanded, setExpanded] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setExpanded((p) => !p)}>
              Change Expanded State
            </button>
            <table>
              <tbody>
                <FlatTableRow {...props} expanded={expanded}>
                  <FlatTableCell>cell1</FlatTableCell>
                  <FlatTableCell>cell2</FlatTableCell>
                </FlatTableRow>
              </tbody>
            </table>
          </>
        );
      };

      const wrapper = mount(<MockComponent expandable subRows={subRows} />);
      const button = wrapper.find("button");
      act(() => {
        button?.props?.().onClick?.({} as React.MouseEvent<HTMLButtonElement>);
      });
      wrapper.update();

      expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

      act(() => {
        button?.props?.().onClick?.({} as React.MouseEvent<HTMLButtonElement>);
      });
      wrapper.update();

      expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
    });

    it("should render the sub rows open when expanded set to true", () => {
      const subRows = [
        <FlatTableRow key="sub-row-1">
          <FlatTableCell>York</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow key="sub-row-2">
          <FlatTableCell>Edinburgh</FlatTableCell>
        </FlatTableRow>,
      ];
      const component = (
        <table>
          <FlatTableBodyDraggable>
            <FlatTableRow expandable subRows={subRows} key={0} id={0} expanded>
              <FlatTableCell>UK</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow expandable expanded subRows={subRows} key={1} id={1}>
              <FlatTableCell>Germany</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow expandable subRows={subRows} key={2} id={2} expanded>
              <FlatTableCell>Finland</FlatTableCell>
            </FlatTableRow>
          </FlatTableBodyDraggable>
        </table>
      );

      const wrapper = mount(component);

      expect(wrapper.find(StyledFlatTableRow).length).toEqual(9);
    });

    it("make sure first cell is clickable", () => {
      const subRows = [
        <FlatTableRow key="sub-row-1">
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow key="sub-row-2">
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
      ];
      const wrapper = mount(
        <table>
          <FlatTableBodyDraggable>
            <FlatTableRow
              expandable
              subRows={subRows}
              expandableArea="firstColumn"
              id={0}
            >
              <FlatTableHeader id="test 1">test 1</FlatTableHeader>
              <FlatTableCell id="test 2">test 2</FlatTableCell>
              <FlatTableCheckbox id="checkbox" />
              <FlatTableRowHeader id="test 3">test 3</FlatTableRowHeader>
              <FlatTableHeader id="test 4">test 4</FlatTableHeader>
              <FlatTableCell id="test 5">test 5</FlatTableCell>
            </FlatTableRow>
          </FlatTableBodyDraggable>
        </table>
      );

      const cell = wrapper.find("td").at(0);

      act(() => {
        cell?.props?.().onClick?.({} as React.MouseEvent<HTMLButtonElement>);
      });
      wrapper.update();

      assertStyleMatch(
        {
          position: undefined,
        },
        wrapper.find(StyledFlatTableHeader).at(1)
      );
    });

    it("make sure styling is applied when dragging", () => {
      const wrapper = mount(
        <table>
          <tbody>
            <StyledFlatTableRow
              isDragging
              size="medium"
              horizontalBorderSize="medium"
              colorTheme="light"
              lhsRowHeaderIndex={-1}
              rhsRowHeaderIndex={-1}
              totalChildren={0}
              firstCellIndex={0}
            >
              <FlatTableCell>Test</FlatTableCell>
            </StyledFlatTableRow>
          </tbody>
        </table>
      );
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor150)",
        },
        wrapper,
        { modifier: `${StyledFlatTableCell}` }
      );
    });

    it("make sure styling is applied when dragging in a sidebar", () => {
      const wrapper = mount(
        <table>
          <tbody>
            <StyledFlatTableRow
              isDragging
              isInSidebar
              size="medium"
              horizontalBorderSize="medium"
              colorTheme="light"
              lhsRowHeaderIndex={-1}
              rhsRowHeaderIndex={-1}
              totalChildren={0}
              firstCellIndex={0}
            >
              <FlatTableCell>Test</FlatTableCell>
            </StyledFlatTableRow>
          </tbody>
        </table>
      );
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor200)",
        },
        wrapper,
        { modifier: `${StyledFlatTableCell}` }
      );
    });

    describe("with a ref", () => {
      it("the ref should be forwarded", () => {
        let mockRef = { current: null };

        const WrapperComponent = () => {
          mockRef = useRef(null);

          return (
            <table>
              <FlatTableBodyDraggable>
                <FlatTableRow id={0} ref={mockRef}>
                  <FlatTableHeader>test 1</FlatTableHeader>
                  <FlatTableCell>test 2</FlatTableCell>
                  <FlatTableCheckbox />
                  <FlatTableRowHeader>test 3</FlatTableRowHeader>
                  <FlatTableHeader>test 4</FlatTableHeader>
                  <FlatTableCell>test 5</FlatTableCell>
                </FlatTableRow>
              </FlatTableBodyDraggable>
            </table>
          );
        };

        const wrapper = mount(<WrapperComponent />);

        expect(mockRef.current).toBe(wrapper.find("tr").getDOMNode());
      });

      it("the input callback ref should be called with the DOM element", () => {
        let mockRef;

        const WrapperComponent = () => {
          mockRef = jest.fn();

          return (
            <table>
              <FlatTableBodyDraggable>
                <FlatTableRow id={0} ref={mockRef}>
                  <FlatTableHeader>test 1</FlatTableHeader>
                  <FlatTableCell>test 2</FlatTableCell>
                  <FlatTableCheckbox />
                  <FlatTableRowHeader>test 3</FlatTableRowHeader>
                  <FlatTableHeader>test 4</FlatTableHeader>
                  <FlatTableCell>test 5</FlatTableCell>
                </FlatTableRow>
              </FlatTableBodyDraggable>
            </table>
          );
        };

        const wrapper = mount(<WrapperComponent />);

        expect(mockRef).toHaveBeenCalledWith(wrapper.find("tr").getDOMNode());
      });
    });
  });

  describe("wrapping FlatTableRowHeader", () => {
    it("calculates the rowHeaderIndex as expected", () => {
      const FlatTableRowHeaderWrapper = ({
        children,
      }: {
        children: React.ReactNode;
      }) => <FlatTableRowHeader>{children}</FlatTableRowHeader>;
      const rowHeaderIndex = mount(
        <table>
          <thead>
            <FlatTableRow>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableRowHeaderWrapper>Foo</FlatTableRowHeaderWrapper>
              <FlatTableCell>Foo</FlatTableCell>
              <FlatTableCell>Foo</FlatTableCell>
            </FlatTableRow>
          </thead>
        </table>
      )
        .find(StyledFlatTableRow)
        .prop("lhsRowHeaderIndex");

      expect(rowHeaderIndex).toEqual(3);
    });
  });

  // added to meet coverage
  describe("when only children passed are checkboxes", () => {
    it("does not update first cell index", () => {
      const wrapper = mount(
        <table>
          <tbody>
            <FlatTableRow>
              <FlatTableCheckbox />
              <FlatTableCheckbox />
            </FlatTableRow>
          </tbody>
        </table>
      );

      expect(wrapper.find(StyledFlatTableRow).prop("firstCellIndex")).toBe(0);
    });
  });

  // added to meet coverage
  describe("when first cell has no id set", () => {
    it("does not set a first cell index", () => {
      const wrapper = mount(
        <table>
          <tbody>
            <FlatTableRow>
              <td>I have no ID</td>
              <FlatTableRowHeader>I have an ID</FlatTableRowHeader>
            </FlatTableRow>
          </tbody>
        </table>
      );

      expect(wrapper.find(StyledFlatTableRowHeader).prop("leftPositon")).toBe(
        undefined
      );
    });
  });
});
