import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";
import {
  WithDirectionalDropIndicators,
  WithBoxCardsAndTiles,
  SimpleDraggable,
  WithDraggableCheckbox,
  WithMultipleContainers,
  WithCustomDraggablePanels,
  WithDraggableMenus,
} from "./components.test-pw";
import { DraggableContainer, DraggableItem } from ".";

for (const [index, title] of [
  "Rounded article component",
  "Rounded section component",
  "Asymmetric article component",
  "Asymmetric section component",
  "Square article component",
  "Square section component",
].entries()) {
  test(`custom ${title} uses its internal handle and registered surface`, async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomDraggablePanels />);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByTestId("draggable-item-drag-handle")).toHaveCount(0);
    await expect(page.getByTestId("drag-handle")).toHaveCount(6);
    const surface = page.locator(`[aria-label="${title}"]`);
    const source = page.getByTestId("draggable-item").filter({ has: surface });
    await surface.getByRole("button", { name: `Increment ${title}` }).click();
    // A square registered surface must win even when its interior has rounded corners.
    await surface.getByTestId("drag-handle").evaluate((element) => {
      (element as HTMLElement).style.borderRadius = "40px";
    });
    const sourceBounds = await source.boundingBox();
    const surfaceBounds = await surface.boundingBox();
    const targetIndex = index ^ 1;
    const target = page.getByTestId("draggable-item").nth(targetIndex);
    const targetBounds = await target.boundingBox();
    if (!sourceBounds || !surfaceBounds || !targetBounds)
      throw new Error("Expected bounds");
    const radii = await surface.evaluate((element) => {
      const style = getComputedStyle(element);
      return [
        style.borderTopLeftRadius,
        style.borderTopRightRadius,
        style.borderBottomRightRadius,
        style.borderBottomLeftRadius,
      ];
    });
    await surface.getByTestId("drag-handle").hover();
    await page.mouse.down();
    await page.mouse.move(targetBounds.x + 80, targetBounds.y + 60);
    await page.mouse.move(targetBounds.x + 81, targetBounds.y + 61);
    await expect(source).toHaveAttribute("data-is-dragging", "true");
    await expect(target).toHaveAttribute(
      "data-drop-indicator-position",
      /left|right|top|bottom/,
    );
    const lineWidth = parseFloat(await getStyle(target, "width", "before"));
    const lineHeight = parseFloat(await getStyle(target, "height", "before"));
    expect(Math.min(lineWidth, lineHeight)).toBe(3);
    const ghost = await source.evaluate((element) => {
      const style = getComputedStyle(element, "::after");
      return {
        top: parseFloat(style.top),
        left: parseFloat(style.left),
        width: parseFloat(style.width),
        height: parseFloat(style.height),
        radii: [
          style.borderTopLeftRadius,
          style.borderTopRightRadius,
          style.borderBottomRightRadius,
          style.borderBottomLeftRadius,
        ],
      };
    });
    expect(sourceBounds.x + ghost.left).toBeCloseTo(surfaceBounds.x, 1);
    expect(sourceBounds.y + ghost.top).toBeCloseTo(surfaceBounds.y, 1);
    expect(ghost.width).toBeCloseTo(surfaceBounds.width, 1);
    expect(ghost.height).toBeCloseTo(surfaceBounds.height, 1);
    expect(ghost.radii).toEqual(radii);
    await page.mouse.up();
    await expect(
      page.getByTestId("draggable-item").nth(targetIndex),
    ).toContainText(title);
    await expect(
      surface.getByRole("button", { name: `Increment ${title}` }),
    ).toHaveText("Clicked 1 times");
    await expect(
      page.getByRole("status").filter({ hasText: title }),
    ).toHaveText(`${title} moved to position ${targetIndex + 1} of 6.`);
    await expect(source).toHaveAttribute("data-is-dragging", "false");
  });
}

test("reorders on drop and reports the resulting order", async ({
  mount,
  page,
}) => {
  let getOrderArgs: unknown;
  await mount(
    <SimpleDraggable
      getOrder={(...args) => {
        getOrderArgs = args;
      }}
    />,
  );

  await page
    .getByTestId("draggable-item-drag-handle")
    .first()
    .dragTo(page.getByTestId("draggable-item").filter({ hasText: "Venus" }));

  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Mercury",
    "Venus",
    "Apple",
  ]);
  await expect
    .poll(() => getOrderArgs)
    .toEqual([["mercury", "venus", "apple"], "apple"]);

  // A second drag uses the item's new index, without remounting its content.
  await page
    .getByTestId("draggable-item-drag-handle")
    .last()
    .dragTo(page.getByTestId("draggable-item").first());
  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Mercury",
    "Venus",
  ]);
});

for (const { name, kind, label, announcementLabel } of [
  {
    name: "Card",
    kind: "card" as const,
    label: "card 1",
    announcementLabel: "Card 1",
  },
  {
    name: "Custom panel",
    kind: "custom" as const,
    label: "Rounded article component",
    announcementLabel: "Rounded article component",
  },
]) {
  test(`${name} menu announces keyboard moves and restores focus to the moved trigger`, async ({
    mount,
    page,
  }) => {
    await mount(<WithDraggableMenus kind={kind} />);
    const actions = page.getByRole("button", {
      name: `Reorder ${label}`,
      exact: true,
    });
    const items = page.getByTestId("draggable-item");
    await actions.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("button", { name: "Move earlier", exact: true }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Move Last", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(
      items
        .last()
        .getByRole("button", { name: `Reorder ${label}`, exact: true }),
    ).toBeVisible();
    await expect(actions).toBeFocused();
    await expect(
      page.getByRole("status").filter({ hasText: announcementLabel }),
    ).toHaveText(`${announcementLabel} moved to position 6 of 6.`);
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("button", { name: "Move later", exact: true }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Move First", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(
      items
        .first()
        .getByRole("button", { name: `Reorder ${label}`, exact: true }),
    ).toBeVisible();
    await expect(actions).toBeFocused();
    await expect(
      page.getByRole("status").filter({ hasText: announcementLabel }),
    ).toHaveText(`${announcementLabel} moved to position 1 of 6.`);
  });
}

for (const direction of ["up", "down"] as const) {
  test(`shows the indicator when dragging ${direction} and preserves the item's space`, async ({
    mount,
    page,
  }) => {
    await mount(<SimpleDraggable />);
    const items = page.getByTestId("draggable-item");
    const source = direction === "down" ? items.first() : items.last();
    const target = direction === "down" ? items.last() : items.first();
    const sourceBounds = await source.boundingBox();
    const targetBounds = await target.boundingBox();
    if (!sourceBounds || !targetBounds) throw new Error("Expected item bounds");

    await source.getByTestId("draggable-item-drag-handle").hover();
    await page.mouse.down();
    await page.mouse.move(
      targetBounds.x + targetBounds.width / 2,
      targetBounds.y + targetBounds.height / 2,
    );
    await page.mouse.move(
      targetBounds.x + targetBounds.width / 2,
      targetBounds.y + targetBounds.height / 2 + 1,
    );

    await expect(source).toHaveAttribute("data-is-dragging", "true");
    await expect(source).not.toHaveCSS("display", "none");
    expect((await source.boundingBox())?.height).toBe(sourceBounds.height);
    await expect(target).toHaveAttribute(
      "data-drop-indicator-position",
      direction === "down" ? "bottom" : "top",
    );
    expect(await getStyle(target, "height", "before")).toBe("3px");
    await expect(items).toHaveText(["Apple", "Mercury", "Venus"]);

    await page.mouse.up();
    await expect(items).toHaveText(
      direction === "down"
        ? ["Mercury", "Venus", "Apple"]
        : ["Venus", "Apple", "Mercury"],
    );
    await expect(page.locator('[data-is-dragging="true"]')).toHaveCount(0);
    await expect(page.locator("[data-drop-indicator-position]")).toHaveCount(0);
  });
}

test("dragging content outside the handle does not reorder items", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);
  await page.getByText("Apple").dragTo(page.getByText("Venus"));
  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Mercury",
    "Venus",
  ]);
});

test("dropping on the source leaves its order unchanged without a callback", async ({
  mount,
  page,
}) => {
  let called = false;
  await mount(
    <SimpleDraggable
      getOrder={() => {
        called = true;
      }}
    />,
  );
  const handle = page.getByTestId("draggable-item-drag-handle").first();
  await handle.dragTo(handle);
  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Mercury",
    "Venus",
  ]);
  expect(called).toBe(false);
});

test("dropping outside clears the drag state and leaves the order unchanged", async ({
  mount,
  page,
}) => {
  let called = false;
  await mount(
    <SimpleDraggable
      getOrder={() => {
        called = true;
      }}
    />,
  );
  await page.getByTestId("draggable-item-drag-handle").first().hover();
  await page.mouse.down();
  await page.mouse.move(1000, 700);
  await page.mouse.move(1001, 701);
  await page.mouse.up();
  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Mercury",
    "Venus",
  ]);
  await expect(page.locator('[data-is-dragging="true"]')).toHaveCount(0);
  expect(called).toBe(false);
});

test("containers with overlapping IDs are isolated", async ({
  mount,
  page,
}) => {
  let called = false;
  await mount(
    <>
      <DraggableContainer
        data-role="fruits"
        getOrder={() => {
          called = true;
        }}
      >
        <DraggableItem id={0}>Apple</DraggableItem>
        <DraggableItem id={1}>Banana</DraggableItem>
      </DraggableContainer>
      <DraggableContainer data-role="planets">
        <DraggableItem id={0}>Mercury</DraggableItem>
        <DraggableItem id={1}>Venus</DraggableItem>
      </DraggableContainer>
    </>,
  );
  const fruits = page.getByTestId("fruits");
  const planets = page.getByTestId("planets");
  await planets
    .getByTestId("draggable-item-drag-handle")
    .first()
    .dragTo(fruits.getByTestId("draggable-item").last());
  await expect(fruits.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Banana",
  ]);
  await expect(planets.getByTestId("draggable-item")).toHaveText([
    "Mercury",
    "Venus",
  ]);
  expect(called).toBe(false);

  await fruits
    .getByTestId("draggable-item-drag-handle")
    .first()
    .dragTo(fruits.getByTestId("draggable-item").last());
  await expect(fruits.getByTestId("draggable-item")).toHaveText([
    "Banana",
    "Apple",
  ]);
  await expect(planets.getByTestId("draggable-item")).toHaveText([
    "Mercury",
    "Venus",
  ]);
});

test("checkbox content remains interactive after reordering", async ({
  mount,
  page,
}) => {
  await mount(<WithDraggableCheckbox />);
  await page
    .getByTestId("draggable-item-drag-handle")
    .first()
    .dragTo(page.getByText("Neptune"));
  const checkbox = page.getByRole("checkbox", { name: "Apple" });
  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

test("reorders Cards and Tiles inside a child Box and preserves interactive content", async ({
  mount,
  page,
}) => {
  let getOrderArgs: unknown;
  await mount(
    <WithBoxCardsAndTiles
      getOrder={(...args) => {
        getOrderArgs = args;
      }}
    />,
  );
  const parent = page.getByTestId("custom-parent");
  const items = parent.getByTestId("draggable-item");
  const checkbox = parent.getByRole("checkbox", { name: "First card" });
  await expect(items.first().getByTestId("drag-handle")).toHaveAttribute(
    "draggable",
    "true",
  );
  await expect(
    items.first().getByTestId("draggable-item-drag-handle"),
  ).toHaveCount(0);
  await expect(
    items.nth(1).getByTestId("draggable-item-drag-handle"),
  ).toHaveCount(0);
  await expect(items.nth(1).getByTestId("drag-handle")).toHaveAttribute(
    "draggable",
    "true",
  );
  const tileContent = parent.getByTestId("tile-draggable-content");
  await expect(tileContent).toHaveCSS("flex-direction", "row");
  const firstColumn = await parent
    .getByTestId("tile-first-column")
    .boundingBox();
  const secondColumn = await parent
    .getByTestId("tile-second-column")
    .boundingBox();
  const tileHandle = await items
    .nth(1)
    .getByTestId("drag-handle")
    .boundingBox();
  if (!firstColumn || !secondColumn || !tileHandle)
    throw new Error("Expected tile layout bounds");
  expect(firstColumn.y).toBe(secondColumn.y);
  expect(firstColumn.x).toBeLessThan(secondColumn.x);
  expect(tileHandle.y + tileHandle.height).toBeLessThanOrEqual(firstColumn.y);
  await expect(parent.locator('[draggable="true"]')).toHaveCount(3);
  await checkbox.check();

  await items
    .first()
    .locator('[data-element="draggable-item-drag-handle"]')
    .dragTo(items.last());
  await expect(items).toHaveText(["Middle tile", "Last card", "First card"]);
  await expect
    .poll(() => getOrderArgs)
    .toEqual([["tile", "card-two", "card-one"], "card-one"]);
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();

  await items
    .first()
    .locator('[data-element="draggable-item-drag-handle"]')
    .dragTo(items.last());
  await expect(items).toHaveText(["Last card", "First card", "Middle tile"]);
  await expect
    .poll(() => getOrderArgs)
    .toEqual([["card-two", "card-one", "tile"], "tile"]);
  await expect(parent).toHaveCSS("display", "flex");
  await expect(parent).toHaveCSS("flex-direction", "column");
  await checkAccessibility(page);
});

test("accessibility for SimpleDraggable", async ({ mount, page }) => {
  await mount(<SimpleDraggable />);
  await checkAccessibility(page);
});

test("accessibility for WithDraggableCheckbox", async ({ mount, page }) => {
  await mount(<WithDraggableCheckbox />);
  await checkAccessibility(page);
});

test("accessibility for WithMultipleContainers", async ({ mount, page }) => {
  await mount(<WithMultipleContainers />);
  await checkAccessibility(page);
});

test("Tile ActionPopover controls reorder with the keyboard and stay synchronized with dragging", async ({
  mount,
  page,
}) => {
  await mount(<WithDraggableMenus kind="tile" />);
  const items = page.getByTestId("draggable-item");
  const order = () =>
    items.locator('[data-role="tile-draggable-content"]').allTextContents();
  const actions = page.getByRole("button", { name: "Reorder tile 1" });
  const handle = items.first().getByTestId("drag-handle");
  const handleBounds = await handle.boundingBox();
  const actionsBounds = await actions.boundingBox();
  if (!handleBounds || !actionsBounds)
    throw new Error("Expected drag row bounds");
  expect(actionsBounds.x).toBeGreaterThan(handleBounds.x + handleBounds.width);
  expect(Math.abs(actionsBounds.y - handleBounds.y)).toBeLessThan(2);

  await actions.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Move earlier", exact: true }),
  ).toBeDisabled();
  const later = page.getByRole("button", { name: "Move later", exact: true });
  await later.focus();
  await page.keyboard.press("Enter");
  await expect
    .poll(order)
    .toEqual(["Tile 2", "Tile 1", "Tile 3", "Tile 4", "Tile 5", "Tile 6"]);
  await expect(actions).toBeFocused();
  await expect(
    page.getByRole("status").filter({ hasText: "Tile 1" }),
  ).toHaveText("Tile 1 moved to position 2 of 6.");

  await items.nth(1).getByTestId("drag-handle").dragTo(items.last());
  await expect
    .poll(order)
    .toEqual(["Tile 2", "Tile 3", "Tile 4", "Tile 5", "Tile 6", "Tile 1"]);
  await expect(
    page.getByRole("status").filter({ hasText: "Tile 1" }),
  ).toHaveText("Tile 1 moved to position 6 of 6.");
  await actions.click();
  await expect(
    page.getByRole("button", { name: "Move later", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Move earlier", exact: true }).click();
  await expect
    .poll(order)
    .toEqual(["Tile 2", "Tile 3", "Tile 4", "Tile 5", "Tile 1", "Tile 6"]);

  // ActionPopover mounts its menu on demand, so axe requests manual review of
  // closed buttons' aria-controls. Verify every target exists while open.
  for (const button of await page
    .getByRole("button", { name: /^Reorder tile/ })
    .all()) {
    const menuId = await button.getAttribute("aria-controls");
    expect(menuId).not.toBeNull();
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(`[id="${menuId}"]`)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
  }
  await checkAccessibility(page);
});

for (const kind of ["card", "tile"] as const) {
  for (const scenario of [
    { sourceIndex: 0, targetIndex: 1, edge: "right" },
    { sourceIndex: 1, targetIndex: 0, edge: "left" },
    { sourceIndex: 0, targetIndex: 3, edge: "bottom" },
    { sourceIndex: 3, targetIndex: 0, edge: "top" },
  ] as const) {
    test(`${kind} indicates ${scenario.edge} and stops before the rounded corners`, async ({
      mount,
      page,
    }) => {
      await mount(<WithDirectionalDropIndicators kind={kind} />);
      const items = page.getByTestId("draggable-item");
      const source = items.nth(scenario.sourceIndex);
      const target = items.nth(scenario.targetIndex);
      const surface = target.locator(
        kind === "card"
          ? '[data-component="card"]'
          : '[data-role="tile-wrapper"]',
      );
      const targetBounds = await target.boundingBox();
      const surfaceBounds = await surface.boundingBox();
      if (!targetBounds || !surfaceBounds)
        throw new Error("Expected target bounds");
      const radius = await surface.evaluate((element) =>
        parseFloat(getComputedStyle(element).borderTopLeftRadius),
      );
      expect(radius).toBeGreaterThan(0);
      await source.getByTestId("drag-handle").hover();
      await page.mouse.down();
      await page.mouse.move(
        targetBounds.x + targetBounds.width / 2,
        targetBounds.y + targetBounds.height / 2,
      );
      await page.mouse.move(
        targetBounds.x + targetBounds.width / 2 + 1,
        targetBounds.y + targetBounds.height / 2 + 1,
      );
      await expect(target).toHaveAttribute(
        "data-drop-indicator-position",
        scenario.edge,
      );
      const line = await target.evaluate((element) => {
        const style = getComputedStyle(element, "::before");
        return {
          top: parseFloat(style.top),
          left: parseFloat(style.left),
          width: parseFloat(style.width),
          height: parseFloat(style.height),
        };
      });
      if (scenario.edge === "left" || scenario.edge === "right") {
        expect(line.width).toBe(3);
        expect(targetBounds.y + line.top).toBeCloseTo(
          surfaceBounds.y + radius,
          1,
        );
        expect(line.height).toBeCloseTo(surfaceBounds.height - 2 * radius, 1);
        expect(targetBounds.x + line.left).toBeCloseTo(
          surfaceBounds.x +
            (scenario.edge === "right" ? surfaceBounds.width - 3 : 0),
          1,
        );
      } else {
        expect(line.height).toBe(3);
        expect(targetBounds.x + line.left).toBeCloseTo(
          surfaceBounds.x + radius,
          1,
        );
        expect(line.width).toBeCloseTo(surfaceBounds.width - 2 * radius, 1);
        expect(targetBounds.y + line.top).toBeCloseTo(
          surfaceBounds.y +
            (scenario.edge === "bottom" ? surfaceBounds.height - 3 : 0),
          1,
        );
      }
      await page.mouse.up();
      const expected = [1, 2, 3, 4, 5, 6];
      const [moved] = expected.splice(scenario.sourceIndex, 1);
      expected.splice(scenario.targetIndex, 0, moved);
      await expect(items).toHaveText(expected.map((id) => `Item ${id}`));
      await expect(page.locator("[data-drop-indicator-position]")).toHaveCount(
        0,
      );
    });
  }
}

test("uses the left edge for a leftward move in an RTL grid", async ({
  mount,
  page,
}) => {
  await mount(<WithDirectionalDropIndicators direction="rtl" />);
  const items = page.getByTestId("draggable-item");
  const target = items.nth(1);
  const bounds = await target.boundingBox();
  if (!bounds) throw new Error("Expected target bounds");
  await items.first().getByTestId("drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  );
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 1,
    bounds.y + bounds.height / 2 + 1,
  );
  await expect(target).toHaveAttribute("data-drop-indicator-position", "left");
  await page.mouse.up();
  await expect(items).toHaveText([
    "Item 2",
    "Item 1",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
});

test("uses vertical indicators when the responsive grid wraps to one column", async ({
  mount,
  page,
}) => {
  await page.setViewportSize({ width: 340, height: 900 });
  await mount(<WithDirectionalDropIndicators kind="tile" />);
  const items = page.getByTestId("draggable-item");
  const target = items.nth(1);
  const bounds = await target.boundingBox();
  if (!bounds) throw new Error("Expected target bounds");
  await items.first().getByTestId("drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  );
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 1,
    bounds.y + bounds.height / 2 + 1,
  );
  await expect(target).toHaveAttribute(
    "data-drop-indicator-position",
    "bottom",
  );
  await page.mouse.up();
  await expect(items).toHaveText([
    "Item 2",
    "Item 1",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
});

for (const kind of ["card", "tile"] as const) {
  for (const shape of ["default", "asymmetric"] as const) {
    test(`${kind} ghost matches its ${shape} surface and preserves the layout`, async ({
      mount,
      page,
    }) => {
      await mount(<WithDirectionalDropIndicators kind={kind} />);
      const items = page.getByTestId("draggable-item");
      const source = items.filter({ hasText: "Item 1" });
      const surface = source.locator(
        kind === "card"
          ? '[data-component="card"]'
          : '[data-role="tile-wrapper"]',
      );
      if (shape === "asymmetric") {
        await surface.evaluate((element) => {
          const node = element as HTMLElement;
          node.style.boxSizing = "border-box";
          node.style.width = "calc(100% - 24px)";
          node.style.margin = "8px 12px";
          node.style.borderTopLeftRadius = "28px 16px";
          node.style.borderTopRightRadius = "12px";
          node.style.borderBottomRightRadius = "20% 15%";
          node.style.borderBottomLeftRadius = "4px 8px";
          node.style.transition = "none";
        });
      }
      const sourceBounds = await source.boundingBox();
      const surfaceBounds = await surface.boundingBox();
      const targetBounds = await items.nth(1).boundingBox();
      if (!sourceBounds || !surfaceBounds || !targetBounds)
        throw new Error("Expected item bounds");
      const radii = await surface.evaluate((element) => {
        const style = getComputedStyle(element);
        return [
          style.borderTopLeftRadius,
          style.borderTopRightRadius,
          style.borderBottomRightRadius,
          style.borderBottomLeftRadius,
        ];
      });
      await source.getByTestId("drag-handle").hover();
      await page.mouse.down();
      await page.mouse.move(
        targetBounds.x + targetBounds.width / 2,
        targetBounds.y + targetBounds.height / 2,
      );
      await page.mouse.move(
        targetBounds.x + targetBounds.width / 2 + 1,
        targetBounds.y + targetBounds.height / 2 + 1,
      );
      await expect(source).toHaveAttribute("data-is-dragging", "true");
      const ghost = await source.evaluate((element) => {
        const style = getComputedStyle(element, "::after");
        return {
          top: parseFloat(style.top),
          left: parseFloat(style.left),
          width: parseFloat(style.width),
          height: parseFloat(style.height),
          radii: [
            style.borderTopLeftRadius,
            style.borderTopRightRadius,
            style.borderBottomRightRadius,
            style.borderBottomLeftRadius,
          ],
          background: style.backgroundColor,
          shadow: style.boxShadow,
        };
      });
      expect(sourceBounds.x + ghost.left).toBeCloseTo(surfaceBounds.x, 1);
      expect(sourceBounds.y + ghost.top).toBeCloseTo(surfaceBounds.y, 1);
      expect(ghost.width).toBeCloseTo(surfaceBounds.width, 1);
      expect(ghost.height).toBeCloseTo(surfaceBounds.height, 1);
      expect(ghost.radii).toEqual(radii);
      expect(ghost.background).not.toBe("rgba(0, 0, 0, 0)");
      expect(ghost.shadow).not.toBe("none");
      await expect(source).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      await expect(source).toHaveCSS("box-shadow", "none");
      await expect(surface).toHaveCSS("visibility", "hidden");
      expect(await source.boundingBox()).toEqual(sourceBounds);
      await page.mouse.up();
      await expect(source).toHaveAttribute("data-is-dragging", "false");
      expect(
        await source.evaluate(
          (element) => getComputedStyle(element, "::after").content,
        ),
      ).toBe("none");
      await expect(surface).toHaveCSS("visibility", "visible");
      await expect(items).toHaveText([
        "Item 2",
        "Item 1",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
      ]);
    });
  }
}

test("clears the rounded ghost when the drag is cancelled", async ({
  mount,
  page,
}) => {
  await mount(<WithDirectionalDropIndicators />);
  const items = page.getByTestId("draggable-item");
  const source = items.filter({ hasText: "Item 1" });
  const targetBounds = await items.nth(1).boundingBox();
  if (!targetBounds) throw new Error("Expected target bounds");
  await source.getByTestId("drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(targetBounds.x + 20, targetBounds.y + 60);
  await page.mouse.move(targetBounds.x + 21, targetBounds.y + 61);
  await expect(source).toHaveAttribute("data-is-dragging", "true");
  await page.keyboard.press("Escape");
  await page.mouse.up();
  await expect(source).toHaveAttribute("data-is-dragging", "false");
  expect(
    await source.evaluate(
      (element) => getComputedStyle(element, "::after").content,
    ),
  ).toBe("none");
  await expect(items).toHaveText([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
});
