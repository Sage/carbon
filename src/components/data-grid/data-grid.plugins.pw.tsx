import React from "react";
import invariant from "invariant";
import { expect, test } from "../../../playwright/helpers/base-test";
import {
  ColumnPluginGrid,
  TwoColumnPluginGrids,
} from "./plugins/components-test.pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test("drags columns using Table's handle/source and header/drop-target pattern", async ({
  mount,
  page,
}) => {
  await mount(<ColumnPluginGrid />);
  const amountHandle = page.getByRole("button", { name: /Move Amount column/ });
  const noteHeader = page.getByRole("columnheader").filter({ hasText: "Note" });
  const bounds = await noteHeader.boundingBox();
  invariant(bounds, "Missing header bounds");
  await amountHandle.dragTo(noteHeader, {
    targetPosition: { x: bounds.width - 25, y: 20 },
  });
  await expect(page.getByRole("columnheader")).toHaveText([
    "Name",
    "Note",
    "Amount",
    "Total",
  ]);
  await expect(page.getByRole("gridcell").nth(1)).toHaveText("Note 0");
  // Dragging across the pinned boundary is rejected.
  await expect(
    page.getByRole("button", { name: /Move Name column/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /Move Total column/ }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: /Move Amount column/ })
    .dragTo(page.getByRole("columnheader").filter({ hasText: "Name" }));
  await expect(page.getByRole("columnheader")).toHaveText([
    "Name",
    "Note",
    "Amount",
    "Total",
  ]);
});

test("resizes a flex column on release, cancels drafts and restores flex on reset", async ({
  mount,
  page,
}) => {
  await mount(<ColumnPluginGrid />);
  const handle = page.getByRole("separator", { name: "Resize Note column" });
  const initialWidth = Number(await handle.getAttribute("aria-valuenow"));
  const bounds = await handle.boundingBox();
  invariant(bounds, "Missing resize handle bounds");
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 80,
    bounds.y + bounds.height / 2,
    { steps: 5 },
  );
  await expect(handle).toHaveAttribute("aria-valuenow", String(initialWidth));
  await expect(
    page.locator('[data-component="data-grid-column-resize-guide"]'),
  ).toBeVisible();
  await page.mouse.up();
  await expect(handle).toHaveAttribute(
    "aria-valuenow",
    String(initialWidth + 80),
  );
  const newBounds = await handle.boundingBox();
  invariant(newBounds, "Missing resized handle bounds");
  await page.mouse.move(newBounds.x + newBounds.width / 2, newBounds.y + 15);
  await page.mouse.down();
  await page.mouse.move(
    newBounds.x + newBounds.width / 2 + 50,
    newBounds.y + 15,
  );
  await page.keyboard.press("Escape");
  await page.mouse.up();
  await expect(handle).toHaveAttribute(
    "aria-valuenow",
    String(initialWidth + 80),
  );
  await handle.dblclick();
  await expect(handle).toHaveAttribute("aria-valuenow", String(initialWidth));
});

test("keyboard reordering retains handle focus and plugins remain accessible", async ({
  mount,
  page,
}) => {
  await mount(<ColumnPluginGrid />);
  const handle = page.getByRole("button", { name: /Move Amount column/ });
  await handle.focus();
  await page.keyboard.press("ArrowRight");
  await expect(handle).toBeFocused();
  await expect(page.getByRole("columnheader")).toHaveText([
    "Name",
    "Note",
    "Amount",
    "Total",
  ]);
  await checkAccessibility(page);
});

test("rejects drags between grids sharing the same plugin descriptors", async ({
  mount,
  page,
}) => {
  await mount(<TwoColumnPluginGrids />);
  const first = page.getByRole("grid").nth(0);
  const second = page.getByRole("grid").nth(1);
  await first
    .getByRole("button", { name: /Move Amount column/ })
    .dragTo(second.getByRole("columnheader").filter({ hasText: "Note" }));
  await expect(first.getByRole("columnheader")).toHaveText([
    "Name",
    "Amount",
    "Note",
    "Total",
  ]);
  await expect(second.getByRole("columnheader")).toHaveText([
    "Name",
    "Amount",
    "Note",
    "Total",
  ]);
});

test("the native drag preview includes the header and visible column cells after scrolling", async ({
  mount,
  page,
}) => {
  await mount(<ColumnPluginGrid />);
  const grid = page.getByRole("grid");
  await grid.evaluate((element) => {
    element.scrollTop = 320;
  });
  await expect(
    page.getByRole("gridcell", { name: "Note 0", exact: true }),
  ).toHaveCount(0);
  const header = page.getByRole("columnheader").filter({ hasText: "Note" });
  const headerBounds = await header.boundingBox();
  const gridBounds = await grid.boundingBox();
  invariant(headerBounds && gridBounds, "Missing grid bounds");
  const visibleCells = await page
    .getByRole("gridcell")
    .filter({ hasText: /^Note / })
    .evaluateAll(
      (elements, bounds) =>
        elements
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.bottom > bounds.headerBottom && rect.top < bounds.bottom
            );
          })
          .map((element) => element.textContent),
      {
        headerBottom: headerBounds.y + headerBounds.height,
        bottom: gridBounds.y + gridBounds.height,
      },
    );
  await page.evaluate(() => {
    const original = DataTransfer.prototype.setDragImage;
    DataTransfer.prototype.setDragImage = function capture(
      this: DataTransfer,
      image: Element,
      x: number,
      y: number,
    ) {
      const preview = image.querySelector(
        '[data-component="data-grid-column-drag-preview"]',
      );
      if (preview) {
        sessionStorage.setItem(
          "column-preview",
          JSON.stringify({
            cells: Array.from(
              preview.querySelectorAll('[data-preview-part="cell"]'),
            ).map((cell) => cell.textContent),
            header: preview.querySelector('[data-preview-part="header"]')
              ?.textContent,
            width: preview.getBoundingClientRect().width,
            height: preview.getBoundingClientRect().height,
            ids: preview.querySelectorAll("[id]").length,
            hidden: preview.getAttribute("aria-hidden"),
          }),
        );
      }
      original.call(this, image, x, y);
    };
  });
  const amount = page.getByRole("columnheader").filter({ hasText: "Amount" });
  await page
    .getByRole("button", { name: /Move Note column/ })
    .dragTo(amount, { targetPosition: { x: 20, y: 20 } });
  const preview = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("column-preview") ?? "null"),
  );
  expect(preview).toMatchObject({
    cells: visibleCells,
    header: "Note",
    ids: 0,
    hidden: "true",
  });
  expect(preview.cells.length).toBeGreaterThan(1);
  expect(preview.cells.length).toBeLessThan(1000);
  expect(preview.width).toBeCloseTo(headerBounds.width, 0);
  expect(preview.height).toBeGreaterThan(headerBounds.height);
  expect(preview.height).toBeLessThanOrEqual(gridBounds.height);
  await expect(
    page.locator('[data-component="data-grid-column-drag-preview"]'),
  ).toHaveCount(0);
});
