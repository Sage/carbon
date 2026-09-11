import React from "react";
import { expect, test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  DraggableTableComponent,
  ExpandableTableComponent,
  SelectableTableComponent,
  SortableTableComponent,
  StickyHeaderFooterTableComponent,
  TableComponent,
  ZebraStripedTableComponent,
} from "./components-test.pw";

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
