import React from "react";
import { ThemeProvider } from "styled-components";
import TestRenderer from "react-test-renderer";
import TestUtils from "react-dom/test-utils";
import { mount, shallow } from "enzyme";
import { Table, TableCell } from "..";
import TableRow from "./table-row.component";
import StyledTableRow from "./table-row.style";
import TableHeader from "../table-header";
import StyledTableCell from "../table-cell/table-cell.style";
import DraggableTableCell from "../draggable-table-cell";
import StyledTable from "../table.style";
import StyledIcon from "../../icon/icon.style";
import { Checkbox } from "../../../__experimental__/components/checkbox";
import { baseTheme } from "../../../style/themes";
import {
  assertStyleMatch,
  carbonThemesJestTable,
} from "../../../__spec_helper__/test-utils";
import { DraggableContext, WithDrop } from "../../drag-and-drop";
import { ActionPopover, ActionPopoverItem } from "../../action-popover";
import { MenuButton } from "../../action-popover/action-popover.style";

jest.mock("../draggable-table-cell", () => {
  const React = require("react"); // eslint-disable-line no-shadow, global-require
  const PropTypes = require("prop-types"); // eslint-disable-line global-require
  class MockDraggableTableCell extends React.Component {
    componentDidMount() {
      this.props.draggableNode();
    }

    render() {
      return React.createElement("td");
    }
  }
  MockDraggableTableCell.propTypes = {
    draggableNode: PropTypes.func,
  };
  return MockDraggableTableCell;
});

describe("TableRow", () => {
  let instance, clickableInstance, row;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow className="foo">
          <TableCell />
        </TableRow>
      </Table>
    );

    clickableInstance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow className="foo" onClick={jest.fn()}>
          <TableCell />
        </TableRow>
      </Table>
    );
  });

  describe("componentWillMount", () => {
    describe("if highlightable via context", () => {
      describe("if no unique id", () => {
        it("throws error", () => {
          const render = function () {
            TestUtils.renderIntoDocument(
              <Table highlightable>
                <TableRow />
              </Table>
            );
          };
          expect(render).toThrowError(
            "A TableRow which is selectable or highlightable should provide a uniqueID."
          );
        });
      });

      describe("if unique id", () => {
        it("does not throw error", () => {
          const render = function () {
            TestUtils.renderIntoDocument(
              <Table highlightable>
                <TableRow uniqueID="foo" />
              </Table>
            );
          };
          expect(render).not.toThrowError();
        });
      });
    });

    describe("if selectable via context", () => {
      describe("if no unique id", () => {
        it("throws error", () => {
          const render = function () {
            TestUtils.renderIntoDocument(
              <Table selectable>
                <TableRow />
              </Table>
            );
          };
          expect(render).toThrowError(
            "A TableRow which is selectable or highlightable should provide a uniqueID."
          );
        });
      });

      describe("if unique id", () => {
        it("does not throw error", () => {
          const render = function () {
            TestUtils.renderIntoDocument(
              <Table selectable>
                <TableRow uniqueID="foo" />
              </Table>
            );
          };
          expect(render).not.toThrowError();
        });
      });
    });

    describe("if neither highlightable or selectable", () => {
      it("does not throw error", () => {
        const render = function () {
          TestUtils.renderIntoDocument(
            <Table>
              <TableRow uniqueID="foo" />
            </Table>
          );
        };
        expect(render).not.toThrowError();
      });
    });

    describe("if attachToTable is defined", () => {
      describe("if uniqueID", () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <Table>
              <TableRow uniqueID="foo" />
            </Table>
          );
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, "attachToTable");
          spyOn(row.context, "checkSelection");
          row.UNSAFE_componentWillMount();
        });

        it("calls attachToTable", () => {
          expect(row.context.attachToTable).toHaveBeenCalled();
        });

        it("calls checkSelection", () => {
          expect(row.context.checkSelection).toHaveBeenCalled();
        });
      });

      describe("if no uniqueID", () => {
        it("does not call attachToTable", () => {
          instance = TestUtils.renderIntoDocument(
            <Table>
              <TableRow />
            </Table>
          );
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, "attachToTable");
          row.UNSAFE_componentWillMount();
          expect(row.context.attachToTable).not.toHaveBeenCalled();
        });
      });
    });

    describe("if selected via props", () => {
      it("calls setState", () => {
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow selected uniqueID="foo" />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, "setState");
        row.UNSAFE_componentWillMount();
        expect(row.setState).toHaveBeenCalledWith({ selected: true });
      });
    });

    describe("if highlighted via props", () => {
      it("calls setState", () => {
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow highlighted uniqueID="foo" />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, "setState");
        row.UNSAFE_componentWillMount();
        expect(row.setState).toHaveBeenCalledWith({ highlighted: true });
      });
    });
  });

  describe("componentWillUnmount", () => {
    describe("if detachFromTable", () => {
      describe("if context", () => {
        it("calls detachFromTable", () => {
          instance = TestUtils.renderIntoDocument(
            <Table>
              <TableRow uniqueID="foo" />
            </Table>
          );
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          spyOn(row.context, "detachFromTable");
          row.componentWillUnmount();
          expect(row.context.detachFromTable).toHaveBeenCalledWith(row.rowID);
        });
      });

      describe("if no context", () => {
        it("does not throw error", () => {
          instance = TestUtils.renderIntoDocument(
            <Table>
              <TableRow uniqueID="foo" />
            </Table>
          );
          row = TestUtils.findRenderedComponentWithType(instance, TableRow);
          row.context = {};
          row.componentWillUnmount();
          expect(row.context).toEqual({});
        });
      });
    });
  });

  describe("componentWillReceiveProps", () => {
    describe("when uniqueID does not match", () => {
      it("calls checkSelection", () => {
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow uniqueID="foo" />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row.context, "checkSelection");
        row.UNSAFE_componentWillReceiveProps({ uniqueID: "bar" });
        expect(row.context.checkSelection).toHaveBeenCalled();
      });
    });

    describe("when uniqueID matches", () => {
      it("does not call checkSelection", () => {
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow uniqueID="foo" />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row.context, "checkSelection");
        row.UNSAFE_componentWillReceiveProps({ uniqueID: "foo" });
        expect(row.context.checkSelection).not.toHaveBeenCalled();
      });
    });

    describe("when selected prop does not match", () => {
      it("calls setState", () => {
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow selected />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, "setState");
        row.UNSAFE_componentWillReceiveProps({ selected: false });
        expect(row.setState).toHaveBeenCalledWith({ selected: false });
      });
    });

    describe("when selected prop matches", () => {
      it("does not call checkSelection", () => {
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow selected />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, "setState");
        row.UNSAFE_componentWillReceiveProps({ selected: true });
        expect(row.setState).not.toHaveBeenCalled();
      });
    });

    describe("when highlighted prop does not match", () => {
      it("calls setState", () => {
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow highlighted />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, "setState");
        row.UNSAFE_componentWillReceiveProps({ highlighted: false });
        expect(row.setState).toHaveBeenCalledWith({ highlighted: false });
      });
    });

    describe("when highlighted prop matches", () => {
      it("does not call checkSelection", () => {
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow highlighted />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        spyOn(row, "setState");
        row.UNSAFE_componentWillReceiveProps({ highlighted: true });
        expect(row.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe("onSelectAll", () => {
    it("calls selectAll via the context", () => {
      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow selected />
        </Table>
      );
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, "selectAll");
      row.onSelectAll();
      expect(row.context.selectAll).toHaveBeenCalledWith(row);
    });
  });

  describe("onRowClick", () => {
    it("calls highlightRow via context", () => {
      instance = TestUtils.renderIntoDocument(
        <Table highlightable>
          <TableRow uniqueID="foo" />
        </Table>
      );
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, "highlightRow");
      row.onRowClick();
      expect(row.context.highlightRow).toHaveBeenCalledWith("foo", row);
    });

    describe("if onHighlight is defined as a prop", () => {
      it("calls onSelect", () => {
        const spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow onHighlight={spy} uniqueID="foo" />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onRowClick();
        expect(spy).toHaveBeenCalledWith("foo", true, row);
      });
    });

    describe("if onClick is defined as a prop", () => {
      it("calls onClick", () => {
        const spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow onClick={spy} />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onRowClick("foo");
        expect(spy).toHaveBeenCalledWith("foo");
      });
    });
  });

  describe("onSelect", () => {
    it("calls selectRow via context", () => {
      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow uniqueID="foo" />
        </Table>
      );
      row = TestUtils.findRenderedComponentWithType(instance, TableRow);
      spyOn(row.context, "selectRow");
      row.onSelect();
      expect(row.context.selectRow).toHaveBeenCalledWith("foo", row, true);
    });

    describe("if onSelect is defined as a prop", () => {
      it("calls onSelect", () => {
        const spy = jasmine.createSpy();
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow uniqueID="foo" onSelect={spy} />
          </Table>
        );
        row = TestUtils.findRenderedComponentWithType(instance, TableRow);
        row.onSelect({ target: { value: true } });
        expect(spy).toHaveBeenCalledWith("foo", true, row);
      });
    });
  });

  describe.each(["th", "td"])("when the theme is classic", (element) => {
    const wrapper = mount(
      <Table>
        <TableRow>
          <TableHeader />
        </TableRow>
        <TableRow>
          <TableCell />
        </TableRow>
      </Table>
    );
    const styledElement = wrapper.find(element).hostNodes();

    it(`${element} matches the expected style`, () => {
      assertStyleMatch(
        {
          backgroundColor:
            element === "th" ? baseTheme.table.header : baseTheme.table.primary,
          borderBottom: `1px solid ${baseTheme.table.secondary}`,
        },
        styledElement
      );
    });
  });

  describe("if the row is clickable", () => {
    it('uses a "pointer" (clickable) cursor', () => {
      const tr = TestUtils.findRenderedDOMComponentWithTag(
        clickableInstance,
        "tr"
      );
      assertStyleMatch({ cursor: "pointer" }, tr);
    });
  });

  describe("when selected", () => {
    describe.each(carbonThemesJestTable)(
      "and the theme is %s",
      (themeName, theme) => {
        it("renders the element to match the expected style", () => {
          instance = mount(
            <Table>
              <TableRow uniqueID="foo" selectable selected theme={theme}>
                <TableCell />
              </TableRow>
            </Table>
          );

          assertStyleMatch(
            {
              backgroundColor: theme.table.selected,
              borderBottomColor: theme.table.selected,
            },
            instance.find(TableRow),
            { modifier: `&&&&:hover ${StyledTableCell}` }
          );
        });
      }
    );
  });

  describe("when highlighted", () => {
    describe.each(carbonThemesJestTable)(
      "and the theme is %s",
      (themeName, theme) => {
        it("renders the element to match the expected style", () => {
          instance = mount(
            <Table>
              <TableRow highlighted uniqueID="foo" theme={theme}>
                <TableCell />
              </TableRow>
            </Table>
          );
          assertStyleMatch(
            {
              backgroundColor: theme.table.selected,
              borderBottomColor: theme.table.selected,
            },
            instance.find(TableRow),
            { modifier: `&&&& ${StyledTableCell}` }
          );

          assertStyleMatch(
            {
              content: '""',
              height: "1px",
              left: "0",
              position: "absolute",
              top: "-1px",
              width: "100%",
            },
            instance.find(TableRow),
            { modifier: `&&&& ${StyledTableCell}:before` }
          );
        });
      }
    );
  });

  describe("when highlighted and selected", () => {
    it("renders expected styles", () => {
      instance = mount(
        <Table>
          <TableRow selected highlighted uniqueID="foo">
            <TableCell />
          </TableRow>
        </Table>
      );
      assertStyleMatch(
        {
          backgroundColor: "#D9E0E4",
          borderBottomColor: "#D9E0E4",
          position: "relative",
        },
        instance.find(TableRow),
        { modifier: `&&&& ${StyledTableCell}` }
      );
    });
  });

  describe("other props", () => {
    it("consumes other props on the tr element", () => {
      const spy = jasmine.createSpy();

      instance = mount(
        <Table>
          <TableRow className="foo" onClick={spy}>
            <TableCell />
          </TableRow>
        </Table>
      );

      const tr = instance.find(TableRow);
      tr.simulate("click");
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("render", () => {
    describe("without selectability", () => {
      it("renders its children", () => {
        instance = TestUtils.renderIntoDocument(
          <Table>
            <TableRow uniqueID="foo">
              <td />
              <td />
            </TableRow>
          </Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, "tr");
        expect(row.children.length).toEqual(2);
      });
    });

    describe("without selectability on the table but disabled on the row", () => {
      it("renders its children", () => {
        instance = TestUtils.renderIntoDocument(
          <Table selectable>
            <TableRow uniquieID="foo" selectable={false}>
              <td />
              <td />
            </TableRow>
          </Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, "tr");
        expect(row.children.length).toEqual(2);
      });
    });

    describe("with selectAll", () => {
      it("renders a select all cell", () => {
        instance = mount(
          <Table>
            <TableRow selectAll>
              <td />
              <td />
            </TableRow>
          </Table>
        );

        const tr = instance.find(TableRow);
        const selectAllCell = instance.find(TableCell);
        const checkbox = selectAllCell.find(Checkbox);

        expect(selectAllCell.exists()).toBeTruthy();
        expect(checkbox.exists()).toBeTruthy();
        expect(checkbox.props().onChange).toEqual(tr.instance().onSelectAll);
      });
    });

    describe("with selectable via context", () => {
      it("renders a multi select cell", () => {
        instance = mount(
          <Table selectable>
            <TableRow uniqueID="foo">
              <td />
              <td />
            </TableRow>
          </Table>
        );

        const tr = instance.find(TableRow);
        const selectAllCell = instance.find(TableCell);
        const checkbox = selectAllCell.find(Checkbox);

        expect(selectAllCell.exists()).toBeTruthy();
        expect(checkbox.exists()).toBeTruthy();
        expect(checkbox.props().onChange).toEqual(tr.instance().onSelect);
      });
    });

    describe("with selectable via prop", () => {
      it("renders a multi select cell", () => {
        instance = mount(
          <Table>
            <TableRow selectable uniqueID="foo">
              <td />
              <td />
            </TableRow>
          </Table>
        );

        const spy = jasmine.createSpy();
        const tr = instance.find(TableRow);
        const selectAllCell = instance.find(TableCell);
        const checkbox = selectAllCell.find(Checkbox);

        expect(checkbox.props().onChange).toEqual(tr.instance().onSelect);
        checkbox.props().onClick({ stopPropagation: spy });
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("with hideMultiSelect", () => {
      it("renders a multi select cell without a checkbox", () => {
        instance = TestUtils.renderIntoDocument(
          <Table selectable>
            <TableRow hideMultiSelect uniqueID="foo">
              <td />
              <td />
            </TableRow>
          </Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, "tr");
        expect(row.children.length).toEqual(3);
        expect(
          TestUtils.scryRenderedComponentsWithType(instance, Checkbox).length
        ).toEqual(0);
      });
    });

    describe("if is header", () => {
      it("renders a table header", () => {
        instance = TestUtils.renderIntoDocument(
          <Table selectable>
            <TableRow as="header" uniqueID="foo">
              <td />
              <td />
            </TableRow>
          </Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, "tr");
        const th = TestUtils.findRenderedComponentWithType(
          instance,
          TableHeader
        );
        expect(th).toBeTruthy();
      });
    });

    describe("when a child is null", () => {
      it("does not render a null cell", () => {
        instance = TestUtils.renderIntoDocument(
          <Table selectable>
            <TableRow as="header" uniqueID="foo">
              <td />
              {null}
            </TableRow>
          </Table>
        );
        row = TestUtils.findRenderedDOMComponentWithTag(instance, "tr");
        const th = TestUtils.findRenderedComponentWithType(
          instance,
          TableHeader
        );
        expect(th).toBeTruthy();
      });
    });

    describe("when a child of td is null", () => {
      it("does not render a null cell", () => {
        expect(() =>
          shallow(
            <Table selectable>
              <TableRow as="header" uniqueID="foo">
                <td />
                <td>{null}</td>
              </TableRow>
            </Table>
          )
        ).not.toThrow();
      });
    });

    describe("if is not classic theme", () => {
      it("renders a row to match the snapshot", () => {
        const wrapper = TestRenderer.create(
          <StyledTable theme={baseTheme}>
            <TableRow>
              <TableCell />
            </TableRow>
          </StyledTable>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe("drag and drop", () => {
    let wrapper;

    describe("without drag and drop context", () => {
      beforeEach(() => {
        wrapper = mount(
          <Table>
            <TableRow>
              <TableCell>foo</TableCell>
            </TableRow>
          </Table>
        );
      });

      it("does not render a draggable cell", () => {
        const cell = wrapper.find(TableRow).find(DraggableTableCell);
        expect(cell.length).toEqual(0);
      });

      it("does not render a WithDrop component", () => {
        const wd = wrapper.find(WithDrop);
        expect(wd.length).toEqual(0);
      });
    });

    describe("ensuring index is provided", () => {
      it("throws an error if no index is provided", () => {
        expect(() => {
          mount(
            <DraggableContext onDrag={() => {}}>
              <Table>
                <TableRow dragAndDropIdentifier="foo">
                  <TableCell>foo</TableCell>
                </TableRow>
              </Table>
            </DraggableContext>
          );
        }).toThrow(
          new Error("You need to provide an index for rows that are draggable")
        );
      });
    });

    describe("with drag and drop context", () => {
      beforeEach(() => {
        wrapper = mount(
          <DraggableContext
            onDrag={() => {}}
            canDrop={() => {
              return true;
            }}
          >
            <Table>
              <TableRow index={0} dragAndDropIdentifier="foo">
                <TableCell>foo</TableCell>
              </TableRow>
            </Table>
          </DraggableContext>
        );
      });

      describe.each(carbonThemesJestTable)(
        "when StyledTableRow get inDeadZone and isDragged props",
        (themeName, theme) => {
          it(`should render correct background color for the ${themeName} theme`, () => {
            wrapper = mount(
              <Table>
                <StyledTableRow theme={theme} isDragged inDeadZone />
              </Table>
            );

            assertStyleMatch(
              {
                backgroundColor: `${theme.table.dragging}`,
              },
              wrapper.find(StyledTableRow),
              { modifier: `${StyledTableCell}` }
            );
          });
        }
      );

      it("renders a draggable cell", () => {
        const draggableRow = wrapper.find(TableRow);
        const cell = draggableRow.find(DraggableTableCell);
        expect(cell.props().identifier).toEqual("foo");
        expect(cell.props().canDrag).toEqual(true);

        assertStyleMatch(
          {
            cursor: "grab",
          },
          draggableRow,
          { modifier: `${StyledIcon}` }
        );
      });

      it("renders a WithDrop component", () => {
        const wd = wrapper.find(WithDrop);
        expect(wd.props().index).toEqual(0);
        expect(wd.props().identifier).toEqual("foo");
        expect(wd.props().canDrop()).toEqual(true);
      });

      it("renders a dragging class", () => {
        const row1 = mount(
          <Table>
            <StyledTableRow isDragging index={0} dragAndDropIdentifier="foo">
              <TableCell>foo</TableCell>
            </StyledTableRow>
          </Table>
        );

        assertStyleMatch(
          {
            userSelect: "none",
          },
          row1.find(StyledTableRow)
        );
      });

      it("renders a dragged class if the index matches", () => {
        const context = {};
        const row1 = mount(
          <TableRow index={0} dragAndDropIdentifier="foo">
            <TableCell>foo</TableCell>
          </TableRow>,
          { context, wrappingComponent: Table }
        );

        row1.setContext({ dragAndDropActiveIndex: 0 });
      });
    });
  });
});

describe("TableRow", () => {
  let container;
  let wrapper;

  const onOpen = jest.fn();
  const onClose = jest.fn();

  function render() {
    wrapper = mount(
      <ThemeProvider {...{ theme: baseTheme }}>
        <Table>
          <TableRow>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>&nbsp;</TableHeader>
          </TableRow>
          <TableRow>
            <TableCell>John</TableCell>
            <TableCell>Doe</TableCell>
            <TableCell>
              <ActionPopover {...{ onOpen, onClose }}>
                <ActionPopoverItem icon="email">
                  Email Invoice
                </ActionPopoverItem>
              </ActionPopover>
            </TableCell>
          </TableRow>
        </Table>
      </ThemeProvider>,
      { attachTo: container }
    );
  }

  function getMenuButton() {
    return wrapper.find(MenuButton);
  }

  function getRow() {
    return wrapper.find(TableRow).at(1);
  }

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    onOpen.mockReset();
    onClose.mockReset();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  describe("with a ActionPopover", () => {
    beforeEach(() => {
      render();
    });
    describe("Opening the ActionPopover", () => {
      beforeEach(() => {
        getMenuButton().simulate("click");
      });
      it("marks the row as highlighted", () => {
        expect(getRow().state("highlighted")).toBe(true);
      });

      it("calls the provided onOpen handler", () => {
        expect(onOpen).toHaveBeenCalled();
      });
    });
    describe("Closing the ActionPopover", () => {
      beforeEach(() => {
        getMenuButton().simulate("click");
        getMenuButton().simulate("click");
      });
      it("removes row highlight", () => {
        expect(getRow().state("highlighted")).toBe(false);
      });

      it("calls the provided onClose handler", () => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });
});
