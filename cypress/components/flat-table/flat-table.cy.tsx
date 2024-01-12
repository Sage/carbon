/* eslint-disable jest/no-disabled-tests */
import React from "react";
import {
  FlatTableBodyDraggableProps,
  FlatTableCheckboxProps,
} from "../../../src/components/flat-table";
import * as stories from "../../../src/components/flat-table/flat-table-test.stories";
import { FlatTableProps } from "../../../src/components/flat-table/flat-table.component";
import { FlatTableRowProps } from "../../../src/components/flat-table/flat-table-row/flat-table-row.component";
import Icon from "../../../src/components/icon";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { getDataElementByValue, cyRoot } from "../../locators";
import {
  batchSelectionCounter,
  batchSelectionButtonsByPosition,
} from "../../locators/batch-selection/index";
import {
  actionPopover,
  actionPopoverButton,
} from "../../locators/action-popover/index";
import { relLink } from "../../locators/link/index";
import {
  flatTable,
  flatTableWrapper,
  flatTableHeader,
  flatTableHeaderCells,
  flatTableHeaderRowByPosition,
  flatTableBody,
  flatTableCell,
  flatTableCheckboxHeader,
  flatTableHeaderCellsIcon,
  flatTableExpandableIcon,
  flatTableBodyRows,
  flatTableRowHeader,
  flatTableBodyRowByPosition,
  flatTableSortable,
  flatTableSubrows,
  flatTableSubrowByPosition,
  flatTableDraggableItem,
  flatTableDraggableItemByPosition,
  flatTableCaption,
  flatTablePager,
  flatTablePageSizeSelect,
  flatTablePageSelectListPosition,
  pageSelectInput,
  flatTablePageSelectNext,
  flatTablePageSelectPrevious,
  flatTableCurrentPageInput,
  flatTableCheckboxCell,
  flatTableCheckboxAsProp,
} from "../../locators/flat-table";
import { CHARACTERS } from "../../support/component-helper/constants";
import {
  checkOutlineCss,
  assertCssValueIsApproximately,
} from "../../support/component-helper/common-steps";
import {
  keyCode,
  positionOfElement,
  getRotationAngle,
} from "../../support/helper";
import { FlatTableRowContextProps } from "../../../src/components/flat-table/flat-table-row/__internal__/flat-table-row-context";

const sizes = [
  ["compact", "8px", "13px", 24],
  ["small", "16px", "14px", 32],
  ["medium", "16px", "14px", 40],
  ["large", "16px", "16px", 48],
  ["extraLarge", "16px", "16px", 64],
];

const borderSizeSmall = "1px";
const borderSizeMedium = "2px";
const borderSizeLarge = "4px";

const heightWidth = [150, 250, 600, 1000];

const viewport = [
  ["large", 700, 345],
  ["small", 700, 240],
];

const colorThemes = [
  ["dark", "rgb(51, 91, 112)", "rgb(102, 132, 148)"],
  ["light", "rgb(204, 214, 219)", "rgb(179, 194, 201)"],
  ["transparent-base", "rgb(242, 245, 246)", "rgb(242, 245, 246)"],
  ["transparent-white", "rgb(255, 255, 255)", "rgb(255, 255, 255)"],
];

const gold = "rgb(255, 188, 25)";
const black = "rgba(0, 0, 0, 0.9)";
const lightGold = "rgb(255, 188, 26)";
const greyBlack = "rgba(0, 0, 0, 0.65)";
const darkGrey = "rgb(102, 132, 148)";
const mediumGrey = "rgb(204, 214, 219)";
const lightGrey = "rgb(217, 224, 228)";
const vlightGrey = "rgb(230, 235, 237)";
const green = "rgb(177, 211, 69)";
const blue = "rgb(0, 0, 255)";
const lightBlue = "rgb(51, 92, 220)";

const checkFocus = (elements: JQuery<HTMLElement>) => {
  // get Window reference from element
  const win = elements[0].ownerDocument.defaultView;
  // use getComputedStyle to read the pseudo selector
  const after = win?.getComputedStyle(elements[0], "after");
  // read the value of the `content` CSS property
  const contentValue = after?.getPropertyValue("border");
  cy.wrap(contentValue).should("equals", `2px solid ${gold}`);
};

const checkNewFocusStyling = (elements: JQuery<HTMLElement>) => {
  // get Window reference from element
  const win = elements[0].ownerDocument.defaultView;
  // use getComputedStyle to read the pseudo selector
  const after = win?.getComputedStyle(elements[0], "after");
  const boxShadowValue = after?.getPropertyValue("box-shadow");
  cy.wrap(boxShadowValue).should(
    "equals",
    `rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset`
  );
};

const assertCssRotationAngleIs = (
  element: JQuery<HTMLElement>,
  value: number
) => {
  const angle = getRotationAngle(element.toString());
  cy.wrap(angle).should("equal", value);
};

context("Tests for Flat Table component", () => {
  describe("check props for Flat Table component", () => {
    it("should render Flat Table with ariaDescribedBy", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);

      flatTable().should("have.attr", "aria-describedby", CHARACTERS.STANDARD);
    });

    it.each([CHARACTERS.SPECIALCHARACTERS, CHARACTERS.DIACRITICS])(
      "should render Flat Table with caption prop set as %s",
      (captionValue) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent caption={captionValue} />
        );

        flatTableCaption().should("have.text", captionValue);
      }
    );

    it("should render Flat Table with head and body nodes as children", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);

      flatTable().find("thead").should("exist");
      flatTableBody().should("exist");
    });

    it("should render Flat Table Head with row node as children", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);

      flatTable().find("thead").find("tr").should("exist");
    });

    it("should render Flat Table Header with icon nodes as children", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);

      for (let i = 0; i < 4; i++) {
        flatTableHeaderCellsIcon()
          .eq(i)
          .should("have.attr", "data-component", "icon");
      }
    });

    it("should render Flat Table with icon node as children", () => {
      CypressMountWithProviders(
        <stories.FlatTableComponent>
          <Icon type="business" color="white" />
        </stories.FlatTableComponent>
      );
      flatTable().find("span").should("have.attr", "data-component", "icon");
    });

    it("should render Flat Table Header with strings as children", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);

      flatTableHeaderCells().eq(0).should("have.text", "Name ");
      flatTableHeaderCells().eq(1).should("have.text", "Location ");
      flatTableHeaderCells().eq(2).should("have.text", "Relationship Status ");
      flatTableHeaderCells().eq(3).should("have.text", "Dependents ");
    });

    it("should render Flat Table Body with an array of row nodes as children", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);

      for (let i = 0; i < 6; i++) {
        flatTableBodyRows().eq(i).should("exist");
      }
    });

    it("should render Flat Table Row with cell nodes as children", () => {
      CypressMountWithProviders(<stories.FlatTableSpanComponent />);

      for (let i = 0; i < 4; i++) {
        flatTableBodyRowByPosition(0).find("td").eq(i).should("exist");
      }
    });

    it("should render Flat Table Row with header nodes as children", () => {
      CypressMountWithProviders(<stories.FlatTableSpanComponent />);

      for (let i = 0; i < 5; i++) {
        if (i !== 1) {
          flatTableHeader()
            .eq(0)
            .find("th")
            .eq(i)
            .should("have.attr", "data-element", "flat-table-header");
        }
      }
    });

    it("should render Flat Table Row with row header nodes as children", () => {
      CypressMountWithProviders(<stories.FlatTableSpanComponent />);

      flatTableHeader()
        .eq(0)
        .find("th")
        .eq(1)
        .should("have.attr", "data-element", "flat-table-row-header");
    });

    it("should render Flat Table Row Header with icon node as children", () => {
      CypressMountWithProviders(<stories.FlatTableSpanComponent />);

      flatTableRowHeader()
        .eq(0)
        .find("span")
        .should("have.attr", "data-component", "icon");
    });

    it("should render Flat Table Row Header with string as children", () => {
      CypressMountWithProviders(<stories.FlatTableSpanComponent />);

      flatTableRowHeader().eq(0).should("have.text", "Code - Sticky ");
    });

    it("should render Flat Table Cell with string as children", () => {
      CypressMountWithProviders(<stories.FlatTableTruncateBgComponent />);

      flatTableCell(0).should("have.text", "John Doe");
      flatTableCell(1).should("have.text", "London");
    });

    it("should render Flat Table Cell with div node as children", () => {
      CypressMountWithProviders(<stories.FlatTableTruncateBgComponent />);

      flatTableCell(2).find("input").should("exist");
    });

    it("should render Flat Table Checkbox with ariaLabelledBy", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      flatTableHeaderCells()
        .eq(0)
        .find("input")
        .should("have.attr", "aria-labelledby", CHARACTERS.STANDARD);
    });

    it("should render Flat Table with sticky header", () => {
      CypressMountWithProviders(
        <div style={{ height: "150px" }}>
          <stories.FlatTableComponent hasStickyHead />
        </div>
      );

      flatTable().should("exist");

      flatTable().find("thead").should("have.css", "position", "sticky");

      for (let i = 0; i < 5; i++) {
        if (i === 3 || i === 4) {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("be.visible");
        }
      }

      flatTableWrapper().scrollTo("bottom");
      flatTableHeaderCells().should("be.visible");

      for (let i = 0; i < 5; i++) {
        if (i === 0 || i === 1) {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("be.visible");
        }
      }
    });

    it("should render Flat Table with sticky header and multiple rows", () => {
      CypressMountWithProviders(
        <div style={{ height: "150px" }}>
          <stories.FlatTableWithMultipleStickyHeaderRows />
        </div>
      );

      flatTableHeaderRowByPosition(0)
        .find("th")
        .should("have.css", "top", "0px");
      flatTableHeaderRowByPosition(1)
        .find("th")
        .should("have.css", "top", "40px");
    });

    it("should render Flat Table with sticky footer", () => {
      CypressMountWithProviders(
        <stories.FlatTableFooterComponent hasStickyFooter />
      );

      flatTablePager().parent().should("have.css", "position", "sticky");

      for (let i = 0; i < 5; i++) {
        if (i === 4) {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("be.visible");
        }
      }

      flatTableWrapper().scrollTo("bottomRight");
      flatTablePager().parent().scrollIntoView();
      flatTableHeaderCells().should("not.be.visible");
      flatTablePager().parent().should("be.visible");

      for (let i = 0; i < 5; i++) {
        if (i === 0) {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("be.visible");
        }
      }
    });

    it.each([...colorThemes] as [
      FlatTableProps["colorTheme"],
      string,
      string
    ][])(
      "should render Flat Table in the %s theme",
      (colorTheme, bgColor, brColor) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent colorTheme={colorTheme} />
        );

        for (let i = 0; i < 4; i++) {
          flatTableHeaderCells()
            .eq(i)
            .should("have.css", "background-color", bgColor)
            .then(($el) => {
              checkOutlineCss($el, 1, "border-right", "solid", brColor);
            });
        }
      }
    );

    it("should render Flat Table with zebra stripes", () => {
      CypressMountWithProviders(<stories.FlatTableComponent isZebra />);

      for (let i = 0; i < 4; i++) {
        if (i === 0 || i === 2) {
          flatTableBodyRowByPosition(i)
            .find("td")
            .eq(0)
            .should("have.css", "background-color", "rgb(255, 255, 255)");
        } else {
          flatTableBodyRowByPosition(i)
            .find("td")
            .eq(0)
            .should("have.css", "background-color", "rgb(250, 251, 251)");
        }
      }
    });

    it.each([...sizes] as [FlatTableProps["size"], string, string, number][])(
      "should check Flat Table size is %s",
      (sizeName, padding, fontSize, rowHeight) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent size={sizeName} />
        );

        flatTableHeader().then(($el) => {
          assertCssValueIsApproximately($el, "height", rowHeight);
        });

        for (let i = 0; i < 4; i++) {
          flatTableHeaderCells()
            .eq(i)
            .find("div")
            .eq(0)
            .should("have.css", "padding-left", padding)
            .and("have.css", "padding-right", padding)
            .and("have.css", "font-size", fontSize);
        }
      }
    );

    it.each(heightWidth)(
      "should render Flat Table with %spx as a height parameter",
      (height) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent height={`${height}px`} />
        );

        flatTableWrapper().should("have.css", "height").as("wrapperHeight");
        cy.get("@wrapperHeight")
          .then(($el) => parseInt($el.toString()))
          .should("be.within", height - 1, height + 1);
      }
    );

    it.each([150, 249, 250, 251, 300])(
      "should render Flat Table with %spx as a height parameter and minHeight set to 250px",
      (height) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent
            height={`${height}px`}
            minHeight="250px"
          />
        );

        if (height < 250) {
          flatTableWrapper().should("have.css", "height", `${250}px`);
        } else {
          flatTableWrapper().should("have.css", "height").as("wrapperHeight");
          cy.get("@wrapperHeight")
            .then(($el) => parseInt($el.toString()))
            .should("be.within", height - 1, height + 1);
        }
      }
    );

    it("should render Flat Table with hasMaxHeight parameter", () => {
      CypressMountWithProviders(
        <stories.FlatTableComponent height="400px" hasMaxHeight />
      );

      flatTableWrapper().should("have.css", "max-height", "100%");
    });

    it.each(heightWidth)(
      "should render Flat Table with %spx as a width parameter",
      (width) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent width={`${width}px`} />
        );

        flatTableWrapper().should("have.css", "width").as("wrapperWidth");
        cy.get("@wrapperWidth")
          .then(($el) => parseInt($el.toString()))
          .should("be.within", width - 1, width + 1);
      }
    );

    it.each(["visible", "hidden", "clip", "scroll", "auto"])(
      "should render Flat Table with %s as a overflowX parameter and width set to 500px",
      (overflow) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent width="500px" overflowX={overflow} />
        );

        flatTable().parent().should("have.css", "overflow-x", overflow);
      }
    );

    it("should render Flat Table with rowSpan set to make header cells span 2 rows", () => {
      CypressMountWithProviders(
        <stories.FlatTableSpanComponent width="500px" />
      );

      for (let i = 0; i < 4; i++) {
        if (i !== 2) {
          flatTableHeaderRowByPosition(0)
            .find("th")
            .eq(i)
            .should("have.attr", "rowspan", 2);
        }
      }
    });

    it("should render Flat Table with colSpan set to make header cells span 2 columns", () => {
      CypressMountWithProviders(
        <stories.FlatTableSpanComponent width="500px" />
      );

      for (let i = 2; i < 5; i++) {
        if (i === 2 || i === 4) {
          flatTableHeaderRowByPosition(0)
            .find("th")
            .eq(i)
            .should("have.attr", "colspan", 2);
        }
      }
    });

    it("should render Flat Table with stickyHead and rowSpan set, stickyAlignment left by default", () => {
      cy.viewport(310, 380);

      CypressMountWithProviders(<stories.FlatTableSpanComponent />);

      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(0)
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1)
        .find("th")
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1).find("td").eq(4).should("not.be.visible");
      flatTableBodyRowByPosition(1).find("td").eq(4).scrollIntoView();
      flatTableBodyRowByPosition(1).find("td").eq(4).should("be.visible");
      flatTableBodyRowByPosition(1).find("th").should("be.visible");
    });

    // Skipped test as it fails in the build only. Ticket FE-5604 logged to investigate
    it.skip("should render Flat Table with multiple sticky row headers, stickyAlignment set to right", () => {
      cy.viewport(700, 700);

      CypressMountWithProviders(<stories.FlatTableMultipleStickyComponent />);

      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(0)
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1)
        .find("th")
        .eq(0)
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1)
        .find("th")
        .eq(1)
        .should("have.css", "position", "sticky");
      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(7)
        .should("have.css", "position", "sticky");

      for (let i = 1; i < 7; i++) {
        if (i < 5) {
          flatTableBodyRowByPosition(1).find("td").eq(i).should("be.visible");
        }
        if (i === 5 || i === 6) {
          flatTableBodyRowByPosition(1)
            .find("td")
            .eq(i)
            .should("not.be.visible");
        }
      }

      flatTableBodyRowByPosition(1).find("td").eq(6).scrollIntoView();

      for (let i = 1; i < 7; i++) {
        if (i > 2) {
          flatTableBodyRowByPosition(1).find("td").eq(i).should("be.visible");
        }
        if (i === 1 || i === 2) {
          flatTableBodyRowByPosition(1)
            .find("td")
            .eq(i)
            .should("not.be.visible");
        }
      }

      flatTableBodyRowByPosition(1).find("th").eq(0).should("be.visible");
    });

    it("should render Flat Table with colSpan set to make cells span 4 columns", () => {
      CypressMountWithProviders(
        <stories.FlatTableCellColSpanComponent width="500px" />
      );

      flatTableCell(0).should("have.attr", "colspan", 4);
    });

    it("should render Flat Table with rowSpan set to make cells span 3 rows", () => {
      CypressMountWithProviders(
        <stories.FlatTableCellRowSpanComponent width="500px" />
      );

      flatTableCell(0).should("have.attr", "rowspan", 3);
    });

    it.each([
      [1, 180],
      [2, 150],
      [3, 100],
    ])(
      "should render Flat Table column index %s with column width %s",
      (column, width) => {
        CypressMountWithProviders(<stories.FlatTableFooterComponent />);

        flatTableHeaderCells()
          .eq(column)
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", width);
          });
      }
    );

    it.each([
      [0, "left"],
      [1, "left"],
      [2, "center"],
      [3, "right"],
    ])(
      "should render Flat Table with column index %s with %s alignment",
      (column, alignment) => {
        CypressMountWithProviders(<stories.FlatTableCustomPaddingComponent />);

        flatTableHeaderCells()
          .eq(column)
          .should("have.css", "text-align", alignment);
      }
    );

    it("should render Flat Table with alternative background header color", () => {
      CypressMountWithProviders(<stories.FlatTableTruncateBgComponent />);

      flatTableHeader()
        .find("th")
        .eq(2)
        .should("have.css", "background-color", "rgb(25, 71, 94)");
    });

    it("should render Flat Table Header and Cells with custom vertical header and body borders", () => {
      CypressMountWithProviders(<stories.FlatTableVerticalBordersComponent />);

      flatTableHeader()
        .find("th")
        .eq(0)
        .should("have.css", "border-right-width", borderSizeSmall);
      flatTableHeader()
        .find("th")
        .eq(1)
        .should("have.css", "border-right-width", borderSizeMedium);
      flatTableHeader()
        .find("th")
        .eq(2)
        .should("have.css", "border-right-width", borderSizeLarge);

      for (let i = 0; i < 3; i++) {
        flatTableBodyRowByPosition(i)
          .find("td")
          .eq(0)
          .should("have.css", "border-right-width", borderSizeSmall)
          .and("have.css", "border-right-color", black);
        flatTableBodyRowByPosition(i)
          .find("td")
          .eq(1)
          .should("have.css", "border-right-width", borderSizeMedium)
          .and("have.css", "border-right-color", lightGold);
        flatTableBodyRowByPosition(i)
          .find("td")
          .eq(2)
          .should(
            "have.css",
            "border-right",
            `${borderSizeLarge} solid ${darkGrey}`
          );
      }
    });

    it("should render Flat Table Row Header with custom vertical header and body borders", () => {
      CypressMountWithProviders(<stories.FlatTableSpanComponent />);

      flatTableHeaderRowByPosition(0)
        .find("th")
        .eq(1)
        .should("have.css", "border-right-width", borderSizeSmall)
        .and("have.css", "border-right-color", lightBlue);

      for (let i = 0; i < 3; i++) {
        flatTableBodyRowByPosition(i)
          .find("th")
          .should("have.css", "border-right-width", borderSizeSmall)
          .and("have.css", "border-right-color", black);
      }
      for (let i = 3; i < 6; i++) {
        flatTableBodyRowByPosition(i)
          .find("th")
          .should("have.css", "border-right-width", borderSizeMedium)
          .and("have.css", "border-right-color", lightGold);
      }
      for (let i = 6; i < 9; i++) {
        flatTableBodyRowByPosition(i)
          .find("th")
          .should(
            "have.css",
            "border-right",
            `${borderSizeLarge} solid ${mediumGrey}`
          );
      }
    });

    it("should render Flat Table with custom horizontal borders", () => {
      CypressMountWithProviders(
        <stories.FlatTableHorizontalBordersComponent />
      );

      for (let i = 0; i < 4; i++) {
        flatTableBodyRowByPosition(0)
          .find("td")
          .eq(i)
          .should(
            "have.css",
            "border-bottom",
            `${borderSizeMedium} solid ${lightGold}`
          );
        flatTableBodyRowByPosition(1)
          .find("td")
          .eq(i)
          .should(
            "have.css",
            "border-bottom",
            `${borderSizeSmall} solid ${blue}`
          );
        flatTableBodyRowByPosition(2)
          .find("td")
          .eq(i)
          .should(
            "have.css",
            "border-bottom",
            `${borderSizeLarge} solid ${black}`
          );
        flatTableBodyRowByPosition(3)
          .find("td")
          .eq(i)
          .should(
            "have.css",
            "border-bottom",
            `${borderSizeSmall} solid ${mediumGrey}`
          );
      }
    });

    it("should render Flat Table with custom color row", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      flatTableBodyRowByPosition(0)
        .children()
        .should("have.css", "background-color", green);
      flatTableBodyRowByPosition(2)
        .children()
        .should("have.css", "background-color", green);
    });

    it("can select individual Flat Table rows with the mouse", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      flatTableCheckboxCell(1).find("input").click().should("be.checked");
      flatTableCheckboxCell(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );

      flatTableBodyRowByPosition(1)
        .children()
        .should("have.css", "background-color", lightGrey);

      batchSelectionCounter().should("have.text", "1 selected");
      for (let i = 0; i < 3; i++) {
        batchSelectionButtonsByPosition(i).should(
          "have.css",
          "color",
          greyBlack
        );
      }
    });

    // Skipped test as can't select a checkbox with spacebar - ticket FE-5601
    it.skip("can select individual Flat Table rows with the spacebar", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      flatTableCheckboxCell(1)
        .find("input")
        .focus()
        .trigger("keydown", keyCode("Space"))
        .should("be.checked");
      flatTableCheckboxCell(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );

      flatTableBodyRowByPosition(1)
        .children()
        .should("have.css", "background-color", lightGrey);

      batchSelectionCounter().should("have.text", "1 selected");
      for (let i = 0; i < 3; i++) {
        batchSelectionButtonsByPosition(i).should(
          "have.css",
          "color",
          greyBlack
        );
      }
    });

    it("can not select individual Flat Table rows with the Enter key", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      flatTableCheckboxCell(1)
        .find("input")
        .focus()
        .trigger("keydown", keyCode("EnterForce"))
        .should("not.be.checked");
    });

    it("can select all Flat Table rows with the mouse, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      flatTableCheckboxHeader().find("input").click().should("be.checked");
      flatTableCheckboxHeader()
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
      for (let i = 0; i < 4; i++) {
        flatTableCheckboxCell(i).find("input").should("be.checked");
      }

      for (let i = 1; i < 5; i++) {
        flatTableBodyRowByPosition(0)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(1)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
        flatTableBodyRowByPosition(2)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(3)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
      }
      batchSelectionCounter().should("have.text", "4 selected");
      for (let i = 0; i < 3; i++) {
        batchSelectionButtonsByPosition(i).should(
          "have.css",
          "color",
          greyBlack
        );
      }
    });

    it("can select all Flat Table rows with the mouse, focusRedesignOptOut false", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      flatTableCheckboxHeader().find("input").click().should("be.checked");
      flatTableCheckboxHeader()
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );
      for (let i = 0; i < 4; i++) {
        flatTableCheckboxCell(i).find("input").should("be.checked");
      }

      for (let i = 1; i < 5; i++) {
        flatTableBodyRowByPosition(0)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(1)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
        flatTableBodyRowByPosition(2)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(3)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
      }
      batchSelectionCounter().should("have.text", "4 selected");
      for (let i = 0; i < 3; i++) {
        batchSelectionButtonsByPosition(i).should(
          "have.css",
          "color",
          greyBlack
        );
      }
    });

    // Skipped test as can't select a checkbox with spacebar - ticket FE-5601
    it.skip("can select all Flat Table rows with the spacebar", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      flatTableCheckboxHeader()
        .find("input")
        .focus()
        .trigger("keydown", keyCode("Space"))
        .should("be.checked");
      flatTableCheckboxHeader()
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );

      for (let i = 0; i < 4; i++) {
        flatTableCheckboxCell(i).find("input").should("be.checked");
      }

      for (let i = 1; i < 5; i++) {
        flatTableBodyRowByPosition(0)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(1)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
        flatTableBodyRowByPosition(2)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", green);
        flatTableBodyRowByPosition(3)
          .find("td")
          .eq(i)
          .should("have.css", "background-color", lightGrey);
      }
      batchSelectionCounter().should("have.text", "4 selected");
      for (let i = 0; i < 3; i++) {
        batchSelectionButtonsByPosition(i).should(
          "have.css",
          "color",
          greyBlack
        );
      }
    });

    it("can not select all Flat Table rows with the Enter key", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      flatTableCheckboxHeader()
        .find("input")
        .focus()
        .trigger("keydown", keyCode("Enter"))
        .should("not.be.checked");
    });

    it("can highlight and select Flat Table rows, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableHighlightableComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      flatTableBodyRows().first().click();
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", vlightGrey);
    });

    it("can highlight and select Flat Table rows, focusRedesignOptOut false", () => {
      CypressMountWithProviders(<stories.FlatTableHighlightableComponent />);

      flatTableBodyRows().first().click();
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", vlightGrey);
      flatTableBodyRowByPosition(0)
        .find("td")
        .eq(0)
        .find("input")
        .click()
        .should("be.checked");
      flatTableBodyRowByPosition(0)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", lightGrey);
      flatTableBodyRowByPosition(1).click();
      flatTableBodyRowByPosition(1)
        .children()
        .should("have.css", "background-color", vlightGrey);
    });

    it("can highlight Flat Table rows with the spacebar", () => {
      CypressMountWithProviders(<stories.FlatTableHighlightableComponent />);

      flatTableBodyRows().first().trigger("keydown", keyCode("Space"));
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", vlightGrey);
    });

    it("can highlight Flat Table rows with the Enter key", () => {
      CypressMountWithProviders(<stories.FlatTableHighlightableComponent />);

      flatTableBodyRows().first().trigger("keydown", keyCode("Enter"));
      flatTableBodyRows()
        .first()
        .children()
        .should("have.css", "background-color", vlightGrey);
    });

    it("should render Flat Table Row Header with truncated string in header", () => {
      CypressMountWithProviders(<stories.FlatTableTruncateHeaderComponent />);

      const truncHead = "Location";
      const truncRow = "London";

      flatTableRowHeader()
        .eq(0)
        .children()
        .should("have.text", truncHead)
        .and("have.css", "text-overflow", "ellipsis");
      for (let i = 1; i < 4; i++) {
        flatTableRowHeader()
          .eq(i)
          .children()
          .should("have.text", truncRow)
          .and("have.css", "text-overflow", "ellipsis");
      }
    });

    it("should render Flat Table Cell with truncated string in cell", () => {
      CypressMountWithProviders(<stories.FlatTableTruncateBgComponent />);

      const truncCellText1 = "John Doe";
      const truncCellText2 = "London";

      flatTableCell(0)
        .children()
        .should("have.text", truncCellText1)
        .and("have.css", "text-overflow", "ellipsis");
      flatTableCell(1)
        .children()
        .should("have.text", truncCellText2)
        .and("have.css", "text-overflow", "ellipsis");
    });

    it("should render Flat Table Row Header with title", () => {
      CypressMountWithProviders(<stories.FlatTableTitleAlignComponent />);

      flatTableRowHeader()
        .eq(1)
        .children()
        .should("have.attr", "title", CHARACTERS.DIACRITICS);
    });

    it("should render Flat Table Cell with title", () => {
      CypressMountWithProviders(<stories.FlatTableTitleAlignComponent />);

      flatTableCell(0)
        .children()
        .should("have.attr", "title", CHARACTERS.DIACRITICS);
    });

    it("should render Flat Table Row Header with set width", () => {
      CypressMountWithProviders(<stories.FlatTableTitleAlignComponent />);

      flatTableRowHeader().eq(1).children().should("have.css", "width", "50px");
    });

    it("should render Flat Table Cell with set width", () => {
      CypressMountWithProviders(<stories.FlatTableTitleAlignComponent />);

      flatTableCell(0).children().should("have.css", "width", "60px");
    });

    it("should render Flat Table Row Header with set align", () => {
      CypressMountWithProviders(<stories.FlatTableTitleAlignComponent />);

      flatTableRowHeader()
        .eq(1)
        .children()
        .should("have.css", "text-align", "left");
      flatTableRowHeader()
        .eq(2)
        .children()
        .should("have.css", "text-align", "center");
      flatTableRowHeader()
        .eq(3)
        .children()
        .should("have.css", "text-align", "right");
      flatTableRowHeader()
        .eq(4)
        .children()
        .should("have.css", "text-align", "left");
    });

    it("should render Flat Table Cell with set align", () => {
      CypressMountWithProviders(<stories.FlatTableTitleAlignComponent />);

      flatTableBodyRowByPosition(0)
        .find("td")
        .eq(0)
        .should("have.css", "text-align", "left");
      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(0)
        .should("have.css", "text-align", "center");
      flatTableBodyRowByPosition(2)
        .find("td")
        .eq(0)
        .should("have.css", "text-align", "right");
      flatTableBodyRowByPosition(3)
        .find("td")
        .eq(0)
        .should("have.css", "text-align", "left");
    });

    it.each([
      [0, "8px"],
      [1, "16px"],
      [2, "24px"],
      [3, "32px"],
    ])(
      "should render Flat Table with row %s with %s custom padding",
      (row, customPad) => {
        CypressMountWithProviders(<stories.FlatTableCustomPaddingComponent />);

        flatTableBodyRowByPosition(row)
          .find("td")
          .eq(0)
          .children()
          .should("have.css", "padding-left", customPad)
          .and("have.css", "padding-right", customPad);
        flatTableBodyRowByPosition(row)
          .find("td")
          .eq(1)
          .children()
          .should("have.css", "padding-left", customPad)
          .and("have.css", "padding-right", "16px");
        flatTableBodyRowByPosition(row)
          .find("td")
          .eq(2)
          .children()
          .should("have.css", "padding", customPad);
        flatTableBodyRowByPosition(row)
          .find("td")
          .eq(3)
          .children()
          .should("have.css", "padding-left", customPad)
          .and("have.css", "padding-right", "16px");
      }
    );

    it.each([
      ["first", "desc", 1],
      ["first", "asc", 2],
      ["second", "desc", 1],
      ["second", "asc", 2],
    ] as ["first" | "second", string, number][])(
      "should sort Flat Table %s column in %s order with mouse click",
      (colPosition, sortOrder, times) => {
        CypressMountWithProviders(<stories.FlatTableSortingComponent />);

        for (let i = 0; i < times; i++) {
          flatTableSortable().eq(positionOfElement(colPosition)).click();
        }

        const valueOne = "Tyler Webb";
        const valueTwo = "Monty Parker";
        const valueThree = "Jason Atkinson";
        const valueFour = "Blake Sutton";
        const totalOne = "280";
        const totalTwo = "1349";
        const totalThree = "849";
        const totalFour = "3840";

        if (colPosition === "first" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueOne)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueFour)
            .and("be.visible");
        } else if (colPosition === "first" && sortOrder === "asc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueFour)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueOne)
            .and("be.visible");
        } else if (colPosition === "second" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalFour)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalOne)
            .and("be.visible");
        } else {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalOne)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalFour)
            .and("be.visible");
        }
      }
    );

    it.each([
      ["first", "desc", 1],
      ["first", "asc", 2],
      ["second", "desc", 1],
      ["second", "asc", 2],
    ] as ["first" | "second", string, number][])(
      "should sort Flat Table %s column in %s order with Spacebar",
      (colPosition, sortOrder, times) => {
        CypressMountWithProviders(<stories.FlatTableSortingComponent />);

        for (let i = 0; i < times; i++) {
          flatTableSortable()
            .eq(positionOfElement(colPosition))
            .trigger("keydown", keyCode("Space"));
        }

        const valueOne = "Tyler Webb";
        const valueTwo = "Monty Parker";
        const valueThree = "Jason Atkinson";
        const valueFour = "Blake Sutton";
        const totalOne = "280";
        const totalTwo = "1349";
        const totalThree = "849";
        const totalFour = "3840";

        if (colPosition === "first" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueOne)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueFour)
            .and("be.visible");
        } else if (colPosition === "first" && sortOrder === "asc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueFour)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueOne)
            .and("be.visible");
        } else if (colPosition === "second" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalFour)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalOne)
            .and("be.visible");
        } else {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalOne)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalFour)
            .and("be.visible");
        }
      }
    );

    it.each([
      ["first", "desc", 1],
      ["first", "asc", 2],
      ["second", "desc", 1],
      ["second", "asc", 2],
    ] as ["first" | "second", string, number][])(
      "should sort Flat Table %s column in %s order with Enter key",
      (colPosition, sortOrder, times) => {
        CypressMountWithProviders(<stories.FlatTableSortingComponent />);

        for (let i = 0; i < times; i++) {
          flatTableSortable()
            .eq(positionOfElement(colPosition))
            .trigger("keydown", keyCode("Enter"));
        }

        const valueOne = "Tyler Webb";
        const valueTwo = "Monty Parker";
        const valueThree = "Jason Atkinson";
        const valueFour = "Blake Sutton";
        const totalOne = "280";
        const totalTwo = "1349";
        const totalThree = "849";
        const totalFour = "3840";

        if (colPosition === "first" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueOne)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueFour)
            .and("be.visible");
        } else if (colPosition === "first" && sortOrder === "asc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("first"))
            .should("have.text", valueFour)
            .and("be.visible");
          flatTableCell(positionOfElement("third"))
            .should("have.text", valueThree)
            .and("be.visible");
          flatTableCell(positionOfElement("fifth"))
            .should("have.text", valueTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("seventh"))
            .should("have.text", valueOne)
            .and("be.visible");
        } else if (colPosition === "second" && sortOrder === "desc") {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_down")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalFour)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalOne)
            .and("be.visible");
        } else {
          flatTableHeaderCellsIcon()
            .should("have.attr", "data-element", "sort_up")
            .and("be.visible");
          flatTableCell(positionOfElement("second"))
            .should("have.text", totalOne)
            .and("be.visible");
          flatTableCell(positionOfElement("fourth"))
            .should("have.text", totalThree)
            .and("be.visible");
          flatTableCell(positionOfElement("sixth"))
            .should("have.text", totalTwo)
            .and("be.visible");
          flatTableCell(positionOfElement("eighth"))
            .should("have.text", totalFour)
            .and("be.visible");
        }
      }
    );

    it("should render Flat Table with expandable rows expanded by mouse, subrows not accessible, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableNoAccSubRowComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0).click();
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .tab()
        .trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
    });

    it("should render Flat Table with expandable rows expanded by mouse, subrows not accessible, focusRedesignOptOut false", () => {
      CypressMountWithProviders(<stories.FlatTableNoAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0).click();
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .tab()
        .trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).then(checkNewFocusStyling);
    });

    it("should render Flat Table with expandable rows expanded by Spacebar, subrows not accessible, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableNoAccSubRowComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .tab()
        .trigger("keydown", keyCode("downarrow"))
        .wait(250);
      flatTableBodyRowByPosition(3)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
    });

    it("should render Flat Table with expandable rows expanded by Spacebar, subrows not accessible, focusRedesignOptOut false", () => {
      CypressMountWithProviders(<stories.FlatTableNoAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .tab()
        .trigger("keydown", keyCode("downarrow"))
        .wait(250);
      flatTableBodyRowByPosition(3).then(checkNewFocusStyling);
    });

    it("should render Flat Table with expandable rows expanded by Enter key, subrows not accessible, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableNoAccSubRowComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .tab()
        .trigger("keydown", keyCode("downarrow"))
        .wait(250);
      flatTableBodyRowByPosition(3)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
    });

    it("should render Flat Table with expandable rows expanded by Enter key, subrows not accessible, focusRedesignOptOut false", () => {
      CypressMountWithProviders(<stories.FlatTableNoAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .tab()
        .trigger("keydown", keyCode("downarrow"))
        .wait(250);
      flatTableBodyRowByPosition(3).then(checkNewFocusStyling);
    });

    it("should allow a Link to be clicked in a Flat Table with expandable row", () => {
      CypressMountWithProviders(<stories.FlatTableNoAccSubRowComponent />);

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      relLink().click();
    });

    it("should render Flat Table with expandable rows expanded by mouse, can focus subrows with down arrow keypress, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableAccSubRowComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");
      flatTableBodyRowByPosition(0).click();
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2)
        .find("td")
        .eq(3)
        .should("have.css", "border-right", `2px solid ${gold}`);
    });

    it("should render Flat Table with expandable rows expanded by mouse, can focus subrows with down arrow keypress, focusRedesignOptOut false", () => {
      CypressMountWithProviders(<stories.FlatTableAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableBodyRowByPosition(0).click();
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1).then(checkNewFocusStyling);
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2).then(checkNewFocusStyling);
    });

    it("should render Flat Table with expandable rows, can be closed with Spacebar", () => {
      CypressMountWithProviders(<stories.FlatTableNoAccSubRowComponent />);

      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableSubrows().should("not.exist");
    });

    it("should render Flat Table with expandable rows, can be closed with Enter key", () => {
      CypressMountWithProviders(<stories.FlatTableNoAccSubRowComponent />);

      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
      flatTableBodyRowByPosition(0)
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableSubrows().should("not.exist");
    });

    it("should render Flat Table expandable by any column in the row", () => {
      CypressMountWithProviders(<stories.FlatTableNoAccSubRowComponent />);

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });

      for (let i = 0; i < 4; i++) {
        flatTableSubrows().should("not.exist");
        flatTableCell(i).click();
        flatTableSubrows().should("exist");
        flatTableCell(i).click();
      }
    });

    it("should render Flat Table expandable by first column only by mouse", () => {
      CypressMountWithProviders(
        <stories.FlatTableFirstColExpandableComponent />
      );

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");

      for (let i = 1; i < 4; i++) {
        flatTableCell(i).click();
        flatTableSubrows().should("not.exist");
      }

      flatTableCell(0).click();
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
    });

    it("should render Flat Table expandable by first column only by Spacebar", () => {
      CypressMountWithProviders(
        <stories.FlatTableFirstColExpandableComponent />
      );

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");
      flatTableCell(0).focus().trigger("keydown", keyCode("Space"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
    });

    it("should render Flat Table expandable by first column only by Enter key", () => {
      CypressMountWithProviders(
        <stories.FlatTableFirstColExpandableComponent />
      );

      flatTableExpandableIcon(0)
        .should("have.css", "transform")
        .then(($el) => {
          assertCssRotationAngleIs($el, -90);
        });
      flatTableSubrows().should("not.exist");
      flatTableCell(0).focus().trigger("keydown", keyCode("Enter"));
      flatTableSubrowByPosition(0).should("exist");
      flatTableSubrowByPosition(1).should("exist");
    });

    it("should render Flat Table with all expandable rows expanded", () => {
      CypressMountWithProviders(<stories.FlatTableAlreadyExpandedComponent />);

      flatTableExpandableIcon(0).should("have.css", "transform", "none");
      flatTableExpandableIcon(12).should("have.css", "transform", "none");
      flatTableExpandableIcon(24).should("have.css", "transform", "none");
      flatTableExpandableIcon(36).should("have.css", "transform", "none");
      flatTableSubrows().should("exist");
    });

    it("can expand all rows in Flat Table with controlled button activated by mouse", () => {
      CypressMountWithProviders(<stories.FlatTableExpandAllComponent />);

      const buttonCollapse = "Collapse All";
      const buttonExpand = "Expand All";

      getDataElementByValue("main-text").contains(buttonCollapse).click();
      flatTableSubrows().should("not.exist");
      getDataElementByValue("main-text").contains(buttonExpand).click();
      flatTableSubrows().should("exist");
    });

    it("should render Flat Table with parent expandable and child subrows selectable, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      flatTableBodyRowByPosition(0).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(0)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
      flatTableBodyRowByPosition(1).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
    });

    it("should render Flat Table with parent expandable and child subrows selectable, focusRedesignOptOut false", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />
      );

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      flatTableBodyRowByPosition(0).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(0)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );
      flatTableBodyRowByPosition(1).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );
    });

    it("should render Flat Table with parent expandable row only selectable, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableParentSubrowSelectableComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      flatTableBodyRowByPosition(0).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(0)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
      flatTableBodyRowByPosition(1).find("input").should("not.exist");
    });

    it("should render Flat Table with parent expandable row only selectable, focusRedesignOptOut false", () => {
      CypressMountWithProviders(
        <stories.FlatTableParentSubrowSelectableComponent />
      );

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      flatTableBodyRowByPosition(0).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(0)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );
      flatTableBodyRowByPosition(1).find("input").should("not.exist");
    });

    it("should render Flat Table with child subrow only selectable, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableChildSubrowSelectableComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      flatTableBodyRowByPosition(0).find("input").should("not.exist");
      flatTableBodyRowByPosition(1).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should("have.css", "box-shadow", `${gold} 0px 0px 0px 3px`);
    });

    it("should render Flat Table with child subrow only selectable, focusRedesignOptOut false", () => {
      CypressMountWithProviders(
        <stories.FlatTableChildSubrowSelectableComponent />
      );

      flatTableBodyRowByPosition(0).click();
      flatTableSubrows().should("exist");
      flatTableBodyRowByPosition(0).find("input").should("not.exist");
      flatTableBodyRowByPosition(1).find("input").click().should("be.checked");
      flatTableBodyRowByPosition(1)
        .find("input")
        .parent()
        .parent()
        .find("div:nth-child(2)")
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        );
    });

    it("can focus the first row by tabbing but no further rows are focused on tab press, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      cy.get("body").tab();

      cy.focused().tab();
      flatTableBodyRowByPosition(0).then(checkFocus);
      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).should("not.be.focused");
      flatTableBodyRowByPosition(3).should("not.be.focused");
    });

    it("can focus the first row by tabbing but no further rows are focused on tab press, focusRedesignOptOut false", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);

      cy.get("body").tab();

      cy.focused().tab();
      flatTableBodyRowByPosition(0).then(checkNewFocusStyling);
      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).should("not.be.focused");
      flatTableBodyRowByPosition(3).should("not.be.focused");
    });

    it("sets the last selected row as the tab stop and removes it from any other ones, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTablePartiallySelectedOrHighlightedRows selected />,
        undefined,
        undefined,
        { focusRedesignOptOut: true }
      );

      cy.get("body").tab();

      cy.focused().tab();

      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).then(checkFocus);
    });

    it("sets the last selected row as the tab stop and removes it from any other ones, focusRedesignOptOut false", () => {
      CypressMountWithProviders(
        <stories.FlatTablePartiallySelectedOrHighlightedRows selected />
      );

      cy.get("body").tab();

      cy.focused().tab();

      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).then(checkNewFocusStyling);
    });

    it("sets the last highlighted row as the tab stop and removes it from any other ones, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTablePartiallySelectedOrHighlightedRows highlighted />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      cy.get("body").tab();

      cy.focused().tab();

      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).then(checkFocus);
    });

    it("sets the last highlighted row as the tab stop and removes it from any other ones, focusRedesignOptOut false", () => {
      CypressMountWithProviders(
        <stories.FlatTablePartiallySelectedOrHighlightedRows highlighted />
      );

      cy.get("body").tab();

      cy.focused().tab();

      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).then(checkNewFocusStyling);
    });

    it("can use tab and down arrow key to navigate the clickable rows and tabbable elements, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      cy.get("body").tab();

      // tab through batch selection
      for (let i = 0; i < 5; i++) {
        cy.focused().tab();
      }

      flatTableBodyRowByPosition(0).then(checkFocus);

      cy.focused().tab();
      flatTableBodyRowByPosition(0).find("input").eq(0).should("be.focused");
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).then(checkFocus);
    });

    it("can use tab and down arrow key to navigate the clickable rows and tabbable elements, focusRedesignOptOut false", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />
      );

      cy.get("body").tab();

      // tab through batch selection
      for (let i = 0; i < 5; i++) {
        cy.focused().tab();
      }

      flatTableBodyRowByPosition(0).then(checkNewFocusStyling);

      cy.focused().tab();
      flatTableBodyRowByPosition(0).find("input").eq(0).should("be.focused");
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1).then(checkNewFocusStyling);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2).then(checkNewFocusStyling);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).then(checkNewFocusStyling);
      cy.focused().trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).then(checkNewFocusStyling);
    });

    it("can use up arrow to navigate the clickable rows and tabbable elements, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      cyRoot();
      cy.get("body").tab();

      flatTableBodyRowByPosition(3).find("input").eq(0).focus();
      flatTableBodyRowByPosition(3).find("input").eq(0).should("be.focused");
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(2).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(1).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(0).then(checkFocus);
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(0).then(checkFocus);
    });

    it("can use up arrow to navigate the clickable rows and tabbable elements, focusRedesignOptOut false", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />
      );

      cyRoot();
      cy.get("body").tab();

      flatTableBodyRowByPosition(3).find("input").eq(0).focus();
      flatTableBodyRowByPosition(3).find("input").eq(0).should("be.focused");
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(2).then(checkNewFocusStyling);
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(1).then(checkNewFocusStyling);
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(0).then(checkNewFocusStyling);
      cy.focused().trigger("keydown", keyCode("uparrow"));
      flatTableBodyRowByPosition(0).then(checkNewFocusStyling);
    });

    it.each([["leftarrow"], ["rightarrow"]] as ["leftarrow" | "rightarrow"][])(
      "can not navigate through Flat Table rows using %s keys, focusRedesignOptOut true",
      (arrow) => {
        CypressMountWithProviders(
          <stories.FlatTableAllSubrowSelectableComponent />,
          undefined,
          undefined,
          {
            focusRedesignOptOut: true,
          }
        );

        cy.get("body").tab();

        // tab through batch selection
        for (let i = 0; i < 5; i++) {
          cy.focused().tab();
        }

        flatTableBodyRowByPosition(0).then(checkFocus);
        flatTableBodyRowByPosition(0).trigger("keydown", keyCode(arrow));
        flatTableBodyRowByPosition(0).then(checkFocus);
      }
    );

    it.each([["leftarrow"], ["rightarrow"]] as ["leftarrow" | "rightarrow"][])(
      "can not navigate through Flat Table rows using %s keys, focusRedesignOptOut false",
      (arrow) => {
        CypressMountWithProviders(
          <stories.FlatTableAllSubrowSelectableComponent />
        );

        cy.get("body").tab();

        // tab through batch selection
        for (let i = 0; i < 5; i++) {
          cy.focused().tab();
        }

        flatTableBodyRowByPosition(0).then(checkNewFocusStyling);
        flatTableBodyRowByPosition(0).trigger("keydown", keyCode(arrow));
        flatTableBodyRowByPosition(0).then(checkNewFocusStyling);
      }
    );

    // TODO: Skipping due to flakey behaviour. Investigate as part of FE-6231
    it.skip("should navigate the first column of cells with down arrow key press when expandableArea is set to 'firstColumn'", () => {
      CypressMountWithProviders(
        <stories.FlatTableFirstColExpandableComponent />
      );

      cy.get("body").tab();
      cy.focused().tab();
      flatTableCell(0).should("be.focused");
      flatTableCell(0).trigger("keydown", keyCode("downarrow"));
      flatTableCell(4).should("be.focused");
      flatTableCell(4).trigger("keydown", keyCode("downarrow"));
      flatTableCell(8).should("be.focused");
      flatTableCell(8).trigger("keydown", keyCode("downarrow"));
      flatTableCell(12).should("be.focused");
      flatTableCell(12).trigger("keydown", keyCode("downarrow"));
      flatTableCell(12).should("be.focused");
    });

    it("should navigate the first column of cells with up arrow key press when expandableArea is set to 'firstColumn'", () => {
      CypressMountWithProviders(
        <stories.FlatTableFirstColExpandableComponent />
      );

      flatTableCell(12).focus();
      flatTableCell(12).should("be.focused");
      flatTableCell(12).trigger("keydown", keyCode("uparrow"));
      flatTableCell(8).should("be.focused");
      flatTableCell(8).trigger("keydown", keyCode("uparrow"));
      flatTableCell(4).should("be.focused");
      flatTableCell(4).trigger("keydown", keyCode("uparrow"));
      flatTableCell(0).should("be.focused");
      flatTableCell(0).trigger("keydown", keyCode("uparrow"));
      flatTableCell(0).should("be.focused");
    });

    it("should navigate any focusable rows, including expanded sub rows, with down arrow key", () => {
      CypressMountWithProviders(<stories.FlatTableAccSubRowComponent />);

      cy.get("body").tab();
      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("be.focused");
      flatTableBodyRowByPosition(0).click();
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1).should("be.focused");
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2).should("be.focused");
      flatTableBodyRowByPosition(2).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).should("be.focused");
      flatTableBodyRowByPosition(3).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(4).should("be.focused");
      flatTableBodyRowByPosition(4).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(5).should("be.focused");
    });

    it("should navigate any focusable rows, including expanded sub rows, with up arrow key", () => {
      CypressMountWithProviders(<stories.FlatTableAccSubRowComponent />);

      cy.get("body").tab();
      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("be.focused");
      flatTableBodyRowByPosition(0).click();
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(1).should("be.focused");
      flatTableBodyRowByPosition(1).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(2).should("be.focused");
      flatTableBodyRowByPosition(2).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(3).should("be.focused");
      flatTableBodyRowByPosition(3).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(4).should("be.focused");
      flatTableBodyRowByPosition(4).trigger("keydown", keyCode("downarrow"));
      flatTableBodyRowByPosition(5).should("be.focused");
    });

    it("should set tabIndex 0 on the first row when after the loading state has finished", () => {
      CypressMountWithProviders(<stories.KeyboardNavigationWithPagination />);
      cy.wait(300);

      cy.get("body").tab();

      cy.focused().tab();
      flatTableBodyRowByPosition(0).then(checkNewFocusStyling);
      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(1).should("not.be.focused");
      flatTableBodyRowByPosition(2).should("not.be.focused");
      flatTableBodyRowByPosition(3).should("not.be.focused");
      flatTablePageSelectNext().click();
      cy.wait(300);
      cy.get("body").tab();

      cy.focused().tab();
      flatTableBodyRowByPosition(0).then(checkNewFocusStyling);
    });

    it("should set the tabIndex on the highlighted row when the loading state has finished", () => {
      CypressMountWithProviders(
        <stories.KeyboardNavigationWithPagination highlighted />
      );
      cy.wait(300);

      cy.get("body").tab();

      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(2).then(checkNewFocusStyling);
      cy.focused().tab();
      flatTableBodyRowByPosition(3).should("not.be.focused");
      flatTablePageSelectNext().click();
      cy.wait(300);
      cy.get("body").tab();

      cy.focused().tab();
      flatTableBodyRowByPosition(0).then(checkNewFocusStyling);
    });

    it("should set the tabIndex on the highlighted row when the loading state has finished and remove it when row is no longer highlighted", () => {
      CypressMountWithProviders(
        <stories.HighlightedRowWithLoadingState expandableArea="wholeRow" />
      );
      cy.wait(300);

      cy.get("body").tab();

      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("not.be.focused");
      flatTableBodyRowByPosition(2).should("be.focused");
      cy.focused().tab();
      flatTableBodyRowByPosition(3).should("not.be.focused");
      flatTableBodyRowByPosition(2).click();
      cy.get("body").tab();

      cy.focused().tab();
      flatTableBodyRowByPosition(0).should("be.focused");
    });

    it("should set the tabIndex on the first cell in a highlighted row when the loading state has finished and remove it when row is no longer highlighted", () => {
      CypressMountWithProviders(
        <stories.HighlightedRowWithLoadingState expandableArea="firstColumn" />
      );
      cy.wait(300);

      cy.get("body").tab();

      cy.focused().tab();
      flatTableCell(0).should("not.be.focused");
      flatTableCell(8).should("be.focused");
      cy.focused().tab();
      flatTableCell(12).should("not.be.focused");
      flatTableCell(8).click();
      cy.get("body").tab();

      cy.focused().tab();
      flatTableCell(0).should("be.focused");
    });

    it("should render Flat Table with action popover in a cell opened by mouse", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />
      );

      actionPopoverButton().eq(0).click();
      actionPopover().should("exist");
    });

    it("should render Flat Table with action popover in a cell opened by Spaceber", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />
      );

      actionPopoverButton().eq(0).focus().trigger("keydown", keyCode("Space"));
      actionPopover().should("exist");
    });

    it("should render Flat Table with action popover in a cell opened by Enter key", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />
      );

      actionPopoverButton().eq(0).focus().trigger("keydown", keyCode("Enter"));
      actionPopover().should("exist");
    });

    it.each([
      ["UK", 1],
      ["UK", 2],
      ["UK", 3],
      ["Germany", 2],
      ["Germany", 3],
      ["Germany", 0],
      ["China", 3],
      ["China", 0],
      ["China", 1],
      ["US", 0],
      ["US", 1],
      ["US", 2],
    ])(
      "should drag FlatTable draggable row %s and re-order to position %s",
      (record, destinationId) => {
        CypressMountWithProviders(<stories.FlatTableDraggableComponent />);

        flatTableDraggableItem(record).trigger("dragstart");
        flatTableDraggableItemByPosition(destinationId).trigger("drop");
        flatTableDraggableItemByPosition(destinationId) // required else it is detached from the DOM
          .trigger("dragend");
        flatTableDraggableItemByPosition(destinationId).should(
          "contain",
          record
        );
      }
    );

    it.each([...viewport] as [string, number, number][])(
      "should render Flat Table with pager and sticky header in %s viewport",
      (size, width, height) => {
        cy.viewport(width, height);

        CypressMountWithProviders(
          <stories.FlatTablePagerStickyHeaderComponent />
        );

        flatTablePageSizeSelect().click();

        if (size === "large") {
          flatTablePageSelectListPosition()
            .should("have.attr", "data-floating-placement", "bottom")
            .and("be.visible");
        } else {
          flatTablePageSelectListPosition()
            .should("have.attr", "data-floating-placement", "top")
            .and("be.visible");
        }
      }
    );

    it.each([
      [1, 1],
      [5, 2],
    ])(
      "should show %s items in Flat Table when selected with the mouse",
      (numberOfItems, option) => {
        CypressMountWithProviders(
          <stories.FlatTablePagerStickyHeaderComponent />
        );

        flatTableBodyRows().should("have.length", 5).and("be.visible");
        pageSelectInput().click();
        flatTablePageSelectListPosition()
          .children()
          .find(`li:nth-child(${option})`)
          .click();
        flatTableBodyRows()
          .should("have.length", numberOfItems)
          .and("be.visible");
        pageSelectInput().should("have.value", numberOfItems);
      }
    );

    it.each([
      [1, 1],
      [5, 2],
    ])(
      "should open Show Items selector in Flat Table with the Spacebar and select %s items per page",
      (numberOfItems) => {
        CypressMountWithProviders(
          <stories.FlatTablePagerStickyHeaderComponent />
        );

        flatTableBodyRows().should("have.length", 5).and("be.visible");
        pageSelectInput().trigger("keydown", keyCode("Space"));
        flatTablePageSelectListPosition()
          .children()
          .contains(numberOfItems)
          .click();
        flatTableBodyRows()
          .should("have.length", numberOfItems)
          .and("be.visible");
        pageSelectInput().should("have.value", numberOfItems);
      }
    );

    it.each([
      [1, 1],
      [5, 2],
    ])(
      "should open Show Items selector in Flat Table with the Enter key and select %s items per page",
      (numberOfItems) => {
        CypressMountWithProviders(
          <stories.FlatTablePagerStickyHeaderComponent />
        );

        flatTableBodyRows().should("have.length", 5).and("be.visible");
        pageSelectInput().trigger("click");
        flatTablePageSelectListPosition()
          .children()
          .contains(numberOfItems)
          .click({ force: true });
        flatTableBodyRows()
          .should("have.length", numberOfItems)
          .and("be.visible");
        pageSelectInput().should("have.value", numberOfItems);
      }
    );

    it("should navigate to next page in Flat Table with by clicking Next link with the mouse", () => {
      CypressMountWithProviders(
        <stories.FlatTablePagerStickyHeaderComponent />
      );

      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }

      flatTablePageSelectNext().click();
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableBodyRowByPosition(0).should("be.visible");
    });

    it("should navigate to next page in Flat Table with by selecting Next link with the Spacebar", () => {
      CypressMountWithProviders(
        <stories.FlatTablePagerStickyHeaderComponent />
      );

      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }

      flatTablePageSelectNext()
        .find("button")
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableBodyRowByPosition(0).should("be.visible");
    });

    it("should navigate to next page in Flat Table with by selecting Next link with the Enter key", () => {
      CypressMountWithProviders(
        <stories.FlatTablePagerStickyHeaderComponent />
      );

      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }

      flatTablePageSelectNext()
        .find("button")
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableBodyRowByPosition(0).should("be.visible");
    });

    it("should navigate to previous page in Flat Table by clicking Previous link with the mouse", () => {
      CypressMountWithProviders(
        <stories.FlatTablePagerStickyHeaderComponent />
      );

      flatTablePageSelectNext().click();
      flatTableBodyRowByPosition(0).should("be.visible");
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTablePageSelectPrevious().click();
      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }
    });

    it("should navigate to previous page in Flat Table by clicking Previous link with the Spacebar", () => {
      CypressMountWithProviders(
        <stories.FlatTablePagerStickyHeaderComponent />
      );

      flatTablePageSelectNext().click();
      flatTableBodyRowByPosition(0).should("be.visible");
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTablePageSelectPrevious()
        .find("button")
        .focus()
        .trigger("keydown", keyCode("Space"));
      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }
    });

    it("should navigate to previous page in Flat Table by clicking Previous link with the Enter key", () => {
      CypressMountWithProviders(
        <stories.FlatTablePagerStickyHeaderComponent />
      );

      flatTablePageSelectNext().click();
      flatTableBodyRowByPosition(0).should("be.visible");
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTablePageSelectPrevious()
        .find("button")
        .focus()
        .trigger("keydown", keyCode("Enter"));
      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }
    });

    it("should navigate to next page in Flat Table by page number", () => {
      CypressMountWithProviders(
        <stories.FlatTablePagerStickyHeaderComponent />
      );

      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }

      flatTableCurrentPageInput().focus().type("{backspace}").type("2").tab();
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableBodyRowByPosition(0).should("be.visible");
    });

    it("should navigate to previous page in Flat Table by page number", () => {
      CypressMountWithProviders(
        <stories.FlatTablePagerStickyHeaderComponent />
      );

      flatTablePageSelectNext().click();
      flatTableBodyRowByPosition(0).should("be.visible");
      flatTableCurrentPageInput().should("have.attr", "value", "2");
      flatTableCurrentPageInput().focus().type("{backspace}").type("1").tab();
      flatTableCurrentPageInput().should("have.attr", "value", "1");

      for (let i = 0; i < 5; i++) {
        if (i < 4) {
          flatTableBodyRowByPosition(i).should("be.visible");
        } else {
          flatTableBodyRowByPosition(i).should("not.be.visible");
        }
      }
    });

    it("should render Flat Table with clickable rows, focusRedesignOptOut true", () => {
      CypressMountWithProviders(
        <stories.FlatTableComponent />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );

      for (let i = 0; i < 6; i++) {
        flatTableBodyRowByPosition(i).click().then(checkFocus);
      }
    });

    it("should render Flat Table with clickable rows, focusRedesignOptOut false", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);

      for (let i = 0; i < 6; i++) {
        flatTableBodyRowByPosition(i).click().then(checkNewFocusStyling);
      }
    });

    it.each(["tr", "th"] as FlatTableCheckboxProps["as"][])(
      "should render Flat Table Checkbox as prop to %s",
      (asPropVal) => {
        CypressMountWithProviders(
          <stories.FlatTableCheckboxComponent as={asPropVal} />
        );

        for (let i = 0; i < 4; i++) {
          flatTableCheckboxAsProp(i, asPropVal).should(
            "have.attr",
            "data-element",
            "flat-table-checkbox-header"
          );
        }
      }
    );
  });

  describe("check events for Flat Table component", () => {
    it("should call getOrder when a Flat Table draggable row order is changed", () => {
      const callback: FlatTableBodyDraggableProps["getOrder"] = cy
        .stub()
        .as("getOrder");
      CypressMountWithProviders(
        <stories.FlatTableDraggableComponent getOrder={callback} />
      );

      flatTableDraggableItem("UK").trigger("dragstart");
      flatTableDraggableItemByPosition(3).trigger("drop");
      flatTableDraggableItemByPosition(3).trigger("dragend");
      cy.get("@getOrder").should("have.been.calledOnce");
    });

    it("should call onClick when a clickable Flat Table row is clicked", () => {
      const callback: FlatTableRowProps["onClick"] = cy.stub().as("onClick");
      CypressMountWithProviders(
        <stories.FlatTableComponent onClick={callback} />
      );

      flatTableBodyRowByPosition(0).click();
      cy.get("@onClick").should("have.been.calledOnce");
    });

    it("should call onChange when a Flat Table selectable row is clicked", () => {
      const callback: FlatTableCheckboxProps["onChange"] = cy
        .stub()
        .as("onChange");
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent onChange={callback} />
      );

      flatTableCheckboxCell(1).find("input").click();
      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onClick when a Flat Table selectable row is clicked", () => {
      const callback: FlatTableCheckboxProps["onClick"] = cy
        .stub()
        .as("onClick");
      CypressMountWithProviders(
        <stories.FlatTableCheckboxComponent onClick={callback} />
      );

      flatTableCheckboxCell(1).find("input").click();
      cy.get("@onClick").should("have.been.calledOnce");
    });

    it("should call onClick when first Flat Table column is sorted", () => {
      const callback: FlatTableRowContextProps["onClick"] = cy
        .stub()
        .as("onClick");
      CypressMountWithProviders(
        <stories.FlatTableSortingComponent onClick={callback} />
      );

      const colPosition = "first";

      flatTableSortable().eq(positionOfElement(colPosition)).click();
      cy.get("@onClick").should("have.been.calledOnce");
    });
  });

  describe("check accessibility tests for Flat Table component", () => {
    it("should render Flat Table with ariaDescribedBy for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);
      cy.checkAccessibility();
    });

    it.each([CHARACTERS.SPECIALCHARACTERS, CHARACTERS.DIACRITICS])(
      "should render Flat Table with caption prop set as %s for accessibility tests",
      (captionValue) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent caption={captionValue} />
        );
        cy.checkAccessibility();
      }
    );

    // a11y error!scrollable-region-focusable on 1 Node. Ticket FE-5604 logged to investigate
    it.skip("should render Flat Table Row with cell nodes as children for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableSpanComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table with truncated cells for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableTruncateBgComponent />);

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table Checkbox with ariaLabelledBy for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      cy.checkAccessibility();
    });

    it("should render Flat Table with sticky header for accessibility tests", () => {
      CypressMountWithProviders(
        <div style={{ height: "150px" }}>
          <stories.FlatTableComponent hasStickyHead />
        </div>
      );

      flatTable().should("exist");

      cy.checkAccessibility();
    });

    it("should render Flat Table with sticky footer for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableFooterComponent hasStickyFooter />
      );
      cy.checkAccessibility();
    });

    it.each([...colorThemes] as [
      FlatTableProps["colorTheme"],
      string,
      string
    ][])(
      "should render Flat Table in the %s theme for accessibility tests",
      (colorTheme) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent colorTheme={colorTheme} />
        );
        cy.checkAccessibility();
      }
    );

    it("should render Flat Table with zebra stripes for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableComponent isZebra />);

      cy.checkAccessibility();
    });

    it.each([...sizes] as [FlatTableProps["size"], string, string, number][])(
      "should check Flat Table size is %s for accessibility tests",
      (sizeName) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent size={sizeName} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(heightWidth)(
      "should render Flat Table with %spx as a height parameter for accessibility tests",
      (height) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent height={`${height}px`} />
        );
        cy.checkAccessibility();
      }
    );

    it.each([150, 249, 250, 251, 300])(
      "should render Flat Table with %spx as a height parameter and minHeight set to 250px for accessibility tests",
      (height) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent
            height={`${height}px`}
            minHeight="250px"
          />
        );
        cy.checkAccessibility();
      }
    );

    it("should render Flat Table with hasMaxHeight parameter for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableComponent height="400px" hasMaxHeight />
      );
      cy.checkAccessibility();
    });

    it.each(heightWidth)(
      "should render Flat Table with %spx as a width parameter for accessibility tests",
      (width) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent width={`${width}px`} />
        );
        cy.checkAccessibility();
      }
    );

    it.each(["visible", "hidden", "clip", "scroll", "auto"])(
      "should render Flat Table with %s as a overflowX parameter and width set to 500px for accessibility tests",
      (overflow) => {
        CypressMountWithProviders(
          <stories.FlatTableComponent width="500px" overflowX={overflow} />
        );
        cy.checkAccessibility();
      }
    );

    // a11y error!scrollable-region-focusable on 1 Node. Ticket FE-5604 logged to investigate
    it.skip("should render Flat Table with rowSpan set to make header cells span 2 rows for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableSpanComponent width="500px" />
      );
      cy.checkAccessibility();
    });

    // a11y error!scrollable-region-focusable on 1 Node. Ticket FE-5604 logged to investigate
    it.skip("should render Flat Table with multiple sticky row headers for accessibility tests", () => {
      cy.viewport(700, 700);

      CypressMountWithProviders(<stories.FlatTableMultipleStickyComponent />);
      cy.checkAccessibility();
    });

    it("should render Flat Table with colSpan set to make cells span 4 columns for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableCellColSpanComponent width="500px" />
      );
      cy.checkAccessibility();
    });

    it("should render Flat Table with rowSpan set to make cells span 3 rows for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableCellRowSpanComponent width="500px" />
      );
      cy.checkAccessibility();
    });

    it("should render Flat Table with FlatTableFooterComponent for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableFooterComponent />);
      cy.checkAccessibility();
    });

    it("should render Flat Table with FlatTableCustomPaddingComponent for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableCustomPaddingComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table Header and Cells with FlatTableVerticalBordersComponent for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableVerticalBordersComponent />);
      cy.checkAccessibility();
    });

    it("should render Flat Table with custom horizontal borders for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableHorizontalBordersComponent />
      );

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table with custom color row for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableColorRowSelectableComponent />
      );

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table rows with the mouse for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableHighlightableComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table Row Header with truncated string in header for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableTruncateHeaderComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table Row Header with title for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableTitleAlignComponent />);

      cy.checkAccessibility();
    });

    it("should render sorted Flat Table for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableSortingComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table with all expandable rows closed for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableNoAccSubRowComponent />);

      cy.checkAccessibility();
    });

    it("when first column of expandable row is opened, rendered Flat Table passes accessibility checks", () => {
      CypressMountWithProviders(
        <stories.FlatTableFirstColExpandableComponent />
      );
      flatTableCell(0).focus().trigger("keydown", keyCode("Space"));
      cy.checkAccessibility();
    });

    it("should render Flat Table with all expandable rows expanded for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableAlreadyExpandedComponent />);

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table with parent expandable and child subrows selectable for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableAllSubrowSelectableComponent />
      );

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table with parent expandable row only selectable for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableParentSubrowSelectableComponent />
      );

      cy.checkAccessibility();
    });

    // a11y error!color-contrast on 1 Node. Ticket FE-5766 logged to investigate
    it.skip("should render Flat Table with child subrow only selectable for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTableChildSubrowSelectableComponent />
      );

      cy.checkAccessibility();
    });

    // a11y error! empty-table-header on 1 Node. Ticket FE-5767 logged to investigate
    it.skip("should render Flat Table with FlatTableDraggableComponent for accessibility tests", () => {
      CypressMountWithProviders(<stories.FlatTableDraggableComponent />);

      cy.checkAccessibility();
    });

    it("should render Flat Table with pager and sticky header for accessibility tests", () => {
      CypressMountWithProviders(
        <stories.FlatTablePagerStickyHeaderComponent />
      );

      cy.checkAccessibility();
    });
  });

  describe("Rounded corner tests for Flat-Table", () => {
    it("has the expected border radius styling when no footer is rendered", () => {
      CypressMountWithProviders(<stories.FlatTableComponent />);

      flatTableWrapper().should("have.css", "border-radius", "8px");
      flatTableHeaderCells()
        .first()
        .should("have.css", "border-radius", "8px 0px 0px");
      flatTableHeaderCells()
        .last()
        .should("have.css", "border-radius", "0px 8px 0px 0px");
      flatTableCell(20).should("have.css", "border-radius", "0px 0px 0px 8px");
      flatTableCell(23).should("have.css", "border-radius", "0px 0px 8px");
    });

    it("has the expected border radius styling when sticky footer is rendered", () => {
      CypressMountWithProviders(
        <stories.FlatTableFooterComponent hasStickyFooter />
      );

      flatTableWrapper().should("have.css", "border-radius", "8px 8px 0px 0px");
      flatTableHeaderCells()
        .first()
        .should("have.css", "border-radius", "8px 0px 0px");
      flatTableHeaderCells().last().should("have.css", "border-radius", "0px");
      flatTableCell(16).should("have.css", "border-radius", "0px");
      flatTableCell(19).should("have.css", "border-radius", "0px");
      flatTablePager().should("have.css", "border-radius", "0px");
    });

    it("has the expected border radius styling when horizontal scrollbar exists", () => {
      CypressMountWithProviders(<stories.FlatTableWithHorizontalScrollbar />);

      flatTableCell(6).should("have.css", "border-radius", "0px");
      flatTableCell(11).should("have.css", "border-radius", "0px");
    });

    it("has the expected border radius styling when first column has rowspan", () => {
      CypressMountWithProviders(<stories.FlatTableFirstColumnHasRowspan />);

      flatTableCell(0).should("have.css", "border-radius", "0px 0px 0px 8px");
      flatTableCell(3).should("have.css", "border-radius", "0px");
      flatTableCell(4).should("have.css", "border-radius", "0px 0px 8px");
    });

    it("has the expected border radius styling when last column has rowspan", () => {
      CypressMountWithProviders(<stories.FlatTableLastColumnHasRowspan />);

      flatTableCell(2).should("have.css", "border-radius", "0px 0px 8px");
      flatTableCell(3).should("have.css", "border-radius", "0px 0px 0px 8px");
      flatTableCell(4).should("have.css", "border-radius", "0px");
    });
  });
});
