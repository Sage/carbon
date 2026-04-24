import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  FlatTableComponent,
  FlatTableSpanComponent,
  FlatTableColorRowSelectableComponent,
  FlatTableFooterComponent,
  FlatTableMultipleStickyComponent,
  FlatTableCellColSpanComponent,
  FlatTableCellRowSpanComponent,
  FlatTableCustomPaddingComponent,
  FlatTableCustomBordersComponent,
  FlatTableHighlightableComponent,
  FlatTableTitleAlignComponent,
  FlatTableSortingComponent,
  FlatTableNoAccSubRowComponent,
  FlatTableAccSubRowComponent,
  FlatTableFirstColExpandableComponent,
  FlatTableAlreadyExpandedComponent,
  FlatTableExpandAllComponent,
  FlatTableAllSubrowSelectableComponent,
  FlatTableChildSubrowSelectableComponent,
  FlatTablePartiallySelectedOrHighlightedRows,
  FlatTableDraggableComponent,
  FlatTablePagerStickyHeaderComponent,
  FlatTableLastColumnHasRowspan,
  FlatTableWithStickyColumn,
} from "./components.test-pw";
import { getDataElementByValue } from "../../../playwright/components";
import {
  batchSelectionCounter,
  batchSelectionComponent,
} from "../../../playwright/components/batch-selection/index";
import {
  actionPopover,
  actionPopoverButton,
} from "../../../playwright/components/action-popover/index";
import { relLink } from "../../../playwright/components/link/index";
import {
  flatTable,
  flatTableWrapper,
  flatTableHeaderCells,
  flatTableHeaderRowByPosition,
  flatTableCell,
  flatTableCheckboxHeader,
  flatTableHeaderCellsButtonIcon,
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
  pageSelectElement,
  pageSelectInput,
  flatTablePageSelectNext,
  flatTablePageSelectPrevious,
  flatTableCurrentPageInput,
  flatTableCheckboxCell,
} from "../../../playwright/components/flat-table";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  checkCSSOutline,
  assertCssValueIsApproximately,
  getRotationAngle,
  checkAccessibility,
  getStyle,
  waitForAnimationEnd,
  continuePressingTAB,
  checkNewFocusStyling,
} from "../../../playwright/support/helper";

const sizes = [
  ["compact", "8px", "13px", 24],
  ["small", "16px", "14px", 32],
  ["medium", "16px", "14px", 40],
  ["large", "16px", "16px", 48],
  ["extraLarge", "16px", "16px", 64],
] as const;

const heightWidth = [150, 250, 600, 1000] as const;
const heights = [150, 249, 250, 251, 300] as const;
const overflows = ["visible", "hidden", "clip", "scroll", "auto"] as const;
const arrowsToPress = ["ArrowLeft", "ArrowRight"] as const;
const itemsPerPage = [
  [1, 0],
  [5, 1],
] as const;
const tableSorting = [
  ["first", "desc", 1, 0],
  ["first", "asc", 2, 0],
  ["second", "desc", 1, 1],
  ["second", "asc", 2, 1],
] as const;

const basicColorThemes = [
  ["dark", "rgb(51, 91, 112)", "rgb(102, 132, 148)"],
  ["light", "rgb(204, 214, 219)", "rgb(179, 194, 201)"],
] as const;

const colorThemes = [
  ...basicColorThemes,
  ["transparent-base", "rgb(242, 245, 246)", "rgb(242, 245, 246)"],
  ["transparent-white", "rgb(255, 255, 255)", "rgb(255, 255, 255)"],
] as const;

const greyBlack = "rgba(0, 0, 0, 0.65)";
const lightGrey = "rgb(217, 224, 228)";
const vlightGrey = "rgb(230, 235, 237)";
const green = "rgb(177, 211, 69)";

const indexes = (length: number, start = 0) =>
  Array.from({ length: length - start }).map((_, index) => index + start);

test.describe("Prop tests", () => {
  [CHARACTERS.SPECIALCHARACTERS, CHARACTERS.DIACRITICS].forEach(
    (captionValue) => {
      test(`should render with caption prop set as ${captionValue}`, async ({
        mount,
        page,
      }) => {
        await mount(<FlatTableComponent caption={captionValue} />);

        await expect(flatTableCaption(page)).toHaveText(captionValue);
      });
    },
  );

  test(`should render with sticky header`, async ({ mount, page }) => {
    await mount(
      <div style={{ height: "150px" }}>
        <FlatTableComponent hasStickyHead />
      </div>,
    );

    await expect(flatTable(page)).toHaveCount(1);
    await expect(flatTable(page).locator("thead")).toHaveCSS(
      "position",
      "sticky",
    );

    for await (const i of indexes(5)) {
      if (i === 3 || i === 4) {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      }
    }

    const wrapperElement = flatTableWrapper(page);
    await wrapperElement.evaluate((wrapper) => wrapper.scrollBy(0, 150));

    for await (const i of indexes(5)) {
      if (i === 0 || i === 1) {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      }
    }
  });

  test(`should render with sticky header and multiple rows`, async ({
    mount,
    page,
  }) => {
    await mount(
      <div style={{ height: "150px" }}>
        <FlatTableSpanComponent hasStickyHead />
      </div>,
    );

    await expect(
      flatTableHeaderRowByPosition(page, 0).locator("th").first(),
    ).toHaveCSS("top", "0px");
    await expect(
      flatTableHeaderRowByPosition(page, 1).locator("th").first(),
    ).toHaveCSS("top", "40px");
  });

  test(`should render with sticky footer`, async ({ mount, page }) => {
    await mount(<FlatTableFooterComponent hasStickyFooter />);

    await expect(flatTablePager(page).locator("..")).toHaveCSS(
      "position",
      "sticky",
    );

    for await (const i of indexes(5)) {
      if (i === 4) {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      }
    }

    const wrapperElement = flatTableWrapper(page);
    await wrapperElement.evaluate((wrapper) => wrapper.scrollBy(1366, 150));
    const pagerParent = flatTablePager(page).locator("..");
    await pagerParent.scrollIntoViewIfNeeded();

    await expect(flatTableHeaderCells(page).first()).not.toBeInViewport();
    await expect(pagerParent).toBeInViewport();

    for await (const i of indexes(5)) {
      if (i === 0) {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      }
    }
  });

  [...basicColorThemes].forEach(([colorTheme, bgColor, brColor]) => {
    test(`should render in the ${colorTheme} theme`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableComponent colorTheme={colorTheme} />);

      for await (const i of indexes(4)) {
        const headerCells = flatTableHeaderCells(page).nth(i);
        await expect(headerCells).toHaveCSS("background-color", bgColor);
        await checkCSSOutline(
          headerCells,
          "1px",
          "border-right",
          "solid",
          brColor,
        );
      }
    });
  });

  heightWidth.forEach((height) => {
    test(`should render with ${height}px as a height parameter`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableComponent height={`${height}px`} />);

      await assertCssValueIsApproximately(
        flatTableWrapper(page),
        "height",
        height,
      );
    });
  });

  [heights].forEach(([height]) => {
    test(`should render with ${height}px as a height parameter and minHeight set to 250px`, async ({
      mount,
      page,
    }) => {
      await mount(
        <FlatTableComponent height={`${height}px`} minHeight="250px" />,
      );

      if (height < 250) {
        await expect(flatTableWrapper(page)).toHaveCSS("height", `${250}px`);
      } else {
        await assertCssValueIsApproximately(
          flatTableWrapper(page),
          "height",
          height,
        );
      }
    });
  });

  [overflows].forEach(([overflow]) => {
    test(`should render with %${overflow} as a overflowX parameter and width set to 500px`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableComponent width="500px" overflowX={overflow} />);

      await expect(flatTable(page).locator("..")).toHaveCSS(
        "overflow-x",
        overflow,
      );
    });
  });

  test(`should render with stickyHead and rowSpan set, stickyAlignment left by default`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 310, height: 380 });
    await mount(<FlatTableSpanComponent />);

    await expect(
      flatTableBodyRowByPosition(page, 1).locator("td").nth(0),
    ).toHaveCSS("position", "sticky");
    await expect(flatTableBodyRowByPosition(page, 1).locator("th")).toHaveCSS(
      "position",
      "sticky",
    );
    const position4 = flatTableBodyRowByPosition(page, 1).locator("td").nth(4);
    await expect(position4).not.toBeInViewport();
    await position4.scrollIntoViewIfNeeded();
    await expect(
      flatTableBodyRowByPosition(page, 1).locator("th"),
    ).toBeInViewport();
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should render with multiple sticky row headers, stickyAlignment set to right`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 670, height: 700 });
    await mount(<FlatTableMultipleStickyComponent />);

    await expect(
      flatTableBodyRowByPosition(page, 1).locator("td").nth(0),
    ).toHaveCSS("position", "sticky");
    await expect(
      flatTableBodyRowByPosition(page, 1).locator("th").nth(0),
    ).toHaveCSS("position", "sticky");
    await expect(
      flatTableBodyRowByPosition(page, 1).locator("th").nth(1),
    ).toHaveCSS("position", "sticky");
    await expect(
      flatTableBodyRowByPosition(page, 1).locator("td").nth(7),
    ).toHaveCSS("position", "sticky");

    for await (const i of indexes(7, 1)) {
      await waitForAnimationEnd(flatTable(page));
      if (i < 4) {
        await expect(
          flatTableBodyRowByPosition(page, 1).locator("td").nth(i),
        ).toBeInViewport();
      }
      if (i === 4 || i === 5 || i === 6) {
        await expect(
          flatTableBodyRowByPosition(page, 1).locator("td").nth(i),
        ).not.toBeInViewport();
      }
    }

    const position6 = flatTableBodyRowByPosition(page, 1).locator("td").nth(6);
    await position6.scrollIntoViewIfNeeded();

    for await (const i of indexes(7, 1)) {
      if (i > 2) {
        await expect(
          flatTableBodyRowByPosition(page, 1).locator("td").nth(i),
        ).toBeInViewport();
      }
      if (i === 1 || i === 2) {
        await expect(
          flatTableBodyRowByPosition(page, 1).locator("td").nth(i),
        ).not.toBeInViewport();
      }
    }

    await expect(
      flatTableBodyRowByPosition(page, 1).locator("th").nth(0),
    ).toBeInViewport();
  });

  test("should render with sticky columns when FlatTableRowHeader is used", async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableWithStickyColumn />);

    const bodyCell1 = flatTableBodyRowByPosition(page, 0).locator("td").nth(0);
    const bodyStickyCell = flatTableBodyRowByPosition(page, 0)
      .locator("th")
      .nth(0);
    const input = flatTable(page).locator("input");

    await expect(
      flatTableHeaderRowByPosition(page, 0).locator("th").nth(0),
    ).toHaveCSS("position", "sticky");
    await expect(
      flatTableHeaderRowByPosition(page, 0).locator("th").nth(1),
    ).toHaveCSS("position", "sticky");
    await expect(bodyCell1).toHaveCSS("position", "sticky");
    await expect(bodyStickyCell).toHaveCSS("position", "sticky");

    await expect(bodyCell1).toBeInViewport();
    await expect(bodyStickyCell).toBeInViewport();
    await expect(input).not.toBeInViewport();

    await input.focus();

    await expect(bodyCell1).toBeInViewport();
    await expect(bodyStickyCell).toBeInViewport();
    await expect(input).toBeInViewport();
  });

  test(`should render with colSpan set to make cells span 4 columns`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableCellColSpanComponent width="500px" />);

    await expect(flatTableCell(page, 0)).toHaveAttribute("colspan", "4");
  });

  test(`should render with rowSpan set to make cells span 3 rows`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableCellRowSpanComponent width="500px" />);

    await expect(flatTableCell(page, 0)).toHaveAttribute("rowspan", "3");
  });

  [
    [1, 180],
    [2, 150],
    [3, 100],
  ].forEach(([column, width]) => {
    test(`should render column index ${column} with column width ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableFooterComponent />);

      await assertCssValueIsApproximately(
        flatTableHeaderCells(page).nth(column),
        "width",
        width,
      );
    });
  });

  (
    [
      [0, "left"],
      [1, "left"],
      [2, "center"],
      [3, "right"],
    ] as const
  ).forEach(([column, alignment]) => {
    test(`should render column index ${column} with ${alignment} alignment`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableCustomPaddingComponent />);

      await expect(flatTableHeaderCells(page).nth(column)).toHaveCSS(
        "text-align",
        alignment,
      );
    });
  });

  test(`should render with individual rows selectable with the spacebar`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableColorRowSelectableComponent />);

    const checkboxCell = flatTableCheckboxCell(page, 1).locator("input");
    await checkboxCell.focus();
    await page.keyboard.press("Space");
    await expect(checkboxCell).toBeChecked();
    await expect(
      flatTableCheckboxCell(page, 1)
        .locator("input")
        .locator("..")
        .locator("..")
        .locator("div:nth-child(2)"),
    ).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );

    await expect(
      flatTableBodyRowByPosition(page, 1).locator("td").first(),
    ).toHaveCSS("background-color", lightGrey);

    await expect(batchSelectionCounter(page)).toHaveText("1 selected");
    for await (const i of indexes(3)) {
      await expect(
        batchSelectionComponent(page).locator("button").nth(i).locator("span"),
      ).toHaveCSS("color", greyBlack);
    }
  });

  test(`should render with individual rows not selectable with the Enter key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableColorRowSelectableComponent />);

    const checkboxCell = flatTableCheckboxCell(page, 1).locator("input");
    await checkboxCell.focus();
    await page.keyboard.press("Enter");
    await expect(checkboxCell).not.toBeChecked();
  });

  test(`should render with all rows selectable with the spacebar`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableColorRowSelectableComponent />);

    const checkboxHeader = flatTableCheckboxHeader(page).locator("input");
    await checkboxHeader.focus();
    await page.keyboard.press("Space");
    await expect(checkboxHeader).toBeChecked();
    await expect(
      flatTableCheckboxHeader(page)
        .locator("input")
        .locator("..")
        .locator("..")
        .locator("div:nth-child(2)"),
    ).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    for await (const i of indexes(4)) {
      await expect(
        flatTableCheckboxCell(page, i).locator("input"),
      ).toBeChecked();
    }

    for await (const i of indexes(5, 1)) {
      await expect(
        flatTableBodyRowByPosition(page, 0).locator("td").nth(i),
      ).toHaveCSS("background-color", green);
      await expect(
        flatTableBodyRowByPosition(page, 1).locator("td").nth(i),
      ).toHaveCSS("background-color", lightGrey);
      await expect(
        flatTableBodyRowByPosition(page, 2).locator("td").nth(i),
      ).toHaveCSS("background-color", green);
      await expect(
        flatTableBodyRowByPosition(page, 3).locator("td").nth(i),
      ).toHaveCSS("background-color", lightGrey);
    }

    await expect(batchSelectionCounter(page)).toHaveText("4 selected");
    for await (const i of indexes(3)) {
      await expect(
        batchSelectionComponent(page).locator("button").nth(i).locator("span"),
      ).toHaveCSS("color", greyBlack);
    }
  });

  test(`should render with all rows not selectable with the Enter key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableColorRowSelectableComponent />);

    const checkboxHeader = flatTableCheckboxHeader(page).locator("input");
    await checkboxHeader.focus();
    await page.keyboard.press("Enter");
    await expect(checkboxHeader).not.toBeChecked();
  });

  test(`should render with rows highlightable with the spacebar`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableHighlightableComponent />);

    const bodyRow = flatTableBodyRows(page).first();
    await bodyRow.press("Space");
    await expect(
      flatTableBodyRows(page).first().locator("td").first(),
    ).toHaveCSS("background-color", vlightGrey);
  });

  test(`should render with rows highlightable with the Enter key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableHighlightableComponent />);

    const bodyRow = flatTableBodyRows(page).first();
    await bodyRow.press("Enter");
    await expect(
      flatTableBodyRows(page).first().locator("td").first(),
    ).toHaveCSS("background-color", vlightGrey);
  });

  test(`should render row header with title`, async ({ mount, page }) => {
    await mount(<FlatTableTitleAlignComponent />);

    await expect(
      flatTableRowHeader(page).nth(1).locator("div"),
    ).toHaveAttribute("title", CHARACTERS.DIACRITICS);
  });

  test(`should render cell with title`, async ({ mount, page }) => {
    await mount(<FlatTableTitleAlignComponent />);

    await expect(flatTableCell(page, 0).locator("div")).toHaveAttribute(
      "title",
      CHARACTERS.DIACRITICS,
    );
  });

  test(`should render row header with set align`, async ({ mount, page }) => {
    await mount(<FlatTableTitleAlignComponent />);

    await expect(flatTableRowHeader(page).nth(1).locator("div")).toHaveCSS(
      "text-align",
      "left",
    );
    await expect(flatTableRowHeader(page).nth(2).locator("div")).toHaveCSS(
      "text-align",
      "center",
    );
    await expect(flatTableRowHeader(page).nth(3).locator("div")).toHaveCSS(
      "text-align",
      "right",
    );
    await expect(flatTableRowHeader(page).nth(4).locator("div")).toHaveCSS(
      "text-align",
      "left",
    );
  });

  test(`should render cell with set align`, async ({ mount, page }) => {
    await mount(<FlatTableTitleAlignComponent />);

    await expect(
      flatTableBodyRowByPosition(page, 0).locator("td").nth(0),
    ).toHaveCSS("text-align", "left");
    await expect(
      flatTableBodyRowByPosition(page, 1).locator("td").nth(0),
    ).toHaveCSS("text-align", "center");
    await expect(
      flatTableBodyRowByPosition(page, 2).locator("td").nth(0),
    ).toHaveCSS("text-align", "right");
    await expect(
      flatTableBodyRowByPosition(page, 3).locator("td").nth(0),
    ).toHaveCSS("text-align", "left");
  });

  [...tableSorting].forEach(([colPosition, sortOrder, times, posNumber]) => {
    test(`should sort ${colPosition} column in ${sortOrder} order with Spacebar`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableSortingComponent />);

      if (times === 1) {
        await flatTableSortable(page).nth(posNumber).press("Space");
      } else {
        await flatTableSortable(page).nth(posNumber).press("Space");
        await flatTableSortable(page).nth(posNumber).press("Space");
      }

      const valueOne = "Tyler Webb";
      const valueTwo = "Monty Parker";
      const valueThree = "Jason Atkinson";
      const valueFour = "Blake Sutton";
      const totalOne = "280";
      const totalTwo = "1349";
      const totalThree = "849";
      const totalFour = "3840";
      const headerCellsIcon = flatTableHeaderCellsButtonIcon(page);
      const cell1 = flatTableCell(page, 0);
      const cell2 = flatTableCell(page, 1);
      const cell3 = flatTableCell(page, 2);
      const cell4 = flatTableCell(page, 3);
      const cell5 = flatTableCell(page, 4);
      const cell6 = flatTableCell(page, 5);
      const cell7 = flatTableCell(page, 6);
      const cell8 = flatTableCell(page, 7);

      if (colPosition === "first" && sortOrder === "desc") {
        await expect(headerCellsIcon).toHaveAttribute("type", "sort_down");
        await expect(headerCellsIcon).toBeVisible();
        await expect(cell1).toHaveText(valueOne);
        await expect(cell1).toBeVisible();
        await expect(cell3).toHaveText(valueTwo);
        await expect(cell3).toBeVisible();
        await expect(cell5).toHaveText(valueThree);
        await expect(cell5).toBeVisible();
        await expect(cell7).toHaveText(valueFour);
        await expect(cell7).toBeVisible();
      } else if (colPosition === "first" && sortOrder === "asc") {
        await expect(headerCellsIcon).toHaveAttribute("type", "sort_up");
        await expect(headerCellsIcon).toBeVisible();
        await expect(cell1).toHaveText(valueFour);
        await expect(cell1).toBeVisible();
        await expect(cell3).toHaveText(valueThree);
        await expect(cell3).toBeVisible();
        await expect(cell5).toHaveText(valueTwo);
        await expect(cell5).toBeVisible();
        await expect(cell7).toHaveText(valueOne);
        await expect(cell7).toBeVisible();
      } else if (colPosition === "second" && sortOrder === "desc") {
        await expect(headerCellsIcon).toHaveAttribute("type", "sort_down");
        await expect(headerCellsIcon).toBeVisible();
        await expect(cell2).toHaveText(totalFour);
        await expect(cell2).toBeVisible();
        await expect(cell4).toHaveText(totalTwo);
        await expect(cell4).toBeVisible();
        await expect(cell6).toHaveText(totalThree);
        await expect(cell6).toBeVisible();
        await expect(cell8).toHaveText(totalOne);
        await expect(cell8).toBeVisible();
      } else {
        await expect(headerCellsIcon).toHaveAttribute("type", "sort_up");
        await expect(headerCellsIcon).toBeVisible();
        await expect(cell2).toHaveText(totalOne);
        await expect(cell2).toBeVisible();
        await expect(cell4).toHaveText(totalThree);
        await expect(cell4).toBeVisible();
        await expect(cell6).toHaveText(totalTwo);
        await expect(cell6).toBeVisible();
        await expect(cell8).toHaveText(totalFour);
        await expect(cell8).toBeVisible();
      }
    });
  });

  [...tableSorting].forEach(([colPosition, sortOrder, times, posNumber]) => {
    test(`should sort ${colPosition} column in ${sortOrder} order with Enter key`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableSortingComponent />);

      if (times === 1) {
        await flatTableSortable(page).nth(posNumber).press("Enter");
      } else {
        await flatTableSortable(page).nth(posNumber).press("Enter");
        await flatTableSortable(page).nth(posNumber).press("Enter");
      }

      const valueOne = "Tyler Webb";
      const valueTwo = "Monty Parker";
      const valueThree = "Jason Atkinson";
      const valueFour = "Blake Sutton";
      const totalOne = "280";
      const totalTwo = "1349";
      const totalThree = "849";
      const totalFour = "3840";
      const headerCellsIcon = flatTableHeaderCellsButtonIcon(page);
      const cell1 = flatTableCell(page, 0);
      const cell2 = flatTableCell(page, 1);
      const cell3 = flatTableCell(page, 2);
      const cell4 = flatTableCell(page, 3);
      const cell5 = flatTableCell(page, 4);
      const cell6 = flatTableCell(page, 5);
      const cell7 = flatTableCell(page, 6);
      const cell8 = flatTableCell(page, 7);

      if (colPosition === "first" && sortOrder === "desc") {
        await expect(headerCellsIcon).toHaveAttribute("type", "sort_down");
        await expect(headerCellsIcon).toBeVisible();
        await expect(cell1).toHaveText(valueOne);
        await expect(cell1).toBeVisible();
        await expect(cell3).toHaveText(valueTwo);
        await expect(cell3).toBeVisible();
        await expect(cell5).toHaveText(valueThree);
        await expect(cell5).toBeVisible();
        await expect(cell7).toHaveText(valueFour);
        await expect(cell7).toBeVisible();
      } else if (colPosition === "first" && sortOrder === "asc") {
        await expect(headerCellsIcon).toHaveAttribute(
          "type",

          "sort_up",
        );
        await expect(headerCellsIcon).toBeVisible();
        await expect(cell1).toHaveText(valueFour);
        await expect(cell1).toBeVisible();
        await expect(cell3).toHaveText(valueThree);
        await expect(cell3).toBeVisible();
        await expect(cell5).toHaveText(valueTwo);
        await expect(cell5).toBeVisible();
        await expect(cell7).toHaveText(valueOne);
        await expect(cell7).toBeVisible();
      } else if (colPosition === "second" && sortOrder === "desc") {
        await expect(headerCellsIcon).toHaveAttribute("type", "sort_down");
        await expect(headerCellsIcon).toBeVisible();
        await expect(cell2).toHaveText(totalFour);
        await expect(cell2).toBeVisible();
        await expect(cell4).toHaveText(totalTwo);
        await expect(cell4).toBeVisible();
        await expect(cell6).toHaveText(totalThree);
        await expect(cell6).toBeVisible();
        await expect(cell8).toHaveText(totalOne);
        await expect(cell8).toBeVisible();
      } else {
        await expect(headerCellsIcon).toHaveAttribute("type", "sort_up");
        await expect(headerCellsIcon).toBeVisible();
        await expect(cell2).toHaveText(totalOne);
        await expect(cell2).toBeVisible();
        await expect(cell4).toHaveText(totalThree);
        await expect(cell4).toBeVisible();
        await expect(cell6).toHaveText(totalTwo);
        await expect(cell6).toBeVisible();
        await expect(cell8).toHaveText(totalFour);
        await expect(cell8).toBeVisible();
      }
    });
  });

  test(`should render with expandable rows expanded by mouse and subrows not accessible`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableNoAccSubRowComponent />);

    const transformValue = await getStyle(
      flatTableExpandableIcon(page, 0),
      "transform",
    );
    expect(getRotationAngle(transformValue)).toBe(-90);

    await expect(flatTableSubrows(page)).toHaveCount(0);
    await flatTableBodyRowByPosition(page, 0).click();
    await expect(flatTableSubrowByPosition(page, 0)).toHaveCount(1);
    await expect(flatTableSubrowByPosition(page, 1)).toHaveCount(1);

    const bodyRow0 = flatTableBodyRowByPosition(page, 0);
    await bodyRow0.press("Tab");
    await page.keyboard.press("ArrowDown");

    const bodyRow3 = flatTableBodyRowByPosition(page, 3);
    await checkNewFocusStyling(bodyRow3);
  });

  test(`should render with a clickable link in an expandable row`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableNoAccSubRowComponent />);

    await flatTableBodyRowByPosition(page, 0).click();
    await expect(flatTableSubrows(page)).toHaveCount(2);
    await relLink(page).click();
  });

  test(`should render with expandable rows expanded by mouse, with subrows focusable using down arrow key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAccSubRowComponent />);

    const transformValue = await getStyle(
      flatTableExpandableIcon(page, 0),
      "transform",
    );
    expect(getRotationAngle(transformValue)).toBe(-90);

    const bodyRowByPosition0 = flatTableBodyRowByPosition(page, 0);
    const bodyRowByPosition1 = flatTableBodyRowByPosition(page, 1);
    const bodyRowByPosition2 = flatTableBodyRowByPosition(page, 2);
    await bodyRowByPosition0.click();
    await expect(flatTableSubrowByPosition(page, 0)).toHaveCount(1);
    await expect(flatTableSubrowByPosition(page, 1)).toHaveCount(1);
    await bodyRowByPosition0.press("ArrowDown");
    await checkNewFocusStyling(bodyRowByPosition1);
    await bodyRowByPosition1.press("ArrowDown");
    await checkNewFocusStyling(bodyRowByPosition2);
  });

  test(`should render with expandable rows which can be closed with Spacebar`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableNoAccSubRowComponent />);

    const bodyRowByPosition0 = flatTableBodyRowByPosition(page, 0);
    await bodyRowByPosition0.focus();
    await bodyRowByPosition0.press("Space");
    await expect(flatTableSubrowByPosition(page, 0)).toHaveCount(1);
    await expect(flatTableSubrowByPosition(page, 1)).toHaveCount(1);
    await bodyRowByPosition0.focus();
    await bodyRowByPosition0.press("Space");
    await expect(flatTableSubrows(page)).toHaveCount(0);
  });

  test(`should render with expandable rows which can be closed with Enter key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableNoAccSubRowComponent />);

    const bodyRowByPosition0 = flatTableBodyRowByPosition(page, 0);
    await bodyRowByPosition0.focus();
    await bodyRowByPosition0.press("Enter");
    await expect(flatTableSubrowByPosition(page, 0)).toHaveCount(1);
    await expect(flatTableSubrowByPosition(page, 1)).toHaveCount(1);
    await bodyRowByPosition0.focus();
    await bodyRowByPosition0.press("Enter");
    await expect(flatTableSubrows(page)).toHaveCount(0);
  });

  test(`should render with rows expandable by first column only by Spacebar`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableFirstColExpandableComponent />);

    const transformValue = await getStyle(
      flatTableExpandableIcon(page, 0),
      "transform",
    );
    expect(getRotationAngle(transformValue)).toBe(-90);
    await expect(flatTableSubrows(page)).toHaveCount(0);

    const tableCell = flatTableCell(page, 0);
    await tableCell.focus();
    await tableCell.press("Space");
    await expect(flatTableSubrowByPosition(page, 0)).toHaveCount(1);
    await expect(flatTableSubrowByPosition(page, 1)).toHaveCount(1);
  });

  test(`should render with rows expandable by first column only by Enter key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableFirstColExpandableComponent />);

    const transformValue = await getStyle(
      flatTableExpandableIcon(page, 0),
      "transform",
    );
    expect(getRotationAngle(transformValue)).toBe(-90);
    await expect(flatTableSubrows(page)).toHaveCount(0);

    const tableCell = flatTableCell(page, 0);
    await tableCell.focus();
    await tableCell.press("Enter");
    await expect(flatTableSubrowByPosition(page, 0)).toHaveCount(1);
    await expect(flatTableSubrowByPosition(page, 1)).toHaveCount(1);
  });

  test(`should render with all expandable rows expanded`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAlreadyExpandedComponent />);

    await expect(flatTableExpandableIcon(page, 0)).toHaveCSS(
      "transform",
      "none",
    );
    await expect(flatTableExpandableIcon(page, 12)).toHaveCSS(
      "transform",
      "none",
    );
    await expect(flatTableExpandableIcon(page, 24)).toHaveCSS(
      "transform",
      "none",
    );
    await expect(flatTableExpandableIcon(page, 36)).toHaveCSS(
      "transform",
      "none",
    );
    await expect(flatTableSubrows(page)).toHaveCount(8);
  });

  test(`should render with all rows expandable with controlled button activated by mouse`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableExpandAllComponent />);

    const buttonCollapse = "Collapse All";
    const buttonExpand = "Expand All";

    const collapseButton = getDataElementByValue(page, "main-text").filter({
      hasText: buttonCollapse,
    });
    await collapseButton.click();
    await expect(flatTableSubrows(page)).toHaveCount(0);
    const expandButton = getDataElementByValue(page, "main-text").filter({
      hasText: buttonExpand,
    });
    await expandButton.click();
    await expect(flatTableSubrows(page)).toHaveCount(8);
  });

  test(`should render with parent expandable and child subrows selectable`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAllSubrowSelectableComponent />);

    const bodyRowByPosition0 = flatTableBodyRowByPosition(page, 0);
    await bodyRowByPosition0.click();
    await expect(flatTableSubrows(page)).toHaveCount(2);

    const bodyRowByPosition0Input = flatTableBodyRowByPosition(page, 0).locator(
      "input",
    );
    await bodyRowByPosition0Input.click();
    await expect(bodyRowByPosition0Input).toBeChecked();

    const bodyRowByPosition0Parent = flatTableBodyRowByPosition(page, 0)
      .locator("input")
      .locator("..")
      .locator("..")
      .locator("div:nth-child(2)");
    await expect(bodyRowByPosition0Parent).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );

    const bodyRowByPosition1Input = flatTableBodyRowByPosition(page, 1).locator(
      "input",
    );
    await bodyRowByPosition1Input.click();
    await expect(bodyRowByPosition1Input).toBeChecked();

    const bodyRowByPosition1Parent = flatTableBodyRowByPosition(page, 1)
      .locator("input")
      .locator("..")
      .locator("..")
      .locator("div:nth-child(2)");
    await expect(bodyRowByPosition1Parent).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  });

  test(`should render with first row focusable by tabbing but no further rows are focused on tab press`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableComponent />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 0));
    await page.keyboard.press("Tab");
    await expect(flatTableBodyRowByPosition(page, 0)).not.toBeFocused();
    await expect(flatTableBodyRowByPosition(page, 1)).not.toBeFocused();
    await expect(flatTableBodyRowByPosition(page, 3)).not.toBeFocused();
  });

  test(`should render with the last selected row as the tab stop and removes it from any other ones`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePartiallySelectedOrHighlightedRows selected />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(flatTableBodyRowByPosition(page, 0)).not.toBeFocused();
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 1));
  });

  test(`should render with the last highlighted row as the tab stop and removes it from any other ones`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePartiallySelectedOrHighlightedRows highlighted />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(flatTableBodyRowByPosition(page, 0)).not.toBeFocused();
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 1));
  });

  test(`should render with clickable rows accessible using down arrow keys`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAllSubrowSelectableComponent />);

    await continuePressingTAB(page, 6);

    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 0));
    await page.keyboard.press("Tab");
    await expect(
      flatTableBodyRowByPosition(page, 0).locator("input"),
    ).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 1));
    await page.keyboard.press("ArrowDown");
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 2));
    await page.keyboard.press("ArrowDown");
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 3));
    await page.keyboard.press("ArrowDown");
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 3));
  });

  test(`should render with clickable rows accessible using up arrow keys`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAllSubrowSelectableComponent />);

    await page.keyboard.press("Tab");
    const bodyRowByPos3 = flatTableBodyRowByPosition(page, 3)
      .locator("input")
      .nth(0);
    await bodyRowByPos3.focus();
    await expect(bodyRowByPos3).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 2));
    await page.keyboard.press("ArrowUp");
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 1));
    await page.keyboard.press("ArrowUp");
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 0));
    await page.keyboard.press("ArrowUp");
    await checkNewFocusStyling(flatTableBodyRowByPosition(page, 0));
  });

  [arrowsToPress].forEach(([arrow]) => {
    test(`should render with rows not accessible using ${arrow} keys`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableAllSubrowSelectableComponent />);

      await continuePressingTAB(page, 6);

      const bodyRowByPos = flatTableBodyRowByPosition(page, 0);
      await checkNewFocusStyling(bodyRowByPos);
      await bodyRowByPos.press(arrow);
      await checkNewFocusStyling(bodyRowByPos);
    });
  });

  test(`should render with any focusable rows accessible, including expanded sub rows, with down arrow key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAccSubRowComponent />);

    const bodyRowByPos0 = flatTableBodyRowByPosition(page, 0);
    const bodyRowByPos1 = flatTableBodyRowByPosition(page, 1);
    const bodyRowByPos2 = flatTableBodyRowByPosition(page, 2);
    const bodyRowByPos3 = flatTableBodyRowByPosition(page, 3);
    const bodyRowByPos4 = flatTableBodyRowByPosition(page, 4);
    const bodyRowByPos5 = flatTableBodyRowByPosition(page, 5);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(bodyRowByPos0).toBeFocused();
    await bodyRowByPos0.click();
    await bodyRowByPos0.press("ArrowDown");
    await expect(bodyRowByPos1).toBeFocused();
    await bodyRowByPos1.press("ArrowDown");
    await expect(bodyRowByPos2).toBeFocused();
    await bodyRowByPos2.press("ArrowDown");
    await expect(bodyRowByPos3).toBeFocused();
    await bodyRowByPos3.press("ArrowDown");
    await expect(bodyRowByPos4).toBeFocused();
    await bodyRowByPos4.press("ArrowDown");
    await expect(bodyRowByPos5).toBeFocused();
  });

  test(`should render with any focusable rows accessible, including expanded sub rows, with up arrow key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAccSubRowComponent />);

    const bodyRowByPos0 = flatTableBodyRowByPosition(page, 0);
    const bodyRowByPos1 = flatTableBodyRowByPosition(page, 1);
    const bodyRowByPos2 = flatTableBodyRowByPosition(page, 2);
    const bodyRowByPos3 = flatTableBodyRowByPosition(page, 3);
    const bodyRowByPos4 = flatTableBodyRowByPosition(page, 4);
    const bodyRowByPos5 = flatTableBodyRowByPosition(page, 5);

    await bodyRowByPos3.click();
    await bodyRowByPos5.focus();
    await expect(bodyRowByPos5).toBeFocused();
    await bodyRowByPos5.press("ArrowUp");
    await expect(bodyRowByPos4).toBeFocused();
    await bodyRowByPos4.press("ArrowUp");
    await expect(bodyRowByPos3).toBeFocused();
    await bodyRowByPos3.press("ArrowUp");
    await expect(bodyRowByPos2).toBeFocused();
    await bodyRowByPos2.press("ArrowUp");
    await expect(bodyRowByPos1).toBeFocused();
    await bodyRowByPos1.press("ArrowUp");
    await expect(bodyRowByPos0).toBeFocused();
    await bodyRowByPos0.press("ArrowUp");
    await expect(bodyRowByPos0).toBeFocused();
  });

  test(`should render with action popover in a cell opened by mouse`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAllSubrowSelectableComponent />);

    await actionPopoverButton(page).nth(0).click();
    await expect(actionPopover(page)).toHaveCount(1);
  });

  test(`should render with action popover in a cell opened by Spaceber`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAllSubrowSelectableComponent />);

    const popover = actionPopoverButton(page).nth(0);
    await popover.focus();
    await popover.press("Space");
    await expect(popover).toHaveCount(1);
  });

  test(`should render with action popover in a cell opened by Enter key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAllSubrowSelectableComponent />);

    const popover = actionPopoverButton(page).nth(0);
    await popover.focus();
    await popover.press("Enter");
    await expect(popover).toHaveCount(1);
  });

  (
    [
      ["UK", 0, 1],
      ["UK", 0, 2],
      ["UK", 0, 3],
      ["Germany", 1, 2],
      ["Germany", 1, 3],
      ["Germany", 1, 0],
      ["China", 2, 3],
      ["China", 2, 0],
      ["China", 2, 1],
      ["US", 3, 0],
      ["US", 3, 1],
      ["US", 3, 2],
    ] as [string, number, number][]
  ).forEach(([record, position, destinationId]) => {
    test(`should drag FlatTable draggable row ${record} and re-order to position ${destinationId}`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableDraggableComponent />);

      const draggableItem = flatTableDraggableItem(page, position);
      const dropPosition = flatTableDraggableItemByPosition(
        page,
        destinationId,
      );
      await draggableItem.dragTo(dropPosition);
      await expect(
        flatTableDraggableItemByPosition(page, destinationId),
      ).toHaveText(record);
    });
  });

  (
    [
      ["large", 700, 345],
      ["small", 700, 240],
    ] as [string, number, number][]
  ).forEach(([size, tableWidth, tableHeight]) => {
    test(`should render with pager and sticky header in ${size} viewport`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: tableWidth, height: tableHeight });
      await mount(<FlatTablePagerStickyHeaderComponent />);

      await flatTablePageSizeSelect(page).click();

      if (size === "large") {
        const selectListPos = flatTablePageSelectListPosition(page);
        await expect(selectListPos).toHaveAttribute(
          "data-floating-placement",
          "bottom",
        );
        await expect(selectListPos).toBeInViewport();
      } else {
        const selectListPos = flatTablePageSelectListPosition(page);
        await expect(selectListPos).toHaveAttribute(
          "data-floating-placement",
          "top",
        );
        await expect(selectListPos).toBeInViewport();
      }
    });
  });

  [...itemsPerPage].forEach(([numberOfItems, option]) => {
    test(`should render with ${numberOfItems} items when selected with the mouse`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTablePagerStickyHeaderComponent />);

      const tableBodyRows = flatTableBodyRows(page);
      await expect(tableBodyRows).toHaveCount(5);
      await expect(flatTableBodyRows(page).first()).toBeInViewport();
      await pageSelectElement(page).click();
      await flatTablePageSelectListPosition(page)
        .locator("li")
        .nth(option)
        .click();
      await expect(tableBodyRows).toHaveCount(numberOfItems);
      await expect(flatTableBodyRows(page).first()).toBeInViewport();
      await expect(pageSelectInput(page)).toHaveValue(numberOfItems.toString());
    });
  });

  [...itemsPerPage].forEach(([numberOfItems, option]) => {
    test(`should open Show Items selector with the Spacebar and select ${numberOfItems} items per page`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTablePagerStickyHeaderComponent />);

      const tableBodyRows = flatTableBodyRows(page);
      await expect(tableBodyRows).toHaveCount(5);
      await expect(flatTableBodyRows(page).first()).toBeInViewport();
      await pageSelectInput(page).focus();
      await page.keyboard.press("Space");
      await flatTablePageSelectListPosition(page)
        .locator("li")
        .nth(option)
        .click();
      await expect(tableBodyRows).toHaveCount(numberOfItems);
      await expect(flatTableBodyRows(page).first()).toBeInViewport();
      await expect(pageSelectInput(page)).toHaveValue(numberOfItems.toString());
    });
  });

  test(`should navigate to next page by clicking Next link with the mouse`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePagerStickyHeaderComponent />);

    const currentPageInput = flatTableCurrentPageInput(page);
    await expect(currentPageInput).toHaveAttribute("value", "1");

    for await (const i of indexes(5)) {
      if (i < 4) {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      }
    }

    await flatTablePageSelectNext(page).click();
    await expect(currentPageInput).toHaveAttribute("value", "2");
    await expect(flatTableBodyRowByPosition(page, 0)).toBeVisible();
  });

  test(`should navigate to next page by selecting Next link with the Spacebar`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePagerStickyHeaderComponent />);

    const currentPageInput = flatTableCurrentPageInput(page);
    await expect(currentPageInput).toHaveAttribute("value", "1");

    for await (const i of indexes(5)) {
      if (i < 4) {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      }
    }

    await flatTablePageSelectNext(page).locator("button").focus();
    await page.keyboard.press("Space");
    await expect(currentPageInput).toHaveAttribute("value", "2");
    await expect(flatTableBodyRowByPosition(page, 0)).toBeVisible();
  });

  test(`should navigate to next page by selecting Next link with the Enter key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePagerStickyHeaderComponent />);

    const currentPageInput = flatTableCurrentPageInput(page);
    await expect(currentPageInput).toHaveAttribute("value", "1");

    for await (const i of indexes(5)) {
      if (i < 4) {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      }
    }

    await flatTablePageSelectNext(page).locator("button").focus();
    await page.keyboard.press("Enter");
    await expect(currentPageInput).toHaveAttribute("value", "2");
    await expect(flatTableBodyRowByPosition(page, 0)).toBeVisible();
  });

  test(`should navigate to previous page by clicking Previous link with the mouse`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePagerStickyHeaderComponent />);

    await flatTablePageSelectNext(page).click();
    await expect(flatTableBodyRowByPosition(page, 0)).toBeInViewport();
    const currentPageInput = flatTableCurrentPageInput(page);
    await expect(currentPageInput).toHaveAttribute("value", "2");
    await flatTablePageSelectPrevious(page).click();
    await expect(currentPageInput).toHaveAttribute("value", "1");

    for await (const i of indexes(5)) {
      if (i < 4) {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      }
    }
  });

  test(`should navigate to previous page by clicking Previous link with the Spacebar`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePagerStickyHeaderComponent />);

    await flatTablePageSelectNext(page).click();
    await expect(flatTableBodyRowByPosition(page, 0)).toBeInViewport();
    const currentPageInput = flatTableCurrentPageInput(page);
    await expect(currentPageInput).toHaveAttribute("value", "2");
    await flatTablePageSelectPrevious(page).locator("button").focus();
    await page.keyboard.press("Space");
    await expect(currentPageInput).toHaveAttribute("value", "1");
    for await (const i of indexes(5)) {
      if (i < 4) {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      }
    }
  });

  test(`should navigate to previous page by clicking Previous link with the Enter key`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePagerStickyHeaderComponent />);

    await flatTablePageSelectNext(page).click();
    await expect(flatTableBodyRowByPosition(page, 0)).toBeInViewport();
    const currentPageInput = flatTableCurrentPageInput(page);
    await expect(currentPageInput).toHaveAttribute("value", "2");
    await flatTablePageSelectPrevious(page).locator("button").focus();
    await page.keyboard.press("Enter");
    await expect(currentPageInput).toHaveAttribute("value", "1");

    for await (const i of indexes(5)) {
      if (i < 4) {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      }
    }
  });

  test(`should navigate to next page by page number`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePagerStickyHeaderComponent />);

    await expect(flatTableCurrentPageInput(page)).toHaveAttribute("value", "1");

    for await (const i of indexes(5)) {
      if (i < 4) {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      }
    }

    const currentPageInput = flatTableCurrentPageInput(page);
    await currentPageInput.focus();
    await page.keyboard.press("Backspace");
    await page.keyboard.type("2");
    await page.keyboard.press("Tab");
    await expect(currentPageInput).toHaveAttribute("value", "2");
    await expect(flatTableBodyRowByPosition(page, 0)).toBeInViewport();
  });

  test(`should navigate to previous page by page number`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePagerStickyHeaderComponent />);

    await flatTablePageSelectNext(page).click();
    await expect(flatTableBodyRowByPosition(page, 0)).toBeInViewport();
    const currentPageInput = flatTableCurrentPageInput(page);
    await expect(currentPageInput).toHaveAttribute("value", "2");
    await currentPageInput.focus();
    await page.keyboard.press("Backspace");
    await page.keyboard.type("1");
    await page.keyboard.press("Tab");
    await expect(currentPageInput).toHaveAttribute("value", "1");

    for await (const i of indexes(5)) {
      if (i < 4) {
        await expect(flatTableBodyRowByPosition(page, i)).toBeInViewport();
      } else {
        await expect(flatTableBodyRowByPosition(page, i)).not.toBeInViewport();
      }
    }
  });
});

test.describe("Rounded corner tests", () => {
  test(`should render with the expected border radius styling when sticky footer is rendered`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableFooterComponent hasStickyFooter />);

    await expect(flatTableWrapper(page)).toHaveCSS(
      "border-radius",
      "8px 8px 0px 0px",
    );
    await expect(flatTableHeaderCells(page).first()).toHaveCSS(
      "border-radius",
      "8px 0px 0px",
    );
    await expect(flatTableHeaderCells(page).last()).toHaveCSS(
      "border-radius",
      "0px",
    );
    await expect(flatTableCell(page, 16)).toHaveCSS("border-radius", "0px");
    await expect(flatTableCell(page, 19)).toHaveCSS("border-radius", "0px");
    await expect(flatTablePager(page)).toHaveCSS("border-radius", "0px");
  });

  test(`should render with the expected border radius styling when horizontal scrollbar exists`, async ({
    mount,
    page,
  }) => {
    await mount(
      <FlatTableComponent
        width="200px"
        overflowX="auto"
        aria-label="scroll table"
      />,
    );

    await expect(flatTableCell(page, 6)).toHaveCSS("border-radius", "0px");
    await expect(flatTableCell(page, 11)).toHaveCSS("border-radius", "0px");
  });

  test(`should render with the expected border radius styling when last column has rowspan`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableLastColumnHasRowspan />);

    await expect(flatTableCell(page, 2)).toHaveCSS(
      "border-radius",
      "0px 0px 8px",
    );
    await expect(flatTableCell(page, 3)).toHaveCSS(
      "border-radius",
      "0px 0px 0px 8px",
    );
    await expect(flatTableCell(page, 4)).toHaveCSS("border-radius", "0px");
  });
});

test.describe("Scrollable tests", () => {
  test(`should scroll the scrollable table when down arrow key pressed and wrapper is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableSpanComponent hasStickyHead height="200px" />);

    await page.keyboard.press("Tab");
    await expect(flatTableBodyRowByPosition(page, 5)).not.toBeInViewport();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await expect(flatTableBodyRowByPosition(page, 5)).toBeInViewport();
  });

  test(`should scroll the scrollable table when space key pressed and wrapper is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableSpanComponent hasStickyHead height="200px" />);

    await page.keyboard.press("Tab");
    await expect(flatTableBodyRowByPosition(page, 5)).not.toBeInViewport();
    await page.keyboard.press("Space");
    await page.keyboard.press("Space");
    await page.keyboard.press("Space");
    await page.keyboard.press("Space");
    await expect(flatTableBodyRowByPosition(page, 5)).toBeInViewport();
  });

  test(`should scroll the scrollable table when up arrow key pressed and wrapper is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableSpanComponent hasStickyHead height="200px" />);

    await page.keyboard.press("Tab");
    await expect(flatTableBodyRowByPosition(page, 5)).not.toBeInViewport();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowUp");
    await expect(flatTableBodyRowByPosition(page, 5)).not.toBeInViewport();
  });
});

test.describe("Accessibility tests", () => {
  test(`should render with ariaDescribedBy for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableComponent />);

    await checkAccessibility(page);
  });

  test(`should render checkbox with ariaLabelledBy for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableColorRowSelectableComponent />);
    // We need this to be checked so that the BatchSelection disabled styling doesn't cause colour contrast failures.
    const checkboxHeader = flatTableCheckboxHeader(page).locator("input");
    await checkboxHeader.click();
    await checkAccessibility(page);
  });

  [...colorThemes].forEach(([colorTheme]) => {
    test(`should render in the ${colorTheme} theme for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableComponent colorTheme={colorTheme} />);

      await checkAccessibility(page);
    });
  });

  test(`should render with zebra stripes for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableComponent isZebra />);

    await checkAccessibility(page);
  });

  [...sizes].forEach(([sizeName]) => {
    test(`should render in ${sizeName} size for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<FlatTableComponent size={sizeName} />);

      await checkAccessibility(page);
    });
  });

  test(`should render with multiple sticky row headers for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 700, height: 700 });
    await mount(<FlatTableMultipleStickyComponent />);

    await checkAccessibility(page);
  });

  test(`should render with custom padding for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableCustomPaddingComponent />);

    await checkAccessibility(page);
  });

  test(`should render header and cells with vertical borders for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableCustomBordersComponent />);

    await checkAccessibility(page);
  });

  test(`should render with custom horizontal borders for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableCustomBordersComponent />);

    await checkAccessibility(page);
  });

  // a11y color-contrast error on BatchSelection text. Ticket FE-5766 logged to investigate
  test.skip(`should render with custom color row for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableColorRowSelectableComponent />);

    await checkAccessibility(page);
  });

  test(`should render with rows highlightable with the mouse for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableHighlightableComponent />);
    // We need this to be checked so that the BatchSelection disabled styling doesn't cause colour contrast failures.
    const checkboxHeader = flatTableCheckboxHeader(page).locator("input");
    await checkboxHeader.click();
    await checkAccessibility(page);
  });

  test(`should render with all expandable rows expanded for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableAlreadyExpandedComponent />);

    await checkAccessibility(page);
  });

  // a11y color-contrast error on BatchSelection text. Ticket FE-5766 logged to investigate
  test(`should render with child subrow only selectable for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableChildSubrowSelectableComponent />);
    // We need this to be checked so that the BatchSelection disabled styling doesn't cause colour contrast failures.
    const checkboxHeader = flatTableCheckboxHeader(page).locator("input");
    await checkboxHeader.click();
    await checkAccessibility(page);
  });

  test(`should render with FlatTableDraggableComponent for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTableDraggableComponent />);

    await checkAccessibility(page);
  });

  test(`should render with pager and sticky header for accessibility tests`, async ({
    mount,
    page,
  }) => {
    await mount(<FlatTablePagerStickyHeaderComponent />);

    await checkAccessibility(page);
  });
});
