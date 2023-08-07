import React from "react";
import { ReactWrapper, mount } from "enzyme";
import { act } from "react-dom/test-utils";

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
import { StyledPagerContainer } from "../pager/pager.style";
import Pager from "../pager/pager.component";

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

  describe("when the table wrapper is focused", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = renderFlatTable();
    });

    it("should add the correct focus styling", () => {
      (wrapper
        .find(StyledFlatTableWrapper)
        .getDOMNode() as HTMLElement).focus();

      assertStyleMatch(
        {
          outline: "2px solid var(--colorsSemanticFocus500)",
        },
        wrapper.find(StyledFlatTableWrapper),
        {
          modifier: ":focus",
        }
      );

      assertStyleMatch(
        {
          outline: "none",
        },
        wrapper.find(StyledFlatTableWrapper),
        {
          modifier: ":focus:not(:focus-visible)",
        }
      );

      assertStyleMatch(
        {
          outline: "2px solid var(--colorsSemanticFocus500)",
        },
        wrapper.find(StyledFlatTableWrapper),
        {
          modifier: ":focus:focus-visible",
        }
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

  describe("when it has a sticky header with multiple rows", () => {
    let wrapper: ReactWrapper;

    const render = () => {
      wrapper = mount(
        <div style={{ height: "200px" }}>
          <FlatTable hasStickyHead>
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>header1</FlatTableHeader>
                <FlatTableHeader>header2</FlatTableHeader>
                <FlatTableHeader>header3</FlatTableHeader>
                <FlatTableHeader>header4</FlatTableHeader>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableHeader>header1</FlatTableHeader>
                <FlatTableHeader>header2</FlatTableHeader>
                <FlatTableHeader>header3</FlatTableHeader>
                <FlatTableHeader>header4</FlatTableHeader>
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

      jest
        .spyOn(
          wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .getDOMNode() as HTMLTableRowElement,
          "clientHeight",
          "get"
        )
        .mockImplementation(() => 40);
    };

    beforeEach(() => {
      render();
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should set the correct 'top' css on each row", () => {
      act(() => render());
      wrapper.update();

      expect(
        wrapper.find(StyledFlatTableRow).at(1).props().stickyOffset
      ).toEqual(40);

      assertStyleMatch(
        {
          top: "40px",
        },
        wrapper.find(StyledFlatTableHead).find(StyledFlatTableRow).at(1),
        { modifier: `&& th` }
      );
    });
  });

  describe("When FlatTable has sticky header and uses FlatTableRowHeaders so that the second column is made sticky", () => {
    let wrapper: ReactWrapper;
    const render = () => {
      wrapper = mount(
        <FlatTable hasStickyHead>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader rowspan={2}>heading one</FlatTableHeader>
              <FlatTableRowHeader rowspan={2}>heading two</FlatTableRowHeader>
              <FlatTableHeader colspan={2}>heading three</FlatTableHeader>
              <FlatTableHeader rowspan={2} />
              <FlatTableHeader colspan={2}>heading four</FlatTableHeader>
            </FlatTableRow>
            <FlatTableRow>
              <FlatTableHeader>header 1</FlatTableHeader>
              <FlatTableHeader>heading 2</FlatTableHeader>
              <FlatTableHeader>heading 3</FlatTableHeader>
              <FlatTableHeader>heading 4</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            <FlatTableRow>
              <FlatTableCell>name</FlatTableCell>
              <FlatTableRowHeader>unique id</FlatTableRowHeader>
              <FlatTableCell>city</FlatTableCell>
              <FlatTableCell>status</FlatTableCell>
              <FlatTableCell>0</FlatTableCell>
              <FlatTableCell>0</FlatTableCell>
              <FlatTableCell>0</FlatTableCell>
            </FlatTableRow>
          </FlatTableBody>
        </FlatTable>
      );
    };

    it("should apply left border if preceding row has a FlatTableRowHeader and current one does not and when the preceding row has a rowspan applied", () => {
      act(() => render());

      assertStyleMatch(
        {
          borderLeft: "1px solid var(--colorsUtilityMajor400)",
        },
        wrapper.find(StyledFlatTableHead).find(StyledFlatTableRow).at(1),
        {
          modifier: `th:first-of-type`,
        }
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
          boxShadow: "inset 0px 0px 0px 1px var(--colorsUtilityMajor100)",
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

    it("has the expected border radius styling when sticky footer rendered", () => {
      const wrapper = mount(
        <FlatTable hasStickyFooter footer={<Pager onPagination={jest.fn} />}>
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
          borderBottomLeftRadius: undefined,
          borderBottomRightRadius: undefined,
        },
        wrapper.find(StyledFlatTableWrapper)
      );

      assertStyleMatch(
        {
          borderBottomLeftRadius: "var(--borderRadius000)",
          borderBottomRightRadius: "var(--borderRadius000)",
        },
        wrapper.find(StyledFlatTableFooter),
        { modifier: `${StyledPagerContainer}` }
      );
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
      it("should not move focus to first row when down arrow pressed and table wrapper focused", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
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
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableWrapper)
            .getDOMNode() as HTMLDivElement).focus();
        });
        expect(wrapper.find(StyledFlatTableWrapper)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.find(StyledFlatTableWrapper)).toBeFocused();
      });

      it("should set the first row's tabindex to 0 if no other rows are selected or highlighted", () => {
        const wrapper = mount(
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

        expect(
          wrapper.update().find(StyledFlatTableRow).at(0).prop("tabIndex")
        ).toBe(0);
        expect(
          wrapper.update().find(StyledFlatTableRow).at(1).prop("tabIndex")
        ).toBe(-1);
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

      it("should move focus to the next row with an onClick when the down arrow key is pressed but not loop to the first when last reached", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
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
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .getDOMNode() as HTMLTableRowElement).focus();
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(0)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(1)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(2)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(3)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(3)).toBeFocused();
      });

      it("should move focus to the previous row with an onClick when the up arrow key is pressed but not loop to the last when first reached", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
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
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableRow)
            .at(3)
            .getDOMNode() as HTMLTableRowElement).focus();
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(3)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(2)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(1)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(0)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(0)).toBeFocused();
      });

      it("should not move focus from currently focused row when left arrow key pressed", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
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
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableRow)
            .at(3)
            .getDOMNode() as HTMLTableRowElement).focus();
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(3)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowLeft);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(3)).toBeFocused();
      });

      it("should move focus to the next expandable row when the down arrow key is pressed but not loop to the first when last reached", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandable>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .getDOMNode() as HTMLTableRowElement).focus();
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(0)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(1)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(2)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(3)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(3)).toBeFocused();
      });

      it("should move focus to the previous expandable row when the up arrow key is pressed but not loop to the last when first reached", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandable>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandable>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableRow)
            .at(3)
            .getDOMNode() as HTMLTableRowElement).focus();
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(3)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(2)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(1)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(0)).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(0)).toBeFocused();
      });

      it("should move focus to the next row when the down arrow key is pressed whilst a checkbox input child is focused", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCheckbox />
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .find("input")
            .getDOMNode() as HTMLInputElement).focus();
        });

        expect(
          wrapper.find(StyledFlatTableRow).at(0).find("input")
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(1)).toBeFocused();
      });

      it("should move focus to the previous row when the up arrow key is pressed whilst a checkbox input child is focused", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow onClick={() => {}}>
                <FlatTableCheckbox />
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableRow)
            .at(1)
            .find("input")
            .getDOMNode() as HTMLInputElement).focus();
        });

        expect(
          wrapper.find(StyledFlatTableRow).at(1).find("input")
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(wrapper.update().find(StyledFlatTableRow).at(0)).toBeFocused();
      });
    });

    describe("when the first column is expandable", () => {
      it("should set the first cell's tabindex to 0", () => {
        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(0)
            .find(StyledFlatTableCell)
            .at(0)
            .prop("tabIndex")
        ).toBe(0);
        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(1)
            .find(StyledFlatTableCell)
            .at(0)
            .prop("tabIndex")
        ).toBe(-1);
      });

      it("should set the first row header's tabindex to 0", () => {
        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableRowHeader>one</FlatTableRowHeader>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableRowHeader>three</FlatTableRowHeader>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        );

        expect(
          wrapper.update().find(StyledFlatTableRowHeader).at(0).prop("tabIndex")
        ).toBe(0);
        expect(
          wrapper.update().find(StyledFlatTableRowHeader).at(1).prop("tabIndex")
        ).toBe(-1);
      });

      it("should move focus to the next focusable cell when the down arrow key is pressed but not loop to the first when last reached", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableRow)
            .at(0)
            .find(StyledFlatTableCell)
            .at(0)
            .getDOMNode() as HTMLTableCellElement).focus();
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(0)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(1)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(2)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(3)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowDown);
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(3)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();
      });

      it("should move focus to the previous focusable cell when the up arrow key is pressed but not loop to the last when first reached", () => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        const wrapper = mount(
          <FlatTable>
            <FlatTableBody>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>one</FlatTableCell>
                <FlatTableCell>two</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>three</FlatTableCell>
                <FlatTableCell>four</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>five</FlatTableCell>
                <FlatTableCell>six</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow expandableArea="firstColumn" expandable>
                <FlatTableCell>seven</FlatTableCell>
                <FlatTableCell>eight</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>,
          { attachTo: htmlElement }
        );

        act(() => {
          (wrapper
            .find(StyledFlatTableRow)
            .at(3)
            .find(StyledFlatTableCell)
            .at(0)
            .getDOMNode() as HTMLTableCellElement).focus();
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(3)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(2)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(1)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(0)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();

        act(() => {
          wrapper.find(StyledFlatTableWrapper).props().onKeyDown(arrowUp);
        });

        expect(
          wrapper
            .update()
            .find(StyledFlatTableRow)
            .at(0)
            .find(StyledFlatTableCell)
            .at(0)
        ).toBeFocused();
      });
    });
  });
});
