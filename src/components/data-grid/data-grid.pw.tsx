import React from "react";
import type { Page } from "@playwright/test";

import { expect, test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import DataGridComponent, {
  AdjacentErrors,
  DataGridInDialog,
  PlaygroundExample,
} from "./components.test-pw";
import { DataGrid } from ".";

const cell = (page: Page, rowId: number, field: string) =>
  page.locator(`[data-element="data-grid-cell-${String(rowId)}-${field}"]`);

for (const key of ["Tab", "Shift+Tab"]) {
  test(`confirms the highlighted dropdown option before ${key} navigation`, async ({
    mount,
    page,
  }) => {
    await mount(<DataGridComponent rowCount={2} />);
    const typeCell = cell(page, 1, "type");
    await typeCell.click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press(key);
    await expect(typeCell).toHaveText("Product");
    await expect(
      cell(page, 1, key === "Tab" ? "quantity" : "name"),
    ).toBeFocused();
  });
}

test("dropdown Tab confirmation preserves native exits at both grid boundaries", async ({
  mount,
  page,
}) => {
  await mount(
    <>
      <button type="button">Before grid</button>
      <DataGrid
        aria-label="Dropdown boundary grid"
        rows={[{ id: 1, type: "service" }]}
        columns={[
          {
            field: "type",
            headerName: "Type",
            type: "dropdown",
            options: [
              { label: "Service", value: "service" },
              { label: "Product", value: "product" },
            ],
          },
        ]}
        enableTabNavigation
      />
      <button type="button">After grid</button>
    </>,
  );
  for (const { key, destination } of [
    { key: "Tab", destination: "After grid" },
    { key: "Shift+Tab", destination: "Before grid" },
  ]) {
    await page.getByRole("gridcell").click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press(key);
    await expect(page.getByRole("button", { name: destination })).toBeFocused();
    await expect(page.getByRole("combobox")).toHaveCount(0);
  }
});

test("the Playground recalculates VAT and net amounts after editing invoice values", async ({
  mount,
  page,
}) => {
  await mount(<PlaygroundExample />);
  await expect(cell(page, 1, "vatAmount")).toHaveText("600.00");
  await expect(cell(page, 1, "net")).toHaveText("3,000.00");

  await cell(page, 1, "vatRate").click();
  await page
    .getByRole("option", { name: "Lower Rate 5.00%", exact: true })
    .click();
  await expect(cell(page, 1, "vatAmount")).toHaveText("150.00");
  await expect(cell(page, 1, "net")).toHaveText("3,000.00");

  await cell(page, 1, "quantity").click();
  await cell(page, 1, "quantity").getByRole("textbox").fill("2");
  await page.keyboard.press("Enter");
  await expect(cell(page, 1, "vatAmount")).toHaveText("300.00");
  await expect(cell(page, 1, "net")).toHaveText("6,000.00");

  await cell(page, 1, "rate").click();
  await cell(page, 1, "rate").getByRole("textbox").fill("100.00");
  await page.keyboard.press("Enter");
  await expect(cell(page, 1, "vatAmount")).toHaveText("10.00");
  await expect(cell(page, 1, "net")).toHaveText("200.00");
});

for (const interception of ["transform", "discard"] as const) {
  const expectedText = interception === "transform" ? "UPDATED" : "Line 1";
  for (const { completion, finish, focusTarget } of [
    {
      completion: "Enter",
      finish: (page: Page) => page.keyboard.press("Enter"),
      focusTarget: (page: Page) => cell(page, 1, "name"),
    },
    {
      completion: "Tab",
      finish: (page: Page) => page.keyboard.press("Tab"),
      focusTarget: (page: Page) => cell(page, 1, "type"),
    },
    {
      completion: "blur",
      finish: (page: Page) =>
        page.getByRole("button", { name: "Add line", exact: true }).focus(),
      focusTarget: (page: Page) =>
        page.getByRole("button", { name: "Add line", exact: true }),
    },
  ]) {
    test(`${interception} interception preserves ${completion} edit completion`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DataGridComponent interception={interception} rowCount={2} />,
      );
      const firstCell = cell(page, 1, "name");
      await firstCell.click();
      await firstCell.getByRole("textbox").fill(" updated ");
      await finish(page);
      await expect(firstCell.getByRole("textbox")).toHaveCount(0);
      await expect(firstCell).toHaveText(expectedText);
      await expect(focusTarget(page)).toBeFocused();
    });
  }
}

test("discarding structural, dropdown and checkbox operations retains controlled values and focus", async ({
  mount,
  page,
}) => {
  await mount(
    <DataGridComponent interception="discard" rowCount={2} maxWidth="900px" />,
  );
  const addButton = page.getByRole("button", { name: "Add line", exact: true });
  await addButton.click();
  await expect(page.getByRole("row")).toHaveCount(3);
  await expect(addButton).toBeFocused();
  const typeCell = cell(page, 1, "type");
  await typeCell.click();
  await page.getByRole("option", { name: "Product", exact: true }).click();
  await expect(typeCell).toHaveText("Service");
  await expect(typeCell).toBeFocused();
  const checkbox = cell(page, 1, "selected").getByRole("checkbox");
  await checkbox.click();
  await expect(checkbox).not.toBeChecked();
});

for (const zoom of [1, 1.25, 1.5, 2]) {
  test(`insets state edges without moving content at ${zoom * 100}% CSS zoom`, async ({
    mount,
    page,
  }, testInfo) => {
    await mount(<AdjacentErrors />);
    await page.getByRole("grid").evaluate((element, value) => {
      element.style.zoom = String(value);
    }, zoom);
    const firstCell = page.getByRole("gridcell").first();
    const readGeometry = () =>
      firstCell.evaluate((element) => {
        const style = getComputedStyle(element);
        const overlay = getComputedStyle(element, "::before");
        const marker = (
          element.querySelector('span[aria-hidden="true"]') as HTMLSpanElement
        ).getBoundingClientRect();
        return {
          top: parseFloat(overlay.top),
          bottom: parseFloat(overlay.bottom),
          left: parseFloat(overlay.left),
          right: parseFloat(overlay.right),
          height: element.getBoundingClientRect().height,
          font: style.font,
          padding: style.padding,
          markerX: marker.x,
          markerY: marker.y,
        };
      });
    const resting = await readGeometry();
    expect(resting.top).toBe(-1);
    expect(resting.bottom).toBe(-1);
    expect(resting.left).toBe(-1);
    expect(resting.right).toBe(-1);
    await firstCell.focus();
    expect(await readGeometry()).toEqual(resting);
    await page.screenshot({
      path: testInfo.outputPath("navigation-focus.png"),
    });
    await firstCell.click();
    await expect(firstCell.getByRole("textbox")).toBeFocused();
    expect(await readGeometry()).toEqual(resting);
    await page.screenshot({ path: testInfo.outputPath("editor-focus.png") });
  });
}

test("adjacent error rings cover the shared grid line and centre the keyline", async ({
  mount,
  page,
}, testInfo) => {
  await mount(<AdjacentErrors />);
  const cells = page.getByRole("gridcell");
  const edges = await cells.evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const overlay = getComputedStyle(element, "::before");
      const top =
        rect.top + parseFloat(style.borderTopWidth) + parseFloat(overlay.top);
      const left =
        rect.left +
        parseFloat(style.borderLeftWidth) +
        parseFloat(overlay.left);
      const marker = (
        element.querySelector('span[aria-hidden="true"]') as HTMLSpanElement
      ).getBoundingClientRect();
      return {
        top,
        left,
        bottom: top + parseFloat(overlay.height),
        right: left + parseFloat(overlay.width),
        markerTop: marker.top,
        markerBottom: marker.bottom,
      };
    }),
  );
  expect(edges[0].right - edges[1].left).toBe(1);
  expect(edges[0].bottom - edges[2].top).toBe(1);
  for (const edge of edges) {
    expect(edge.markerTop - edge.top - 2).toBe(
      edge.bottom - 2 - edge.markerBottom,
    );
  }
  await page.screenshot({ path: testInfo.outputPath("adjacent-errors.png") });
  await cells.first().focus();
  const bounds = await cells.first().evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x + 20, y: rect.y, bottom: rect.bottom };
  });
  const topEdge = { x: bounds.x, y: bounds.y - 1, width: 20, height: 2 };
  const bottomEdge = {
    x: bounds.x,
    y: bounds.bottom - 2,
    width: 20,
    height: 2,
  };
  expect(await page.screenshot({ clip: bottomEdge })).toEqual(
    await page.screenshot({ clip: topEdge }),
  );
  await cells.first().click();
  await expect(cells.first().getByRole("textbox")).toBeFocused();
  expect(await page.screenshot({ clip: bottomEdge })).toEqual(
    await page.screenshot({ clip: topEdge }),
  );
  await page.screenshot({
    path: testInfo.outputPath("adjacent-error-focused.png"),
  });
});

for (const viewport of [
  { width: 1280, height: 800 },
  { width: 390, height: 844 },
]) {
  test(`error and focus overlays cover cell edges at ${viewport.width}px`, async ({
    mount,
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    await mount(<DataGridComponent />);
    const invalidCell = cell(page, 2, "name");
    const marker = invalidCell.locator(':scope > span[aria-hidden="true"]');
    const cellX = await invalidCell.evaluate(
      (element) => element.getBoundingClientRect().x,
    );
    const markerBounds = await marker.evaluate((element) => ({
      x: element.getBoundingClientRect().x,
      width: element.getBoundingClientRect().width,
    }));
    expect(markerBounds.x - cellX).toBe(10);
    expect(markerBounds.width).toBe(2);
    const errorShadow = await invalidCell.evaluate(
      (element) => getComputedStyle(element, "::before").boxShadow,
    );
    expect(errorShadow).not.toBe("none");
    await page.screenshot({ path: testInfo.outputPath("error-keyline.png") });
    for (const { field, left } of [
      { field: "name", left: 0 },
      { field: "type", left: -1 },
      { field: "actions", left: -1 },
    ]) {
      const target = cell(page, 2, field);
      await target.focus();
      const geometry = await target.evaluate((element) => {
        const overlay = getComputedStyle(element, "::before");
        const style = getComputedStyle(element);
        const size = element.getBoundingClientRect();
        return {
          left: parseFloat(style.borderLeftWidth) + parseFloat(overlay.left),
          top: parseFloat(style.borderTopWidth) + parseFloat(overlay.top),
          width: parseFloat(overlay.width),
          height: parseFloat(overlay.height),
          cellWidth: size.width,
          cellHeight: size.height,
        };
      });
      expect(geometry.left).toBe(left);
      expect(geometry.top).toBe(-1);
      expect(geometry.width).toBeCloseTo(geometry.cellWidth - left, 1);
      expect(geometry.height).toBeCloseTo(geometry.cellHeight + 1, 1);
    }
    await invalidCell.focus();
    const focusShadow = await invalidCell.evaluate(
      (element) => getComputedStyle(element, "::before").boxShadow,
    );
    expect(focusShadow).not.toBe(errorShadow);
    await invalidCell.click();
    await expect(invalidCell.getByRole("textbox")).toBeFocused();
    const editShadow = await invalidCell.evaluate(
      (element) => getComputedStyle(element, "::before").boxShadow,
    );
    expect(editShadow).not.toBe(errorShadow);
    await page.screenshot({ path: testInfo.outputPath("editor-focus.png") });
  });
}

for (const filterableDropdown of [false, true]) {
  const controlSelector = filterableDropdown
    ? '[role="combobox"]'
    : ".select-text-children-wrapper";

  test(`preserves regular dropdown typography (filterable=${filterableDropdown})`, async ({
    mount,
    page,
  }) => {
    await mount(<DataGridComponent filterableDropdown={filterableDropdown} />);
    const typeCell = cell(page, 1, "type");
    const restingText = typeCell
      .locator('[data-component="data-grid-cell-content"], :scope > div')
      .first();
    await expect
      .poll(() =>
        restingText.evaluate((element) => getComputedStyle(element).fontWeight),
      )
      .toBe("400");
    await typeCell.click();
    const controlText = typeCell.locator(controlSelector);
    await expect
      .poll(() =>
        controlText.evaluate((element) => getComputedStyle(element).fontWeight),
      )
      .toBe("400");
    const option = page.getByRole("option", { name: "Product" });
    await option.click();
    await expect(typeCell).toContainText("Product");
    await expect(typeCell).toBeFocused();
  });
}

for (const rowId of [1, 3]) {
  test(`action cells own the active surface while triggers retain their hover surface (row=${rowId})`, async ({
    mount,
    page,
  }) => {
    await mount(<DataGridComponent />);
    const actionCell = cell(page, rowId, "actions");
    const trigger = actionCell.getByRole("button", {
      name: `Actions for row ${rowId}`,
      exact: true,
    });
    const baseColor = await actionCell.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    const activeBackground =
      "linear-gradient(rgba(12, 34, 56, 0.2), rgba(12, 34, 56, 0.2))";
    await actionCell.evaluate((element) => {
      element.style.setProperty(
        "--button-typical-subtle-bg-active",
        "rgba(12, 34, 56, 0.2)",
      );
    });
    await trigger.hover();
    await expect
      .poll(() =>
        trigger.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        ),
      )
      .not.toBe("rgba(0, 0, 0, 0)");
    await page.mouse.down();
    await expect(actionCell).toHaveCSS("background-color", baseColor);
    await expect(actionCell).toHaveCSS("background-image", activeBackground);
    await expect
      .poll(() =>
        trigger.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        ),
      )
      .toBe("rgba(0, 0, 0, 0)");
    await page.mouse.up();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(actionCell).toHaveCSS("background-color", baseColor);
    await expect(actionCell).toHaveCSS("background-image", activeBackground);
    await expect(trigger).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(actionCell).not.toHaveCSS(
      "background-image",
      activeBackground,
    );
    await trigger.focus();
    await page.keyboard.press("Space");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(actionCell).toHaveCSS("background-color", baseColor);
    await expect(actionCell).toHaveCSS("background-image", activeBackground);
    await expect(trigger).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await page.keyboard.press("Escape");
    await expect(actionCell).not.toHaveCSS(
      "background-image",
      activeBackground,
    );
  });
}

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
      nameCell.evaluate(
        (element) => getComputedStyle(element, "::before").boxShadow,
      ),
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
      typeCell.evaluate(
        (element) => getComputedStyle(element, "::before").boxShadow,
      ),
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

for (const filterableDropdown of [false, true]) {
  test(`portals dropdown options beyond the grid scroll boundary (filterable=${filterableDropdown})`, async ({
    mount,
    page,
  }) => {
    await mount(
      <DataGridComponent
        maxHeight="80px"
        filterableDropdown={filterableDropdown}
      />,
    );
    const typeCell = cell(page, 1, "type");
    await typeCell.click();
    const list = page.getByRole("listbox");
    await expect(list).toBeVisible();
    expect(
      await list.evaluate(
        (element) => element.closest('[data-component="data-grid"]') === null,
      ),
    ).toBe(true);
    const gridBounds = await page.getByRole("grid").boundingBox();
    const product = page.getByRole("option", { name: "Product" });
    const optionBounds = await product.boundingBox();
    expect(optionBounds?.y).toBeGreaterThan(
      (gridBounds?.y ?? 0) + (gridBounds?.height ?? 0),
    );
    await product.click();
    await expect(typeCell).toContainText("Product");
    await expect(typeCell).toBeFocused();
    await expect(list).toHaveCount(0);
  });
}

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
      checkboxCell.evaluate(
        (element) => getComputedStyle(element, "::before").boxShadow,
      ),
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
      actionCell.evaluate(
        (element) => getComputedStyle(element, "::before").boxShadow,
      ),
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

  const actionCell = cell(page, 5, "actions");
  const initialX = await actionCell.evaluate(
    (element) => element.getBoundingClientRect().x,
  );
  const trigger = page.getByRole("button", { name: "Actions for row 5" });
  await trigger.click();

  const menu = page.getByRole("list");
  await expect(menu).toBeVisible();
  await page.getByRole("grid").evaluate((element) => {
    element.scrollLeft = 100;
  });
  await expect
    .poll(() =>
      actionCell.evaluate((element) => element.getBoundingClientRect().x),
    )
    .toBe(initialX);
  await expect(actionCell).toHaveCSS("position", "sticky");
  await expect(actionCell).toHaveCSS("background-color", /^rgb\(/);
  await expect(actionCell).not.toHaveCSS("background-image", "none");
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

test("restores the action cell after virtualizing its focused menu", async ({
  mount,
  page,
}) => {
  await mount(<DataGridComponent rowCount={100} maxHeight="200px" />);

  const grid = page.getByRole("grid");
  await cell(page, 1, "actions").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();

  await grid.evaluate((element) => {
    element.scrollTop = 2000;
  });
  await expect(cell(page, 1, "actions")).toHaveCount(0);
  await grid.evaluate((element) => {
    element.scrollTop = 0;
  });

  await expect(cell(page, 1, "actions")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(cell(page, 2, "name")).toBeFocused();
});

test("preserves external focus after virtualizing an action menu", async ({
  mount,
  page,
}) => {
  await mount(
    <>
      <DataGridComponent rowCount={100} maxHeight="200px" />
      <button type="button">Outside grid</button>
    </>,
  );

  const grid = page.getByRole("grid");
  const outside = page.getByRole("button", { name: "Outside grid" });
  await cell(page, 1, "actions").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Duplicate" })).toBeFocused();

  await grid.evaluate((element) => {
    element.scrollTop = 2000;
  });
  await expect(cell(page, 1, "actions")).toHaveCount(0);
  await outside.focus();
  await grid.evaluate((element) => {
    element.scrollTop = 0;
  });

  await expect(cell(page, 1, "actions")).toBeAttached();
  await expect(outside).toBeFocused();
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
