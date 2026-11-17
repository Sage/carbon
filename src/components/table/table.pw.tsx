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
  StickySplitButtonTableComponent,
  StickyActionPopoverTableComponent,
  TableComponent,
  ZebraStripedTableComponent,
  TableMenuFocusComponent,
} from "./components-test.pw";

for (const menuType of [
  "split-button",
  "multi-action-button",
  "action-popover",
] as const) {
  for (const followingControls of ["hidden", "collapsed-subrow"] as const) {
    test(`Tab skips ${followingControls} controls after a portalled ${menuType}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TableMenuFocusComponent
          menuType={menuType}
          followingControls={followingControls}
        />,
      );
      await page
        .getByRole("button", { name: "Menu actions", exact: true })
        .click();
      await expect(
        page.getByRole("button", { name: "First action", exact: true }),
      ).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(page.getByRole("list")).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "After menu", exact: true }),
      ).toBeFocused();
    });
  }

  for (const key of ["Tab", "Shift+Tab"] as const) {
    test(`${key} leaves a portalled ${menuType} in the trigger's tab order`, async ({
      mount,
      page,
    }) => {
      await mount(<TableMenuFocusComponent menuType={menuType} />);
      const trigger = page.getByRole("button", {
        name: "Menu actions",
        exact: true,
      });
      await trigger.click();
      await expect(
        page.getByRole("button", { name: "First action", exact: true }),
      ).toBeFocused();
      await page.keyboard.press(key);
      await expect(page.getByRole("list")).toHaveCount(0);
      await expect(
        key === "Shift+Tab"
          ? trigger
          : page.getByRole("button", { name: "After menu", exact: true }),
      ).toBeFocused();
    });
  }
}

for (const customTrigger of [false, true]) {
  test(`Tab wraps within a dialog when its last control opens a portalled submenu (custom trigger=${customTrigger})`, async ({
    mount,
    page,
  }) => {
    await mount(
      <TableMenuFocusComponent
        menuType="action-popover"
        withSubmenu
        inDialog
        customTrigger={customTrigger}
        followingControls="none"
      />,
    );
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeFocused();
    await page
      .getByRole("button", { name: "Menu actions", exact: true })
      .click();
    await page
      .getByRole("button", { name: /^Last action/ })
      .press("ArrowRight");
    await expect(
      page.getByRole("button", { name: "Nested action", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("list")).toHaveCount(0);
    await expect(dialog.getByRole("button").first()).toBeFocused();
    await expect(dialog).toBeVisible();
    await expect(page.getByRole("status")).toHaveText("Closed 1 times");
  });
}

test("clicking a portalled parent menu's divider closes only its submenu", async ({
  mount,
  page,
}) => {
  await mount(
    <TableMenuFocusComponent menuType="action-popover" withSubmenu />,
  );
  const trigger = page.getByRole("button", {
    name: "Menu actions",
    exact: true,
  });
  await trigger.click();
  await page.getByRole("button", { name: /^Last action/ }).press("ArrowRight");
  const nested = page.getByRole("button", {
    name: "Nested action",
    exact: true,
  });
  await expect(nested).toBeFocused();
  await page.getByRole("separator", { includeHidden: true }).click();
  await expect(nested).toBeHidden();
  await expect(page.getByRole("list")).toHaveCount(1);
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("status")).toHaveText("Closed 0 times");
  await page.getByRole("button", { name: "Before table", exact: true }).click();
  await expect(page.getByRole("list")).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText("Closed 1 times");
});

for (const key of ["Tab", "Shift+Tab"] as const) {
  for (const customTrigger of [false, true]) {
    test(`${key} leaves a portalled submenu in a dialog with custom trigger=${customTrigger}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TableMenuFocusComponent
          menuType="action-popover"
          withSubmenu
          inDialog
          customTrigger={customTrigger}
        />,
      );
      await expect(page.getByRole("dialog")).toBeFocused();
      const trigger = page.getByRole("button", {
        name: "Menu actions",
        exact: true,
      });
      await trigger.click();
      await page.getByRole("button", { name: /^Last action/ }).click();
      await expect(
        page.getByRole("button", { name: "Nested action", exact: true }),
      ).toBeFocused();
      await page.keyboard.press(key);
      await expect(page.getByRole("list")).toHaveCount(0);
      await expect(
        key === "Shift+Tab"
          ? trigger
          : page.getByRole("button", { name: "After menu", exact: true }),
      ).toBeFocused();
      await expect(page.getByRole("dialog")).toBeVisible();
      await expect(page.getByRole("status")).toHaveText("Closed 1 times");
    });
  }
}

for (const actionComponent of [
  "action-popover",
  "multi-action-button",
] as const) {
  test(`keeps a sticky cell's ${actionComponent} above the footer and pager page-size select`, async ({
    mount,
    page,
  }) => {
    await mount(
      <StickyActionPopoverTableComponent actionComponent={actionComponent} />,
    );

    const toggle = page.getByRole("button", {
      name: "Product 1 actions",
      exact: true,
    });
    const menu = page.getByTestId("menu-wrapper");
    const footer = page.locator("tfoot");
    const pageSizeSelect = page.getByRole("combobox", {
      name: "Items per page",
    });
    await toggle.click();

    const menuCentreX = await menu.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.x + bounds.width / 2;
    });
    const footerCentreY = await footer.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.y + bounds.height / 2;
    });
    const selectCentre = await pageSizeSelect.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return {
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2,
      };
    });

    // Hit-test the overlap: visibility alone does not detect covered menus.
    await expect
      .poll(() =>
        menu.evaluate(
          (element, point) =>
            element.contains(document.elementFromPoint(point.x, point.y)),
          { x: menuCentreX, y: footerCentreY },
        ),
      )
      .toBe(true);
    await expect
      .poll(() =>
        menu.evaluate(
          (element, point) =>
            element.contains(document.elementFromPoint(point.x, point.y)),
          selectCentre,
        ),
      )
      .toBe(true);

    await page.getByRole("button", { name: "Action 4", exact: true }).click();
    await expect(page.getByRole("status")).toHaveText("Action 4");
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.click();
    await page
      .getByRole("button", { name: "Action 1", exact: true })
      .press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();
  });
}

test("keeps a SplitButton menu above subsequent sticky cells", async ({
  mount,
  page,
}) => {
  await mount(<StickySplitButtonTableComponent />);

  const toggle = page.getByRole("button", {
    name: "Actions for product 1",
    exact: true,
  });
  await toggle.click();

  const action = page.getByRole("button", {
    name: "Save and close",
    exact: true,
  });
  await expect(action).toBeVisible();
  // A visible element can still be covered by the next row's sticky cell.
  await action.click();
  await expect(action).toBeHidden();
  await expect(toggle).toBeFocused();
});

for (const stickyColumn of ["first", "last"] as const) {
  test(`portals a ${stickyColumn} sticky column's MultiActionButton menu and preserves keyboard and click interactions`, async ({
    mount,
    page,
  }) => {
    await mount(
      <StickyActionPopoverTableComponent
        actionComponent="multi-action-button"
        stickyColumn={stickyColumn}
      />,
    );

    const toggle = page.getByRole("button", {
      name: "Product 1 actions",
      exact: true,
    });
    const menu = page.getByTestId("menu-wrapper");
    const first = page.getByRole("button", { name: "Action 1", exact: true });
    await toggle.click();
    await expect(first).toBeFocused();
    await first.press("ArrowDown");
    await expect(
      page.getByRole("button", { name: "Action 2", exact: true }),
    ).toBeFocused();

    await page.getByRole("button", { name: "Action 4", exact: true }).click();
    await expect(page.getByRole("status")).toHaveText("Action 4");
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.click();
    await first.press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.click();
    await page.mouse.click(800, 300);
    await expect(menu).toBeHidden();
  });

  test(`allows a ${stickyColumn} sticky column's menu to extend outside table overflow`, async ({
    mount,
    page,
  }) => {
    await mount(
      <StickySplitButtonTableComponent
        stickyColumn={stickyColumn}
        stickyRow="both"
        maxHeight="120px"
      />,
    );

    const toggle = page.getByRole("button", {
      name: "Actions for product 1",
      exact: true,
    });
    const action = page.getByRole("button", { name: "Save and add another" });
    const scrollContainer = page.locator(
      '[data-element="table-scroll-container"]',
    );

    await toggle.click();
    // Keyboard focus starts on the first menu item.
    await page
      .getByRole("button", { name: "Save and close", exact: true })
      .press("ArrowDown");
    await expect(action).toBeFocused();

    const containerBottom = await scrollContainer.evaluate(
      (element) => element.getBoundingClientRect().bottom,
    );
    const actionCentre = await action.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.y + bounds.height / 2;
    });
    expect(actionCentre).toBeGreaterThan(containerBottom);
    await action.click();
    await expect(action).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.click();
    await page
      .getByRole("button", { name: "Save and close", exact: true })
      .press("Escape");
    await expect(action).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.click();
    await page.mouse.click(800, 300);
    await expect(action).toBeHidden();
  });

  for (const stickyRow of ["header", "footer"] as const) {
    test(`keeps an open menu's ${stickyColumn} sticky cell beneath the sticky ${stickyRow}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StickySplitButtonTableComponent
          stickyColumn={stickyColumn}
          stickyRow="both"
          maxHeight="260px"
        />,
      );

      const toggle = page.getByRole("button", {
        name: "Actions for product 6",
      });
      await toggle.click();

      const pinnedRow = page.locator(
        stickyRow === "header" ? "thead" : "tfoot",
      );
      const scrollContainer = page.locator(
        '[data-element="table-scroll-container"]',
      );
      const toggleCentre = await toggle.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.y + bounds.height / 2;
      });
      const rowCentre = await pinnedRow.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.y + bounds.height / 2;
      });

      // Scroll the trigger's centre underneath the pinned row's centre.
      await scrollContainer.evaluate((element, delta) => {
        element.scrollTop += delta;
      }, toggleCentre - rowCentre);

      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await expect
        .poll(async () => {
          const point = await toggle.evaluate((element) => {
            const bounds = element.getBoundingClientRect();
            return {
              x: bounds.x + bounds.width / 2,
              y: bounds.y + bounds.height / 2,
            };
          });
          return pinnedRow.evaluate(
            (row, point) =>
              row.contains(document.elementFromPoint(point.x, point.y)),
            point,
          );
        })
        .toBe(true);
    });
  }
}

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

test("keeps sticky rows visible while one container scrolls in both directions", async ({
  mount,
  page,
}) => {
  await mount(
    <div style={{ width: "320px" }}>
      <StickyHeaderFooterTableComponent maxHeight="240px" />
    </div>,
  );

  const scrollContainer = page.locator(
    '[data-element="table-scroll-container"]',
  );
  const header = page.getByTestId("table-head");
  const footer = page.getByTestId("table-footer");

  await scrollContainer.evaluate((element) => {
    element.scrollTo({ left: 120, top: 120 });
  });

  await expect
    .poll(() =>
      scrollContainer.evaluate((element) => ({
        left: element.scrollLeft,
        top: element.scrollTop,
      })),
    )
    .toEqual({ left: 120, top: 120 });

  const containerBounds = await scrollContainer.boundingBox();
  const headerBounds = await header.boundingBox();
  const footerBounds = await footer.boundingBox();

  expect(containerBounds).not.toBeNull();
  expect(headerBounds).not.toBeNull();
  expect(footerBounds).not.toBeNull();
  expect(headerBounds?.y).toBeCloseTo(containerBounds?.y ?? 0, 0);
  expect((footerBounds?.y ?? 0) + (footerBounds?.height ?? 0)).toBeCloseTo(
    (containerBounds?.y ?? 0) + (containerBounds?.height ?? 0),
    0,
  );
});

test("allows the viewport to scroll vertically when the table has no maximum height", async ({
  mount,
  page,
}) => {
  await mount(
    <div style={{ width: "320px" }}>
      <StickyHeaderFooterTableComponent />
    </div>,
  );

  await page.getByRole("table").hover();
  await page.mouse.wheel(0, 300);

  await expect
    .poll(() => page.evaluate(() => window.scrollY))
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
    .getByRole("row", { name: "Row one" })
    .locator('[data-element="table-cell-drag-handle"]')
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
    .getByRole("row", { name: "Row 4" })
    .locator('[data-element="table-cell-drag-handle"]')
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
    .getByRole("row", { name: "Row one" })
    .locator('[data-element="table-cell-drag-handle"]')
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
    .getByRole("row", { name: "Row one" })
    .locator('[data-element="table-cell-drag-handle"]')
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
