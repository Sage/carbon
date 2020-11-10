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
  StyledFlatTableWrapper,
  StyledFlatTableFooter,
} from "./flat-table.style";
import { baseTheme } from "../../style/themes";
import { SidebarContext } from "../drawer";

describe("FlatTable", () => {
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
