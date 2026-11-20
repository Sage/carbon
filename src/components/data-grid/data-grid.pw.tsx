import React from "react";
import type { Page } from "@playwright/test";

import { expect, test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import DataGridComponent, { DataGridInDialog } from "./components.test-pw";
import { DataGrid } from ".";

test("Tab exits both grid boundaries in navigation and edit modes", async ({
  mount,
  page,
}) => {
  await mount(
    <>
      <button type="button">Before grid</button>
      <DataGrid
        aria-label="Boundary grid"
        rows={[{ id: 1, name: "One" }]}
        columns={[{ field: "name", headerName: "Name" }]}
        enableTabNavigation
      />
      <button type="button">After grid</button>
    </>,
  );
  const gridCell = page.getByRole("gridcell");
  for (const { key, destination } of [
    { key: "Tab", destination: "After grid" },
    { key: "Shift+Tab", destination: "Before grid" },
  ]) {
    const outside = page.getByRole("button", { name: destination });
    await gridCell.focus();
    await page.keyboard.press(key);
    await expect(outside).toBeFocused();

    await gridCell.focus();
    await page.keyboard.press("Enter");
    await page.getByRole("textbox").fill("Updated");
    await page.keyboard.press(key);
    await expect(outside).toBeFocused();
    await expect(page.getByRole("textbox")).toHaveCount(0);
  }
});

test("scrolling preserves the text editor caret and selection", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent rowCount={100} />);
  await page.locator('[data-element="data-grid-cell-1-name"]').click();
  const editor = page.getByRole("textbox", { name: "Name, row 1" });
  await editor.evaluate((element: HTMLInputElement) =>
    element.setSelectionRange(1, 3),
  );
  await page.getByRole("grid").evaluate((element) => {
    element.scrollTop = 80;
  });
  await expect
    .poll(() =>
      editor.evaluate((element: HTMLInputElement) => [
        element.selectionStart,
        element.selectionEnd,
      ]),
    )
    .toEqual([1, 3]);
  await expect(editor).toBeFocused();
});

test("virtualizing an editor preserves its draft and selection without committing", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent rowCount={100} />);
  const nameCell = page.locator('[data-element="data-grid-cell-1-name"]');
  await nameCell.click();
  const editor = page.getByRole("textbox", { name: "Name, row 1" });
  await editor.fill("Uncommitted draft");
  await editor.evaluate((element: HTMLInputElement) =>
    element.setSelectionRange(1, 4),
  );
  const grid = page.getByRole("grid");
  await grid.evaluate((element) => {
    element.scrollTop = 2000;
  });
  await expect(editor).toHaveCount(0);
  await grid.evaluate((element) => {
    element.scrollTop = 0;
  });
  await expect(editor).toHaveValue("Uncommitted draft");
  await expect(editor).toHaveAttribute("tabindex", "0");
  await expect(editor).toBeFocused();
  await expect
    .poll(() =>
      editor.evaluate((element: HTMLInputElement) => [
        element.selectionStart,
        element.selectionEnd,
      ]),
    )
    .toEqual([1, 4]);
  await page.keyboard.press("Escape");
  await expect(nameCell).toHaveText("Line 1");
});

test("wheel scrolling down and back does not commit a suspended edit", async ({
  mount,
  page,
}) => {
  await mount(
    <DataGridComponent rowCount={1000} maxHeight="520px" rowOverscan={6} />,
  );
  const nameCell = page.locator('[data-element="data-grid-cell-1-name"]');
  await nameCell.click();
  const editor = page.getByRole("textbox", { name: "Name, row 1" });
  await editor.fill("Uncommitted draft");
  await editor.evaluate((element: HTMLInputElement) =>
    element.setSelectionRange(2, 5),
  );
  const grid = page.getByRole("grid");
  await grid.hover();
  for (const delta of [
    600, 600, 600, 600, 600, 600, 600, -80, -520, -600, -600, -600, -600, -600,
    -600,
  ]) {
    const previous = await grid.evaluate((element) => element.scrollTop);
    await page.mouse.wheel(0, delta);
    await expect
      .poll(() => grid.evaluate((element) => element.scrollTop))
      .toBe(previous + delta);
  }
  await expect(editor).toBeFocused();
  await expect(editor).toHaveValue("Uncommitted draft");
  await expect
    .poll(() =>
      editor.evaluate((element: HTMLInputElement) => [
        element.selectionStart,
        element.selectionEnd,
      ]),
    )
    .toEqual([2, 5]);
  await page.keyboard.type("X");
  await expect(editor).toHaveValue("UnXmitted draft");
  await page.keyboard.press("Escape");
  await expect(nameCell).toHaveText("Line 1");
});

test("virtualized text grids retain a tab stop without stealing external focus", async ({
  mount,
  page,
}) => {
  await mount(
    <>
      <DataGrid
        aria-label="Virtual text"
        rows={Array.from({ length: 100 }, (_, index) => ({
          id: index,
          name: `Row ${index}`,
        }))}
        columns={[{ field: "name", headerName: "Name" }]}
        maxHeight={240}
      />
      <button type="button">Outside grid</button>
    </>,
  );
  const grid = page.getByRole("grid");
  await grid.getByRole("gridcell").first().focus();
  await grid.evaluate((element) => {
    element.scrollTop = 2000;
  });
  const tabStop = grid.locator('[role="gridcell"][tabindex="0"]');
  await expect(tabStop).toHaveCount(1);
  await expect(tabStop).toBeFocused();
  await page.getByRole("button", { name: "Outside grid" }).focus();
  await grid.evaluate((element) => {
    element.scrollTop = 0;
  });
  await expect(grid.getByRole("gridcell").first()).toHaveAttribute(
    "data-element",
    "data-grid-cell-0-name",
  );
  await expect(tabStop).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Outside grid" }),
  ).toBeFocused();
});

const cell = (page: Page, rowId: number, field: string) =>
  page.locator(`[data-element="data-grid-cell-${String(rowId)}-${field}"]`);

test("passes accessibility checks with mixed cell states and types", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await checkAccessibility(page, page.getByRole("grid"));
});

test("edits a text cell with one click and moves to the next cell with Tab", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const nameCell = cell(page, 1, "name");
  const typeCell = cell(page, 1, "type");
  await nameCell.click();

  const editor = page.getByRole("textbox", { name: "Name, row 1" });
  await expect(editor).toBeFocused();
  await editor.fill("Updated line");
  await page.keyboard.press("Tab");

  await expect(nameCell).toContainText("Updated line");
  await expect(typeCell).toBeFocused();
});

test("focusing a text cell preserves navigation mode", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const nameCell = cell(page, 1, "name");
  await nameCell.focus();

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

test("opens a text editor with a mouse double-click", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await cell(page, 1, "name").dblclick();

  await expect(
    page.getByRole("textbox", { name: "Name, row 1" }),
  ).toBeFocused();
});

test("opens a text editor with zero-detail activation", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await cell(page, 1, "name").dispatchEvent("click", { detail: 0 });

  await expect(
    page.getByRole("textbox", { name: "Name, row 1" }),
  ).toBeFocused();
});

test.describe("touch activation", () => {
  test.use({ hasTouch: true });

  test("toggles the full-cell checkbox with one tap", async ({
    mount,
    page,
  }) => {
    await mount(<DataGridComponent />);
    const checkboxCell = cell(page, 1, "selected");
    const checkbox = checkboxCell.getByRole("checkbox", {
      name: "Selected, row 1",
    });

    await checkbox.tap({ position: { x: 4, y: 4 } });

    await expect(checkbox).toBeChecked();
    await expect(checkboxCell).toBeFocused();

    await checkbox.tap({ position: { x: 4, y: 4 } });

    await expect(checkbox).not.toBeChecked();
  });

  test("does not toggle a read-only checkbox on tap", async ({
    mount,
    page,
  }) => {
    await mount(<DataGridComponent />);
    const checkbox = cell(page, 3, "selected").getByRole("checkbox");

    await checkbox.tap();

    await expect(checkbox).not.toBeChecked();
    await expect(checkbox).toHaveAttribute("aria-readonly", "true");
  });

  test("opens the action popover from a tap outside its button", async ({
    mount,
    page,
  }) => {
    await mount(<DataGridComponent />);

    await cell(page, 1, "actions").tap({ position: { x: 4, y: 4 } });

    await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();
    await expect(
      page.getByRole("button", { name: "Actions for row 1" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  test("opens a read-only row's actions with a direct trigger tap", async ({
    mount,
    page,
  }) => {
    await mount(<DataGridComponent />);

    await page.getByRole("button", { name: "Actions for row 3" }).tap();

    await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();
    await expect(
      page.getByRole("button", { name: "Actions for row 3" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  test("opens a text editor with one tap and commits the edited value", async ({
    mount,
    page,
  }) => {
    await mount(<DataGridComponent />);
    const nameCell = cell(page, 1, "name");

    await nameCell.tap();

    const editor = page.getByRole("textbox", { name: "Name, row 1" });
    await expect(editor).toBeFocused();
    await editor.fill("Touch edited line");
    await editor.press("Enter");

    await expect(nameCell).toContainText("Touch edited line");
    await expect(nameCell).toBeFocused();
  });
});

test("toggles the full-cell checkbox with zero-detail activation", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);
  const checkboxCell = cell(page, 1, "selected");
  const checkbox = checkboxCell.getByRole("checkbox");

  await checkbox.dispatchEvent("click", { detail: 0 });
  await expect(checkbox).toBeChecked();

  await checkboxCell.dispatchEvent("click", { detail: 0 });
  await expect(checkbox).not.toBeChecked();
});

test("opens a read-only row's actions with one cell click", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await cell(page, 3, "actions").click({ position: { x: 4, y: 4 } });

  await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Actions for row 3" }),
  ).toHaveAttribute("aria-expanded", "true");
});

for (const detail of [0, 1]) {
  test(`opens the action popover without pointer events (detail=${detail})`, async ({
    mount,
    page,
  }) => {
    await mount(<DataGridComponent />);

    await cell(page, 1, "actions").dispatchEvent("click", { detail });

    await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Actions for row 1" }),
    ).toBeFocused();
  });
}

test("supports row and grid edge navigation with Home and End", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await cell(page, 2, "quantity").focus();

  await page.keyboard.press("Home");
  await expect(cell(page, 2, "name")).toBeFocused();

  await page.keyboard.press("End");
  await expect(cell(page, 2, "actions")).toBeFocused();

  await page.keyboard.press("Control+Home");
  await expect(cell(page, 1, "name")).toBeFocused();

  await page.keyboard.press("Control+End");
  await expect(cell(page, 6, "actions")).toBeFocused();
});

test("opens a dropdown with one click without changing its typography or padding", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const typeCell = cell(page, 2, "type");
  const restingContent = typeCell.locator(":scope > div");
  const restingText = restingContent.locator(":scope > span").first();
  const restingStyles = await Promise.all([
    restingContent.evaluate(
      (element) => getComputedStyle(element).paddingInlineStart,
    ),
    restingText.evaluate((element) => getComputedStyle(element).font),
  ]);

  await typeCell.click();

  const select = page.getByRole("combobox", { name: "Type, row 2" });
  const inputContainer = typeCell.locator('[data-role="input-container"]');
  const activeText = typeCell.locator(
    '[data-role="select-text"] .select-text-children-wrapper',
  );
  await expect(select).toBeFocused();
  await expect(
    page.locator('[data-element="select-list-wrapper"]'),
  ).toBeVisible();
  await expect
    .poll(async () =>
      Promise.all([
        inputContainer.evaluate(
          (element) => getComputedStyle(element).paddingInlineStart,
        ),
        activeText.evaluate((element) => getComputedStyle(element).font),
      ]),
    )
    .toEqual(restingStyles);
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
  await cell(page, 2, "name").focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Space");

  const select = page.getByRole("combobox", { name: "Type, row 2" });
  await expect(select).toBeFocused();
  const list = page.locator('[data-element="select-list-wrapper"]');
  await expect(list).toBeVisible();
  await expect
    .poll(async () => {
      const [cellBox, listBox] = await Promise.all([
        typeCell.boundingBox(),
        list.boundingBox(),
      ]);

      if (!cellBox || !listBox) return false;

      return listBox.y >= cellBox.y + cellBox.height;
    })
    .toBe(true);
  const options = page.getByRole("option");
  const optionGeometryBeforeNavigation = await options.evaluateAll((elements) =>
    elements.map((element) => {
      const { height, y } = element.getBoundingClientRect();
      return { height, y };
    }),
  );
  const serviceOption = page.getByRole("option", { name: "Service" });
  const productOption = page.getByRole("option", { name: "Product" });
  await expect(
    productOption.locator('[data-role="selected-icon-wrapper"]'),
  ).toBeVisible();
  await expect(
    serviceOption.locator('[data-role="selected-icon-wrapper"]'),
  ).toBeHidden();
  await expect
    .poll(async () =>
      Promise.all([
        select.evaluate((element) => getComputedStyle(element).fontSize),
        serviceOption.evaluate((element) => getComputedStyle(element).fontSize),
      ]),
    )
    .toEqual(["14px", "14px"]);
  await page.keyboard.press("ArrowUp");
  await expect(serviceOption).toHaveAttribute("data-has-focus", "true");
  await expect(serviceOption).toHaveAttribute("aria-selected", "false");
  await expect(
    productOption.locator('[data-role="selected-icon-wrapper"]'),
  ).toBeVisible();
  await expect(
    serviceOption.locator('[data-role="selected-icon-wrapper"]'),
  ).toBeHidden();
  await expect
    .poll(() =>
      options.evaluateAll((elements) =>
        elements.map((element) => {
          const { height, y } = element.getBoundingClientRect();
          return { height, y };
        }),
      ),
    )
    .toEqual(optionGeometryBeforeNavigation);
  await page.keyboard.press("Enter");

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

test("restores grid focus when a Carbon dropdown closes by blurring", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const typeCell = cell(page, 2, "type");
  await typeCell.click();

  const select = page.getByRole("combobox", { name: "Type, row 2" });
  await select.blur();

  await expect(typeCell).toContainText("Product");
  await expect(typeCell).toBeFocused();
});

test("returns focus to the cell when an open dropdown is dismissed with Escape", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const typeCell = cell(page, 2, "type");
  await typeCell.click();

  await expect(page.getByRole("option", { name: "Service" })).toBeVisible();
  await page.keyboard.press("Escape");

  await expect(page.getByRole("combobox", { name: "Type, row 2" })).toHaveCount(
    0,
  );
  await expect(typeCell).toBeFocused();
  await expect(typeCell).toContainText("Product");
});

for (const { field, role, label } of [
  { field: "name", role: "textbox", label: "Name, row 1" },
  { field: "type", role: "combobox", label: "Type, row 1" },
] as const) {
  test(`Escape cancels the ${field} editor without cancelling its Dialog`, async ({
    mount,
    page,
  }) => {
    await mount(<DataGridInDialog />);
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeFocused();
    const editedCell = cell(page, 1, field);
    await editedCell.click();
    const editor = page.getByRole(role, { name: label });
    await expect(editor).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(editor).toHaveCount(0);
    await expect(dialog).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() =>
          window.__CARBON_INTERNALS_MODAL_LIST?.map(({ modal }) => ({
            component: modal.getAttribute("data-component"),
            connected: modal.isConnected,
          })),
        ),
      )
      .toEqual([{ component: "dialog", connected: true }]);
    await editedCell.focus();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
}

test("supports all edge navigation keys from a closed action trigger", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);
  for (const [key, row, field] of [
    ["Home", 2, "name"],
    ["End", 2, "actions"],
    ["Control+Home", 1, "name"],
    ["Control+End", 6, "actions"],
  ] as const) {
    await cell(page, 2, "actions").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Actions for row 2" }),
    ).toBeFocused();
    await page.keyboard.press(key);
    await expect(cell(page, row, field)).toBeFocused();
    await expect(page.getByRole("list")).toHaveCount(0);
  }
});

test("filters and commits a FilterableSelect dropdown", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent filterableDropdown />);

  const typeCell = cell(page, 2, "type");
  await typeCell.click();

  const select = page.getByRole("combobox", { name: "Type, row 2" });
  await expect(select).toBeFocused();
  await select.fill("Serv");
  await expect(page.getByRole("option", { name: "Service" })).toBeVisible();
  await page.getByRole("option", { name: "Service" }).click();

  await expect(typeCell).toContainText("Service");
  await expect(typeCell).toBeFocused();
  await expect(select).toHaveCount(0);
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
  await expect(checkboxCell).toBeFocused();
  await expect
    .poll(() =>
      checkboxCell.evaluate((element) => getComputedStyle(element).boxShadow),
    )
    .not.toBe("none");

  await page.keyboard.press("Space");
  await expect(checkbox).not.toBeChecked();
});

test("opens an action popover with Space without scrolling vertically", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const grid = page.getByRole("grid");
  const actionCell = cell(page, 2, "actions");
  await grid.evaluate((element) => {
    element.scrollTop = 40;
  });
  await actionCell.focus();
  const trigger = page.getByRole("button", { name: "Actions for row 2" });
  await page.keyboard.press("Space");

  const duplicateAction = page.getByRole("button", { name: "Duplicate" });
  await expect(duplicateAction).toBeFocused();
  await expect
    .poll(async () => {
      const [triggerBox, itemBox] = await Promise.all([
        trigger.boundingBox(),
        duplicateAction.boundingBox(),
      ]);
      return !!triggerBox && !!itemBox && itemBox.height > triggerBox.height;
    })
    .toBe(true);
  await expect
    .poll(() => grid.evaluate((element) => element.scrollTop))
    .toBe(40);
});

test("reveals a non-sticky header when navigating to the first row", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent stickyHeader={false} />);

  const grid = page.getByRole("grid");
  await grid.evaluate((element) => {
    element.scrollTop = 80;
  });

  await cell(page, 2, "name").focus();
  await page.keyboard.press("ArrowUp");

  await expect(cell(page, 1, "name")).toBeFocused();
  await expect
    .poll(() => grid.evaluate((element) => element.scrollTop))
    .toBe(0);
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
  await expect(checkboxCell.getByRole("checkbox")).toHaveAttribute(
    "aria-readonly",
    "true",
  );
  await expect(typeCell.locator('[data-element="dropdown"]')).toHaveCount(0);

  await nameCell.click();
  await expect(page.getByRole("textbox", { name: "Name, row 3" })).toHaveCount(
    0,
  );

  await typeCell.click();
  await expect(page.getByRole("combobox", { name: "Type, row 3" })).toHaveCount(
    0,
  );

  await actionCell.focus();
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

  await nameCell.focus();
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
  await expect(
    page.getByRole("textbox", { name: "Name, row 2" }),
  ).toHaveAccessibleDescription("Enter a name");
});

test("duplicates and deletes rows through the action popover", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await page.getByRole("button", { name: "Actions for row 1" }).click();
  await page.getByRole("button", { name: "Duplicate" }).click();
  await expect(page.getByText("Line 1", { exact: true })).toHaveCount(2);
  await expect(cell(page, 7, "name")).toBeFocused();

  await page.getByRole("button", { name: "Actions for row 7" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("Line 1", { exact: true })).toHaveCount(1);
  await expect(cell(page, 2, "name")).toBeFocused();
});

test("focuses the first cell of a row added from an external control", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await page.getByRole("button", { name: "Add line" }).click();

  await expect(cell(page, 7, "name")).toBeFocused();
});

test("does not navigate away from an open action popover", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const actionCell = cell(page, 1, "actions");
  const selectedCell = cell(page, 1, "selected");
  await actionCell.focus();
  await page.keyboard.press("Enter");

  const duplicate = page.getByRole("button", { name: "Duplicate" });
  await expect(duplicate).toBeFocused();
  const stickyHeader = page.locator('[data-component="data-grid-header"]');
  await expect
    .poll(async () => {
      const [cellZIndex, headerZIndex] = await Promise.all([
        actionCell.evaluate((element) =>
          Number(getComputedStyle(element).zIndex),
        ),
        stickyHeader.evaluate((element) =>
          Number(getComputedStyle(element).zIndex),
        ),
      ]);

      return cellZIndex > headerZIndex;
    })
    .toBe(true);
  await page.keyboard.press("ArrowLeft");
  await expect(duplicate).toBeFocused();
  await expect(page.getByRole("list")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("list")).toHaveCount(0);
  const actionTrigger = page.getByRole("button", {
    name: "Actions for row 1",
  });
  await expect(actionTrigger).toBeFocused();
  await expect
    .poll(() =>
      actionCell.evaluate((element) => getComputedStyle(element).boxShadow),
    )
    .not.toBe("none");
  await expect
    .poll(() =>
      actionTrigger.evaluate((element) => getComputedStyle(element).boxShadow),
    )
    .toBe("none");

  const [cellBounds, triggerBounds] = await Promise.all([
    actionCell.boundingBox(),
    actionTrigger.boundingBox(),
  ]);
  expect(triggerBounds?.height).toBeLessThan(cellBounds?.height ?? 0);

  await page.keyboard.press("ArrowDown");
  await expect(cell(page, 2, "actions")).toBeFocused();
  await expect(page.getByRole("list")).toHaveCount(0);

  await page.keyboard.press("ArrowUp");
  await expect(actionCell).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(selectedCell).toBeFocused();
});

test("focuses the text editor clicked while an action popover is open", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  await page.getByRole("button", { name: "Actions for row 1" }).click();
  await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();

  const nextCell = cell(page, 2, "name");
  await nextCell.click();

  await expect(page.getByRole("list")).toHaveCount(0);
  await expect(
    page.getByRole("textbox", { name: "Name, row 2" }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Actions for row 1" }),
  ).not.toBeFocused();
});

test("closes an open action popover before opening another", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const firstAction = page.getByRole("button", { name: "Actions for row 1" });
  const secondAction = page.getByRole("button", { name: "Actions for row 2" });

  await firstAction.click();
  await expect(firstAction).toHaveAttribute("aria-expanded", "true");

  await secondAction.click();

  await expect(firstAction).toHaveAttribute("aria-expanded", "false");
  await expect(secondAction).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("list")).toHaveCount(1);
});

test("shows a pinned action popover beyond the grid scroll container", async ({
  mount,
  page,
}) => {
  await mount(
    <div style={{ transform: "translate(120px, 80px)", width: "fit-content" }}>
      <DataGridComponent />
    </div>,
  );

  const trigger = page.getByRole("button", { name: "Actions for row 5" });
  await trigger.click();

  const menu = page.getByRole("list");
  await expect(menu).toBeVisible();
  const triggerBounds = await trigger.evaluate((element) => {
    const { left, right, top, bottom } = element.getBoundingClientRect();
    return { left, right, top, bottom };
  });
  const menuBounds = await menu.evaluate((element) => {
    const { left, right, top, bottom } = element.getBoundingClientRect();
    return { left, right, top, bottom };
  });
  expect(menuBounds.left).toBeLessThanOrEqual(triggerBounds.right);
  expect(menuBounds.right).toBeGreaterThanOrEqual(triggerBounds.left);
  expect(
    Math.min(
      Math.abs(menuBounds.top - triggerBounds.bottom),
      Math.abs(triggerBounds.top - menuBounds.bottom),
    ),
  ).toBeLessThanOrEqual(16);
  const gridBottom = await page
    .getByTestId("data-grid")
    .evaluate((element) => element.getBoundingClientRect().bottom);
  const deleteAction = menu.getByRole("button", {
    name: "Delete",
    exact: true,
  });
  const actionBottom = await deleteAction.evaluate(
    (element) => element.getBoundingClientRect().bottom,
  );
  expect(actionBottom).toBeGreaterThan(gridBottom);
  await deleteAction.click();
  await expect(cell(page, 5, "name")).toHaveCount(0);
});

test("tabs from an open action popover to the first cell of the next row", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent />);

  const actionCell = cell(page, 1, "actions");
  await actionCell.focus();
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
