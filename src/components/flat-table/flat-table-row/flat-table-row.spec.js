import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";

import FlatTableRow from "./flat-table-row.component";
import FlatTableCell from "../flat-table-cell/flat-table-cell.component";
import StyledFlatTableRow from "./flat-table-row.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import { baseTheme } from "../../../style/themes";
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

const events = {
  enter: {
    key: "Enter",
    which: 13,
    preventDefault: jest.fn(),
  },
  space: {
    key: "Space",
    which: 32,
    preventDefault: jest.fn(),
  },
  c: {
    key: "c",
    which: 67,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
};

describe("FlatTableRow", () => {
  it("should have expected styles", () => {
    expect(renderFlatTableRow({}, TestRenderer.create)).toMatchSnapshot();
  });

  describe('when the "onClick" prop is passed', () => {
    let wrapper, onClickFn;

    beforeEach(() => {
      onClickFn = jest.fn();
      wrapper = renderFlatTableRow({
        onClick: onClickFn,
      });
      wrapper.find(FlatTableRow).at(0).simulate("focus");
    });

    it("then the component should have tabIndex set to 0", () => {
      expect(wrapper.find(StyledFlatTableRow).prop("tabIndex")).toBe(0);
    });

    it("then the component should have isRowInteractive prop set to true", () => {
      expect(wrapper.find(StyledFlatTableRow).prop("isRowInteractive")).toBe(
        true
      );
    });

    it("then the cursor over the element should be set to pointer", () => {
      assertStyleMatch({ cursor: "pointer" }, wrapper);
    });

    it("then the element should have proper outline when focused", () => {
      assertStyleMatch(
        {
          outline: `2px solid ${baseTheme.colors.focus}`,
          outlineOffset: "-1px",
        },
        wrapper,
        { modifier: ":focus" }
      );
    });

    it("then the Row Header should have proper outline when the Row is focused", () => {
      wrapper = mount(
        <table>
          <thead>
            <FlatTableRow onClick={() => {}}>
              <FlatTableRowHeader>test 1</FlatTableRowHeader>
              <FlatTableHeader>test 2</FlatTableHeader>
              <FlatTableCell>test 3</FlatTableCell>
            </FlatTableRow>
          </thead>
        </table>
      );

      assertStyleMatch(
        {
          borderBottom: "1px solid transparent",
          borderLeft: `1px solid ${baseTheme.colors.focus}`,
          backgroundClip: "padding-box",
          zIndex: "1002",
        },
        wrapper,
        { modifier: `:focus ${StyledFlatTableRowHeader}` }
      );

      assertStyleMatch(
        {
          borderTop: `2px solid ${baseTheme.colors.focus}`,
          borderBottom: `2px solid ${baseTheme.colors.focus}`,
          display: "block",
          left: "0px",
          top: "-1px",
          height: "calc(100% - 1px)",
          width: "101%",
          position: "absolute",
          zIndex: "1000",
        },
        wrapper,
        { modifier: `:focus ${StyledFlatTableRowHeader}:before` }
      );
    });

    it("then all Cells of the Row should have proper hover color", () => {
      assertStyleMatch(
        {
          backgroundColor: baseTheme.flatTable.hover,
        },
        wrapper,
        { modifier: `:hover ${StyledFlatTableCell}` }
      );
    });

    it("then the Row Header of the Row should have proper hover color", () => {
      assertStyleMatch(
        {
          backgroundColor: baseTheme.flatTable.hover,
        },
        wrapper,
        { modifier: `:hover ${StyledFlatTableRowHeader}` }
      );
    });

    describe("and space key is pressed", () => {
      it("then the onClick prop should be called", () => {
        wrapper.find(FlatTableRow).simulate("keydown", { which: 13 });
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("and enter key is pressed", () => {
      it("then the onClick prop should be called", () => {
        wrapper.find(FlatTableRow).simulate("keydown", { which: 32 });
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("and a key other than space or enter is pressed", () => {
      it("then the onClick prop should not be called", () => {
        wrapper.find(FlatTableRow).simulate("keydown", { which: 18 });
        expect(onClickFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the "onClick" prop is not passed', () => {
    let wrapper;

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
          backgroundColor: baseTheme.flatTable.selected,
        },
        wrapper,
        { modifier: `${StyledFlatTableCell}` }
      );
    });

    describe('when the "onClick" is also provided', () => {
      it('it applies the correct "background-color" on hover', () => {
        wrapper = renderFlatTableRow({
          selected: true,
          onClick: jest.fn(),
        });
        wrapper.find(FlatTableRow).at(0).simulate("focus");
        assertStyleMatch(
          {
            backgroundColor: baseTheme.flatTable.selected,
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

      it('it overrides the cell "background-color" on hover', () => {
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
          backgroundColor: baseTheme.flatTable.highlighted,
        },
        wrapper,
        { modifier: `${StyledFlatTableCell}` }
      );
    });

    it('applies a "background-color" to the "FLatTableRowHeader"', () => {
      wrapper = renderFlatTableRow({
        highlighted: true,
        onClick: jest.fn(),
      });
      assertStyleMatch(
        {
          backgroundColor: baseTheme.flatTable.highlighted,
        },
        wrapper,
        { modifier: `${StyledFlatTableRowHeader}` }
      );
    });

    describe('with the "bgColor" also provided', () => {
      it('it overrides the cell "background-color"', () => {
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

      it('it overrides the cell "background-color" on hover', () => {
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
      it('it applies the correct "background-color"', () => {
        wrapper = renderFlatTableRow({
          selected: true,
          highlighted: true,
          onClick: jest.fn(),
        });
        wrapper.find(FlatTableRow).at(0).simulate("focus");
        assertStyleMatch(
          {
            backgroundColor: baseTheme.flatTable.selected,
          },
          wrapper,
          { modifier: `:hover ${StyledFlatTableCell}` }
        );
      });

      describe('with the "bgColor" also provided', () => {
        it('it overrides the cell "background-color"', () => {
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
          backgroundColor: baseTheme.flatTable.drawerSidebar.headerBackground,
        },
        wrapper,
        { modifier: `${el}` }
      );

      const modifierString =
        id === "StyledFlatTableCheckbox" ? `${el}:not(th)` : el;

      if (!["StyledFlatTableHeader", "StyledFlatTableRowHeader"].includes(id)) {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.flatTable.drawerSidebar.hover,
          },
          wrapper,
          { modifier: `:hover ${modifierString}` }
        );
      }

      if (id === "StyledFlatTableCheckbox") {
        assertStyleMatch(
          {
            borderRight: `1px solid ${baseTheme.flatTable.drawerSidebar.highlighted}`,
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
              backgroundColor: baseTheme.flatTable.drawerSidebar.selected,
            },
            wrapper,
            { modifier: `${el}` }
          );
        }

        const modifierString =
          id === "StyledFlatTableCheckbox" ? `${el}:not(th)` : el;

        assertStyleMatch(
          {
            backgroundColor: baseTheme.flatTable.drawerSidebar.selected,
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
              backgroundColor: baseTheme.flatTable.drawerSidebar.highlighted,
            },
            wrapper,
            { modifier: `${el}` }
          );
        }

        const modifierString =
          id === "StyledFlatTableCheckbox" ? `${el}:not(th)` : el;

        assertStyleMatch(
          {
            backgroundColor: baseTheme.flatTable.drawerSidebar.highlighted,
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
                backgroundColor: baseTheme.flatTable.drawerSidebar.selected,
              },
              wrapper,
              { modifier: `${el}` }
            );
          }

          const modifierString =
            id === "StyledFlatTableCheckbox" ? `${el}:not(th)` : el;

          assertStyleMatch(
            {
              backgroundColor: baseTheme.flatTable.drawerSidebar.selected,
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
      act(() =>
        wrapper.find(FlatTableHeader).at(0).props().reportCellWidth(200, 0)
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

    it("applies the correct focus styling when the row is interactive", () => {
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
          borderLeft: `1px solid ${baseTheme.table.secondary}`,
        },
        wrapper,
        { modifier: `:focus ${StyledFlatTableRowHeader}` }
      );

      assertStyleMatch(
        {
          borderLeft: `1px solid ${baseTheme.colors.focus}`,
        },
        wrapper,
        { modifier: `:focus td:nth-of-type(1)` }
      );

      assertStyleMatch(
        {
          borderTop: `2px solid ${baseTheme.colors.focus}`,
          borderBottom: `2px solid ${baseTheme.colors.focus}`,
          display: "block",
          left: "0px",
          top: "-1px",
          height: "calc(100% - 1px)",
          width: "101%",
          position: "absolute",
          zIndex: "1000",
        },
        wrapper.find(FlatTableRow),
        { modifier: `:focus td:nth-of-type(1):before` }
      );
    });

    it.each(["dark", "light", "transparent-white", "transparent-base"])(
      "applies the correct th styling when colorTheme is %s",
      (colorTheme) => {
        const wrapper = mount(
          <FlatTableThemeContext.Provider value={{ colorTheme }}>
            <table>
              <thead>
                <FlatTableRow onClick={() => {}}>
                  <FlatTableHeader>test 1</FlatTableHeader>
                  <FlatTableRowHeader>test 3</FlatTableRowHeader>
                  <FlatTableHeader>test 4</FlatTableHeader>
                </FlatTableRow>
              </thead>
            </table>
          </FlatTableThemeContext.Provider>
        );

        assertStyleMatch(
          {
            borderLeft: `1px solid ${getThBorderColor(colorTheme)}`,
          },
          wrapper,
          { modifier: `th:nth-of-type(3)` }
        );
      }
    );
  });

  describe("when the row is expandable", () => {
    const SubRows = [
      <FlatTableRow>
        <FlatTableCell>sub1cell1</FlatTableCell>
        <FlatTableCell>sub1cell2</FlatTableCell>
      </FlatTableRow>,
      <FlatTableRow>
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
          const MockComponent = (props) => {
            const [expanded, setExpanded] = React.useState(false);
            return (
              <>
                <button type="button" onClick={() => setExpanded(!expanded)}>
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

          act(() => {
            wrapper.find("button").props().onClick();
          });
          wrapper.update();

          expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

          act(() => {
            wrapper.find("button").props().onClick();
          });
          wrapper.update();

          expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
        });
      });
    });

    describe("when focused and enter/space is pressed", () => {
      let wrapper;
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
          <FlatTableRow>
            <FlatTableCheckbox />
            <FlatTableCell>sub1cell2</FlatTableCell>
          </FlatTableRow>,
          <FlatTableRow>
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
      let wrapper;
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

            wrapper
              .find(StyledFlatTableRow)
              .at(0)
              .find("td")
              .at(0)
              .getDOMNode()
              .focus();

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

            wrapper
              .find(StyledFlatTableRow)
              .at(0)
              .find("td")
              .at(0)
              .getDOMNode()
              .focus();

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

    describe.each([
      ["medium", "2px solid #CCD6DB"],
      ["large", "4px solid #CCD6DB"],
    ])(
      "when the horizontalBorderSize prop is set to %s",
      (horizontalBorderSize, expectedValue) => {
        let wrapper;

        it("it overrides the cell bottom-border size", () => {
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

        it("it overrides the cell bottom-border color", () => {
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

    describe("when the size of the table is 'compact'", () => {
      it("should add the correct padding to child row cells", () => {
        const wrapper = mount(
          <FlatTableThemeContext.Provider value={{ size: "compact" }}>
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
      const subRows = [
        <FlatTableRow>
          <FlatTableCell>York</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow>
          <FlatTableCell>Edinburgh</FlatTableCell>
        </FlatTableRow>,
      ];
      const component = (
        <table>
          <FlatTableBodyDraggable>
            <FlatTableRow expandable subRow={subRows} key={0} id={0} index={0}>
              <FlatTableCell>UK</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow
              expandable
              expanded
              subRow={subRows}
              key={1}
              id={1}
              index={1}
            >
              <FlatTableCell>Germany</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow expandable subRow={subRows} key={2} id={2} index={2}>
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

      expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);
    });

    it("sets any preceding columns to sticky as well", () => {
      const subRows = [
        <FlatTableRow>
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow>
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
      ];
      const wrapper = mount(
        <table>
          <FlatTableBodyDraggable>
            <FlatTableRow
              expandable
              subRow={subRows}
              expandableArea="firstColumn"
              id={0}
            >
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
      act(() =>
        wrapper.find(FlatTableHeader).at(0).props().reportCellWidth(200, 0)
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
        <FlatTableRow>
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow>
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
      ];
      const MockComponent = (props) => {
        const [expanded, setExpanded] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setExpanded(!expanded)}>
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

      act(() => {
        wrapper.find("button").props().onClick();
      });
      wrapper.update();

      expect(wrapper.find(StyledFlatTableRow).length).toEqual(3);

      act(() => {
        wrapper.find("button").props().onClick();
      });
      wrapper.update();

      expect(wrapper.find(StyledFlatTableRow).length).toEqual(1);
    });

    it("should render the sub rows open when expanded set to true", () => {
      const subRows = [
        <FlatTableRow>
          <FlatTableCell>York</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow>
          <FlatTableCell>Edinburgh</FlatTableCell>
        </FlatTableRow>,
      ];
      const component = (
        <table>
          <FlatTableBodyDraggable>
            <FlatTableRow
              expandable
              subRows={subRows}
              key={0}
              id={0}
              index={0}
              expanded
            >
              <FlatTableCell>UK</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow
              expandable
              expanded
              subRows={subRows}
              key={1}
              id={1}
              index={1}
            >
              <FlatTableCell>Germany</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow
              expandable
              subRows={subRows}
              key={2}
              id={2}
              index={2}
              expanded
            >
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
        <FlatTableRow>
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
        <FlatTableRow>
          <FlatTableCell>1</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>,
      ];
      const wrapper = mount(
        <table>
          <FlatTableBodyDraggable>
            <FlatTableRow
              expandable
              subRow={subRows}
              expandableArea="firstColumn"
              id={0}
            >
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

      act(() => {
        wrapper.find("td").at(0).props().onClick();
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
            <StyledFlatTableRow isDragging>
              <FlatTableCell>Test</FlatTableCell>
            </StyledFlatTableRow>
          </tbody>
        </table>
      );
      assertStyleMatch(
        {
          backgroundColor: "#BFCCD2",
        },
        wrapper,
        { modifier: `${StyledFlatTableCell}` }
      );
    });

    it("make sure styling is applied when dragging in a sidebar", () => {
      const wrapper = mount(
        <table>
          <tbody>
            <StyledFlatTableRow isDragging isInSidebar>
              <FlatTableCell>Test</FlatTableCell>
            </StyledFlatTableRow>
          </tbody>
        </table>
      );
      assertStyleMatch(
        {
          backgroundColor: "#99ADB6",
        },
        wrapper,
        { modifier: `${StyledFlatTableCell}` }
      );
    });
  });
});

function renderFlatTableRow(props = {}, renderer = mount) {
  return renderer(
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

function getThBorderColor(colorTheme) {
  switch (colorTheme) {
    case "light":
      return baseTheme.flatTable.light.border;

    case "transparent-base":
      return baseTheme.flatTable.transparentBase.border;

    case "transparent-white":
      return baseTheme.flatTable.transparentWhite.border;

    // default baseTheme is "dark"
    default:
      return baseTheme.flatTable.dark.border;
  }
}
