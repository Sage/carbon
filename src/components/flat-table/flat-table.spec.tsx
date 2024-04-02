import React from "react";
import { ReactWrapper, mount } from "enzyme";

import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import FlatTable, { FlatTableProps } from "./flat-table.component";
import FlatTableHead from "./flat-table-head/flat-table-head.component";
import FlatTableBody from "./flat-table-body/flat-table-body.component";
import FlatTableRow from "./flat-table-row/flat-table-row.component";
import FlatTableHeader from "./flat-table-header/flat-table-header.component";
import FlatTableCell from "./flat-table-cell/flat-table-cell.component";
import FlatTableCheckbox from "./flat-table-checkbox/flat-table-checkbox.component";
import FlatTableRowHeader from "./flat-table-row-header/flat-table-row-header.component";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledFlatTableHeader from "./flat-table-header/flat-table-header.style";
import StyledFlatTableHead from "./flat-table-head/flat-table-head.style";
import { StyledFlatTableRowHeader } from "./flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "./flat-table-checkbox/flat-table-checkbox.style";
import {
  StyledFlatTable,
  StyledFlatTableWrapper,
  StyledFlatTableFooter,
  StyledTableContainer,
} from "./flat-table.style";
import { DrawerSidebarContext } from "../drawer";
import { StyledFlatTableCell } from "./flat-table-cell/flat-table-cell.style";
import StyledFlatTableRow from "./flat-table-row/flat-table-row.style";
import cellSizes from "./cell-sizes.style";
import { FLAT_TABLE_SIZES } from "./flat-table.config";
import Pager from "../pager/pager.component";
import Logger from "../../__internal__/utils/logger";
import CarbonProvider from "../carbon-provider";

// mock Logger.deprecate so that no console warnings occur while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

const RenderComponent = (props: Partial<FlatTableProps> = {}) => (
  <FlatTable {...props}>
    <FlatTableHead>
      <FlatTableRow>
        <FlatTableRowHeader>row header</FlatTableRowHeader>
        <FlatTableHeader>header1</FlatTableHeader>
        <FlatTableHeader>header2</FlatTableHeader>
        <FlatTableHeader>header3</FlatTableHeader>
      </FlatTableRow>
    </FlatTableHead>
    <FlatTableBody>
      <FlatTableRow id="row-1">
        <FlatTableRowHeader>row header</FlatTableRowHeader>
        <FlatTableCell>cell1</FlatTableCell>
        <FlatTableCell>cell2</FlatTableCell>
        <FlatTableCell rowspan="2">cell3</FlatTableCell>
      </FlatTableRow>
      <FlatTableRow id="row-2">
        <FlatTableRowHeader>row header</FlatTableRowHeader>
        <FlatTableCell colspan="2">cell1</FlatTableCell>
      </FlatTableRow>
    </FlatTableBody>
  </FlatTable>
);

function renderFlatTable(props = {}) {
  return mount(<RenderComponent {...props} />);
}

function renderFlatTableWithDiv(props = {}) {
  return mount(
    <div style={{ height: "180px" }}>
      <FlatTable {...props}>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableRowHeader>row header</FlatTableRowHeader>
            <FlatTableHeader>header1</FlatTableHeader>
            <FlatTableHeader>header2</FlatTableHeader>
            <FlatTableHeader>header3</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableRowHeader>row header</FlatTableRowHeader>
            <FlatTableCell>cell1</FlatTableCell>
            <FlatTableCell>cell2</FlatTableCell>
            <FlatTableCell rowspan="2">cell3</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableRowHeader>row header</FlatTableRowHeader>
            <FlatTableCell colspan="2">cell1</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
}

describe("FlatTable", () => {
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  it("ariaDescribedby prop should have been propagated to the table", () => {
    const customId = "foo";
    const wrapper = renderFlatTable({ ariaDescribedby: customId });

    expect(wrapper.find(StyledFlatTable).prop("aria-describedby")).toBe(
      customId
    );
  });

  describe("when a data prop is added", () => {
    it("should be added to the root element", () => {
      const wrapper = renderFlatTable({ "data-role": "test" });

      expect(wrapper.find(StyledFlatTableWrapper).props()["data-role"]).toEqual(
        "test"
      );
    });
  });

  describe('when rendered with proper table data and "hasStickyHead" prop set to true', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = renderFlatTable({ hasStickyHead: true });
    });

    it("should have the overflow-y css property set to to auto", () => {
      expect(wrapper.find(StyledFlatTableWrapper)).toHaveStyleRule(
        "overflow-y",
        "auto"
      );
    });

    it("should set position sticky on all th inside the table head", () => {
      assertStyleMatch(
        {
          position: "sticky",
          top: "0",
          left: "0",
          zIndex: "1005",
        },
        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHead}` }
      );
    });

    it('then all Headers should have proper styling if `colorTheme="dark"`', () => {
      wrapper = renderFlatTable({ colorTheme: "dark" });

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor400)",
          borderRight: "1px solid var(--colorsUtilityMajor300)",
          color: "var(--colorsUtilityYang100)",
          borderBottomColor: "var(--colorsUtilityMajor300)",
        },

        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHeader}` }
      );
    });

    it('then all Headers should have proper styling if `colorTheme="light"`', () => {
      wrapper = renderFlatTable({ colorTheme: "light" });

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor100)",
          borderRight: "1px solid var(--colorsUtilityMajor150)",
          borderBottomColor: "var(--colorsUtilityMajor150)",
        },

        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHeader}` }
      );
    });

    it('then all Headers should have proper styling if `colorTheme="transparent-base"`', () => {
      wrapper = renderFlatTable({ colorTheme: "transparent-base" });

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor025)",
          borderRight: "1px solid var(--colorsUtilityMajor025)",
          borderBottomColor: "var(--colorsUtilityMajor100)",
        },

        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHeader}` }
      );
    });

    it('then all Headers should have proper styling if `colorTheme="transparent-white"`', () => {
      wrapper = renderFlatTable({ colorTheme: "transparent-white" });

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityYang100)",
          borderRight: "1px solid var(--colorsUtilityYang100)",
          borderBottomColor: "var(--colorsUtilityMajor100)",
        },

        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHeader}` }
      );
    });
  });

  describe("when FlatTable is a child of Sidebar", () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      wrapper = mount(
        <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
          <FlatTable>
            <tbody>
              <tr>
                <td>foo</td>
              </tr>
            </tbody>
          </FlatTable>
        </DrawerSidebarContext.Provider>
      );
    });

    it.each([
      ["StyledFlatTableHeader", StyledFlatTableHeader],
      ["StyledFlatTableRowHeader", StyledFlatTableRowHeader],
      ["StyledFlatTableCheckbox", StyledFlatTableCheckbox],
    ])("should override the styles for %s", (id, el) => {
      const modifierString =
        id === "StyledFlatTableHeader" ? el : `${StyledFlatTableHead} ${el}`;
      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityMajor040)",
          borderRight: "2px solid var(--colorsUtilityMajor040)",
          color: "var(--colorsUtilityYin090)",
        },
        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${modifierString}` }
      );
    });
  });

  describe.each(["dark", "light", "transparent-base", "transparent-base"])(
    "when isZebra prop is set to true and colorTheme is %s",
    (colorTheme) => {
      it("should apply hover styling to any FlatTableCheckbox not rendered as a th element", () => {
        const wrapper = renderFlatTable({ isZebra: true, colorTheme });

        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityMajor025)",
          },
          wrapper.find(StyledFlatTable),
          {
            modifier: `${StyledFlatTableRow}:hover ${StyledFlatTableCheckbox}:not(th)`,
          }
        );
      });
    }
  );

  describe("when the caption prop is set", () => {
    it("then that caption should be rendered in the table", () => {
      const captionText = "foo";
      const wrapper = renderFlatTable({ caption: captionText });

      expect(wrapper.find("caption").exists()).toBe(true);
      expect(wrapper.find("caption").text()).toBe(captionText);
    });
  });

  describe.each(FLAT_TABLE_SIZES)("when the size prop is set to %s", (size) => {
    const { fontSize, paddingSize } = cellSizes[size];
    const expectedStyles = {
      fontSize,
      paddingLeft: paddingSize,
      paddingRight: paddingSize,
    };

    it("then expected styles should be applied to table cells underlying div", () => {
      const wrapper = renderFlatTable({ size });

      assertStyleMatch(expectedStyles, wrapper.find(StyledFlatTable), {
        modifier: `${StyledFlatTableCell} > div`,
      });
    });

    it("then expected styles should be applied to table headers underlying div", () => {
      const wrapper = renderFlatTable({ size });

      assertStyleMatch(expectedStyles, wrapper.find(StyledFlatTable), {
        modifier: `${StyledFlatTableHeader} > div`,
      });
    });

    it("then expected styles should be applied to row headers underlying div", () => {
      const wrapper = renderFlatTable({ size });

      assertStyleMatch(expectedStyles, wrapper.find(StyledFlatTable), {
        modifier: `${StyledFlatTableRowHeader} > div`,
      });
    });

    it("then the Table Rows should have expected height", () => {
      const wrapper = renderFlatTable({ size });

      assertStyleMatch(
        {
          height: cellSizes[size].height,
        },
        wrapper.find(StyledFlatTable),
        {
          modifier: `${StyledFlatTableRow}`,
        }
      );
    });
  });

  describe("StyledFlatTableWrapper", () => {
    let wrapper;
    const Footer = () => <div>foo</div>;
    it("applies correct styles when a div is larger than the FlatTable", () => {
      wrapper = renderFlatTableWithDiv({ footer: <Footer /> });
      assertStyleMatch(
        {
          boxSizing: "border-box",
        },
        wrapper.find(StyledFlatTableWrapper)
      );
    });

    it("applies correct styles when hasMaxHeight is true", () => {
      wrapper = renderFlatTableWithDiv({
        footer: <Footer />,
        hasMaxHeight: true,
      });
      assertStyleMatch(
        {
          maxHeight: "100%",
        },
        wrapper.find(StyledFlatTableWrapper)
      );
    });

    it("applies correct styles when hasMaxHeight is false", () => {
      wrapper = renderFlatTableWithDiv({
        footer: <Footer />,
        hasMaxHeight: false,
      });
      assertStyleMatch(
        {
          maxHeight: undefined,
        },
        wrapper.find(StyledFlatTableWrapper)
      );
    });
  });

  describe("when FlatTableHead rows have only one child", () => {
    it("does not throw an error", () => {
      expect(() => {
        mount(
          <FlatTable>
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>Name</FlatTableHeader>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableHeader>City</FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              <FlatTableRow>
                <FlatTableCell>John Doe</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>John Doe</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );
      }).not.toThrow();
    });
  });

  describe("footer", () => {
    let wrapper;

    const Footer = () => <div>foo</div>;

    it("renders when content is passed in", () => {
      wrapper = renderFlatTable({ footer: <Footer /> });
      expect(wrapper.find(Footer).exists()).toEqual(true);
    });

    it("renders when content is passed in and hasStickyFooter is true", () => {
      wrapper = renderFlatTable({ footer: <Footer />, hasStickyFooter: true });
      assertStyleMatch(
        {
          position: "sticky",
          bottom: "0px",
          zIndex: "1001",
        },
        wrapper.find(StyledFlatTableFooter)
      );
    });

    it("sets the wrapper flex css props as expected", () => {
      wrapper = renderFlatTable({ footer: <Footer />, hasStickyFooter: true });
      expect(
        wrapper.find(StyledFlatTableWrapper).prop("justifyContent")
      ).toEqual("space-between");
    });
  });

  describe("styled system", () => {
    testStyledSystemMargin(RenderComponent);
  });

  describe("when width prop is set", () => {
    it("should apply the correct styles to StyledFlatTableWrapper and StyledTableContainer", () => {
      const wrapper = renderFlatTable({ width: "300px" });

      assertStyleMatch(
        {
          width: "300px",
        },
        wrapper.find(StyledFlatTableWrapper)
      );

      assertStyleMatch(
        {
          width: "300px",
        },
        wrapper.find(StyledTableContainer)
      );
    });

    describe("when overflowX prop is also set", () => {
      it("should apply the correct styles to StyledFlatTableWrapper and StyledTableContainer", () => {
        const wrapper = renderFlatTable({ width: "300px", overflowX: "auto" });

        assertStyleMatch(
          {
            overflowX: "hidden",
          },
          wrapper.find(StyledFlatTableWrapper)
        );

        assertStyleMatch(
          {
            overflowX: "auto",
          },
          wrapper.find(StyledTableContainer)
        );
      });
    });
  });

  describe("z-indexes", () => {
    let wrapper: ReactWrapper;
    const modifiers = [
      [`${StyledFlatTableHead} ${StyledFlatTableRowHeader}`, "1005"],
      [`${StyledFlatTableHeader}.isSticky`, "1005"],
      [`${StyledFlatTableHead} ${StyledFlatTableCheckbox}.isSticky`, "1005"],
      [`${StyledFlatTableHeader}`, "1003"],
      [`${StyledFlatTableCheckbox}`, "1003"],
      [`tbody ${StyledFlatTableRowHeader}`, "1000"],
      [`${StyledFlatTableCell}.isSticky`, "1000"],
      [`tbody ${StyledFlatTableCheckbox}.isSticky`, "1000"],
    ];

    beforeEach(() => {
      wrapper = mount(
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>heading one</FlatTableHeader>
              <FlatTableRowHeader>heading two</FlatTableRowHeader>
              <FlatTableHeader>heading three</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>name</FlatTableCell>
              <FlatTableRowHeader>unique id</FlatTableRowHeader>
              <FlatTableCell>city</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );
    });

    it.each(modifiers)(
      "should apply the expected value to elements rendered in thead",
      (modifier, zIndex) => {
        assertStyleMatch(
          {
            zIndex,
          },
          wrapper,
          { modifier }
        );
      }
    );
  });

  describe("rounded corners", () => {
    it("has the expected border radius styling when no footer rendered", () => {
      const wrapper = mount(
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>heading one</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>child one</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );

      assertStyleMatch(
        {
          borderTopLeftRadius: "var(--borderRadius100)",
          borderTopRightRadius: "var(--borderRadius100)",
          borderBottomLeftRadius: "var(--borderRadius100)",
          borderBottomRightRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledFlatTableWrapper)
      );

      assertStyleMatch(
        {
          borderTopLeftRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledFlatTableWrapper),
        {
          modifier: `thead ${StyledFlatTableRow}:first-of-type th:first-of-type`,
        }
      );

      assertStyleMatch(
        {
          borderTopRightRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledFlatTableWrapper),
        {
          modifier: `thead ${StyledFlatTableRow}:first-of-type th:last-of-type`,
        }
      );

      assertStyleMatch(
        {
          borderBottomLeftRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledFlatTableWrapper),
        {
          modifier: `tbody ${StyledFlatTableRow}:last-of-type td:first-child`,
        }
      );

      assertStyleMatch(
        {
          borderBottomRightRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledFlatTableWrapper),
        { modifier: `tbody ${StyledFlatTableRow}:last-of-type td:last-child` }
      );
    });

    it("when table's footer contains a Pager, override Pager's top border styling so it connects to the table", () => {
      rtlRender(
        <FlatTable footer={<Pager data-role="pager" onPagination={() => {}} />}>
          <FlatTableHead>
            <FlatTableRow>
              <td>heading one</td>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>item one</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );

      const pager = screen.getByTestId("pager");
      expect(pager).toHaveStyle({
        borderTop: "none",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      });
    });

    it("when table's sticky footer contains a Pager, neither the table nor Pager has bottom rounded corners", () => {
      rtlRender(
        <FlatTable
          hasStickyFooter
          footer={<Pager data-role="pager" onPagination={() => {}} />}
        >
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>heading one</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>child one</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );

      const tableWrapper = screen.getByRole("region");
      const pager = screen.getByTestId("pager");

      expect(tableWrapper).toHaveStyle({
        borderBottomLeftRadius: undefined,
        borderBottomRightRadius: undefined,
      });
      expect(pager).toHaveStyle({
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      });
    });

    it("has the expected border radius styling when the first column has rowspan that spans over bottom row", () => {
      const wrapper = mount(
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>heading one</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell rowspan="2">child one</FlatTableCell>
              <FlatTableCell>child two</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>child one</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );

      assertStyleMatch(
        {
          borderBottomLeftRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledFlatTableWrapper),
        {
          modifier: `tbody ${StyledFlatTableRow}:nth-of-type(1) td:first-child`,
        }
      );
    });

    it("has the expected border radius styling when the last column has rowspan that spans over bottom row", () => {
      const wrapper = mount(
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>heading one</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>child one</FlatTableCell>
              <FlatTableCell rowspan="2">child two</FlatTableCell>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableCell>child one</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );

      assertStyleMatch(
        {
          borderBottomRightRadius: "var(--borderRadius100)",
        },
        wrapper.find(StyledFlatTableWrapper),
        {
          modifier: `tbody ${StyledFlatTableRow}:nth-of-type(1) td:last-child`,
        }
      );
    });
  });

  describe("keyboard navigation", () => {
    const preventDefault = jest.fn();
    const arrowDown = { key: "ArrowDown", preventDefault };
    const arrowUp = { key: "ArrowUp", preventDefault };
    const arrowLeft = { key: "ArrowLeft" };

    describe("when rows are clickable", () => {
      it("should not move focus to first row when down arrow pressed and table wrapper focused when focusRedesignOptOut is not set", async () => {
        const { container } = rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );
        const tableWrapper = container.querySelectorAll(
          "div"
        )[1] as HTMLElement;
        tableWrapper?.focus();
        expect(tableWrapper).toHaveFocus();
        expect(await screen.findByRole("region")).toHaveStyle({
          outline: "transparent 3px solid",
          "box-shadow":
            "0px 0px 0px var(--borderWidth300) var(--colorsSemanticFocus500),0px 0px 0px var(--borderWidth600) var(--colorsUtilityYin090)",
        });
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(tableWrapper).toHaveFocus();
      });

      it("should not move focus to first row when down arrow pressed and table wrapper focused when focusRedesignOptOut is set", async () => {
        const { container } = rtlRender(
          <CarbonProvider focusRedesignOptOut>
            <FlatTable>
              <FlatTableBody>
                <FlatTableRow onClick={() => {}}>
                  <FlatTableCell>one</FlatTableCell>
                  <FlatTableCell>two</FlatTableCell>
                </FlatTableRow>
                <FlatTableRow onClick={() => {}}>
                  <FlatTableCell>three</FlatTableCell>
                  <FlatTableCell>four</FlatTableCell>
                </FlatTableRow>
              </FlatTableBody>
            </FlatTable>
          </CarbonProvider>
        );
        const tableWrapper = container.querySelectorAll(
          "div"
        )[2] as HTMLElement;
        tableWrapper?.focus();
        expect(tableWrapper).toHaveFocus();
        expect(await screen.findByRole("region")).toHaveStyle({
          outline: "2px solid var(--colorsSemanticFocus500)",
        });
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(tableWrapper).toHaveFocus();
      });

      it("should set the first row's tabindex to 0 if no other rows are selected or highlighted", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow data-role="one" onClick={() => {}}>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="two" onClick={() => {}}>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );
        await waitFor(() => {
          expect(screen.getByTestId("one").getAttribute("tabindex")).toBe("0");
          expect(screen.getByTestId("two").getAttribute("tabindex")).toBe("-1");
        });
      });

      it("should set the a row's tabindex to 0 when it is selected", () => {
        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow onClick={() => {}} selected>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        expect(
          wrapper.update().find(StyledFlatTableRow).at(0).prop("tabIndex")
        ).toBe(-1);
        expect(
          wrapper.update().find(StyledFlatTableRow).at(1).prop("tabIndex")
        ).toBe(0);
      });

      it("should set a row's tabindex to 0 when it is highlighted", () => {
        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow onClick={() => {}} highlighted>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        expect(
          wrapper.update().find(StyledFlatTableRow).at(0).prop("tabIndex")
        ).toBe(-1);
        expect(
          wrapper.update().find(StyledFlatTableRow).at(1).prop("tabIndex")
        ).toBe(0);
      });

      it("should move focus to the next row with an onClick when the down arrow key is pressed but not loop to the first when last reached", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow data-role="one" onClick={() => {}}>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="two" onClick={() => {}}>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="three" onClick={() => {}}>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="four" onClick={() => {}}>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        const tableWrapper = await screen.findByRole("region");
        const firstRow = await screen.findByTestId("one");
        const secondRow = await screen.findByTestId("two");
        const thirdRow = await screen.findByTestId("three");
        const fourthRow = await screen.findByTestId("four");
        firstRow?.focus();
        expect(firstRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(secondRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(thirdRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(fourthRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(fourthRow).toHaveFocus();
      });

      it("should move focus to the previous row with an onClick when the up arrow key is pressed but not loop to the last when first reached", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow data-role="one" onClick={() => {}}>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="two" onClick={() => {}}>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="three" onClick={() => {}}>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="four" onClick={() => {}}>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        const tableWrapper = await screen.findByRole("region");
        const firstRow = await screen.findByTestId("one");
        const secondRow = await screen.findByTestId("two");
        const thirdRow = await screen.findByTestId("three");
        const fourthRow = await screen.findByTestId("four");
        fourthRow?.focus();
        expect(fourthRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(thirdRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(secondRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(firstRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(firstRow).toHaveFocus();
      });

      it("should not move focus from currently focused row when left arrow key pressed", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow data-role="one" onClick={() => {}}>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="two" onClick={() => {}}>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="three" onClick={() => {}}>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="four" onClick={() => {}}>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        const tableWrapper = await screen.findByRole("region");
        const fourthRow = await screen.findByTestId("four");
        fourthRow?.focus();
        expect(fourthRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowLeft);
        expect(fourthRow).toHaveFocus();
      });

      it("should move focus to the next expandable row when the down arrow key is pressed but not loop to the first when last reached", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow data-role="one" expandable>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="two" expandable>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="three" expandable>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="four" expandable>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        const tableWrapper = await screen.findByRole("region");
        const firstRow = await screen.findByTestId("one");
        const secondRow = await screen.findByTestId("two");
        const thirdRow = await screen.findByTestId("three");
        const fourthRow = await screen.findByTestId("four");
        firstRow?.focus();
        expect(firstRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(secondRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(thirdRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(fourthRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(fourthRow).toHaveFocus();
      });

      it("should move focus to the previous expandable row when the up arrow key is pressed but not loop to the last when first reached", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow data-role="one" expandable>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="two" expandable>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="three" expandable>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="four" expandable>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        const tableWrapper = await screen.findByRole("region");
        const firstRow = await screen.findByTestId("one");
        const secondRow = await screen.findByTestId("two");
        const thirdRow = await screen.findByTestId("three");
        const fourthRow = await screen.findByTestId("four");
        fourthRow?.focus();
        expect(fourthRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(thirdRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(secondRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(firstRow).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(firstRow).toHaveFocus();
      });

      it("should move focus to the next row when the down arrow key is pressed whilst a checkbox input child is focused", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCheckbox />
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow data-role="two" onClick={() => {}}>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        const tableWrapper = await screen.findByRole("region");
        const secondRow = await screen.findByTestId("two");
        const checkbox = await screen.findByRole("checkbox");
        checkbox.focus();
        expect(checkbox).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(secondRow).toHaveFocus();
      });

      it("should move focus to the previous row when the up arrow key is pressed whilst a checkbox input child is focused", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow data-role="one" onClick={() => {}}>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCheckbox />
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        const tableWrapper = await screen.findByRole("region");
        const firstRow = await screen.findByTestId("one");
        const checkbox = await screen.findByRole("checkbox");
        checkbox.focus();
        expect(checkbox).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(firstRow).toHaveFocus();
      });
    });

    describe("when the first column is expandable", () => {
      it("should set the first cell's tabindex to 0", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="one">one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="two">three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );
        await waitFor(() => {
          expect(screen.getByTestId("one").getAttribute("tabindex")).toBe("0");
          expect(screen.getByTestId("two").getAttribute("tabindex")).toBe("-1");
        });
      });

      it("should tabindex to 0 on the first cell in a highlighted row", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="one">one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow highlighted expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="two">three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );
        await waitFor(() => {
          expect(screen.getByTestId("one").getAttribute("tabindex")).toBe("-1");
          expect(screen.getByTestId("two").getAttribute("tabindex")).toBe("0");
        });
      });

      it("should tabindex to 0 on the first cell in a selected row", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="one">one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow selected expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="two">three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );
        await waitFor(() => {
          expect(screen.getByTestId("one").getAttribute("tabindex")).toBe("-1");
          expect(screen.getByTestId("two").getAttribute("tabindex")).toBe("0");
        });
      });

      it("should set the first row header's tabindex to 0", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableRowHeader data-role="one" id="one">
                  one
                </FlatTableRowHeader>
                <FlatTableCell id="two">two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableRowHeader data-role="two" id="three">
                  three
                </FlatTableRowHeader>
                <FlatTableCell id="four">four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );
        await waitFor(() => {
          expect(screen.getByTestId("one").getAttribute("tabindex")).toBe("0");
          expect(screen.getByTestId("two").getAttribute("tabindex")).toBe("-1");
        });
      });

      it("should tabindex to 0 on the first row header in a highlighted row", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableRowHeader data-role="one" id="one">
                  one
                </FlatTableRowHeader>
                <FlatTableCell id="two">two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow highlighted expandableArea="firstColumn" expandable>
                <FlatTableRowHeader data-role="two" id="three">
                  three
                </FlatTableRowHeader>
                <FlatTableCell id="four">four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );
        await waitFor(() => {
          expect(screen.getByTestId("one").getAttribute("tabindex")).toBe("-1");
          expect(screen.getByTestId("two").getAttribute("tabindex")).toBe("0");
        });
      });

      it("should tabindex to 0 on the first row header in a selected row", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableRowHeader data-role="one" id="one">
                  one
                </FlatTableRowHeader>
                <FlatTableCell id="two">two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow selected expandableArea="firstColumn" expandable>
                <FlatTableRowHeader data-role="two" id="three">
                  three
                </FlatTableRowHeader>
                <FlatTableCell id="four">four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );
        await waitFor(() => {
          expect(screen.getByTestId("one").getAttribute("tabindex")).toBe("-1");
          expect(screen.getByTestId("two").getAttribute("tabindex")).toBe("0");
        });
      });

      it("should move focus to the next focusable cell when the down arrow key is pressed but not loop to the first when last reached", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="one">one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="two">three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="three">five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="four">seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        const tableWrapper = await screen.findByRole("region");
        const firstFocusableCell = await screen.findByTestId("one");
        const secondFocusableCell = await screen.findByTestId("two");
        const thirdFocusableCell = await screen.findByTestId("three");
        const fourthFocusableCell = await screen.findByTestId("four");
        firstFocusableCell.focus();
        expect(firstFocusableCell).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(secondFocusableCell).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(thirdFocusableCell).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(fourthFocusableCell).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowDown);
        expect(fourthFocusableCell).toHaveFocus();
      });

      it("should move focus to the previous focusable cell when the up arrow key is pressed but not loop to the last when first reached", async () => {
        rtlRender(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="one">one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="two">three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="three">five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell data-role="four">seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        const tableWrapper = await screen.findByRole("region");
        const firstFocusableCell = await screen.findByTestId("one");
        const secondFocusableCell = await screen.findByTestId("two");
        const thirdFocusableCell = await screen.findByTestId("three");
        const fourthFocusableCell = await screen.findByTestId("four");
        fourthFocusableCell.focus();
        expect(fourthFocusableCell).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(thirdFocusableCell).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(secondFocusableCell).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(firstFocusableCell).toHaveFocus();
        fireEvent.keyDown(tableWrapper, arrowUp);
        expect(firstFocusableCell).toHaveFocus();
      });
    });
  });
});
