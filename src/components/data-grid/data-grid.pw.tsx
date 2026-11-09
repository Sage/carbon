import React from "react";
import type { Page } from "@playwright/test";

import { expect, test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import DataGridComponent from "./components.test-pw";

const cell = (page: Page, rowId: number, field: string) =>
  page.locator(`[data-element="data-grid-cell-${String(rowId)}-${field}"]`);

test("passes accessibility checks with mixed cell states and types", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await checkAccessibility(page, page.getByRole("grid"));
});

test("edits a text cell and moves to the next cell with Tab", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const nameCell = cell(page, 1, "name");
  const typeCell = cell(page, 1, "type");
  await nameCell.click();
  await page.keyboard.press("Enter");

  const editor = page.getByRole("textbox", { name: "Name, row 1" });
  await expect(editor).toBeFocused();
  await editor.fill("Updated line");
  await page.keyboard.press("Tab");

  await expect(nameCell).toContainText("Updated line");
  await expect(typeCell).toBeFocused();
});

test("opens and commits a dropdown with Space without scrolling vertically", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const grid = page.getByRole("grid");
  const typeCell = cell(page, 2, "type");
  await grid.evaluate((element) => {
    element.scrollTop = 40;
  });
  await typeCell.click();
  await page.keyboard.press("Space");

  const select = page.getByRole("combobox", { name: "Type, row 2" });
  await expect(select).toBeFocused();
  await select.selectOption("Service");
  await page.keyboard.press("Enter");

  await expect(typeCell).toContainText("Service");
  await expect(typeCell).toBeFocused();
  await expect
    .poll(() => grid.evaluate((element) => element.scrollTop))
    .toBe(40);
});

test("toggles a checkbox with one click and with Space", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const checkboxCell = cell(page, 1, "selected");
  const checkbox = checkboxCell.getByRole("checkbox");

  await checkboxCell.click();
  await expect(checkbox).toBeChecked();

  await page.keyboard.press("Space");
  await expect(checkbox).not.toBeChecked();
});

test("scrolls horizontally during keyboard navigation while keeping edge columns visible", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const grid = page.getByRole("grid");
  const nameCell = cell(page, 1, "name");
  const quantityCell = cell(page, 1, "quantity");
  const actionCell = cell(page, 1, "actions");

  await nameCell.click();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");

  await expect(quantityCell).toBeFocused();
  await expect
    .poll(() => grid.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);

  const gridBounds = await grid.boundingBox();
  const nameBounds = await nameCell.boundingBox();
  const actionBounds = await actionCell.boundingBox();
  expect(nameBounds?.x).toBeCloseTo(gridBounds?.x ?? 0, 0);
  expect((actionBounds?.x ?? 0) + (actionBounds?.width ?? 0)).toBeCloseTo(
    (gridBounds?.x ?? 0) + (gridBounds?.width ?? 0),
    0,
  );
});

test("the imperative edit action focuses the invalid cell editor", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await page.getByRole("button", { name: "Edit first error" }).click();

  await expect(
    page.getByRole("textbox", { name: "Name, row 2" }),
  ).toBeFocused();
});

test("duplicates and deletes rows through the action popover", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await page.getByRole("button", { name: "Actions for row 1" }).click();
  await page.getByRole("button", { name: "Duplicate" }).click();
  await expect(page.getByText("Line 1", { exact: true })).toHaveCount(2);

  await page.getByRole("button", { name: "Actions for row 7" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("Line 1", { exact: true })).toHaveCount(1);
});

test("virtualizes a constrained large grid and keeps its header sticky", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent rowCount={100} maxHeight="200px" />);

  const grid = page.getByRole("grid");
  const headers = page.getByRole("columnheader");
  expect(await page.getByRole("gridcell").count()).toBeLessThan(500);

  await grid.evaluate((element) => {
    element.scrollTop = 2000;
  });
  await expect(cell(page, 50, "name")).toBeVisible();

  const gridBounds = await grid.boundingBox();
  const headerBounds = await headers.first().boundingBox();
  expect(headerBounds?.y).toBeCloseTo(gridBounds?.y ?? 0, 0);
});
