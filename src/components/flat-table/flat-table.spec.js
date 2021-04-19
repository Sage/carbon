import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import FlatTable from "./flat-table.component";
import FlatTableHead from "./flat-table-head/flat-table-head.component";
import FlatTableBody from "./flat-table-body/flat-table-body.component";
import FlatTableRow from "./flat-table-row/flat-table-row.component";
import FlatTableHeader from "./flat-table-header/flat-table-header.component";
import FlatTableCell from "./flat-table-cell/flat-table-cell.component";
import FlatTableRowHeader from "./flat-table-row-header/flat-table-row-header.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import StyledFlatTableHeader from "./flat-table-header/flat-table-header.style";
import StyledFlatTableHead from "./flat-table-head/flat-table-head.style";
import StyledFlatTableRowHeader from "./flat-table-row-header/flat-table-row-header.style";
import StyledFlatTableCheckbox from "./flat-table-checkbox/flat-table-checkbox.style";
import {
  StyledFlatTable,
  StyledFlatTableWrapper,
  StyledFlatTableFooter,
  StyledFlatTableBox,
} from "./flat-table.style";
import { baseTheme } from "../../style/themes";
import { SidebarContext } from "../drawer";
import { StyledFlatTableCell } from "./flat-table-cell/flat-table-cell.style";
import StyledFlatTableRow from "./flat-table-row/flat-table-row.style";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";
import cellSizes from "./cell-sizes.style";

describe("FlatTable", () => {
  it("ariaDescribedby prop should have been propagated to the table", () => {
    const customId = "foo";
    const wrapper = renderFlatTable({ ariaDescribedby: customId }, mount);

    expect(wrapper.find(StyledFlatTable).prop("aria-describedby")).toBe(
      customId
    );
  });

  describe("when rendered with proper table data", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderFlatTable();
    });

    it("should have expected structure and styles", () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe('when rendered with proper table data and "hasStickyHead" prop set to true', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderFlatTable({ hasStickyHead: true }, mount);
    });

    it("should have the overflow-y css property set to to auto", () => {
      expect(wrapper).toHaveStyleRule("overflow-y", "auto");
    });

    it('then all Headers should have proper styling if `colorTheme="dark"`', () => {
      wrapper = renderFlatTable({ colorTheme: "dark" }, mount);

      assertStyleMatch(
        {
          backgroundColor: baseTheme.flatTable.dark.headerBackground,
          borderRight: `1px solid ${baseTheme.flatTable.dark.border}`,
          color: baseTheme.colors.white,
        },

        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHeader}` }
      );
    });

    it('then all Headers should have proper styling if `colorTheme="light"`', () => {
      wrapper = renderFlatTable({ colorTheme: "light" }, mount);

      assertStyleMatch(
        {
          backgroundColor: baseTheme.flatTable.light.headerBackground,
          borderRight: `1px solid ${baseTheme.flatTable.light.border}`,
        },

        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHeader}` }
      );
    });

    it('then all Headers should have proper styling if `colorTheme="transparent-base"`', () => {
      wrapper = renderFlatTable({ colorTheme: "transparent-base" }, mount);

      assertStyleMatch(
        {
          backgroundColor: baseTheme.flatTable.transparentBase.headerBackground,
          borderRight: `1px solid ${baseTheme.flatTable.transparentBase.border}`,
        },

        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHeader}` }
      );
    });

    it('then all Headers should have proper styling if `colorTheme="transparent-white"`', () => {
      wrapper = renderFlatTable({ colorTheme: "transparent-white" }, mount);

      assertStyleMatch(
        {
          backgroundColor:
            baseTheme.flatTable.transparentWhite.headerBackground,
          borderRight: `1px solid ${baseTheme.flatTable.transparentWhite.border}`,
        },

        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHeader}` }
      );
    });

    it("then the Row Header in the table Head should have proper z-index", () => {
      assertStyleMatch(
        {
          zIndex: "1002",
        },
        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${StyledFlatTableHead} ${StyledFlatTableRowHeader}` }
      );
    });
  });

  describe("when FlatTable is a child of Sidebar", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <SidebarContext.Provider value={{ isInSidebar: true }}>
          <FlatTable>
            <tbody>
              <tr>
                <td>foo</td>
              </tr>
            </tbody>
          </FlatTable>
        </SidebarContext.Provider>
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
          backgroundColor: `${baseTheme.flatTable.drawerSidebar.headerBackground}`,
          borderRight: `2px solid ${baseTheme.flatTable.drawerSidebar.headerBackground}`,
          color: `${baseTheme.colors.black}`,
        },
        wrapper.find(StyledFlatTableWrapper),
        { modifier: `${modifierString}` }
      );
    });
  });

  describe("when isZebra prop is set to true", () => {
    it("then every second row should have expected background color", () => {
      const wrapper = renderFlatTable({ isZebra: true }, mount);

      assertStyleMatch(
        {
          backgroundColor: baseTheme.table.zebra,
        },
        wrapper.find(StyledFlatTable),
        {
          modifier: `${StyledFlatTableRow}:nth-child(2n) ${StyledFlatTableCell}`,
        }
      );
    });
  });

  describe("when the caption prop is set", () => {
    it("then that caption should be rendered in the table", () => {
      const captionText = "foo";
      const wrapper = renderFlatTable({ caption: captionText }, mount);

      expect(wrapper.find("caption").exists()).toBe(true);
      expect(wrapper.find("caption").text()).toBe(captionText);
    });
  });

  describe.each(OptionsHelper.tableSizes)(
    "when the size prop is set to %s",
    (size) => {
      const { fontSize, paddingSize } = cellSizes[size];
      const expectedStyles = {
        fontSize,
        paddingLeft: paddingSize,
        paddingRight: paddingSize,
      };

      it("then expected styles should be applied to table cells underlying div", () => {
        const wrapper = renderFlatTable({ size }, mount);

        assertStyleMatch(expectedStyles, wrapper.find(StyledFlatTable), {
          modifier: `${StyledFlatTableCell} > div`,
        });
      });

      it("then expected styles should be applied to table headers underlying div", () => {
        const wrapper = renderFlatTable({ size }, mount);

        assertStyleMatch(expectedStyles, wrapper.find(StyledFlatTable), {
          modifier: `${StyledFlatTableHeader} > div`,
        });
      });

      it("then expected styles should be applied to row headers underlying div", () => {
        const wrapper = renderFlatTable({ size }, mount);

        assertStyleMatch(expectedStyles, wrapper.find(StyledFlatTable), {
          modifier: `${StyledFlatTableRowHeader} > div`,
        });
      });

      it("then the Table Rows should have expected height", () => {
        const wrapper = renderFlatTable({ size }, mount);

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
    }
  );

  describe("StyledFlatTableBox", () => {
    let wrapper;
    const Footer = () => <div>foo</div>;
    it("applies correct styles when a div is larger than the FlatTable", () => {
      wrapper = renderFlatTableWithDiv({ footer: <Footer /> }, mount);
      assertStyleMatch(
        {
          boxShadow: "inset 0px 0px 0px 1px #CCD6DB",
          boxSizing: "border-box",
        },
        wrapper.find(StyledFlatTableBox)
      );
    });

    it("applies correct styles when hasMaxHeight is true", () => {
      wrapper = renderFlatTableWithDiv(
        { footer: <Footer />, hasMaxHeight: true },
        mount
      );
      assertStyleMatch(
        {
          maxHeight: "100%",
        },
        wrapper.find(StyledFlatTableBox)
      );
    });

    it("applies correct styles when hasMaxHeight is false", () => {
      wrapper = renderFlatTableWithDiv(
        { footer: <Footer />, hasMaxHeight: false },
        mount
      );
      assertStyleMatch(
        {
          maxHeight: undefined,
        },
        wrapper.find(StyledFlatTableBox)
      );
    });
  });

  describe("footer", () => {
    let wrapper;

    const Footer = () => <div>foo</div>;

    it("renders when content is passed in", () => {
      wrapper = renderFlatTable({ footer: <Footer /> }, mount);
      expect(wrapper.find(Footer).exists()).toEqual(true);
    });

    it("renders when content is passed in", () => {
      wrapper = renderFlatTable(
        { footer: <Footer />, hasStickyFooter: true },
        mount
      );
      assertStyleMatch(
        {
          position: "sticky",
          bottom: "-40px",
        },
        wrapper.find(StyledFlatTableFooter)
      );
    });
  });
});

function renderFlatTable(props = {}, renderer = TestRenderer.create) {
  return renderer(
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
  );
}

function renderFlatTableWithDiv(props = {}, renderer = TestRenderer.create) {
  return renderer(
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
