import React from "react";
import { expect, test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  DraggableTableComponent,
  ExpandableTableComponent,
  ExpandableTableWithTallControlComponent,
  PaginatedDraggableTableComponent,
  SelectableTableComponent,
  SortableTableComponent,
  StickyHeaderFooterTableComponent,
  StickySelectableTableComponent,
  TableComponent,
  ZebraStripedTableComponent,
} from "./components-test.pw";

test("scrolls focused body controls clear of sticky headers and footers", async ({
  mount,
  page,
}) => {
  await mount(<StickySelectableTableComponent />);

  const scrollContainer = page.getByTestId(
    "sticky-selectable-table-scroll-container",
  );
  const header = page.getByTestId("table-head");
  const footer = page.getByTestId("table-footer");
  const topControl = page.getByRole("textbox", { name: "Edit product 6" });
  const topRow = page.locator("#sticky-selectable-row-6");
  const bottomControl = page.getByRole("button", {
    name: "Edit product 7",
  });
  const bottomRow = page.locator("#sticky-selectable-row-7");

  await scrollContainer.evaluate(
    (container, rowElement) => {
      container.scrollTop = (rowElement as HTMLElement).offsetTop;
    },
    await topRow.elementHandle(),
  );
  await topControl.focus();

  await expect
    .poll(async () => {
      const controlBounds = await topControl.boundingBox();
      const headerBounds = await header.boundingBox();
      return (
        (controlBounds?.y ?? 0) -
        ((headerBounds?.y ?? 0) + (headerBounds?.height ?? 0))
      );
    })
    .toBeGreaterThan(0);

  await scrollContainer.evaluate(
    (container, rowElement) => {
      const element = rowElement as HTMLElement;
      container.scrollTop =
        element.offsetTop - container.clientHeight + element.offsetHeight;
    },
    await bottomRow.elementHandle(),
  );
  await bottomControl.focus();

  await expect
    .poll(async () => {
      const controlBounds = await bottomControl.boundingBox();
      const footerBounds = await footer.boundingBox();
      return (
        (footerBounds?.y ?? 0) -
        ((controlBounds?.y ?? 0) + (controlBounds?.height ?? 0))
      );
    })
    .toBeGreaterThan(0);
});

test("stretches an expandable control to the height of a row with a taller sibling control", async ({
  mount,
  page,
}) => {
  await mount(<ExpandableTableWithTallControlComponent />);

  const expandableCell = page.locator("#expandable-tall-control-cell");
  const expandableButton = expandableCell.getByRole("button", {
    name: "Parent row",
  });

  await expect(expandableButton).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Tall control" }),
  ).toBeVisible();

  const cellInnerHeight = await expandableCell.evaluate(
    (element) => element.clientHeight,
  );
  const buttonBounds = await expandableButton.boundingBox();

  expect(buttonBounds).not.toBeNull();
  expect(buttonBounds?.height).toBe(cellInnerHeight);
  expect(buttonBounds?.height).toBeGreaterThanOrEqual(42);
});

test("reorders draggable rows when one row is dropped on another", async ({
  mount,
  page,
}) => {
  await mount(<DraggableTableComponent />);

  const rows = page.getByTestId("draggable-table-body").getByRole("row");

  await expect(rows).toHaveText(["Row one", "Row two", "Row three"]);

  await page
    .getByRole("cell", { name: "Row one" })
    .dragTo(page.getByRole("row", { name: "Row three" }));

  await expect(rows).toHaveText(["Row two", "Row three", "Row one"]);
});

test("reorders draggable rows after changing pagination page", async ({
  mount,
  page,
}) => {
  await mount(<PaginatedDraggableTableComponent />);

  const rows = page.getByTestId("draggable-table-body").getByRole("row");
  const nextPageButton = page.getByRole("button", {
    name: "Go to next page",
  });
  const previousPageButton = page.getByRole("button", {
    name: "Go to previous page",
  });

  await expect(rows).toHaveText(["Row 1", "Row 2", "Row 3"]);

  await nextPageButton.click();
  await expect(rows).toHaveText(["Row 4", "Row 5", "Row 6"]);

  await page
    .getByRole("cell", { name: "Row 4" })
    .dragTo(page.getByRole("row", { name: "Row 6" }));

  await expect(rows).toHaveText(["Row 5", "Row 6", "Row 4"]);

  await previousPageButton.click();
  await expect(rows).toHaveText(["Row 1", "Row 2", "Row 3"]);

  await nextPageButton.click();
  await expect(rows).toHaveText(["Row 5", "Row 6", "Row 4"]);
});

test("does not reorder draggable rows when one row is dropped on itself", async ({
  mount,
  page,
}) => {
  await mount(<DraggableTableComponent />);

  const rows = page.getByTestId("draggable-table-body").getByRole("row");

  await expect(rows).toHaveText(["Row one", "Row two", "Row three"]);

  await page
    .getByRole("cell", { name: "Row one" })
    .dragTo(page.getByRole("row", { name: "Row one" }));

  await expect(rows).toHaveText(["Row one", "Row two", "Row three"]);
});

test("does not reorder draggable rows when one row is dropped outside of the draggable area", async ({
  mount,
  page,
}) => {
  await mount(<DraggableTableComponent />);

  const rows = page.getByTestId("draggable-table-body").getByRole("row");

  await expect(rows).toHaveText(["Row one", "Row two", "Row three"]);

  await page
    .getByRole("cell", { name: "Row one" })
    .dragTo(page.locator("body"), {
      targetPosition: { x: 0, y: 0 },
    });

  await expect(rows).toHaveText(["Row one", "Row two", "Row three"]);
});

test.describe("Table accessibility tests", () => {
  test("should pass accessibility tests for a basic table", async ({
    mount,
    page,
  }) => {
    await mount(<TableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for a zebra striped table", async ({
    mount,
    page,
  }) => {
    await mount(<ZebraStripedTableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for a sticky header and footer table", async ({
    mount,
    page,
  }) => {
    await mount(<StickyHeaderFooterTableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for a selectable table", async ({
    mount,
    page,
  }) => {
    await mount(<SelectableTableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for an expandable table", async ({
    mount,
    page,
  }) => {
    await mount(<ExpandableTableComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for a sortable table", async ({
    mount,
    page,
  }) => {
    await mount(<SortableTableComponent />);

    await checkAccessibility(page);
  });
});
