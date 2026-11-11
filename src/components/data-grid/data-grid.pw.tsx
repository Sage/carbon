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

test("shows navigational focus after clicking without entering edit mode", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const nameCell = cell(page, 1, "name");
  await nameCell.click();

  await expect(nameCell).toBeFocused();
  await expect(page.getByRole("textbox", { name: "Name, row 1" })).toHaveCount(
    0,
  );
  await expect
    .poll(() =>
      nameCell.evaluate((element) => getComputedStyle(element).boxShadow),
    )
    .not.toBe("none");
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

  await expect(typeCell).toContainText("Service");
  await expect(typeCell).toBeFocused();
  await expect(select).toHaveCount(0);
  await expect
    .poll(() => grid.evaluate((element) => element.scrollTop))
    .toBe(40);

  await page.keyboard.press("Tab");
  await expect(cell(page, 2, "quantity")).toBeFocused();
  await expect(page.getByRole("combobox", { name: "Type, row 2" })).toHaveCount(
    0,
  );
  await expect
    .poll(() =>
      typeCell.evaluate((element) => getComputedStyle(element).boxShadow),
    )
    .toBe("none");
});

test("restores grid focus when a native dropdown closes by blurring", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const typeCell = cell(page, 2, "type");
  await typeCell.click();
  await page.keyboard.press("Space");

  const select = page.getByRole("combobox", { name: "Type, row 2" });
  await select.blur();

  await expect(typeCell).toContainText("Product");
  await expect(typeCell).toBeFocused();
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

test("applies read-only behavior to each cell variation", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const nameCell = cell(page, 3, "name");
  const typeCell = cell(page, 3, "type");
  const checkboxCell = cell(page, 3, "selected");
  const actionCell = cell(page, 3, "actions");

  await expect(nameCell).toHaveAttribute("aria-readonly", "true");
  await expect(typeCell).toHaveAttribute("aria-readonly", "true");
  await expect(checkboxCell).toHaveAttribute("aria-readonly", "true");
  await expect(actionCell).toHaveAttribute("aria-readonly", "true");
  await expect(checkboxCell.getByRole("checkbox")).toBeDisabled();
  await expect(typeCell.locator('[data-element="dropdown"]')).toHaveCount(0);

  await typeCell.click();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("combobox", { name: "Type, row 3" })).toHaveCount(
    0,
  );

  await actionCell.click({ position: { x: 4, y: 4 } });
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();
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

test("does not navigate away from an open action popover", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const actionCell = cell(page, 1, "actions");
  const selectedCell = cell(page, 1, "selected");
  await actionCell.click({ position: { x: 4, y: 4 } });
  await page.keyboard.press("Enter");

  const duplicate = page.getByRole("button", { name: "Duplicate" });
  await expect(duplicate).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(duplicate).toBeFocused();
  await expect(page.getByRole("list")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("list")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Actions for row 1" }),
  ).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(selectedCell).toBeFocused();
});

test("tabs from an open action popover to the first cell of the next row", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const actionCell = cell(page, 1, "actions");
  await actionCell.click({ position: { x: 4, y: 4 } });
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();

  await page.keyboard.press("Tab");

  await expect(page.getByRole("list")).toHaveCount(0);
  await expect(cell(page, 2, "name")).toBeFocused();
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
